const Blog = require('../models/Blog');

const getBlogs = async (req, res) => {
    // Only fetch approved blogs for the public view
    const blogs = await Blog.find({ status: 'approved' }).populate('user', 'name');
    res.json(blogs);
};

const getBlogById = async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate('user', 'name role guideProfile');
    if (blog) {
        // Increment views automatically when fetched by ID
        blog.views = (blog.views || 0) + 1;
        await blog.save();
        res.json(blog);
    } else {
        res.status(404).json({ message: 'Blog not found' });
    }
};

const createBlog = async (req, res) => {
    const { title, content, image, tags } = req.body;
    const blog = new Blog({
        user: req.user._id,
        title,
        content,
        image,
        tags,
        status: 'pending', // Default to pending
    });
    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
};

const likeBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
        res.status(404).json({ message: 'Blog not found' });
        return;
    }

    // Toggle like
    if (blog.likes.includes(req.user._id)) {
        blog.likes = blog.likes.filter((id) => id.toString() !== req.user._id.toString());
    } else {
        blog.likes.push(req.user._id);
    }

    await blog.save();
    res.json(blog);
};

const approveBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
        blog.status = 'approved';
        await blog.save();
        res.json(blog);
    } else {
        res.status(404).json({ message: 'Blog not found' });
    }
};

const getPendingBlogs = async (req, res) => {
    const blogs = await Blog.find({ status: 'pending' }).populate('user', 'name');
    res.json(blogs);
};

module.exports = { getBlogs, getBlogById, createBlog, likeBlog, approveBlog, getPendingBlogs };
