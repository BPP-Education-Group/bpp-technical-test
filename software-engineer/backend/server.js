// server.js
const express = require('express');
const app = express();
const coursesRouter = require('../backend/src/routes/courses.js');

app.use(express.json());

app.use('/courses', coursesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
