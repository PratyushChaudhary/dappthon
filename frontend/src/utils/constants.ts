export const NETWORK = 'testnet';
export const NODE_URL = 'https://fullnode.devnet.aptoslabs.com';



export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
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
