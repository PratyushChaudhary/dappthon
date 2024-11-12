import { useState } from 'react';
import { useWallet } from '../../contexts/WalletContext';
import { uploadToPinata } from '../../services/pinata';

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

    const handleUpload = async () => {
        if (!connected) {
            alert('Please connect your wallet first');
            return;
        }

        if (!file) {
            alert('Please select a file first');
            return;
        }

        try {
            setUploading(true);
            setProgress(0);

            const hash = await uploadToPinata(file, (progress) => {
                setProgress(progress);
            });

            setIpfsHash(hash);
            console.log('File uploaded to IPFS with hash:', hash);
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Failed to upload file');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="file-upload">
            <h2>Upload File</h2>
            
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
                    <a 
                        href={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`} 
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View File
                    </a>
                </div>
            )}

            <button 
                onClick={handleUpload}
                disabled={!file || uploading || !connected}
                className="upload-button"
            >
                {uploading ? 'Uploading...' : 'Upload File'}
            </button>
        </div>
    );
};

export default FileUpload;