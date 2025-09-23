/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  let s = str.toUpperCase();
  let n = str.length;
  let skip = [',', '?', '!', '.', ' '];
  let i = 0;
  let j = n-1-i;

  while(j>=i) {

    while(i<j && skip.includes(s[i])) {
      i++
    }

    while(j>i && skip.includes(s[j])) {
      j--;
    }

    if(s[i] != s[j]) {
      return false;
    }

    i++;
    j--;
  }
  return true;
}

module.exports = isPalindrome;
