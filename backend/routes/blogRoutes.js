const express = require('express');
const router = express.Router();
const { getBlogs, getBlogById, createBlog, likeBlog, approveBlog, getPendingBlogs } = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getBlogs).post(protect, createBlog);
router.route('/pending/all').get(protect, getPendingBlogs);
router.route('/:id').get(getBlogById);
router.route('/:id/like').put(protect, likeBlog);
router.route('/:id/approve').put(protect, approveBlog); // Should strictly be admin, but using protect for now as requested

module.exports = router;
