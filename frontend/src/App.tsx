// src/App.tsx
import { WalletProvider } from './contexts/WalletContext';
import WalletConnect from './components/wallet/WalletConnect';

function App() {
    return (
        <WalletProvider>
            <div className="App">
                <header className="app-header">
                    <WalletConnect />
                </header>
                {/* Other components will go here */}
            </div>
        </WalletProvider>
    );
}

export default App;