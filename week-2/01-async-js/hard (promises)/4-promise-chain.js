/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Return a promise chain which return the time in milliseconds it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */



function wait1(t) {
    return new Promise(function(resolve) {
        setTimeout(resolve, t * 1000);
    })
}

function wait2(t) {
    return new Promise(function(resolve) {
        setTimeout(resolve, t * 1000);
    })
}

function wait3(t) {
    return new Promise(function(resolve) {
        setTimeout(resolve, t * 1000);
    })
}



function calculateTime(t1, t2, t3) {
    let before = new Date().getTime();


    // If we do not use the arrow functions, then we have to specifically use the return keyword otherwise undefined is reuturned in place of a promise to the next promise. 
    // Do not forget to return the promise as we con only use .then() on a returned promise and not on undefined.
    // Hence we can only do promise chaining if a promise is returned.

    return wait1(t1)
    .then(function() {
        return wait2(t2);
    })
    .then(function() {
        return wait3(t3);
    })
    .then(function() {
        let after = new Date().getTime();

        return (after - before);
    })



    // Inside arrow functions we do not need to use the return keyword explicitly. It is returned by default.
    return wait1(t1)
        .then(() => wait2(t2))
        .then(() => wait3(t3))
        .then(() => {
            const after = Date.now();
            return ( after - before); // return total time in ms
        });

}

calculateTime(2, 1, 1).then((totalTime) => {console.log(`Total time spent is ${totalTime}`)});

module.exports = calculateTime;
