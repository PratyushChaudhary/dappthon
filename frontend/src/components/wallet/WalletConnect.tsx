import { useWallet } from '../../contexts/WalletContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const WalletConnect = () => {
    const { connected, connecting, account, connect, disconnect } = useWallet();
    const navigate = useNavigate();
    const location = useLocation(); // Access the current path

    const formatAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    const handleConnect = async () => {
        await connect();
        navigate('/file-upload');
    };

    const handleDisconnect = () => {
        disconnect();
        navigate('/');
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
                    className="connect-button bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
                >
                    {connecting ? 'Connecting...' : 'Connect Wallet'}
                </button>
            ) : (
                <div className="wallet-info flex items-center space-x-2">
                    <div className="relative group">
                        <button 
                            className="address bg-gray-100 text-gray-800 py-2 px-4 rounded hover:bg-gray-200"
                            onClick={() => {
                                location.pathname === "/file-upload"
                                    ? navigate("/")
                                    : navigate("/file-upload");
                            }}
                        >
                            {account && formatAddress(account.toString())}
                        </button>
                        {/* Dynamic Tooltip */}
                        <span className="absolute left-1/2 transform -translate-x-1/2 mb-1 hidden text-xs bg-black text-white py-1 px-2 rounded opacity-0 group-hover:opacity-100 group-hover:block transition-opacity duration-300">
                            {location.pathname === "/file-upload" ? "Go to homepage" : "Go to file uploader"}
                        </span>
                    </div>
                    <button 
                        onClick={handleDisconnect}
                        className="disconnect-button bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                    >
                        Disconnect
                    </button>
                </div>
            )}
        </div>
    );
};

export default WalletConnect;
