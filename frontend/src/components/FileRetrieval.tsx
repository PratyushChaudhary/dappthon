import { useState } from 'react';
import { decryptFile } from '../services/encryption';
import { toast, Toaster } from 'react-hot-toast';

const FileRetrieval = () => {
    const [ipfsHash, setIpfsHash] = useState('');
    const [password, setPassword] = useState('');
    const [downloading, setDownloading] = useState(false);

    const handleDownload = async () => {
        if (!ipfsHash || !password) {
            toast.error('Please enter both IPFS hash and decryption password', { position: 'top-center' });
            return;
        }

        try {
            setDownloading(true);

            // Construct the IPFS URL properly
            const url = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
            console.log('Fetching from:', url);
            
            // Fetch encrypted file from IPFS
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch encrypted file');
            }
            const encryptedData = await response.text();

            // Decrypt the file
            const decryptedData = decryptFile(encryptedData, password);
            
            // Extract the actual file data from base64
            const [, base64Data] = decryptedData.split(',');
            const binaryData = atob(base64Data);
            
            // Create blob and download
            const blob = new Blob([new Uint8Array([...binaryData].map(char => char.charCodeAt(0)))]);
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = 'decrypted-file'; // String should be in quotes
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            window.URL.revokeObjectURL(downloadUrl);
            toast.success('Download and decryption successful!', { position: 'top-center' });
        } catch (error) {
            console.error('Download/Decryption failed:', error);
            toast.error('Failed to download or decrypt file. Please check your password or IPFS hash.', { position: 'top-center' });
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-richblack-800 -mt-6">
            <div className="w-4/5 max-w-3xl p-6 bg-richblack-700 rounded-lg shadow-lg space-y-6">
                <Toaster />
                <h2 className="text-lg font-semibold text-richblack-5">Download & Decrypt File</h2>
                <div className="flex flex-col space-y-4 max-w-[90%] mx-auto">
                    <input
                        type="text"
                        placeholder="Enter IPFS Hash"
                        value={ipfsHash}
                        onChange={(e) => setIpfsHash(e.target.value)}
                        className="p-2 rounded-md border-2 border-richblack-500 text-richblack-900 placeholder:text-richblack-400"
                    />
                    
                    <input
                        type="password"
                        placeholder="Enter decryption password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-2 rounded-md border-2 border-richblack-500 text-richblack-900 placeholder:text-richblack-400"
                    />

                    <button
                        onClick={handleDownload}
                        disabled={!ipfsHash || !password || downloading}
                        className={`mt-4 py-2 px-6 rounded-md cursor-pointer w-[40%] mx-auto 
                            ${downloading ? 'bg-gray-400' : 'bg-cyan-50 text-richblack-900'} 
                            ${(!ipfsHash || !password) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {downloading ? 'Downloading & Decrypting...' : 'Download & Decrypt File'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FileRetrieval;