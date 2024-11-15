module file_sharing::user {
    use std::signer;
    use aptos_framework::account;
    use aptos_framework::timestamp;
    use aptos_framework::event;
    use std::vector;

    friend file_sharing::file_upload;

    /// Error codes
    const E_USER_ALREADY_EXISTS: u64 = 1;
    const E_USER_NOT_REGISTERED: u64 = 2;
    const E_NOT_AUTHORIZED: u64 = 3;

    /// Struct to store user information
    struct UserProfile has key {
        address: address,
        file_count: u64,
        registration_time: u64,
        uploaded_files: vector<u64>, // Vector to store file IDs
        shared_files: vector<u64>    // Files shared with this user
    }

    /// Events
    #[event]
    struct UserRegisteredEvent has drop, store {
        user_address: address,
        registration_time: u64
    }

    /// Initialize a new user
    public entry fun register_user(account: &signer) {
        let user_addr = signer::address_of(account);
        


        // Create new user profile
        let user_profile = UserProfile {
            address: user_addr,
            file_count: 0,
            registration_time: timestamp::now_seconds(),
            uploaded_files: vector::empty<u64>(),
            shared_files: vector::empty<u64>()
        };

        // Move the UserProfile resource to the user's address
        move_to(account, user_profile);

        // Emit registration event
        event::emit(UserRegisteredEvent {
            user_address: user_addr,
            registration_time: timestamp::now_seconds()
        });
    }

    /// Check if a user is registered
    #[view]
    public fun is_user_registered(user_address: address): bool {
        exists<UserProfile>(user_address)
    }

    /// Get user's file count
    #[view]
    public fun get_file_count(user_address: address): u64 acquires UserProfile {
        assert!(exists<UserProfile>(user_address), E_USER_NOT_REGISTERED);
        borrow_global<UserProfile>(user_address).file_count
    }

    /// Internal function to increment file count
    public(friend) fun increment_file_count(user_address: address) acquires UserProfile {
        assert!(exists<UserProfile>(user_address), E_USER_NOT_REGISTERED);
        let user_profile = borrow_global_mut<UserProfile>(user_address);
        user_profile.file_count = user_profile.file_count + 1;
    }

    /// Add a file ID to user's uploaded files
    public(friend) fun add_uploaded_file(user_address: address, file_id: u64) acquires UserProfile {
        assert!(exists<UserProfile>(user_address), E_USER_NOT_REGISTERED);
        let user_profile = borrow_global_mut<UserProfile>(user_address);
        vector::push_back(&mut user_profile.uploaded_files, file_id);
    }

    /// Add a shared file ID to user's shared files
    public(friend) fun add_shared_file(user_address: address, file_id: u64) acquires UserProfile {
        assert!(exists<UserProfile>(user_address), E_USER_NOT_REGISTERED);
        let user_profile = borrow_global_mut<UserProfile>(user_address);
        vector::push_back(&mut user_profile.shared_files, file_id);
    }

    /// Get user's uploaded files
    #[view]
    public fun get_uploaded_files(user_address: address): vector<u64> acquires UserProfile {
        assert!(exists<UserProfile>(user_address), E_USER_NOT_REGISTERED);
        *&borrow_global<UserProfile>(user_address).uploaded_files
    }

    /// Get user's shared files
    #[view]
    public fun get_shared_files(user_address: address): vector<u64> acquires UserProfile {
        assert!(exists<UserProfile>(user_address), E_USER_NOT_REGISTERED);
        *&borrow_global<UserProfile>(user_address).shared_files
    }
}