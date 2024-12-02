const courses = require('../data/courseData');

const getAllCourses = (req, res) => res.json(courses);

const addCourse = (req, res) => {
  const newCourse = { id: courses.length + 1, ...req.body };
  courses.push(newCourse);
  res.status(201).json(newCourse);
};

const filterCourses = (req, res) => {
  const { isOpen } = req.query;
  const filteredCourses = courses.filter(c => String(c.isOpen) === isOpen);
  res.json(filteredCourses);
};

module.exports = { getAllCourses, addCourse, filterCourses };
