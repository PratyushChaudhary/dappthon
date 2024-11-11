// src/contexts/WalletContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { Types } from 'aptos';
import { NETWORK } from '../utils/constants';

interface WalletContextType {
    wallet: PetraWallet | null;
    account: Types.AccountAddress | null;
    connected: boolean;
    connecting: boolean;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
    const [wallet, setWallet] = useState<PetraWallet | null>(null);
    const [account, setAccount] = useState<Types.AccountAddress | null>(null);
    const [connected, setConnected] = useState(false);
    const [connecting, setConnecting] = useState(false);

    useEffect(() => {
        const initWallet = async () => {
            const petra = new PetraWallet();
            setWallet(petra);

            // Check if already connected
            try {
                // Get current account instead of checking isConnected
                const acc = await petra.account();
                if (acc) {
                    setAccount(acc.address);
                    setConnected(true);
                }
            } catch (error) {
                // If there's an error, it means we're not connected
                console.log('Wallet not connected yet');
            }
        };

        initWallet();
    }, []);

    const connect = async () => {
        if (!wallet) return;
        
        try {
            setConnecting(true);
            await wallet.connect();
            const acc = await wallet.account();
            setAccount(acc.address);
            setConnected(true);
        } catch (error) {
            console.error('Connection error:', error);
            throw error;
        } finally {
            setConnecting(false);
        }
    };

    const disconnect = async () => {
        if (!wallet) return;
        
        try {
            await wallet.disconnect();
            setAccount(null);
            setConnected(false);
        } catch (error) {
            console.error('Disconnection error:', error);
            throw error;
        }
    };

    return (
        <WalletContext.Provider 
            value={{
                wallet,
                account,
                connected,
                connecting,
                connect,
                disconnect
            }}
        >
            {children}
        </WalletContext.Provider>
    );
}

export function useWallet() {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
}