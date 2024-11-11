module file_sharing::file_upload {
    use std::string::String;
    use std::signer;
    use std::vector;
    use aptos_framework::timestamp;
    use aptos_framework::event;
    use file_sharing::user;

    /// Error codes
    const E_FILE_ALREADY_EXISTS: u64 = 1;
    const E_FILE_NOT_FOUND: u64 = 2;
    const E_NOT_FILE_OWNER: u64 = 3;
    const E_INVALID_IPFS_HASH: u64 = 4;
    const E_REGISTRY_NOT_INITIALIZED: u64 = 5;

    /// Struct to store file information
    struct FileInfo has key, store, drop, copy {
        id: u64,
        owner: address,
        ipfs_hash: String,
        upload_time: u64,
        is_encrypted: bool,
        file_name: String,
        file_size: u64
    }

    /// Resource to keep track of all files in the system
    struct FileRegistry has key {
        file_counter: u64,
        files: vector<FileInfo>
    }

    /// Events
    #[event]
    struct FileUploadedEvent has drop, store {
        file_id: u64,
        owner: address,
        ipfs_hash: String,
        upload_time: u64
    }

    /// Initialize the file registry for a user
    public entry fun initialize_registry(account: &signer) {
        let account_addr = signer::address_of(account);
        if (!exists<FileRegistry>(account_addr)) {
            move_to(account, FileRegistry {
                file_counter: 0,
                files: vector::empty<FileInfo>()
            });
        }
    }

    /// Upload a new file
    public entry fun upload_file(
        account: &signer,
        ipfs_hash: String,
        file_name: String,
        file_size: u64,
        is_encrypted: bool
    ) acquires FileRegistry {
        let account_addr = signer::address_of(account);
        
        // Verify user is registered
        assert!(user::is_user_registered(account_addr), 0);
        
        // Get or create registry
        if (!exists<FileRegistry>(account_addr)) {
            initialize_registry(account);
        };
        
        let registry = borrow_global_mut<FileRegistry>(account_addr);
        
        // Create new file info
        let file_id = registry.file_counter + 1;
        let file_info = FileInfo {
            id: file_id,
            owner: account_addr,
            ipfs_hash,
            upload_time: timestamp::now_seconds(),
            is_encrypted,
            file_name,
            file_size
        };
        
        // Update registry
        vector::push_back(&mut registry.files, file_info);
        registry.file_counter = file_id;

        // Emit upload event
        event::emit(FileUploadedEvent {
            file_id,
            owner: account_addr,
            ipfs_hash,
            upload_time: timestamp::now_seconds()
        });

        // Update user's file count (using public function instead of internal)
        user::increment_file_count(account_addr);
    }

    #[view]
    public fun get_file_owner(account_addr: address, file_id: u64): address acquires FileRegistry {
        assert!(exists<FileRegistry>(account_addr), E_FILE_NOT_FOUND);
        let registry = borrow_global<FileRegistry>(account_addr);
        assert!(file_id <= registry.file_counter, E_FILE_NOT_FOUND);
        let file_info = vector::borrow(&registry.files, file_id - 1);
        file_info.owner
    }

    #[view]
    public fun get_file_size(account_addr: address, file_id: u64): u64 acquires FileRegistry {
        let registry = borrow_global<FileRegistry>(account_addr);
        let file_info = vector::borrow(&registry.files, file_id - 1);
        file_info.file_size
    }

    #[view]
    public fun is_file_encrypted(account_addr: address, file_id: u64): bool acquires FileRegistry {
        let registry = borrow_global<FileRegistry>(account_addr);
        let file_info = vector::borrow(&registry.files, file_id - 1);
        file_info.is_encrypted
    }

    #[view]
    public fun get_ipfs_hash(account_addr: address, file_id: u64): String acquires FileRegistry {
        let registry = borrow_global<FileRegistry>(account_addr);
        let file_info = vector::borrow(&registry.files, file_id - 1);
        file_info.ipfs_hash
    }

    #[view]
    public fun get_file_info(account_addr: address, file_id: u64): FileInfo acquires FileRegistry {
        // First check if registry exists
        assert!(exists<FileRegistry>(account_addr), E_REGISTRY_NOT_INITIALIZED);
        
        let registry = borrow_global<FileRegistry>(account_addr);
        // Check if file_id is valid
        assert!(file_id > 0 && file_id <= registry.file_counter, E_FILE_NOT_FOUND);
        
        *vector::borrow(&registry.files, file_id - 1)
    }

    #[view]
    public fun get_user_files(account_addr: address): vector<FileInfo> acquires FileRegistry {
        assert!(exists<FileRegistry>(account_addr), E_FILE_NOT_FOUND);
        let registry = borrow_global<FileRegistry>(account_addr);
        registry.files
    }

    /// Remove a file
    public entry fun remove_file(
        account: &signer,
        file_id: u64
    ) acquires FileRegistry {
        let account_addr = signer::address_of(account);
        let registry = borrow_global_mut<FileRegistry>(account_addr);
        
        assert!(file_id <= registry.file_counter, E_FILE_NOT_FOUND);
        let file = vector::borrow(&registry.files, file_id - 1);
        assert!(file.owner == account_addr, E_NOT_FILE_OWNER);
        
        // Remove file
        let _removed_file = vector::remove(&mut registry.files, file_id - 1);
    }

    #[view]
    public fun file_exists(account_addr: address, file_id: u64): bool acquires FileRegistry {
        if (!exists<FileRegistry>(account_addr)) {
            return false
        };
        let registry = borrow_global<FileRegistry>(account_addr);
        file_id <= registry.file_counter
    }
}