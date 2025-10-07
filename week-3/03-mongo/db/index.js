const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
// This connection string is obtained from mongoDB cluster and then the connect button
mongoose.connect(process.env.MONGO_URI);

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username : String,
    password : String
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username : String,
    password : String, 
    purchasedCourses : [{
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'Courses'
    }]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title : String, 
    description : String,
    price : Number, 
    imageLink : String, 
    published : Boolean
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}