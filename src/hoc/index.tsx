import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';
import React from 'react';

interface WrapIsAuthenticatedProps {
    Page: React.ComponentType;
}

const WrapIsAuthenticated: React.FC<WrapIsAuthenticatedProps> = ({ Page }) => {
    const [cookies] = useCookies(['token']);
    if (!cookies.token) {
        return <Navigate to="/login" replace />;
    } else {
        return <Page />;
    }
};

export default WrapIsAuthenticated;