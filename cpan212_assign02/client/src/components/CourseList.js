import React from 'react';
import { deleteCourse, updateCourseStatus } from '../api';

const CourseList = ({ courses, setCourses }) => {
  const toggleCourseStatus = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    const updatedCourse = { ...course, isOpen: !course.isOpen };

    updateCourseStatus(courseId, updatedCourse)
      .then(response => {
        setCourses(prev => prev.map(c => c.id === courseId ? response.data : c));
      })
      .catch(error => console.error('Error updating course:', error));
  };

  const handleDeleteCourse = (courseId) => {
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
