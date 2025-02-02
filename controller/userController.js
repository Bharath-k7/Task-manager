const path = require('path');
const Task = require('../models/taskModel');

exports.getUserDashboard = (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../public/html/user.html'));
};

exports.getStatusUpdate = (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, '../public/html/taskStatusUpdate.html'));
};

exports.statusUpdate = async (req, res) => {
  try {
    console.log(req.body);

    console.log(req.params._id);

    await Task.findByIdAndUpdate(req.params._id, { status: req.body.status });
    res.status(200).send('successfully updated');
  } catch (error) {
    console.log(error);
  }
};
