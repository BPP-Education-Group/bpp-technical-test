// controllers/courses.js
const courses = require('../../data/courses');

exports.getAllCourses = (req, res) => {
  res.json(courses);
};

exports.getCourseById = (req, res) => {
  const courseId = req.params.id;
  const course = courses.find(course => course.id === courseId);

  if (!course) {
    return res.status(404).json({ error: 'Course not found' });
  }

  res.json(course);
};
