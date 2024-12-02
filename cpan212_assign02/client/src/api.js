import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000/api' });

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
export const loginUser = async (user) => {
  try {
    const response = await api.post('/auth/login', user);
    const token = response.data.token;
    localStorage.setItem('jwtToken', token);
    return response;
  } catch (error) {
    throw error;
  }
};
export const logoutUser = () => {
  localStorage.removeItem('jwtToken');
  return api.get('/auth/logout');
};
