Student-Course App

This project is a full-stack application that allows users to manage students and courses. It uses React for the frontend, Express for the backend, MongoDB for data storage, and Passport.js for authentication. The app allows users to view, add, update, and delete student and course records.

Features

User authentication with Passport.js (login and register)
Add, update, delete, and filter students and courses
Use of MongoDB to store data
Frontend built using React
Backend built using Express.js
Concurrently runs both frontend and backend servers

Tech Stack

Frontend: React, React Router
Backend: Node.js, Express, Passport.js, Mongoose
Database: MongoDB
Authentication: Passport.js with local strategy
Development Tools: npm, concurrently, dotenv

Setup Instructions

Frontend Setup

Navigate to the client directory in your project.

Install dependencies:

npm install

Start the development server:

npm start
The React app will run on http://localhost:3000 by default.

Backend Setup

Navigate to the backend directory in your project.

Install dependencies:

npm install
Ensure MongoDB is running locally or update the .env file with your MongoDB URI.

Start the backend server:

npm start
The Express app will run on http://localhost:5000 by default.

Running Both Servers Simultaneously

At the root level of the project, you can start both the frontend and backend servers concurrently:

npm start
This will run the React frontend and Express backend simultaneously.

File Structure

student-course-app/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── passport.js
│   ├── controllers/
│   │   ├── courseController.js
│   │   └── studentController.js
│   ├── data/
│   │   ├── courseData.js
│   │   └── studentData.js
│   ├── models/
│   │   ├── Course.js
│   │   ├── Student.js
│   │   └── User.js
│   ├── routes/
│   │   ├── courses.js
│   │   └── students.js
│   ├── .env
│   ├── app.js
│   ├── index.js
│   └── package.json
├── client/
│   ├── public/
│   └── src/
│       ├── api.js
│       ├── App.js
│       ├── index.css
│       ├── index.js
│       └── components/
│           ├── AddCourse.js
│           ├── AddStudent.js
│           ├── CourseList.js
│           ├── Login.js
│           ├── Register.js
│           └── StudentList.js
├── .env
├── package.json
└── README.md

Environment Variables

Create an .env file at the backend/ directory and define the following variables:

Backend .env

MONGODB_URI=mongodb://localhost:27017/userApp
SESSION_SECRET=your-secret-key-here
Make sure MongoDB is running locally or replace localhost in the URI with the appropriate database host.

Routes

Students API

GET /api/students – Get all students
POST /api/students – Add a new student
GET /api/students/:id – Get student by ID
PUT /api/students/:id – Update student by ID
DELETE /api/students/:id – Delete student by ID
GET /api/students/filter – Filter students by department, enrolled course, or completed course

Courses API

GET /api/courses – Get all courses
POST /api/courses – Add a new course
GET /api/courses/filter – Filter courses by department and open status
POST /api/courses/filter – Filter courses by department and open status (using POST)
PUT /api/courses/:id – Update course by ID
DELETE /api/courses/:id – Delete course by ID

Authentication API

POST /api/auth/login – Log in user
POST /api/auth/logout – Log out user
