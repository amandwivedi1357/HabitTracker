const Habit = require('../models/Habit');

let lastResetDate = null; 

const getHabits = async (req, res) => {
  try {
    const currentDate = new Date().toLocaleDateString();

    if (lastResetDate !== currentDate) {
      await Habit.updateMany(
        { userId: req.user._id, completed: true },
        { completed: false, progress: 0 } 
      );
      lastResetDate = currentDate;
    }

    const habits = await Habit.find({ userId: req.user._id });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving habits', error: error.message });
  }
};


const createHabit = async (req, res) => {
  const { name } = req.body;
  const habit = new Habit({
    name,
    userId: req.user._id,
  });

  try {
    const createdHabit = await habit.save();
    res.status(201).json({message:"Success",data:createdHabit});
  } catch (error) {
    res.status(400).json({ message: 'Error creating habit', error: error.message });
  }
};

const updateHabit = async (req, res) => {
  const { name, progress, completed } = req.body;

  try {
    const habit = await Habit.findById(req.params.id);

    if (habit) {
      if (name) {
        habit.name = name;
      }

      habit.updatedAt = new Date();

    
      const newProgressEntry = {
        date: new Date().toISOString().split('T')[0], 
        progress: progress
      };

      
      habit.progressLog.push(newProgressEntry);

      
      if (completed === true) {
        habit.completed = true;
        habit.streak += 1; 
      } else {
        habit.completed = progress === 100; 
      }

      const updatedHabit = await habit.save();
      res.json({ message: "Success", data: updatedHabit });
    } else {
      res.status(404).json({ message: 'Habit not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating habit', error: error.message });
  }
};



const deleteHabit = async (req, res) => {
    const { id } = req.params; 
    try {
        const habit = await Habit.findByIdAndDelete(id);
        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' }); 
        }
        res.status(204).send(); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getHabitById = async (req, res) => {
  const { id } = req.params; 

  try {
    const habit = await Habit.findById(id); 

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' }); 
    }

  
    if (habit.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized access' }); 
    }

    res.json(habit); 
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving habit', error: error.message });
  }
};

module.exports = { getHabits, createHabit, updateHabit, deleteHabit, getHabitById };
