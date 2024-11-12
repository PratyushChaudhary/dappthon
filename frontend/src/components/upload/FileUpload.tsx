import { useState } from 'react';
import { useWallet } from '../../contexts/WalletContext';
import { uploadToPinata } from '../../services/pinata';
import { encryptFile } from '../../services/encryption';
import { FiUploadCloud } from 'react-icons/fi';
import { useDropzone } from 'react-dropzone';

const FileUpload = () => {
    const { connected } = useWallet();
    const [file, setFile] = useState<File | null>(null);
    const [password, setPassword] = useState('');
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [ipfsHash, setIpfsHash] = useState('');

    // Setup dropzone hooks for file drop
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            setFile(acceptedFiles[0]);
        },
        multiple: false,  // Allow only one file
    });

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
        <div className="flex flex-col space-y-4">
            <h2 className="text-lg font-semibold text-richblack-5">Upload Encrypted File</h2>

            <div
                {...getRootProps()}
                className={`${
                    uploading ? 'bg-richblack-600' : 'bg-richblack-700'
                } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
            >
                <input {...getInputProps()} disabled={uploading} className="hidden" />
                {!file ? (
                    <div className="flex flex-col items-center p-6">
                        <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
                            <FiUploadCloud className="text-2xl text-cyan-50" />
                        </div>
                        <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
                            Drag and drop a file, or click to browse
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center p-6">
                        <p className="text-sm text-richblack-200">Selected file: {file.name}</p>
                        <p className="text-xs text-richblack-300">
                            Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                        <button
                            onClick={() => {
                                setFile(null);
                                setProgress(0);
                                setIpfsHash('');
                            }}
                            className="mt-3 text-richblack-400 underline"
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>

            <input
                type="password"
                placeholder="Enter encryption password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-4 p-2 rounded-md border-2 border-richblack-500 text-richblack-900 placeholder:text-richblack-400"
            />

            {uploading && (
                <div className="progress-container mt-4">
                    <div className="progress-bar">
                        <div
                            className="progress bg-cyan-50"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <span className="text-xs text-richblack-200">{progress}%</span>
                </div>
            )}

            {ipfsHash && (
                <div className="mt-4 text-center">
                    <p className="text-sm font-semibold text-green-500">File uploaded successfully!</p>
                    <p className="text-xs text-richblack-300">IPFS Hash: {ipfsHash}</p>
                    <p className="mt-2 text-xs text-pink-200">
                        Save your password! You'll need it to decrypt the file.
                    </p>
                </div>
            )}

            <button 
                onClick={handleUpload}
                disabled={!file || !password || uploading || !connected}
                className="mt-4 bg-cyan-50 text-richblack-900 py-2 px-6 rounded-md disabled:bg-richblack-300"
            >
                {uploading ? 'Uploading...' : 'Upload & Encrypt File'}
            </button>
        </div>
    );
};

export default FileUpload;
