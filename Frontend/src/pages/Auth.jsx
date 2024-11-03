import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Target, Loader2, Mail, Lock, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { login, signup } from '../api';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { toast } from 'react-hot-toast';

// Form validation schema
const schema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').optional(),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login: loginContext } = useAuth();
  const { theme } = useTheme();
  const isLogin = location.pathname === '/login';
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange'
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = isLogin
        ? await login(data.email, data.password)
        : await signup(data.username, data.email, data.password);

      loginContext(response.token);
      toast.success(`Successfully ${isLogin ? 'logged in' : 'signed up'}!`);
      navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        if (errorMessage.includes('already exists')) {
          setError('email', { type: 'manual', message: 'Email already in use' });
        } else if (errorMessage.includes('incorrect password')) {
          setError('password', { type: 'manual', message: 'Incorrect password' });
        } else {
          toast.error(errorMessage);
        }
      } else {
        toast.error(`Failed to ${isLogin ? 'log in' : 'sign up'}. Please try again.`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700' 
        : 'bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100'
    }`}>
     
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob ${
          theme === 'dark' ? 'bg-indigo-900' : 'bg-indigo-300'
        }`}></div>
        <div className={`absolute top-1/3 right-1/4 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 ${
          theme === 'dark' ? 'bg-purple-900' : 'bg-purple-300'
        }`}></div>
        <div className={`absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 ${
          theme === 'dark' ? 'bg-pink-900' : 'bg-pink-300'
        }`}></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
        <motion.div
          className="flex justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className={`p-2 rounded-full shadow-lg ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <Target className="h-12 w-12 text-indigo-600" />
          </div>
        </motion.div>
        <motion.h2
          className={`mt-6 text-center text-3xl font-extrabold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {isLogin ? 'Welcome Back!' : 'Join Us Today'}
        </motion.h2>
        <motion.p
          className={`mt-2 text-center text-sm ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <a
            href={isLogin ? '/signup' : '/login'}
            className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </a>
        </motion.p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <motion.div
          className={`py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10 backdrop-filter backdrop-blur-lg ${
            theme === 'dark' 
              ? 'bg-gray-800 bg-opacity-80' 
              : 'bg-white bg-opacity-80'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label htmlFor="username" className={`block text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Username
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="username"
                      type="text"
                      autoComplete="username"
                      required={!isLogin}
                      className={`appearance-none block w-full pl-10 px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                        errors.username ? 'border-red-300' : 'border-gray-300'
                      } ${
                        theme === 'dark' 
                          ? 'bg-gray-700 text-white' 
                          : 'bg-white text-black'
                      }`}
                      {...register('username')}
                    />
                  </div>
                  {errors.username && (
                    <p className="mt-2 text-sm text-red-600" id="username-error">
                      {errors.username.message}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`appearance-none block w-full pl-10 px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  } ${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-white' 
                      : 'bg-white text-black'
                  }`}
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                  required
                  className={`appearance-none block w-full pl-10 px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  } ${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-white' 
                      : 'bg-white text-black'
                  }`}
                  {...register('password')}
                />
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600" id="password-error">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  isLogin ? 'Sign in' : 'Sign up'
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}