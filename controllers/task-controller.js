const Task = require('../models/task');


const getAllTasks = async (req, res) => {
    try {
        const allTasks = await Task.find({});
        if (allTasks.length > 0) {
            return res.status(200).json({
                success: true,
                message: 'List of Tasks',
                data: allTasks,
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Tasks not found',
            });
        }
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while fetching tasks',
        });
    }
};


const getSingleTask = async (req, res) => {
    try {
        const taskDetails = await Task.findById(req.params.id);
        if (taskDetails) {
            return res.status(200).json({
                success: true,
                message: 'Task details retrieved successfully',
                data: taskDetails,
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Task not found',
            });
        }
    } catch (error) {
        console.error('Error fetching task by ID:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while fetching the task',
        });
    }
};


const addTask = async (req, res) => {
    try {  
      const taskData = req.body; 
      const newTask = new Task(taskData);
      const savedTask = await newTask.save();
  
      return res.status(201).json({
        success: true,
        message: 'Task created successfully',
        data: savedTask,
      });
    } catch (error) {
      console.error('Error creating task:', error);
      return res.status(500).json({
        success: false,
        message: 'Something went wrong while adding the task. Please try again.',
      });
    }
  };



const updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (updatedTask) {
            return res.status(200).json({
                success: true,
                message: 'Task updated successfully',
                data: updatedTask,
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Task not found',
            });
        }
    } catch (error) {
        console.error('Error updating task:', error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while updating the task',
        });
    }
};



const deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (deletedTask) {
            return res.status(200).json({
                success: true,
                message: 'Task deleted successfully',
                data: deletedTask,
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Task not found',
            });
        }
    } catch (error) {
        console.error('Error deleting task:', error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while deleting the task',
        });
    }
};


module.exports = {
  getAllTasks,
  getSingleTask,
  addTask,
  updateTask,
  deleteTask,
};