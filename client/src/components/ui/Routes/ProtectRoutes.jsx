import { useAuth } from '../../../contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRole = null, allowedRoles = [] }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) return <div>Loading...</div>;

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const hasRequiredRole = () => {
        if (!requiredRole && allowedRoles.length === 0) return true;
        if (requiredRole) return user?.role === requiredRole;
        if (allowedRoles.length > 0) return allowedRoles.includes(user?.role);
        return false;
    };

    if (!hasRequiredRole()) {
        return <div>Access Denied: You do not have permission to view this page.</div>;
    }

    return children;
};

export default ProtectedRoute;
