/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

/*
    - It is a simple promise wrapper which takes an arg
*/


function wait(n) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, n * 1000)
    });
}

function logIt() {
    console.log("Inside the callback");
}



wait(3).then(logIt);

module.exports = wait;
