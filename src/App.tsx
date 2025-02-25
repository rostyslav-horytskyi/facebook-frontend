import { Routes, Route } from 'react-router-dom';
import { Login } from './components/Login/Login';
import { Home } from './components/Home/Home';
import Activate from './components/Activate/Activate';
import { ProtectedRoute } from './components/ProtectedRoute';
import ResetPassword from './components/ResetPassword/ResetPassword';

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/activate/:token"
          element={
            <ProtectedRoute>
              <Activate />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
