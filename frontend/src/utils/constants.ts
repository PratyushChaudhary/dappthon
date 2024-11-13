export const NETWORK = 'devnet';
export const NODE_URL = 'https://fullnode.devnet.aptoslabs.com';

export const CONTRACT_ADDRESS = '0xa894208f06210148c69e4ede1cc5e6db79d10d56d4ea128ffacbb7ec442d9f50'; // Replace with your contract address
export const MODULE_NAME = 'file_sharing';

export const MODULES = {
    USER: 'user',
    FILE_UPLOAD: 'file_upload',
    FILE_ACCESS: 'file_access'
};

export const FUNCTIONS = {
    REGISTER_USER: 'register_user',
    UPLOAD_FILE: 'upload_file',
    SHARE_FILE: 'share_file',
    REVOKE_ACCESS: 'revoke_access'
};

export const ERRORS = {
    WALLET_NOT_CONNECTED: 'Wallet not connected',
    USER_REJECTED: 'User rejected the transaction',
    TRANSACTION_FAILED: 'Transaction failed'
};