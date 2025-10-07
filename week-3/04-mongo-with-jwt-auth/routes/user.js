const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwt = require("jsonwebtoken")
require("dotenv").config();

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic

    const username = req.body.username;
    const password = req.body.password;

    const doesUserExist = await User.findOne({
        username : username
    });

    if(doesUserExist) {
        res.status(403).json({
            msg : "Username is already taken"
        })
    } else {
        await User.create({
            username, password
        })

        res.status(200).json({
            msg : "User created successfully"
        })
    }
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic

    const username = req.body.username;
    const password = req.body.password;

    const doesUserExist = await User.findOne({
        username : username, 
        password : password
    });

    if(doesUserExist) {
        const token = jwt.sign({username}, process.env.JWT_SECRET);
        res.status(200).json({
            msg : "Admin is signed in",
            token : token
        })
    } else {
        res.status(403).json({
            msg : "Your sign in credentials are incorrect "
        })
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic

    allCourses = await Course.find({});
    res.status(200).json({
        Courses : allCourses
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic

    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    const username = jwt.decode(jwtToken).username;

    const courseId = req.params.courseId;

    await User.updateOne(
        {username : username},
        { $push : {purchasedCourses : courseId}}
    )

    res.status(200).json({
        msg : "Course purchased successfully"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic

    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    let username = jwt.decode(jwtToken).username;

    // This decoding username is fine but better approach is to just add the username to the req obj in the userMiddleware and then make it accessible to all the endpoints that need it
    username = req.username;

    const user = await User.findOne({
        username : username
    })

    res.status(200).json({
        Courses : user.purchasedCourses
    })
});

module.exports = router