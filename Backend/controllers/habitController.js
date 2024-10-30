const Habit = require('../models/Habit');

let lastResetDate = null; 

const getHabits = async (req, res) => {
  try {
    const currentDate = new Date().toLocaleDateString();

   
    if (lastResetDate !== currentDate) {
      
      await Habit.updateMany({ userId: req.user._id }, { completed: false });
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
  const { name, completed } = req.body;

 
  const currentDate = new Date().toLocaleDateString();

  
  if (lastResetDate !== currentDate) {
    
    await Habit.updateMany({ userId: req.user._id }, { completed: false });
    lastResetDate = currentDate; 
  }

  try {
    const habit = await Habit.findById(req.params.id);

    if (habit) {
      habit.name = name;
      habit.completed = completed;

      const updatedHabit = await habit.save();
      res.json({ message: "Success", data: updatedHabit });
    } else {
      res.status(404).json({ message: 'Habit not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating habit', error: error.message });
  }
};



module.exports = { getHabits, createHabit, updateHabit };
