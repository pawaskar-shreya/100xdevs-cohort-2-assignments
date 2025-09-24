/*
    ## File cleaner
    Read a file, remove all the extra spaces and write it back to the same file.

    For example, if the file input was
    ```
    hello     world    my    name   is       raman
    ```

    After the program runs, the output should be

    ```
    hello world my name is raman
    ```
*/

/*
    Ans: 
        - The wrapper is passed 2 callbacks. One for read and one for write. Both are necessary for the syntax of args and hence cannot be skipped
        - After the file is begin read, we call the cleanNreturn inside fs.readFile() and receive what it returns into input variable
        - Input is then passed to writeFile()
*/

const fs = require('fs');

function Wrapper(cb, done) {
    fs.readFile('sample.txt', 'utf-8', function(err, data){
        let input = cb(data);
        fs.writeFile('sample.txt', input, done)
    })
}

function cleanNreturn (val) {

    let wordArr = val.split(' ');
    let cleaned = '';

    for(let i=0; i<wordArr.length; i++) {
        if(wordArr[i] != '') {
            cleaned = cleaned + wordArr[i];
            cleaned = cleaned + ' ';
        } 
    }

    return cleaned;
}

function logDone() {
    console.log("file cleaned");
}

Wrapper(cleanNreturn, logDone)