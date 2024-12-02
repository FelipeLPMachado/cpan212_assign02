import React from 'react';
import { deleteStudent } from '../api';

function StudentList({ students, setStudents }) {
  const handleDelete = (id) => {
    deleteStudent(id).then(() => setStudents((prev) => prev.filter((s) => s.id !== id)));
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
