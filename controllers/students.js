







const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().db().collection('students').find();
    const students = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const studentId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('students').find({ _id: studentId });
    const students = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(students[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createStudent = async (req, res) => {
  try {
    const student = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      enrollmentDate: req.body.enrollmentDate,
      courses: req.body.courses,
      gpa: req.body.gpa,
      dateOfBirth: req.body.dateOfBirth
    };

    const response = await mongodb.getDatabase().db().collection('students').insertOne(student);
    if (response.acknowledged) {
      res.status(201).json({ message: 'Student created successfully' });
    } else {
      res.status(500).json({ message: 'Some error occurred while creating the student' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const studentId = new ObjectId(req.params.id);
    const student = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      enrollmentDate: req.body.enrollmentDate,
      courses: req.body.courses,
      gpa: req.body.gpa,
      dateOfBirth: req.body.dateOfBirth
    };

    const response = await mongodb.getDatabase().db().collection('students').replaceOne({ _id: studentId }, student);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: 'Some error occurred while updating the student' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const studentId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('students').deleteOne({ _id: studentId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: 'Some error occurred while deleting the student' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createStudent,
  updateStudent,
  deleteStudent
};