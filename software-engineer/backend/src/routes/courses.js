// routes/courses.js
const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/courses');

router.get('/', coursesController.getAllCourses);
router.get('/:id', coursesController.getCourseById);

module.exports = router;
