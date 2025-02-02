const User = require('../models/userModel');
const Task = require('../models/taskModel');

exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }, 'username');
    res.status(200).json({
      status: 'success',
      data: { users },
    });
  } catch (error) {
    console.log(error);
  }
};
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params._id)
      .populate('assignee', 'username')
      .populate('createdBy', 'username');
    res.status(200).json({
      status: 'success',
      data: {
        task,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getAllTaskByUser = async (req, res) => {
  try {
    const queryBuilding = {
      assignee: req.body.user._id,
    };

    if (req.query.searchBy)
      queryBuilding.title = { $regex: req.query.searchBy, $options: 'i' };

    if (req.query.filterByPriority)
      queryBuilding.priority = req.query.filterByPriority;

    if (req.query.filterByStatus)
      queryBuilding.status = req.query.filterByStatus;

    const tasks = await Task.find(queryBuilding);

    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    const statusOrder = {
      pending: 1,
      'in-progress': 2,
      denied: 3,
      completed: 4,
    };
    tasks.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
    tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

    res.status(200).json({
      status: 'success',
      data: {
        tasks,
      },
    });
  } catch (error) {
    throw 'query failed';
  }
};
