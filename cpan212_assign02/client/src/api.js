import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchStudents = () => api.get('/students');
export const fetchStudentById = (id) => api.get(`/students/${id}`);
export const addStudent = (student) => api.post('/students', student);
export const updateStudent = (id, student) => api.put(`/students/${id}`, student);
export const deleteStudent = (id) => api.delete(`/students/${id}`);

export const fetchCourses = () => api.get('/courses');
export const addCourse = (course) => api.post('/courses', course);
export const filterCourses = (isOpen) => api.get(`/courses/filter?isOpen=${isOpen}`);
export const deleteCourse = (id) => api.delete(`/courses/${id}`);
export const updateCourseStatus = (id, updatedCourse) => api.put(`/courses/${id}`, updatedCourse);

export const registerUser = (user) => api.post('/auth/register', user);
export const loginUser = (user) => api.post('/auth/login', user);
export const logoutUser = () => api.get('/auth/logout');
