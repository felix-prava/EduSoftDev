const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profiles', require('./routes/api/profiles'));
app.use('/api/articles', require('./routes/api/articles'));
app.use(
  '/api/learning-materials/problems',
  require('./routes/api/learning_materials/problems')
);
app.use(
  '/api/learning-materials/lessons',
  require('./routes/api/learning_materials/lessons')
);
app.use(
  '/api/learning-materials/quizzes',
  require('./routes/api/learning_materials/quizzes')
);
app.use('/api/solutions', require('./routes/api/solutions'));
app.use('/api/learning-materials', require('./routes/api/learningMaterials'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 3200;

app.listen(PORT, () => console.log(`Server started on port ${PORT}..`));
