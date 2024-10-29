/* eslint-disable react/prop-types */
import { CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

export default function HabitCard({ habit, onToggle }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isButtonHovered, setIsButtonHovered] = useState(false);

    return (
        <div 
            className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">{habit.name}</h3>
                <div className="relative">
                    <button
                        onClick={() => onToggle(habit._id, !habit.completed)}
                        onMouseEnter={() => setIsButtonHovered(true)}
                        onMouseLeave={() => setIsButtonHovered(false)}
                        className={`p-2 rounded-full transition-colors flex items-center justify-center ${
                            habit.completed ? 'bg-green-200 hover:bg-green-300' : 'bg-red-200 hover:bg-red-300'
                        }`}
                    >
                        {habit.completed ? (
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : (
                            <XCircle className="w-6 h-6 text-red-600" />
                        )}
                    </button>
                    {isButtonHovered && (
                        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded py-1 px-2">
                            Toggle Completion
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        className={`h-2.5 rounded-full ${
                            habit.completed ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        style={{ width: habit.completed ? '100%' : '0%' }}
                    ></div>
                </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
                Created: {new Date(habit.createdAt).toLocaleDateString()}
            </p>
        </div>
    );
}