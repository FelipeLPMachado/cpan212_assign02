import React from 'react';
import { deleteStudent } from '../api';
import { useNavigate } from 'react-router-dom';

function StudentList({ students, setStudents }) {
  const navigate = useNavigate();

  const token = localStorage.getItem('jwtToken');

  const handleDelete = (id) => {
    if (!token) {
      navigate('/login');
      return;
    }

    deleteStudent(id)
      .then(() => setStudents((prev) => prev.filter((s) => s.id !== id)))
      .catch((error) => console.error('Error deleting student:', error));
  };

  return (
    <div>
      <h2>Students</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <p>{student.name} - {student.department} - GPA: {student.gpa}</p>
            <p>Semester: {student.semester}</p>
            <p>Enrolled Course: {student.enrolledCourse}</p>
            <p>Completed Course: {student.completedCourse}</p>
            <button onClick={() => handleDelete(student.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
