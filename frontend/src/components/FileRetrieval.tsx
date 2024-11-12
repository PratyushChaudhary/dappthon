// src/components/FileRetrieval.tsx
import { useState } from 'react';

const FileRetrieval = () => {
    const [ipfsHash, setIpfsHash] = useState('');
    const [downloading, setDownloading] = useState(false);

    const handleDownload = async () => {
        if (!ipfsHash) return;

        try {
            setDownloading(true);
            
            // Construct IPFS gateway URL
            const url = `https://ipfs.io/ipfs/${ipfsHash}`;
            
            // Fetch the file
            const response = await fetch(url);
            const blob = await response.blob();
            
            // Create download link
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `file-${ipfsHash}`; // You can set custom filename
            
            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Cleanup
            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error('Download failed:', error);
            alert('Failed to download file');
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div className="file-retrieval">
            <input
                type="text"
                placeholder="Enter IPFS Hash"
                value={ipfsHash}
                onChange={(e) => setIpfsHash(e.target.value)}
            />
            
            <button
                onClick={handleDownload}
                disabled={!ipfsHash || downloading}
            >
                {downloading ? 'Downloading...' : 'Download File'}
            </button>
        </div>
    );
};

export default FileRetrieval;