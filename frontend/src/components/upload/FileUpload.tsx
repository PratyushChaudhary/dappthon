// src/components/upload/FileUpload.tsx
import { useState } from 'react';
import { useWallet } from '../../contexts/WalletContext';
import { uploadToPinata } from '../../services/pinata';
import { encryptFile } from '../../services/encryption';

const FileUpload = () => {
    const { connected } = useWallet();
    const [file, setFile] = useState<File | null>(null);
    const [password, setPassword] = useState('');
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [ipfsHash, setIpfsHash] = useState('');

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (!connected) {
            alert('Please connect your wallet first');
            return;
        }

        if (!file || !password) {
            alert('Please select a file and enter an encryption password');
            return;
        }

        try {
            setUploading(true);
            setProgress(0);

            // Encrypt file
            const encrypted = await encryptFile(file, password);

            // Create a new file with encrypted data
            const encryptedBlob = new Blob([encrypted.encryptedData], { type: 'text/plain' });
            const encryptedFile = new File([encryptedBlob], file.name + '.encrypted');

            // Upload encrypted file to Pinata
            const hash = await uploadToPinata(encryptedFile, (progress) => {
                setProgress(progress);
            });

            setIpfsHash(hash);
            console.log('Encrypted file uploaded to IPFS with hash:', hash);
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Failed to upload file');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="file-upload">
            <h2>Upload Encrypted File</h2>
            
            <input 
                type="file"
                onChange={handleFileSelect}
                disabled={uploading}
            />
            
            <input
                type="password"
                placeholder="Enter encryption password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="password-input"
            />
            
            {file && (
                <div className="file-info">
                    <p>Selected file: {file.name}</p>
                    <p>Size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
            )}

            {uploading && (
                <div className="progress-container">
                    <div className="progress-bar">
                        <div 
                            className="progress"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <span>{progress}%</span>
                </div>
            )}

            {ipfsHash && (
                <div className="upload-success">
                    <p>File uploaded successfully!</p>
                    <p>IPFS Hash: {ipfsHash}</p>
                    <p className="warning">
                        Save your password! You'll need it to decrypt the file.
                    </p>
                </div>
            )}

            <button 
                onClick={handleUpload}
                disabled={!file || !password || uploading || !connected}
                className="upload-button"
            >
                {uploading ? 'Uploading...' : 'Upload & Encrypt File'}
            </button>
        </div>
    );
};

export default FileUpload;