const express = require('express');
const router = express.Router();
const students = require('../data/studentData');

router.get('/', (req, res) => res.json(students));

router.get('/filter', (req, res) => {
  const { department, enrolledCourse, completedCourse } = req.query;
  let filteredStudents = students;
  if (department) filteredStudents = filteredStudents.filter(student => student.department === department);
  if (enrolledCourse) filteredStudents = filteredStudents.filter(student => student.enrolledCourses.includes(enrolledCourse));
  if (completedCourse) filteredStudents = filteredStudents.filter(student => student.completedCourses.includes(completedCourse));
  res.json(filteredStudents);
});

router.post('/filter', (req, res) => {
  const { department, enrolledCourse, completedCourse } = req.body;
  let filteredStudents = students;
  if (department) filteredStudents = filteredStudents.filter(student => student.department === department);
  if (enrolledCourse) filteredStudents = filteredStudents.filter(student => student.enrolledCourses.includes(enrolledCourse));
  if (completedCourse) filteredStudents = filteredStudents.filter(student => student.completedCourses.includes(completedCourse));
  res.json(filteredStudents);
});

router.get('/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: 'Student not found' });
  const averageGrade = student.completedCourses.reduce((acc, c) => acc + c.grade, 0) / student.completedCourses.length || 0;
  res.json({ ...student, averageGrade });
});

router.post('/', (req, res) => {
  const newStudent = { id: students.length + 1, ...req.body, enrolledCourses: [], completedCourses: [] };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

router.put('/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: 'Student not found' });
  Object.assign(student, req.body);
  res.json(student);
});

router.delete('/:id', (req, res) => {
  const index = students.findIndex(s => s.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Student not found' });
  students.splice(index, 1);
  res.status(204).end();
});

module.exports = router;
