import { WalletProvider } from './contexts/WalletContext';
import WalletConnect from './components/wallet/WalletConnect';
import FileUpload from './components/upload/FileUpload';
import FileRetrieval from './components/FileRetrieval';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import About from './pages/About';
import ContactUs from './pages/Contact';
function App() {
  return (
    
      <WalletProvider >
        <div className='bg-richblack-900 w-full h-full'>
          <Navbar />
          <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/wallet-connect" element={<WalletConnect />} />
                <Route path="/about" element={<About />} />

                {/* Protect the file-upload route */}
                <Route 
                    path="/file-upload"
                    element={
                            <FileUpload />
                    } 
                />
                <Route 
                    path="/contact"
                    element={
                            <ContactUs />
                    } 
                />
                <Route 
                    path="/download" 
                    element={
                            <FileRetrieval />
                    } 
                />
            </Routes>
            <Footer/>
        </div>
      </WalletProvider>
    
  );
}

export default App;
