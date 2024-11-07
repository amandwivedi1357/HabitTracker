/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, LogOut, Moon, Sun, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ isOpen, onClose, isMobile }) {
  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/add-habit', icon: PlusCircle, label: 'Add Habit' },
  ];
  const { theme, toggleTheme } = useTheme();
  const { token } = useAuth();

  const sidebarVariants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
  };

  const sidebarContent = (
    <div className="h-full flex flex-col">
      <div className="p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Habit Tracker</h1>
        {isMobile && (
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            
          >
            <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
        )}
      </div>
      
      <nav className="flex-1 px-4">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={isMobile ? onClose : undefined}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              }`
            }
          >
            <Icon className="h-5 w-5 mr-3" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t dark:border-gray-700">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-colors duration-200 ${
            theme === 'dark'
              ? 'bg-gray-700 hover:bg-gray-600 text-yellow-300'
              : 'bg-indigo-200 hover:bg-indigo-300 text-gray-800'
          }`}
          
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        
        {token && (
          <button 
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
            className="flex items-center w-full px-4 py-2 mt-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      
      {isMobile && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={onClose}
            ></motion.div>
          )}
        </AnimatePresence>
      )}

      
      {!isMobile && (
        <div className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 bg-opacity-90 backdrop-blur-lg shadow-lg z-50">
          {sidebarContent}
        </div>
      )}

      
      {isMobile && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 bg-opacity-90 backdrop-blur-lg shadow-lg z-50"
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
            >
              {sidebarContent}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}