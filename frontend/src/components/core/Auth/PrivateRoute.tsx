import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useWallet } from '../../../contexts/WalletContext';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { connected } = useWallet();  
    if (connected) {
    return <>{children}</>;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
