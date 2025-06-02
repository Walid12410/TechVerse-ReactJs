import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ children }) {
  const auth = useSelector(state => state.auth.auth);

  if (!auth) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

export default PrivateRoute;