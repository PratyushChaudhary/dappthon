import { WalletProvider } from './contexts/WalletContext';
import WalletConnect from './components/wallet/WalletConnect';
import FileUpload from './components/upload/FileUpload';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/common/Navbar';
import ProtectedRoute from './components/core/Auth/PrivateRoute';
function App() {
  return (
    
      <WalletProvider>
        <div>
          <Navbar />
          <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/wallet-connect" element={<WalletConnect />} />
                {/* Protect the file-upload route */}
                <Route 
                    path="/file-upload" 
                    element={
                        
                            <FileUpload />
                    
                    } 
                />
            </Routes>
        </div>
      </WalletProvider>
    
  );
}

export default App;
