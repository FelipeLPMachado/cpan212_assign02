const students = require('../data/studentData');

const getAllStudents = (req, res) => res.json(students);

const getStudentById = (req, res) => {
  const student = students.find((s) => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: 'Student not found' });
  res.json(student);
};

const addStudent = (req, res) => {
  const newStudent = {
    id: students.length + 1,
    name: req.body.name,
    department: req.body.department,
    semester: req.body.semester,
    enrolledCourse: req.body.enrolledCourse,
    completedCourse: req.body.completedCourse,
    gpa: req.body.gpa,
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
};

const updateStudent = (req, res) => {
  const student = students.find((s) => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: 'Student not found' });
  Object.assign(student, req.body);
  res.json(student);
};

const deleteStudent = (req, res) => {
  const index = students.findIndex((s) => s.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Student not found' });
  students.splice(index, 1);
  res.status(204).end();
};

module.exports = { getAllStudents, getStudentById, addStudent, updateStudent, deleteStudent };
