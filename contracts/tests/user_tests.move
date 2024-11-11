#[test_only]
module file_sharing::user_tests {    // Changed from user to user_tests
    use std::signer;
    use std::vector;
    use aptos_framework::account;
    use aptos_framework::timestamp;
    use file_sharing::user;          // Now we can use the user module

    #[test(framework = @0x1)]
    fun test_user_registration(framework: &signer) {
        // Set up test environment
        let test_user = account::create_account_for_test(@0x123);
        timestamp::set_time_has_started_for_testing(framework);

        // Test registration
        user::register_user(&test_user);
        
        // Verify registration
        assert!(user::is_user_registered(@0x123), 0);
        assert!(user::get_file_count(@0x123) == 0, 1);
    }

    #[test(framework = @0x1)]
    #[expected_failure(abort_code = user::E_USER_ALREADY_EXISTS)]
    fun test_duplicate_registration(framework: &signer) {
        // Set up test environment
        let test_user = account::create_account_for_test(@0x123);
        timestamp::set_time_has_started_for_testing(framework);

        // Try to register same user twice
        user::register_user(&test_user);
        user::register_user(&test_user);
    }

    #[test(framework = @0x1)]
    fun test_file_count_and_management(framework: &signer) {
        // Set up test environment
        let test_user = account::create_account_for_test(@0x123);
        timestamp::set_time_has_started_for_testing(framework);

        // Register user
        user::register_user(&test_user);
        
        // Initial assertions
        assert!(user::get_file_count(@0x123) == 0, 1);
        
        let uploaded_files = user::get_uploaded_files(@0x123);
        let shared_files = user::get_shared_files(@0x123);
        
        assert!(vector::length(&uploaded_files) == 0, 2);
        assert!(vector::length(&shared_files) == 0, 3);
    }
}