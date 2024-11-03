import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Trash2,  } from 'lucide-react';
import { updateHabit, deleteHabit, getHabitById } from '../api';
import toast from 'react-hot-toast';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useTheme } from '../context/ThemeContext';

Chart.register(...registerables);

export default function HabitDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [habit, setHabit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [progressLog, setProgressLog] = useState([]);
  const [lastProgressUpdate, setLastProgressUpdate] = useState(
    () => JSON.parse(localStorage.getItem(`lastProgressUpdate-${id}`)) || null
  );
  const { theme } = useTheme();

  useEffect(() => {
    const fetchHabit = async () => {
      try {
        const data = await getHabitById(id);
        setHabit(data);
        console.log(habit)
        setProgressLog(data.progressLog || []);
        if (!lastProgressUpdate) {
          setLastProgressUpdate(data.progress);
        }
      } catch (error) {
        console.error('Error fetching habit:', error);
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHabit();
  }, [id, navigate, lastProgressUpdate]);

  const handleDelete = async () => {
    try {
      await deleteHabit(id);
      toast.success('Habit deleted successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to delete habit');
      console.error(error);
    }
  };

  const handleProgressUpdate = async (progress) => {
    try {
      await updateHabit(id, { name: habit.name, progress, completed: progress === 100 });
      setHabit((prev) => ({ ...prev, progress, completed: progress === 100 }));
      const newLogEntry = { date: new Date().toISOString().split('T')[0], progress };
      setProgressLog((prevLog) => [...prevLog, newLogEntry]);
      setLastProgressUpdate(progress);
      localStorage.setItem(`lastProgressUpdate-${id}`, JSON.stringify(progress));
      toast.success('Progress updated successfully');
    } catch (error) {
      toast.error('Failed to update progress');
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!habit) {
    return (
      <div className="text-center p-4">
        <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Habit not found</h2>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="w-full md:w-full max-w-4xl mx-auto sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-lg  shadow-lg p-2 sm:p-6 md:p-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className="flex   flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className={`text-2xl sm:text-3xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{habit.name}</h1>
            
          </div>
          <div className=" space-x-2 sm:space-x-4">
           
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className={`p-2 rounded-full transition-colors ${
                theme === 'dark'
                  ? 'text-gray-300 hover:text-red-400 hover:bg-gray-700'
                  : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
              }`}
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {[
            { icon: Calendar, title: 'Streak', value: `${habit.streak} days` },
            { icon: Clock, title: 'Completion Rate', value: `${lastProgressUpdate ? lastProgressUpdate : 0}%` },
           
          ].map((item, index) => (
            <div key={index} className={`p-4 sm:p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-center mb-2">
                <item.icon className="h-5 w-5 text-indigo-600 mr-2" />
                <h3 className={`text-base sm:text-lg font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{item.title}</h3>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-indigo-600">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mb-6 sm:mb-8">
          <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Progress Log</h3>
          <div className={`p-4 sm:p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`} style={{ width: '100%', height: '300px' }}>
            {progressLog.length > 0 ? (
              <Line
                data={{
                  labels: progressLog.map((log) => log.date),
                  datasets: [
                    {
                      label: 'Progress',
                      data: progressLog.map((log) => log.progress),
                      borderColor: theme === 'dark' ? 'rgb(129, 140, 248)' : 'rgb(79, 70, 229)',
                      tension: 0.1,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100,
                      ticks: {
                        color: theme === 'dark' ? '#e5e7eb' : '#374151',
                      },
                      grid: {
                        color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                      },
                    },
                    x: {
                      ticks: {
                        color: theme === 'dark' ? '#e5e7eb' : '#374151',
                        maxRotation: 45,
                        minRotation: 45,
                      },
                      grid: {
                        color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                      },
                    },
                  },
                }}
              />
            ) : (
              <p className={`text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>No progress data available. Mark the progress below to see the progress data.</p>
            )}
          </div>
        </div>

        <div>
          <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Quick Update</h3>
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {[0, 25, 50, 75, 100].map((progress) => (
              <button
                key={progress}
                onClick={() => handleProgressUpdate(progress)}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  lastProgressUpdate === progress
                    ? 'bg-indigo-600 text-white'
                    : theme === 'dark'
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {progress}%
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`rounded-lg p-6 sm:p-8 max-w-sm w-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
          >
            <h2 className={`text-xl sm:text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Delete Habit</h2>
            <p className={`mb-6 text-sm sm:text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Are you sure you want to delete this habit? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className={`px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                  theme === 'dark'
                    ? 'text-gray-200 bg-gray-700 hover:bg-gray-600'
                    : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors text-sm sm:text-base"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}