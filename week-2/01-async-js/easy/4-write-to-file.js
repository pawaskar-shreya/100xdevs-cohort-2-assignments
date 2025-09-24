// ## Write to a file
// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks.

const fs = require('fs');

let msg = "This message is added from write-to-file"

function writeFileWrapper(cb, data) {
    fs.writeFile('sample.txt', data, cb);
}

function logIt() {
    console.log("wrote to file");
}


// Write file overrides the file entirely, so we hence we appendFile instead
// writeFileWrapper(logIt, msg);


// Append to File

function appendFileWrapper(cb, data) {
    data = `\n${data}`
    fs.appendFile('sample.txt', data, cb);
}

appendFileWrapper(logIt, msg);