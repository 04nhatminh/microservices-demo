const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/mini_blog_comment')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Import routes
const commentRoutes = require('./routes/comment');
app.use('/', commentRoutes);

const PORT = 3001;
app.listen(PORT, () => console.log(`CommentService running on port ${PORT}`));