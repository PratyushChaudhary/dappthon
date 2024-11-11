#[test_only]
module file_sharing::file_upload_tests {
    use std::string;
    use std::signer;
    use std::vector;
    use aptos_framework::account;
    use aptos_framework::timestamp;
    use file_sharing::user;
    use file_sharing::file_upload;

    fun create_test_user(addr: address): signer {
        let user = account::create_account_for_test(addr);
        user::register_user(&user);
        user
    }

    #[test(framework = @0x1)]
    fun test_file_upload_basic(framework: &signer) {
        timestamp::set_time_has_started_for_testing(framework);
        
        let test_addr = @0x123;
        let test_user = create_test_user(test_addr);

        let ipfs_hash = string::utf8(b"QmTest123");
        let file_name = string::utf8(b"test.txt");
        let file_size = 1000;
        let is_encrypted = false;

        file_upload::upload_file(&test_user, ipfs_hash, file_name, file_size, is_encrypted);

        assert!(file_upload::file_exists(test_addr, 1), 1);
        
        // Using the new getter functions
        assert!(file_upload::get_file_owner(test_addr, 1) == test_addr, 2);
        assert!(file_upload::get_file_size(test_addr, 1) == file_size, 3);
        assert!(file_upload::is_file_encrypted(test_addr, 1) == is_encrypted, 4);
    }

    #[test(framework = @0x1)]
    fun test_multiple_file_uploads(framework: &signer) {
        timestamp::set_time_has_started_for_testing(framework);
        
        let test_addr = @0x124;
        let test_user = create_test_user(test_addr);

        let ipfs_hash1 = string::utf8(b"QmTest123");
        let ipfs_hash2 = string::utf8(b"QmTest456");
        
        file_upload::upload_file(
            &test_user, 
            ipfs_hash1, 
            string::utf8(b"file1.txt"), 
            1000, 
            false
        );
        
        file_upload::upload_file(
            &test_user, 
            ipfs_hash2, 
            string::utf8(b"file2.txt"), 
            2000, 
            true
        );

        assert!(file_upload::file_exists(test_addr, 1), 1);
        assert!(file_upload::file_exists(test_addr, 2), 2);

        let user_files = file_upload::get_user_files(test_addr);
        assert!(vector::length(&user_files) == 2, 3);
    }

    #[test(framework = @0x1)]
    fun test_file_removal(framework: &signer) {
        timestamp::set_time_has_started_for_testing(framework);
        
        let test_addr = @0x125;
        let test_user = create_test_user(test_addr);

        file_upload::upload_file(
            &test_user,
            string::utf8(b"QmTest123"),
            string::utf8(b"test.txt"),
            1000,
            false
        );

        assert!(file_upload::file_exists(test_addr, 1), 1);

        file_upload::remove_file(&test_user, 1);

        let user_files = file_upload::get_user_files(test_addr);
        assert!(vector::length(&user_files) == 0, 2);
    }

    #[test(framework = @0x1)]
    #[expected_failure(abort_code = file_upload::E_REGISTRY_NOT_INITIALIZED)]
    fun test_access_nonexistent_file(framework: &signer) {
        timestamp::set_time_has_started_for_testing(framework);
        
        let test_addr = @0x126;
        create_test_user(test_addr);

        // Try to access file from uninitialized registry
        file_upload::get_file_info(test_addr, 1);
    }

    // Add a new test for file not found case
    #[test(framework = @0x1)]
    #[expected_failure(abort_code = file_upload::E_FILE_NOT_FOUND)]
    fun test_access_invalid_file_id(framework: &signer) {
        timestamp::set_time_has_started_for_testing(framework);
        
        let test_addr = @0x127;
        let test_user = create_test_user(test_addr);

        // Initialize registry
        file_upload::initialize_registry(&test_user);

        // Try to access non-existent file ID
        file_upload::get_file_info(test_addr, 1);
    }
}