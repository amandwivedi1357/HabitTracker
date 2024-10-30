/* eslint-disable react/prop-types */
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HabitProgressChart = ({ habitData }) => {
    const labels = habitData.map(data => data.date); 
    const completedCounts = habitData.map(data => data.completedCount); 

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
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                text: 'Daily Habit Progress',
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${context.raw}`;
                    }
                }
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Habits Completed',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Date',
                },
            },
        },
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 chart-container">
            <h2 className="text-lg font-semibold mb-4">Daily Habit Progress</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default HabitProgressChart;
