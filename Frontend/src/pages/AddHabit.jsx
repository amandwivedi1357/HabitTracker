import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Target, Calendar, Bell, Save, X } from 'lucide-react';
import { createHabit } from '../api';
import toast from 'react-hot-toast';
import { useTheme } from '../context/ThemeContext';

export default function AddHabit() {
  const [habits, setHabits] = useState([]);
  const [newHabitName, setNewHabitName] = useState('');
  const navigate = useNavigate();
  const { theme } = useTheme();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;

    try {
      const newHabit = await createHabit(newHabitName);
      setHabits([...habits, newHabit.data]);
      setNewHabitName('');
      toast.success('Habit created successfully');
    } catch (error) {
      toast.error('Failed to create habit');
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl my-2 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-lg shadow-lg p-8 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <div className="text-center mb-8">
          <img
            src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80"
            alt="Create new habit"
            className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
          />
          <h1 className={`text-3xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Create New Habit</h1>
          <p className={`${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>Define your new habit and start tracking your progress</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Habit Name
            </label>
            <div className="relative">
              <Target className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
              }`} />
              <input
                type="text"
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
                className={`pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  theme === 'dark'
                    ? 'bg-gray-700 text-white border-gray-600'
                    : 'bg-white text-black border-gray-300'
                }`}
                placeholder="e.g., Daily Exercise"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                theme === 'dark'
                  ? 'border-gray-600 text-gray-300 bg-gray-700 hover:bg-gray-600'
                  : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
              }`}
            >
              <X className="h-5 w-5 mr-2" />
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Save className="h-5 w-5 mr-2" />
              Create Habit
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}