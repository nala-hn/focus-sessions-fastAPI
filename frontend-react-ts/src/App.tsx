import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FocusPage from './pages/FocusPage';
import LoginPage from './pages/LoginPage';

const PrivateRoute = ({ children }: { children: React.ReactNode  }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <FocusPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
