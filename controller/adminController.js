const path = require('path');
const Task = require('../models/taskModel');
const User = require('../models/userModel');
const { log } = require('console');

exports.getAdminDashBoard = async (req, res) => {
  const tasks = await Task.find().populate('assignee', 'username').lean();
  res.status(200).render('admin/adminDashBoard', {
    title: 'Admin DashBoard',
    tasks,
  });
};

exports.getAssignTaskForm = (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, '../public/html/assignTask.html'));
};

exports.assignTask = async (req, res) => {
  try {
    req.body.status = undefined;
    req.body.createdBy = req.body.user._id;
    const task = new Task(req.body);
    await task.save();

    res.status(201).send('success');
  } catch (error) {
    console.log(error);
  }
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find({ role: 'user' }, 'username');
  res.status(200).render('admin/allUser', {
    title: 'All User',
    users,
  });
};

exports.getUpdateform = async (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, '../public/html/updateTask.html'));
};

const filterBody = (bodyData, ...allowedFields) => {
  return Object.keys(bodyData).reduce((acc, data) => {
    if (allowedFields.includes(data)) acc[data] = bodyData[data];
    return acc;
  }, {});
};
exports.updateTask = async (req, res) => {
  try {
    const filteredBody = filterBody(
      req.body,
      'title',
      'description',
      'assignee',
      'priority',
      'dueDate'
    );

    await Task.findByIdAndUpdate(req.params._id, filteredBody);

    res.status(204).send('successfully updated');
  } catch (error) {
    console.log(error);
  }
};

exports.getDeleteForm = (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, '../public/html/deleteTask.html'));
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params._id);
    res.status(204).send('successfully deleted!');
  } catch (error) {
    console.log(error);
  }
};
