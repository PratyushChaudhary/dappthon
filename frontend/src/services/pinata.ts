import axios from 'axios';

const PINATA_API_KEY = '95b9ab5560556ea2fdb2';
const PINATA_SECRET_KEY = 'e2e2415ba8599dd897f0f9c4eb773a5589c6b46ef830b3a0da5bce5755f45cf5';

export const uploadToPinata = async (file: File, onProgress?: (progress: number) => void) => {
    try {
        // Create form data
        const formData = new FormData();
        formData.append('file', file);

        // Upload to Pinata
        const response = await axios.post(
            'https://api.pinata.cloud/pinning/pinFileToIPFS',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    pinata_api_key: PINATA_API_KEY,
                    pinata_secret_api_key: PINATA_SECRET_KEY,
                },
                onUploadProgress: (progressEvent) => {
                    if (onProgress && progressEvent.total) {
                        const percentage = (progressEvent.loaded * 100) / progressEvent.total;
                        onProgress(Math.round(percentage));
                    }
                },
            }
        );

        return response.data.IpfsHash;
    } catch (error) {
        console.error('Error uploading to Pinata:', error);
        throw error;
    }
};