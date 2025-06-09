const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    content: String,
    author: String,
    postId: String, // ID của bài viết
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', CommentSchema);