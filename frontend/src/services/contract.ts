import { Types, AptosClient } from 'aptos';
import { PetraWallet } from 'petra-plugin-wallet-adapter';

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
const NODE_URL = 'https://fullnode.testnet.aptoslabs.com/v1';

const client = new AptosClient(NODE_URL);


export const isUserRegistered = async (wallet: PetraWallet, userAddress: string): Promise<boolean> => {
    try {

        const payload = {
            function: `${CONTRACT_ADDRESS}::user::is_user_registered`,
            type_arguments: [],
            arguments: [userAddress]
        };

        const response = await client.view(payload);
        return response[0] as boolean;
    } catch (error) {
        console.error('Error checking user registration:', error);
        return false;
    }
};


export const registerUser = async (wallet: PetraWallet) => {
    if (!wallet) throw new Error('Wallet not connected');

    const payload: Types.TransactionPayload = {
        type: 'entry_function_payload',
        function: `${CONTRACT_ADDRESS}::user::register_user`,
        type_arguments: [],
        arguments: []
    };

    try {
        console.log('Submitting registration transaction...');
        const response = await wallet.signAndSubmitTransaction(payload);
        console.log('Registration transaction submitted:', response.hash);
        

        await client.waitForTransaction(response.hash);
        console.log('Registration transaction confirmed');
        
        return response.hash;
    } catch (error) {
        console.error('Registration failed:', error);
        throw error;
    }
};


export const uploadFileMetadata = async (
    wallet: PetraWallet,
    ipfsHash: string,
    fileName: string,
    fileSize: number,
    isEncrypted: boolean
) => {
    if (!wallet) throw new Error('Wallet not connected');

    const payload: Types.TransactionPayload = {
        type: 'entry_function_payload',
        function: `${CONTRACT_ADDRESS}::file_upload::upload_file`,
        type_arguments: [],
        arguments: [ipfsHash, fileName, fileSize, isEncrypted]
    };

    try {
        console.log('Submitting upload transaction...');
        const response = await wallet.signAndSubmitTransaction(payload);
        console.log('Upload transaction submitted:', response.hash);
        
        
        await client.waitForTransaction(response.hash);
        console.log('Upload transaction confirmed');
        
        return response.hash;
    } catch (error) {
        console.error('File upload failed:', error);
        throw error;
    }
};