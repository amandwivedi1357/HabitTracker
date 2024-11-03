import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import HabitDetail from './pages/HabitDetail';
import Auth from './pages/Auth';
import AddHabit from './pages/AddHabit';
import { PrivateRoute } from './components/PrivateRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route path="/signup" element={<Auth />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/habits/:id"
        element={
          <PrivateRoute>
            <HabitDetail />
          </PrivateRoute>
        }
      />
      <Route
        path="/add-habit"
        element={
          <PrivateRoute>
            <AddHabit />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes; 