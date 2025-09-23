/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {

  // Method 1: split every character, sort it anc then compare

   let arr1 = str1.toLowerCase().split('').sort();
   let arr2 = str2.toLowerCase().split('').sort();


   for(let i=0; i<arr1.length; i++){
    if(arr1[i] != arr2[i]) {
      return false;
    }
}
   return true;
}

module.exports = isAnagram;