/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module
  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files
  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt
    - For any other route not defined in the server return 404
    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
const port = 3000;



// All file names present in ./files
app.get('/files', function(req, res) {
  const allFiles = fs.readdirSync('./files');

  if(allFiles.length == 0) {
    res.status(500).send("Internal Server Error");
  } else {
    res.status(200).json({allFiles});
  }
})


// To read a specific file given name 
app.get('/file/:filename', function(req, res) {
  const fileName = req.params.filename;
  const filePath = `./files/${fileName}`;

  if(!fs.existsSync(filePath)) {
    // throw new Error;
    res.status(404).send("File not found");
  } else {
    fs.readFile(filePath, 'utf-8', function(err, data) {
      res.status(200).send(data);
    })
  }
})


// If file not found 
app.use(function(req, res) {
  res.status(404).send("Route not found");
})


// app.listen(port);

module.exports = app;