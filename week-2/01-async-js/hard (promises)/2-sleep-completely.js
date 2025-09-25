/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

function sleep(milliseconds) {
    return new Promise(function(resolve) {
        let timeBefore = new Date().getTime();

        while(true) {
            let timeAfter = new Date().getTime();

            if(timeAfter - timeBefore >= milliseconds) {
                break;
            } 
        }

        resolve();
    })
}

function busyWait() {
    console.log("waited long enough");
}

sleep(3000).then(busyWait);

module.exports = sleep;