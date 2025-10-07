const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db/index.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic

    const username = req.body.username;
    const password = req.body.password;

    doesAdminExist = await Admin.findOne(
        {username : username}
    )

    if(doesAdminExist) {
        res.status(403).json({
            msg : "Username already taken"
        })
    } else {
        await Admin.create({
            username, password
        })
        res.status(200).json({
            msg : "Admin created successfully"
        })
    }
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    
    const username = req.body.username;
    const password = req.body.password;

    doesAdminExist = await Admin.findOne({
        username : username,
        password : password
    })

    console.log(doesAdminExist);
    if(doesAdminExist) {
        const token = jwt.sign({username: username}, process.env.JWT_SECRET);
        console.log(token);
        res.status(200).json({
            msg : "Admin is signed in", 
            token : token
        })
    } else {
        res.status(403).json({
            msg : "Your sign in credentials are incorrect"
        })
    }
    
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic

    const newCourse = await Course.create({
        title : req.body.title,
        description : req.body.description,
        imageLink : req.body.imageLink,
        price : req.body.price,
        isPublished : req.body.isPublished,
    })

    res.status(203).json({
        msg : "Course created successfully",
        courseId : newCourse._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic

    allCourses = await Course.findOne({});

    res.status(200).json({
        courses : allCourses
    })
});

module.exports = router;