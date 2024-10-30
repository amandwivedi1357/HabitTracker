import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { getHabits, createHabit, updateHabit } from '../api';
import HabitCard from '../components/HabitCard';
import HabitProgressChart from '../components/HabitProgressChart';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [newHabitName, setNewHabitName] = useState('');
  const [showChart, setShowChart] = useState(false);
  const [chartHeight, setChartHeight] = useState('0px');
  const navigate = useNavigate();

  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = async () => {
    try {
      const data = await getHabits();
      setHabits(data);
    } catch (error) {
      toast.error('Failed to load habits');
    }
  };

  const handleCreateHabit = async (e) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;

    try {
      const newHabit = await createHabit(newHabitName);
      setHabits([...habits, newHabit.data]);
      setNewHabitName('');
      toast.success('Habit created successfully');
    } catch (error) {
      toast.error('Failed to create habit');
    }
  };

  const handleToggleHabit = async (id, completed) => {
    try {
      const habitToUpdate = habits.find(habit => habit._id === id);
      await updateHabit(id, habitToUpdate.name, completed);
      setHabits(
        habits.map((habit) =>
          habit._id === id ? { ...habit, completed } : habit
        )
      );
      toast.success('Habit updated successfully');
    } catch (error) {
      toast.error('Failed to update habit');
    }
  };

  const habitData = habits.reduce((acc, habit) => {
    const date = new Date(habit.createdAt).toLocaleDateString();
    if (habit.completed) {
      acc[date] = (acc[date] || 0) + 1;
    }
    return acc;
  }, {});

  const chartData = Object.entries(habitData).map(([date, completedCount]) => ({
    date,
    completedCount
  }));

  const toggleChart = () => {
    setShowChart(!showChart);
    setChartHeight(showChart ? '0px' : '400px');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900">My Habits</h1>
          <p className="mt-2 text-gray-600">Track your daily progress</p>
        </div>

        <div className="text-right mb-4">
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>

        <form onSubmit={handleCreateHabit} className="mb-8">
          <div className="flex gap-4 justify-center">
            <input
              type="text"
              placeholder="Enter a new habit..."
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
              className="flex-1 p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Habit
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {habits.map((habit) => (
            <HabitCard
              key={habit._id}
              habit={habit}
              onToggle={handleToggleHabit}
            />
          ))}
        </div>

        <div className="text-center mb-4">
          <button
            onClick={toggleChart}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {showChart ? 'Hide Chart' : 'Show Chart'}
          </button>
        </div>

        <div
          style={{ height: chartHeight, overflow: 'hidden', transition: 'height 0.5s ease' }}
        >
          {showChart && <HabitProgressChart habitData={chartData} />}
        </div>
      </div>
    </div>
  );
}
