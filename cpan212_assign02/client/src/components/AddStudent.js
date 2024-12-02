import React, { useState } from 'react';
import { addStudent } from '../api';

function AddStudent({ setStudents }) {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState(1);
  const [enrolledCourse, setEnrolledCourse] = useState('');
  const [completedCourse, setCompletedCourse] = useState('');
  const [gpa, setGpa] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStudentData = {
      name,
      department,
      semester: parseInt(semester, 10),
      enrolledCourse: enrolledCourse.trim(),
      completedCourse: completedCourse.trim(),
      gpa: parseFloat(gpa),
    };

    addStudent(newStudentData)
      .then((response) => {
        setStudents((prev) => [...prev, response.data]);
        setName('');
        setDepartment('');
        setSemester(1);
        setEnrolledCourse('');
        setCompletedCourse('');
        setGpa('');
      })
      .catch((error) => {
        console.error('Error adding student:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Student</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Department" required />
      <input type="number" value={semester} onChange={(e) => setSemester(e.target.value)} placeholder="Semester" required min="1" />
      <input value={enrolledCourse} onChange={(e) => setEnrolledCourse(e.target.value)} placeholder="Enrolled Course" required />
      <input value={completedCourse} onChange={(e) => setCompletedCourse(e.target.value)} placeholder="Completed Course" required />
      <input type="number" step="0.5" value={gpa} onChange={(e) => setGpa(e.target.value)} placeholder="GPA" required min="0" max="10" />
      <button type="submit">Add Student</button>
    </form>
  );
}

export default AddStudent;
