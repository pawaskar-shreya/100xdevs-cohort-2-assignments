const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index.js");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic

    await User.create({
        username : req.body.username,
        password : req.body.password
    })

    res.status(200).json({
        msg : "User created successfully"
    })

});


// This is an open endpoint, as in no auth check. That is because, the user does not need to be signed in to check all the available courses that can be bought
// The same endpoint is present in admin routes but it is protected as the published field has a significance. The creator can decide if a course is published or to be pubished and stuff. Here the user will ideally only see the published courses. We are not writing that logic here
// Also the user routes here follow the async await syntax and the admin routes are written with promises syntax
router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const allCourses = await Course.find({});

    res.status(200).json({
        Courses : allCourses
    })
});


router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic

    const courseId = req.params.courseId;

    await User.updateOne(
        {username : req.headers['username']}, 
        { $push : {purchasedCourses : courseId}}
    )

    res.status(200).json({
        msg : "Course purchased successfully"
    })
});


router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic

    const user = await User.findOne(
        {username : req.headers.username}
    )

    console.log(user);
    
    const courseIds = user.purchasedCourses
    console.log(courseIds)

    res.status(200).json({
        courses : courseIds
    })
});

module.exports = router