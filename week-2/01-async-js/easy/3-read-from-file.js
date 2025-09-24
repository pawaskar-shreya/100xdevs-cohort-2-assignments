// ## Reading the contents of a file

// Write code to read contents of a file and print it to the console. 
// You can use the fs library to as a black box, the goal is to understand async tasks. 
// Try to do an expensive operation below the file read and see how it affects the output. 
// Make the expensive operation more and more expensive and see how it affects the output. 



const fs = require('fs');

function readWrapper(cb) {
    fs.readFile('sample.txt', 'utf-8', function(err, data) {
        cb(data);
    })
}

function logIt(val) {
    console.log(val);
}

readWrapper(logIt);

let sum = 0;
for(let i=0; i<10000000000000; i++) {
    sum = sum + i;
}

console.log(sum);


// On Ubuntu extension in dock, there are a couple of things happening
// Sometimes a single core is being shot up to 100. But the core which shoots up to 100 keeps changing from like core2 to core1 to core0
// Other times 2 cores are sort of occupied at 50-50 and for them also core number keeps changing
