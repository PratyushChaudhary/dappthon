module file_sharing::file_access {
    use std::signer;
    use std::vector;
    use std::string::String;
    use aptos_framework::timestamp;
    use aptos_framework::event;
    use file_sharing::file_upload::{Self, FileInfo};
    use file_sharing::user;

    /// Error codes
    const E_NOT_FILE_OWNER: u64 = 1;
    const E_ALREADY_SHARED: u64 = 2;
    const E_NOT_SHARED: u64 = 3;
    const E_NO_ACCESS: u64 = 4;

    /// Struct to track files shared by a user
    struct SharedAccess has key {
        shared_files: vector<ShareInfo>
    }

    /// Struct to track files shared with a user
    struct SharedWithMe has key {
        received_files: vector<ShareInfo>
    }

    /// Individual share information
    struct ShareInfo has store, drop, copy {
        file_id: u64,
        shared_with: address,
        shared_by: address,
        share_time: u64
    }

    /// Events
    #[event]
    struct FileSharedEvent has drop, store {
        file_id: u64,
        shared_by: address,
        shared_with: address,
        share_time: u64
    }

    /// Initialize shared access tracking for a user who shares files
    public entry fun initialize_shared_access(account: &signer) {
        let account_addr = signer::address_of(account);
        if (!exists<SharedAccess>(account_addr)) {
            move_to(account, SharedAccess {
                shared_files: vector::empty<ShareInfo>()
            });
        }
    }

    /// Initialize tracking for files shared with a user
    public entry fun initialize_shared_tracking(account: &signer) {
        let account_addr = signer::address_of(account);
        if (!exists<SharedWithMe>(account_addr)) {
            move_to(account, SharedWithMe {
                received_files: vector::empty<ShareInfo>()
            });
        }
    }

    public entry fun share_file(
        account: &signer,
        file_id: u64,
        recipient: address
    ) acquires SharedAccess, SharedWithMe {
        let sender_addr = signer::address_of(account);
        
        // First verify recipient is registered
        assert!(user::is_user_registered(recipient), 0);

        // Then check if file exists and get owner
        let file_owner = file_upload::get_file_owner(sender_addr, file_id);
        
        // Verify sender owns the file
        assert!(file_owner == sender_addr, E_NOT_FILE_OWNER);

        // Initialize shared access if not exists
        if (!exists<SharedAccess>(sender_addr)) {
            initialize_shared_access(account);
        };

        let shared_access = borrow_global_mut<SharedAccess>(sender_addr);
        
        // Check if already shared
        let i = 0;
        let len = vector::length(&shared_access.shared_files);
        while (i < len) {
            let share_info = vector::borrow(&shared_access.shared_files, i);
            assert!(!(share_info.file_id == file_id && share_info.shared_with == recipient), E_ALREADY_SHARED);
            i = i + 1;
        };

        // Create share info
        let share_info = ShareInfo {
            file_id,
            shared_with: recipient,
            shared_by: sender_addr,
            share_time: timestamp::now_seconds()
        };

        // Update shared access for sender
        vector::push_back(&mut shared_access.shared_files, *&share_info);

        // Update shared access for recipient
        assert!(exists<SharedWithMe>(recipient), E_NO_ACCESS);
        let recipient_shared = borrow_global_mut<SharedWithMe>(recipient);
        vector::push_back(&mut recipient_shared.received_files, share_info);

        // Emit event
        event::emit(FileSharedEvent {
            file_id,
            shared_by: sender_addr,
            shared_with: recipient,
            share_time: timestamp::now_seconds()
        });
    }

    /// Revoke file access
    public entry fun revoke_access(
        account: &signer,
        file_id: u64,
        recipient: address
    ) acquires SharedAccess, SharedWithMe {
        let sender_addr = signer::address_of(account);
        assert!(exists<SharedAccess>(sender_addr), E_NOT_SHARED);
        
        // Remove from sender's shared list
        let shared_access = borrow_global_mut<SharedAccess>(sender_addr);
        let i = 0;
        let len = vector::length(&shared_access.shared_files);
        let found = false;
        
        while (i < len) {
            let share_info = vector::borrow(&shared_access.shared_files, i);
            if (share_info.file_id == file_id && share_info.shared_with == recipient) {
                vector::remove(&mut shared_access.shared_files, i);
                found = true;
                break
            };
            i = i + 1;
        };

        assert!(found, E_NOT_SHARED);

        // Remove from recipient's received files
        if (exists<SharedWithMe>(recipient)) {
            let recipient_shared = borrow_global_mut<SharedWithMe>(recipient);
            i = 0;
            len = vector::length(&recipient_shared.received_files);
            
            while (i < len) {
                let share_info = vector::borrow(&recipient_shared.received_files, i);
                if (share_info.file_id == file_id && share_info.shared_by == sender_addr) {
                    vector::remove(&mut recipient_shared.received_files, i);
                    break
                };
                i = i + 1;
            };
        };
    }

    /// Check if user has access to file
    #[view]
    public fun has_access(
        user_addr: address,
        owner_addr: address,
        file_id: u64
    ): bool acquires SharedAccess {
        if (user_addr == owner_addr) {
            return true
        };

        if (!exists<SharedAccess>(owner_addr)) {
            return false
        };

        let shared_access = borrow_global<SharedAccess>(owner_addr);
        let i = 0;
        let len = vector::length(&shared_access.shared_files);
        
        while (i < len) {
            let share_info = vector::borrow(&shared_access.shared_files, i);
            if (share_info.file_id == file_id && share_info.shared_with == user_addr) {
                return true
            };
            i = i + 1;
        };
        
        false
    }

    /// Get all files shared with a user
    #[view]
    public fun get_shared_with_me(user_addr: address): vector<ShareInfo> acquires SharedWithMe {
        if (!exists<SharedWithMe>(user_addr)) {
            return vector::empty()
        };
        
        let shared_with_me = borrow_global<SharedWithMe>(user_addr);
        *&shared_with_me.received_files
    }

    /// Get all files shared by a user
    #[view]
    public fun get_shared_by_me(user_addr: address): vector<ShareInfo> acquires SharedAccess {
        if (!exists<SharedAccess>(user_addr)) {
            return vector::empty()
        };
        
        let shared_access = borrow_global<SharedAccess>(user_addr);
        *&shared_access.shared_files
    }
}