const express = require('express');

const tasksController = require('../controllers/tasks');

const router = express.Router();



router.get('/', tasksController.getAllTasks);

router.post('/', tasksController.createTask);

router.get('/:id', tasksController.getTask);

router.patch('/:id', tasksController.updateTask);

router.delete('/:id', tasksController.deleteTask);



module.exports = router;