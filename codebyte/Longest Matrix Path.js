// Longest Matrix Path
// Have the function LongestMatrixPath(strArr)
// take the array of strings stored in strArr,
// which will be an NxM matrix of positive single-digit integers,
// and find the longest increasing path composed of distinct integers.
// When moving through the matrix, you can only go up, down, left, and right.
// For example: if strArr is ["345", "326", "221"],
// then this looks like the following matrix:

// 3 4 5
// 3 2 6
// 2 2 1

// For the input above, the longest increasing path goes from:
// 3 -> 4 -> 5 -> 6. Your program should
// return the number of connections in the longest path,
// so therefore for this input your program should return 3.
// There may not necessarily always be a longest path within the matrix.
// Examples
// Input: ["12256", "56219", "43215"]
// Output: 5
// Input: ["67", "21", "45"]
// Output: 3

function LongestMatrixPath(strArr) { 
  let matrix = GetMatrixFromStringInput(strArr);

  const yLength = matrix.length;
  const xLength = matrix[0].length;

  // Loop thru each integer, and find the next possible increasing path
  const paths = [];
  for (let x=0; x < xLength; x++) {
    for (let y=0; y < yLength; y++) {
      const eachNumber = matrix[y][x];
      const path = [eachNumber];
      FindNextIncrementalNumber(matrix, paths, path, x, y);
      paths.push(path);
    }
  }

  const longestPath = paths.reduce(longestPathReducer);
  return longestPath.length - 1;
}

const longestPathReducer = (longestPath, currentPath) => {
  return (longestPath.length > currentPath.length) ? longestPath : currentPath;
};

function FindNextIncrementalNumber(matrix, paths, path, x, y) {
  const biggestNumber = path[path.length - 1];

  // Navigate up
  if (IsValidCoordinate(matrix, x, y-1) && 
      IsNewNumberBigger(matrix, x, y-1, biggestNumber)) {
      const newPath = [...path];
      newPath.push(matrix[y-1][x]);
      paths.push(newPath);
      FindNextIncrementalNumber(matrix, paths, newPath, x, y-1);
  }

  // Navigate down
  if (IsValidCoordinate(matrix, x, y+1) &&
      IsNewNumberBigger(matrix, x, y+1, biggestNumber)) {
      const newPath = [...path];
      newPath.push(matrix[y+1][x]);
      paths.push(newPath);
      FindNextIncrementalNumber(matrix, paths, newPath, x, y+1);
  }

  // Navigate left
  if (IsValidCoordinate(matrix, x-1, y) &&
      IsNewNumberBigger(matrix, x-1, y, biggestNumber)) {
      const newPath = [...path];
      newPath.push(matrix[y][x-1]);
      paths.push(newPath);
      FindNextIncrementalNumber(matrix, paths, newPath, x-1, y);
  }

  // Navigate right
  if (IsValidCoordinate(matrix, x+1, y) &&
      IsNewNumberBigger(matrix, x+1, y, biggestNumber)) {
      const newPath = [...path];
      newPath.push(matrix[y][x+1]);
      paths.push(newPath);
      FindNextIncrementalNumber(matrix, paths, newPath, x+1, y);
  }
}

// Turn the input string into 2-dimentional arrays
function GetMatrixFromStringInput(strArr) {
  const rows = strArr.map(row => {
    const columns = row.split("");
    return columns.map(c => parseInt(c));
  });

  return rows;
}

function IsValidCoordinate(matrix, x, y) {
  if (x < 0 || y < 0) return false;

  const yLength = matrix.length;
  const xLength = matrix[0].length;

  if (x >= xLength || y >= yLength) return false;

  return true;
}

function IsNewNumberBigger(matrix, x, y, biggestNumber) {
  return matrix[y][x] > biggestNumber;
}

console.log(LongestMatrixPath(["12256", "56219", "43215"]));
console.log(LongestMatrixPath(["67", "21", "45"]));
console.log(LongestMatrixPath(['994', '668', '211']));

// function LongestMatrixPath(strArr) { 

//   // code goes here  
//   return strArr; 

// }
   
// keep this function call here 
// console.log(LongestMatrixPath(readline()));
