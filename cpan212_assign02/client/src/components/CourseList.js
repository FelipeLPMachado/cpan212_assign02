import React from 'react';
import { deleteCourse, updateCourseStatus } from '../api';
import { useNavigate } from 'react-router-dom';

const CourseList = ({ courses, setCourses }) => {
  const navigate = useNavigate();

  const token = localStorage.getItem('jwtToken');

  const toggleCourseStatus = (courseId) => {
    if (!token) {
      navigate('/login');
      return;
    }
    const course = courses.find(c => c.id === courseId);
    const updatedCourse = { ...course, isOpen: !course.isOpen };

    updateCourseStatus(courseId, updatedCourse)
      .then(response => {
        setCourses(prev => prev.map(c => c.id === courseId ? response.data : c));
      })
      .catch(error => console.error('Error updating course:', error));
  };

  const handleDeleteCourse = (courseId) => {
    if (!token) {
      navigate('/login');
      return;
    }

    deleteCourse(courseId)
      .then(() => {
        setCourses(prev => prev.filter(course => course.id !== courseId));
      })
      .catch(error => console.error('Error deleting course:', error));
  };

  return (
    <div>
      <h2>Courses</h2>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            {course.name} - {course.department} - Status: {course.isOpen ? 'Open' : 'Closed'}
            <button onClick={() => toggleCourseStatus(course.id)}>
              Toggle Status
            </button>
            <button onClick={() => handleDeleteCourse(course.id)}>
              Delete Course
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
