// ProtectedRoute.tsx
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useWallet } from '../../../contexts/WalletContext';


interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { connected } = useWallet();

    // If the user is not connected, navigate to the home page.
    if (!connected) {
        return <Navigate to="/" replace />;
    }

    // If connected, render the children components (protected route content).
    return <>{children}</>;
};

export default ProtectedRoute;
