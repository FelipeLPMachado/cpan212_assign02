import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StudentList from './components/StudentList';
import CourseList from './components/CourseList';
import AddStudent from './components/AddStudent';
import AddCourse from './components/AddCourse';
import Register from './components/Register';
import Login from './components/Login';
import { fetchStudents, fetchCourses } from './api';

function App() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchStudents().then(response => setStudents(response.data));
    fetchCourses().then(response => setCourses(response.data));
  }, []);

  return (
    <Router>
      <div>
        <h1>Student-Course Application</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
        </nav>
        <Routes>
          <Route path="/" element={
            <>
              <AddStudent setStudents={setStudents} />
              <AddCourse setCourses={setCourses} />
              <StudentList students={students} setStudents={setStudents} />
              <CourseList courses={courses} setCourses={setCourses} />
            </>
          } />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
