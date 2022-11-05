const Task = require('../models/task');

exports.getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({ status : 'success' , tasks, amount: tasks.length })
    }
    catch (error) {
        res.status(500).json({ msg: error })
    }
}

exports.createTask = async (req, res, next) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({ task });
    }
    catch (err) {
        res.status(500).json({ msg: err })
    }
}

exports.getTask = async (req, res, next) => {
    try {
        const taskID = req.params.id;
        const task = await Task.findOne({ _id: taskID });
        if (!task) {
            const error = new Error ('Not Found');
            error.status = 404;
            return next(error);
            //return res.status(404).json({ msg: `No task with id :${taskID}` })
        }
        res.status(200).json({ task });
    }
    catch (err) {
        res.status(500).json({ msg: err })
    }
}

exports.deleteTask = async (req, res, next) => {

    try {
        const taskID = req.params.id;
        const task = await Task.findByIdAndDelete(taskID);
        if (!task) {
            return res.status(404).json({ msg: `No task with id :${taskID}` })
        }
        res.status(200).json({ task });
    }
    catch (error) {
        res.status(500).json({ msg: err })
    }
}

exports.updateTask = async (req, res, next) => {
    try {
        const taskID = req.params.id;
        const task = await Task.findByIdAndUpdate(taskID, req.body, {
            new: true,
            runValidators: true
        });
        if (!task) {
            return res.status(404).json({ msg: `No task with id :${taskID}` })
        }
        res.status(200).json({ task });
    }
    catch (error) {
        res.status(500).json({ msg: error })
    }
}