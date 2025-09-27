const request = require('supertest');
const assert = require('assert');
const express = require('express');

const app = express();
let errorCount = 0;

// You have been given an express server which has a few endpoints.
// Your task is to
// 1. Ensure that if there is ever an exception, the end user sees a status code of 404
// 2. Maintain the errorCount variable whose value should go up every time there is an exception in any endpoint

app.get('/user', function(req, res) {
  throw new Error("User not found");
  res.status(200).json({ name: 'john' });
});

app.post('/user', function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

app.get('/errorCount', function(req, res) {
  res.status(200).json({ errorCount });
});

// Exception Middlewares

// The route not found middleware should come before the exception middlewares that will catch an error.
// Middlewares are executed in the order they are defined for app.use(). They get added as callback functions in the routes in the order in which we define them here. And the same order is followed for execution. 
// This is imp becauase if we write the "route not found" after "err catching middleware", the "err catching middleware" will be checked first. 
// The "route not present" does not raise an exception. Hence, the "err catching middleware" will not even be executed as it thinks there is no exception. Since this first middleware is not called, the next() inside it wont be called. Hence none of the middlewares get called. 
// Hence it is imp that we call the exception middelwares in correct order.
app.use(function(req, res, next) {
  res.status(404).json({
    msg : "Bad route :("
  })
  next();
})

app.use(function(err, req, res, next) {
  errorCount++;
  res.status(404).json({
    msg : "There is an exception"
  });
  next();
})

app.listen(3000);

module.exports = app;