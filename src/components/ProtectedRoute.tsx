import { Navigate, Outlet } from 'react-router'
import { useIsAuthenticated } from '../store/authStore'

const ProtectedRoute = () => {
  const isAuthenticated = useIsAuthenticated()

  // If the user is authenticated, render the nested routes (children via Outlet).
  // Otherwise, redirect them to the login page.
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute
