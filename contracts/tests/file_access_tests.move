#[test_only]
module file_sharing::file_access_tests {
    use std::string;
    use std::signer;
    use std::vector;
    use aptos_framework::account;
    use aptos_framework::timestamp;
    use file_sharing::user;
    use file_sharing::file_upload;
    use file_sharing::file_access;

    // Test helper function to create a test user
    fun create_test_user(addr: address): signer {
        let user = account::create_account_for_test(addr);
        user::register_user(&user);
        file_access::initialize_shared_tracking(&user);
        user
    }

    // Test helper function to upload a test file
    fun upload_test_file(user: &signer, file_name: vector<u8>): u64 {
        file_upload::upload_file(
            user,
            string::utf8(b"QmTest123"),
            string::utf8(file_name),
            1000,
            false
        );
        1 // Returns file_id
    }

    #[test(framework = @0x1)]
    fun test_basic_file_sharing(framework: &signer) {
        // Set up timestamp for testing
        timestamp::set_time_has_started_for_testing(framework);
        
        // Create test users
        let owner_addr = @0x123;
        let recipient_addr = @0x456;
        let owner = create_test_user(owner_addr);
        let recipient = create_test_user(recipient_addr);

        // Upload a test file
        let file_id = upload_test_file(&owner, b"test.txt");

        // Share the file
        file_access::share_file(&owner, file_id, recipient_addr);

        // Verify sharing
        assert!(file_access::has_access(recipient_addr, owner_addr, file_id), 1);
        
        // Check shared files list
        let shared_files = file_access::get_shared_with_me(recipient_addr);
        assert!(vector::length(&shared_files) == 1, 2);
    }

    #[test(framework = @0x1)]
    fun test_revoke_access(framework: &signer) {
        timestamp::set_time_has_started_for_testing(framework);
        
        let owner_addr = @0x123;
        let recipient_addr = @0x456;
        let owner = create_test_user(owner_addr);
        let recipient = create_test_user(recipient_addr);

        let file_id = upload_test_file(&owner, b"test.txt");
        
        // Share and then revoke
        file_access::share_file(&owner, file_id, recipient_addr);
        file_access::revoke_access(&owner, file_id, recipient_addr);

        // Verify access is revoked
        assert!(!file_access::has_access(recipient_addr, owner_addr, file_id), 1);
        
        // Verify shared files list is empty
        let shared_files = file_access::get_shared_with_me(recipient_addr);
        assert!(vector::length(&shared_files) == 0, 2);
    }

    #[test(framework = @0x1)]
    #[expected_failure(abort_code = file_access::E_ALREADY_SHARED)]
    fun test_duplicate_sharing(framework: &signer) {
        timestamp::set_time_has_started_for_testing(framework);
        
        let owner_addr = @0x123;
        let recipient_addr = @0x456;
        let owner = create_test_user(owner_addr);
        let recipient = create_test_user(recipient_addr);

        let file_id = upload_test_file(&owner, b"test.txt");
        
        // Try to share the same file twice
        file_access::share_file(&owner, file_id, recipient_addr);
        file_access::share_file(&owner, file_id, recipient_addr);
    }

    #[test(framework = @0x1)]
    #[expected_failure(abort_code = file_upload::E_FILE_NOT_FOUND)]
    fun test_unauthorized_sharing(framework: &signer) {
        timestamp::set_time_has_started_for_testing(framework);
        
        let owner_addr = @0x123;
        let unauthorized_addr = @0x456;
        let recipient_addr = @0x789;
        
        let owner = create_test_user(owner_addr);
        let unauthorized_user = create_test_user(unauthorized_addr);
        create_test_user(recipient_addr);

        // Owner uploads a file
        let file_id = upload_test_file(&owner, b"test.txt");
        
        // Try to share owner's file from unauthorized account
        // This should fail because the file doesn't exist in unauthorized user's registry
        file_access::share_file(&unauthorized_user, file_id, recipient_addr);
    }

    // Add a new test for a different unauthorized scenario
    #[test(framework = @0x1)]
    #[expected_failure(abort_code = file_upload::E_FILE_NOT_FOUND)]
    fun test_nonexistent_file_sharing(framework: &signer) {
        timestamp::set_time_has_started_for_testing(framework);
        
        let user_addr = @0x123;
        let recipient_addr = @0x456;
        
        let user = create_test_user(user_addr);
        create_test_user(recipient_addr);

        // Try to share a file that doesn't exist
        file_access::share_file(&user, 999, recipient_addr);
    }

    #[test(framework = @0x1)]
    fun test_multiple_shares(framework: &signer) {
        timestamp::set_time_has_started_for_testing(framework);
        
        let owner_addr = @0x123;
        let recipient1_addr = @0x456;
        let recipient2_addr = @0x789;
        
        let owner = create_test_user(owner_addr);
        let recipient1 = create_test_user(recipient1_addr);
        let recipient2 = create_test_user(recipient2_addr);

        let file_id = upload_test_file(&owner, b"test.txt");
        
        // Share with multiple users
        file_access::share_file(&owner, file_id, recipient1_addr);
        file_access::share_file(&owner, file_id, recipient2_addr);

        // Verify both have access
        assert!(file_access::has_access(recipient1_addr, owner_addr, file_id), 1);
        assert!(file_access::has_access(recipient2_addr, owner_addr, file_id), 2);

        // Verify shared files lists
        let shared_by_owner = file_access::get_shared_by_me(owner_addr);
        assert!(vector::length(&shared_by_owner) == 2, 3);
    }
}