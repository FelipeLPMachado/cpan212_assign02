import React, { useState } from 'react';
import { addCourse } from '../api';

function AddCourse({ setCourses }) {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    addCourse({ name, department, isOpen }).then((response) => {
      setCourses(prev => [...prev, response.data]);
      setName('');
      setDepartment('');
      setIsOpen(true);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Course Name" />
      <input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Department" />
      <label>
        Open:
        <input type="checkbox" checked={isOpen} onChange={() => setIsOpen(!isOpen)} />
      </label>
      <button type="submit">Add Course</button>
    </form>
  );
}

export default AddCourse;
