import { WalletProvider } from './contexts/WalletContext';
import WalletConnect from './components/wallet/WalletConnect';
import FileUpload from './components/upload/FileUpload';
import FileRetrieval from './components/FileRetrieval';

function App() {
    return (
        <div className='bg-richblack-900 min-w-full min-h-full'>
        <WalletProvider >
            <div className="App">
                <header>
                    <WalletConnect />
                </header>
                <div className=' text-teal-600'>
                    amanpandey
                </div>
                {/* Other components will go here */}
                <main>
                    <FileUpload />
                    <FileRetrieval />
                </main>
            </div>
        </WalletProvider>
        </div>

    );
}

export default App;