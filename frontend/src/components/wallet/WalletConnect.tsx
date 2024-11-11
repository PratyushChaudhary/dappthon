// src/components/wallet/WalletConnect.tsx
import { useWallet } from '../../contexts/WalletContext';

const WalletConnect = () => {
    const { connected, connecting, account, connect, disconnect } = useWallet();

    const formatAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    return (
        <div className="wallet-connect">
            {!connected ? (
                <button 
                    onClick={connect}
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
                        onClick={disconnect}
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