
import { Navigate } from 'react-router-dom';

interface ProtectedProps {
    isauthenticate: boolean;
    children: any;
}

const Protected: React.FC<ProtectedProps> = ({ isauthenticate, children }) => {
    if (!isauthenticate) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default Protected;
