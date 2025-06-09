const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Create
router.post('/', async (req, res) => {
    try {
        const post = new Post(req.body);
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Read all
router.get('/', async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

// Read one
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Not found' });
        res.json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) return res.status(404).json({ error: 'Not found' });
        res.json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ error: 'Not found' });
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;