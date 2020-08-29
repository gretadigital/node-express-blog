const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();

// ! Blog Routes:

// Display All Blogs:
router.get('/', blogController.blog_index);

// Create a Blog Post:
router.post('/', blogController.blog_create_post);

// Create Blog Page:
router.get('/create', blogController.blog_create_get);

// Get a Single Blog:
router.get('/:id', blogController.blog_details);

// Delete a Blog:
router.delete('/:id', blogController.blog_delete);

module.exports = router;
