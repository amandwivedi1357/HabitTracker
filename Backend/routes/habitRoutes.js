const express = require('express');
const { getHabits, createHabit, updateHabit, deleteHabit, getHabitById } = require('../controllers/habitController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getHabits)
  .post(protect, createHabit);

router.route('/:id')
.get(protect,getHabitById)
  .delete(protect, deleteHabit)
  .put(protect, updateHabit);

module.exports = router;
