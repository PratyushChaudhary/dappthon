// src/components/FileRetrieval.tsx
import { useState } from 'react';
import { decryptFile } from '../services/encryption';

const FileRetrieval = () => {
    const [ipfsHash, setIpfsHash] = useState('');
    const [password, setPassword] = useState('');
    const [downloading, setDownloading] = useState(false);

    const handleDownload = async () => {
        if (!ipfsHash || !password) {
            alert('Please enter IPFS hash and decryption password');
            return;
        }

        try {
            setDownloading(true);
            
            // Fetch encrypted file from IPFS
            const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // CORS proxy
            const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
            const url = `${proxyUrl}${ipfsUrl}`;
            const response = await fetch(url);
            const encryptedData = await response.text();
            console.log(url);
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
            link.download = `decrypted-file`; // You can store original filename in metadata
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error('Download/Decryption failed:', error);
            alert('Failed to download or decrypt file. Please check your password.');
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-4/5 max-w-3xl p-6 bg-white rounded-lg shadow-lg space-y-6">
                <h2 className="text-lg font-semibold text-richblack-5">Download & Decrypt File</h2>
                
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
                    className="mt-4 bg-cyan-50 text-richblack-900 py-2 px-6 rounded-md disabled:bg-richblack-300"
                >
                    {downloading ? 'Downloading & Decrypting...' : 'Download & Decrypt File'}
                </button>
            </div>
        </div>
    );
};

export default FileRetrieval;
