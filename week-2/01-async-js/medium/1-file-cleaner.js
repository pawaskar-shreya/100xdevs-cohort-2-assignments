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