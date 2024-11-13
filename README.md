# Decentralized File Sharing System

A blockchain-based decentralized file sharing system built on Aptos blockchain that allows users to securely upload, encrypt, and share files with granular access control.

## Project Overview

This project implements a decentralized file sharing system where users can:
- Upload files with client-side encryption
- Store files on IPFS with Pinata
- Manage file access through smart contracts
- Share files with specific users
- Download and decrypt shared files

### Architecture Flow

The system follows these primary workflows:

1. **File Upload Flow**:



![File_Upload](https://github.com/user-attachments/assets/bdad31ee-de8e-4c45-9526-ec4d6e5a0c48)



2. **File Retrieval**:



![File_Retrieval](https://github.com/user-attachments/assets/1e557712-68a9-49bd-b2cc-deae094451c9)



## Technologies Used
### Blockchain & Smart Contracts

- Aptos Blockchain
- Move Programming Language
- Aptos SDK

### Frontend

- React.js with TypeScript
- Petra Wallet Integration
- crypto-js for encryption

### Storage

- IPFS (InterPlanetary File System)
- Pinata IPFS Pinning Service

### Development Tools

- Vite
- Node.js
- npm

## Features

- 🔐 Client-side AES encryption
- 📁 Decentralized file storage on IPFS
- 🔗 Blockchain-based access control
- 👥 User-to-user file sharing
- 🎯 Granular access management
- 📱 Responsive web interface

## Getting Started
- Node.js (v14 or later)
- npm
- Aptos CLI
- Petra Wallet Browser Extension

### Installation

1. Clone the repository
```
git clone https://github.com/PratyushChaudhary/dappthon.git
cd dappthon
```

2. Install dependencies for both backend and frontend
```
# Install Move dependencies
cd backend
aptos init
aptos init —network testnet

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables
```
VITE_PINATA_API_KEY=your_pinata_api_key
VITE_PINATA_SECRET_KEY=your_pinata_secret_key
VITE_CONTRACT_ADDRESS=your_contract_address
```

### Configuration

- Update addresses under Move.toml with your deployed contract address
- Update the contract address in src/utils/constants.ts with your deployed contract address
- Configure Pinata API keys in your environment variables
- Make sure your Petra wallet is connected to the correct network (testnet/mainnet)


4. Deploy smart contracts
```
cd backend
aptos move publish
```

5. Start the frontend application
```
cd frontend
npm run dev
```

### Smart Contract Structure
```
backend/
├── sources/
│   ├── user.move         (User management)
│   ├── file_upload.move  (File metadata storage)
│   └── file_access.move  (Access control)
```

### Frontend Structure
```
frontend/
├── src/
│   ├── components/
│   ├── contexts/
│   ├── services/
│   ├── hooks/
│   └── utils/
```

### Usage

1. Connect Wallet

- Click "Connect Wallet" button
- Approve connection in Petra wallet


2. Upload File

- Select file
- Enter encryption password
- Click "Upload & Encrypt"
- Save the IPFS hash and password


3. Share File

- Enter recipient's address
- Confirm transaction in wallet


4. Download File

- Enter IPFS hash
- Provide decryption password
- Click "Download & Decrypt"

## Extended Use Cases

Our decentralized file sharing system has numerous potential applications across various sectors:

### 1. Government Certificate Authentication
- Prevents certificate fraud through public verification
- Stores certificates with location and recipient data
- Enables mass verification through public ledger
- Quick fraud detection and reporting
- Creates transparent certificate ecosystem

### 2. Secure Cybercafe Operations
- Time-bound file sharing capabilities
- Automatic access revocation
- Mandatory directory cleanup protocols
- Prevents unauthorized data retention
- Enhanced user privacy protection

### 3. Healthcare Record Management
- Secure patient record sharing
- Controlled access for healthcare providers
- Complete audit trail of access
- Patient-controlled data sharing
- Compliance with healthcare regulations
- Emergency access protocols

### 4. Educational Institution Management
- Secure transcript and certificate distribution
- Real-time verification system
- Research paper sharing platform
- Student record management
- Cross-institution collaboration
- Alumni document access

### 5. Legal Document Handling
- Secure contract sharing
- Version control with timestamps
- Multi-party access control
- Compliance audit trails
- Court document management
- Client-attorney privileged sharing

### 6. Corporate Data Management
- Secure document sharing
- Employee record management
- Project documentation
- Board meeting materials
- Shareholder documents
- Inter-department file sharing

### 7. Research Collaboration
- Secure data sharing
- Version control
- Access management
- Citation tracking
- Research output protection
- Cross-institution collaboration

### 8. Media and Entertainment
- Digital rights management
- Content distribution
- Access control for premium content
- Proof of ownership
- Revenue sharing management

### 9. Real Estate
- Property documentation
- Title deed management
- Rental agreements
- Property inspection reports
- Buyer-seller document exchange

### 10. Supply Chain Management
- Certificate of origin
- Quality inspection documents
- Shipping documentation
- Customs clearance
- Product authenticity verification

### Security Considerations

- All files are encrypted client-side before uploading
- Encryption keys never leave the user's browser
- Smart contract handles access control
- Wallet signatures required for all transactions

## Acknowledgments

I would like to express my sincere gratitude to my teammate Aman Pandey for their valuable contributions to this project.
