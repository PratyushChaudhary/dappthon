// src/components/upload/FileUpload.tsx
import { useState } from 'react';
import { useWallet } from '../../contexts/WalletContext';
import { create } from 'ipfs-http-client';

// Configure IPFS client
const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

const FileUpload = () => {
    const { connected } = useWallet();
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [ipfsHash, setIpfsHash] = useState('');

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const uploadToIPFS = async () => {
        if (!file) return;

        try {
            setUploading(true);
            setProgress(0);

            // Upload to IPFS
            const added = await ipfs.add(file, {
                progress: (prog) => {
                    const percentage = (prog / file.size) * 100;
                    setProgress(Math.round(percentage));
                }
            });

            setIpfsHash(added.path);
            return added.path;
        } catch (error) {
            console.error('Error uploading to IPFS:', error);
            throw error;
        } finally {
            setUploading(false);
        }
    };

    const handleUpload = async () => {
        if (!connected) {
            alert('Please connect your wallet first');
            return;
        }

        try {
            const hash = await uploadToIPFS();
            // Here we'll later add the contract interaction to store the file metadata
            console.log('File uploaded to IPFS with hash:', hash);
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    return (
        <div className="file-upload">
            <input 
                type="file"
                onChange={handleFileSelect}
                disabled={uploading}
            />
            
            {file && (
                <div className="file-info">
                    <p>Selected file: {file.name}</p>
                    <p>Size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
            )}

            {uploading && (
                <div className="progress-bar">
                    <div 
                        className="progress"
                        style={{ width: `${progress}%` }}
                    />
                    <span>{progress}%</span>
                </div>
            )}

            {ipfsHash && (
                <div className="upload-success">
                    <p>File uploaded successfully!</p>
                    <p>IPFS Hash: {ipfsHash}</p>
                </div>
            )}

            <button 
                onClick={handleUpload}
                disabled={!file || uploading || !connected}
            >
                {uploading ? 'Uploading...' : 'Upload File'}
            </button>
        </div>
    );
};

export default FileUpload;