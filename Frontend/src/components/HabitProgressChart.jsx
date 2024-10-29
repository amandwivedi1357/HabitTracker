import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HabitProgressChart = ({ habitData }) => {
    // Prepare data for the chart
    const labels = habitData.map(data => data.date); // Dates for the x-axis
    const completedCounts = habitData.map(data => data.completedCount); // Completed habits count

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Habits Completed',
                data: completedCounts,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Daily Habit Progress</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default HabitProgressChart; 