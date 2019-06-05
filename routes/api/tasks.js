const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Task Model
const Task = require('../../models/Task');

// @route   GET api/tasks
// @desc    Get All Tasks
// @access  Public
router.get('/:id', (req, res) => {
  Task.find()
    .sort({ date: -1 })
    .then(tasks =>  res.json(tasks.filter(task => task.userid === req.params.id || task.shareid === req.params.id)));
});

// @route   POST api/tasks
// @desc    Create A Task
// @access  Private
router.post('/', (req, res) => {
  const newTask = new Task({
    name: req.body.name,
    userid: req.body.userid,
    shareid: req.body.shareid
  })
  newTask.save().then(task => res.json(task));
});

// @route   UPDATE api/task/:id
// @desc    UPDATE A Task
// @access  Public

router.put('/:id', (req, res) => {
  Task.findByIdAndUpdate(req.params.id, {$set: {
    name: req.body.name,
    shareid: req.body.shareid
  }} )
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
});

// @route   DELETE api/items/:id
// @desc    Delete A Task
// @access  Private
router.delete('/:id', (req, res) => {
  Task.findById(req.params.id)
    .then(task => task.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;