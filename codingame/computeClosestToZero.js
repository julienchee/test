function computeClosestToZero(ts) {
  // Write your code here
  // To debug: console.error('Debug messages...');
  if (ts.length === 0) {
      return 0;
  }

  let closestTemperature = ts[0];
  let minDistance = Math.abs(ts[0]);

  for (let temperature of ts) {
      if ((minDistance > Math.abs(temperature)) ||
          (closestTemperature < 0 &&
          temperature > 0 &&
          minDistance === Math.abs(temperature))
      ){
          closestTemperature = temperature;
          minDistance =  Math.abs(temperature);
      }
  }

  return closestTemperature;
}

/* Ignore and do not change the code below */
// #region main
const n = parseInt(readline());
const ts = readline().split(' ').map(j => parseInt(j)).slice(0, n);
const oldWrite = process.stdout.write;
process.stdout.write = chunk => { console.error(chunk); return true }
const solution = computeClosestToZero(ts);
process.stdout.write = oldWrite;
console.log(solution);
// #endregion
