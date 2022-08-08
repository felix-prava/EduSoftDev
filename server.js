const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running..'));

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
app.use('/api/learning-materials', require('./routes/api/learningMaterials'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}..`));
