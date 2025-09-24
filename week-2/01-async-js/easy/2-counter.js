// ## Counter without setInterval

// Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.


/*
    Ans: 
        - Approach 1:
        - I thought of using a for loop initially, with a very big condition and then thought I would later optimize it with a while loop with some breaking condition.
        - setTimeout unlike setInterval, makes the callback function to be called only once. So if you make a call to its wrapper1 the callback inside it will only be executed only once. 
        - We need this to be looped, so we put the call to wrapper1 inside a for loop for now
        - So the idea was to write a wrapper1 around setTimeout and pass that wrapper a callback and a counter as usual. But now this time inside anonymous function of setTimeout, we cannot put the cnt increment logic.
        - This does not work......as the counter incremented here is not carried forward as there is no internal logic to keep calling setTimeout again and again in the same context with the same local variables
        - So we take the cnt increment logic to a for loop increment the cnt there and pass the incremented cnt each time to the wrapper1 call. 
        - The approach here works to print 0 to 5. But there is only an initial delay of roughly 1 sec and then all 0 to 5 are printed all at once. This is because the timers for all the 6 numbers go to the web api section and are maybe running parallely. As this logic only handles "calling" the wrapper1 5 times and not making the timers to be set one after the other.
        
        
        
        - Approach 2:
        - To fix the above problem, we need to put the "calling" of wrapper inside setTimeout. 
        - We could do that by calling a wrapper inside setTimeout. But to achieve the waiting for one sec before calling the wrapper next next, we would sort of have to loop the counterWrapper calling inside itself for as many times we want it to be called. 
        - This sounds like recurison, hence we put a recursive call inside setTimeout to its own counterWrapper. The stopping condition is not there, but the running code can still be terminated cy Ctrl+C on terminal. 
        - Now since this logic is recursively calling setTimeout, we can retain the changed value of counter and pass it along to be printed. So, we first increment the counter and then make the recursive call to counterWrapper.
        - This gives the desired result of waiting of for asec before printing a consecutive number.
*/



// Comment the other approach before running one

// Approach 1 

let cnt = 0;

function wrapper1 (cb, cnt) {
    setTimeout(function() {
        cb(cnt);
        // cnt++;                               // This does not work......
    }, 1000)
}

function logMyCounter(cnt) {
    console.log(cnt);
}


for(let i=0; i<=5; i++) {
    
    wrapper1(logMyCounter, cnt);
    cnt++;
    
    // setTimeout(function() {
    //     // wrapper1(logMyCounter, cnt);                                 // Doesn't work, prints 5 five times
    // }, 1000)
}





// Approach 2

let counter = 0;

function counterWrapper(cb, counter) {
    setTimeout(function() {
        cb(counter);
        counter++;
        counterWrapper(cb, counter);
    }, 1000)
}

function doThis(counter) {
    console.log(counter);
}

counterWrapper(doThis, counter);











// (Hint: setTimeout)