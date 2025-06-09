const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/mini_blog_post', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Import routes
const postRoutes = require('./routes/post');
app.use('/', postRoutes);

const PORT = 3002;
app.listen(PORT, () => console.log(`PostService running on port ${PORT}`));