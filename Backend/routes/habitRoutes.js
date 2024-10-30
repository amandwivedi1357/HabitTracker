const express = require('express');
const { getHabits, createHabit, updateHabit, deleteHabit } = require('../controllers/habitController');
const { protect } = require('../middleware/Authmiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getHabits)
  .post(protect, createHabit);

router.route('/:id')
  .put(protect,  updateHabit)
  .delete(protect, deleteHabit);

module.exports = router;
