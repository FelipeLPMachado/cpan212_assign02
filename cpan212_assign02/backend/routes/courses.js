const express = require('express');
const router = express.Router();
const courses = require('../data/courseData');

router.get('/', (req, res) => res.json(courses));

router.get('/filter', (req, res) => {
  const { department, isOpen } = req.query;
  let filteredCourses = courses;
  if (department) filteredCourses = filteredCourses.filter(course => course.department === department);
  if (isOpen !== undefined) filteredCourses = filteredCourses.filter(course => course.isOpen === (isOpen === 'true'));
  res.json(filteredCourses);
});

router.post('/filter', (req, res) => {
  const { department, isOpen } = req.body;
  let filteredCourses = courses;
  if (department) filteredCourses = filteredCourses.filter(course => course.department === department);
  if (isOpen !== undefined) filteredCourses = filteredCourses.filter(course => course.isOpen === isOpen);
  res.json(filteredCourses);
});

router.post('/', (req, res) => {
  const newCourse = { id: courses.length + 1, ...req.body };
  courses.push(newCourse);
  res.status(201).json(newCourse);
});

router.put('/:id', (req, res) => {
  const courseId = parseInt(req.params.id);
  const courseIndex = courses.findIndex(course => course.id === courseId);
  if (courseIndex === -1) return res.status(404).json({ message: 'Course not found' });
  const updatedCourse = { ...courses[courseIndex], ...req.body };
  courses[courseIndex] = updatedCourse;
  res.json(updatedCourse);
});

router.delete('/:id', (req, res) => {
  const courseId = parseInt(req.params.id);
  const courseIndex = courses.findIndex(course => course.id === courseId);
  if (courseIndex === -1) return res.status(404).json({ message: 'Course not found' });
  courses.splice(courseIndex, 1);
  res.status(204).end();
});

module.exports = router;
