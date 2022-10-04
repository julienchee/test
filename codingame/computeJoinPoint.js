function computeJoinPoint(s1, s2) {
  // Write your code here
  // To debug: console.error('Debug messages...');

  const sumOfDigits = (value) => {
      let result = 0;

      while (value > 0) {
          result += value % 10;
          value = Math.floor(value / 10);
      }

      return result;
  };

  let leftValue = s1;
  let rightValue = s2;

  while (leftValue !== rightValue) {
      if (leftValue > rightValue) {
          let temp = leftValue;
          leftValue = rightValue;
          rightValue = temp;
      }

      leftValue += sumOfDigits(leftValue);
  }

  return leftValue;
}

/* Ignore and do not change the code below */
// #region main
const s1 = parseInt(readline());
const s2 = parseInt(readline());
const oldWrite = process.stdout.write;
process.stdout.write = chunk => { console.error(chunk); return true }
const res = computeJoinPoint(s1, s2);
process.stdout.write = oldWrite;
console.log(res);
// #endregion
