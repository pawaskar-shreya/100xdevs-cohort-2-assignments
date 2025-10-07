const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require('../db/index.js')

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic

    const username = req.body.username;
    const password = req.body.password;

    // ---------------------------
    // Ideally check if a user with a given username already exists in the db. If not, then create one

    // the create method internally triggers the save() middleware
    Admin.create({
        username : username,
        password : password
    })
    .then(function() {
        res.status(203).json({
            msg : "Admin created successfuly"
        })
    })
    .catch(function() {
        res.status(500).json({
            msg : "Some error occured"
        })
    })

    
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic

    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;
    const published = req.body.published;
    // Ideally we need to use Zod here to do input validation, to check what the user is sending

    Course.create({
        title, description, price, imageLink, published
    })
    .then(function(newCourse) {
        res.status(203).json({
            msg : "Course created successfully", 
            courseId : newCourse._id
        })
    })
    .catch(function() {
        res.status(500).json({
            msg : "Some error occured"
        })
    })
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic

    Course.find({})
    .then(function(allCourses) {
        res.status(200).json({
            courses : allCourses
        })
    })
    .catch(function() {
        res.status(500).json({
            msg : "Some error occured"
        })
    })
});

module.exports = router;