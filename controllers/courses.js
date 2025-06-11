










const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().db().collection('courses').find();
    const courses = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const courseId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('courses').find({ _id: courseId });
    const courses = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(courses[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createCourse = async (req, res) => {
  try {
    const course = {
      courseName: req.body.courseName,
      department: req.body.department,
      credits: req.body.credits,
      instructor: req.body.instructor,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      schedule: req.body.schedule,
      prerequisites: req.body.prerequisites,
      level: req.body.level
    };

    const response = await mongodb.getDatabase().db().collection('courses').insertOne(course);
    if (response.acknowledged) {
      res.status(201).json({ message: 'Course created successfully' });
    } else {
      res.status(500).json({ message: 'Some error occurred while creating the course' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const courseId = new ObjectId(req.params.id);
    const course = {
      courseName: req.body.courseName,
      department: req.body.department,
      credits: req.body.credits,
      instructor: req.body.instructor,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      schedule: req.body.schedule,
      prerequisites: req.body.prerequisites,
      level: req.body.level
    };

    const response = await mongodb.getDatabase().db().collection('courses').replaceOne({ _id: courseId }, course);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: 'Some error occurred while updating the course' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const courseId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('courses').deleteOne({ _id: courseId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: 'Some error occurred while deleting the course' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createCourse,
  updateCourse,
  deleteCourse
};n