// Palindromic Substring
// Have the function PalindromicSubstring(str)
// take the str parameter being passed and find the longest
// palindromic substring, which means the longest substring
// which is read the same forwards as it is backwards.
// For example: if str is "abracecars" then your program should
// return the string racecar because it is the longest
// palindrome within the input string.

// The input will only contain lowercase alphabetic characters.
// The longest palindromic substring will always be unique,
// but if there is none that is longer than 2 characters,
// return the string none.

// Examples
// Input: "hellosannasmith"
// Output: sannas
// Input: "abcdefgg"
// Output: none

function PalindromicSubstring(str) { 

  // code goes here  
    var beg = 0, end = 0, ind = 0;
    var length = str.length;
    var longestLength = 0;
    var longestBeg = 0;
    var longestEnd = 0;
    var currentLength = 0;
    while (ind < length) {
        beg = end = ind;
        while (true) {
            if (str[ind] === str[end]){
                end++;
            } else if (str[ind] === str[beg]){
                beg--
            } else {
                break;
            }
            if (beg === -1 && end === length){
                break;
            }
        }

        beg++;
        end--;

        while (true) {
            if (str[beg] === str[end]) {
                beg--;
                end++;
            } else {
                end--;
                beg++;

                if (end - beg + 1 > longestLength){
                    longestLength = end - beg + 1;
                    longestBeg = beg;
                    longestEnd = end+1;
                }

                break;
            }

            if (beg < 0 || end > length-1){
                end--;
                beg++;

                if (end-beg+1 > longestLength) {
                    longestLength = end - beg + 1;
                    longestBeg = beg;
                    longestEnd = end+1;
                }

                break;
            }
        }
        ind++;
    }

    if (longestEnd - longestBeg < 3) {
    	return 'none';
    }
    return str.substring(longestBeg, longestEnd);

}
   
// keep this function call here 
console.log(PalindromicSubstring("hellosannasmith"));
console.log(PalindromicSubstring("abcdefgg"));
console.log(PalindromicSubstring("abcdefedcba"));
// console.log(PalindromicSubstring(readline()));
