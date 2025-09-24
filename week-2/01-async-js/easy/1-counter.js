// Create a counter in JavaScript

// We have already covered this in the second lesson, but as an easy recap try to code a counter in Javascript
// It should go up as time goes by in intervals of 1 second


/**
    Ans: 
        - declare counter as a global variable (top level variable)
        - Now setInterval takes only 2 args, a callback and a duration, hence we cannot pass the counter variable to setInterval directly. So we write a wrapper around it. 
        - In the wrapper function, we pass the callback and the counter, as this will be then used to call the callback with counter like callback(counter)
        - Now inside the wrapper when we write setInterval, we dont pass the arg to it like this: (cb, 1000). As in this case, setInterval is as good as without a wrapper. When passing an arg to setInterval, we can only send a callback (function name, and not a function call with args.)  
        - So     allowed ==> function_name      not allowed ==> function_name(arg)
        - We want the setInterval to do something extra here in our case and not just plainly call a callback. So for that purpose, we define an anonymous function inside setInterval.
        - This anonymous function makes a callback with counter as its arg. The function that is getting callbacked is doThis(). This function prints counter on screen. That is exactly what we want to be done after every second. Hence this part comes inside the anonymous function.
        - The another thing that we want to happen every second is the increment of counter. Hence that must also go inside the anonymous function after the callback as counter needs to be incremented after printing. 
        - Also putting counter increment inside this anonymous function makes sure that the updated counter is the value of the counter that is being made available to be sent to print. 
        - Another good thing to note is that, we could have incremented counter in doThis() also, but when a global variable is passed to functions, its local copy is created inside the functions. Each function will have its seperate local copy. A local copy modified in one function will only be available in that function. Hence when we try to modify counter inside doThis(), it updates the local copy in that function, but it is never being made availale to counterWrapper and hence everytime a 0 is printed which was sent in the very first callback call. 
        - Also, we are not really calling setInterval again and again. It is called only once. The logic of setInterval is written internally such that it calls the callback function after given duration again and again. 
        - And finally when calling the counterWrapper, we pass the callback that we want to be called and the counter. 
        When I say we pass a callback or we receive a callback, think of it as only a function_name being passed or received.
 */

let counter = 0;

function counterWrapper(cb, counter) {
    setInterval(function() {
        cb(counter);
        counter++;
    }, 1000);
}

function doThis(counter) {
    console.log(counter);
}

counterWrapper(doThis, counter);






function hi(str) {
    console.log(str);
}

// setInterval(hi("helloooow"), 1000);


// This is not how a callback is passed. With args. It needs to be passed without args as only a function name. Think of it as Timmy handing over to Simmmy the name of the function that needs to be called.
