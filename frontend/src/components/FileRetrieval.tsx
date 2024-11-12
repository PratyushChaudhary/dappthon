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
            const url = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
            const response = await fetch(url);
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
        <div className="file-retrieval">
            <h2>Download & Decrypt File</h2>
            
            <input
                type="text"
                placeholder="Enter IPFS Hash"
                value={ipfsHash}
                onChange={(e) => setIpfsHash(e.target.value)}
            />
            
            <input
                type="password"
                placeholder="Enter decryption password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="password-input"
            />
            
            <button
                onClick={handleDownload}
                disabled={!ipfsHash || !password || downloading}
            >
                {downloading ? 'Downloading & Decrypting...' : 'Download & Decrypt File'}
            </button>
        </div>
    );
};

export default FileRetrieval;