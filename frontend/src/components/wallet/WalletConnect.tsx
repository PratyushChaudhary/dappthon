import { useWallet } from '../../contexts/WalletContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const WalletConnect = () => {
    const { connected, connecting, account, connect, disconnect } = useWallet();
    const navigate = useNavigate();

    const formatAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    const handleConnect = async () => {
        await connect();
        navigate('/file-upload') // Connect the wallet
    };

    const handleDisconnect = () => {
        disconnect(); // Disconnect the wallet
        navigate('/'); // Navigate back to the home route
    };

    useEffect(() => {
        if (connected) {
            console.log("Wallet is connected");
        }
    }, [connected]);

    return (
        <div className="wallet-connect">
            {!connected ? (
                <button 
                    onClick={handleConnect}
                    disabled={connecting}
                    className="connect-button"
                >
                    {connecting ? 'Connecting...' : 'Connect Wallet'}
                </button>
            ) : (
                <div className="wallet-info">
                    <span className="address">
                        {account && formatAddress(account.toString())}
                    </span>
                    <button 
                        onClick={handleDisconnect}
                        className="disconnect-button"
                    >
                        Disconnect
                    </button>
                </div>
            )}
        </div>
    );
};

export default WalletConnect;
