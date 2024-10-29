import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Target } from 'lucide-react';
import AuthForm from '../components/AuthForm';
import { login, signup } from '../api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login: loginContext } = useAuth();
  const isLogin = location.pathname === '/login';

  const handleSubmit = async (data) => {
    try {
      const response = isLogin
        ? await login(data.email, data.password)
        : await signup(data.username, data.email, data.password);

      loginContext(response.token);
      toast.success(`Successfully ${isLogin ? 'logged in' : 'signed up'}!`);
      navigate('/dashboard');
    } catch (error) {
      toast.error(
        `Failed to ${isLogin ? 'log in' : 'sign up'}. Please try again.`
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Target className="h-12 w-12 text-indigo-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isLogin ? 'Sign in to your account' : 'Create a new account'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <a
            href={isLogin ? '/signup' : '/login'}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <AuthForm isLogin={isLogin} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}