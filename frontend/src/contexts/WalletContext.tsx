import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Types } from 'aptos';
import { PetraWallet } from 'petra-plugin-wallet-adapter';
import { isUserRegistered, registerUser } from '../services/contract';

interface WalletContextType {
  wallet: PetraWallet | null;
  account: Types.Address | null;
  connected: boolean;
  connecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<PetraWallet | null>(null);
  const [account, setAccount] = useState<Types.Address | null>(null);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    const initWallet = async () => {
      const petra = new PetraWallet();
      setWallet(petra);
      try {
        const acc = await petra.account();
        if (acc) {
          setAccount(acc.address);
          setConnected(true);
          // Check if the user is registered
          const isRegistered = await isUserRegistered(petra, acc.address);
          if (!isRegistered) {
            // Register the user
            await registerUser(petra, acc.address);
            console.log('User registered successfully');
          }
        }
      } catch (error) {
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
    if (acc) {
      setAccount(acc.address);
      setConnected(true);
      // Check if the user is registered
      const isRegistered = await isUserRegistered(wallet, acc.address);
      if (!isRegistered) {
        // Register the user
        await registerUser(wallet, acc);
        console.log('User registered successfully');
      }
    }
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
        disconnect,
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