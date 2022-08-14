// https://jsfiddle.net/Dexon95/2fmuxLza/show
// https://www.bustabit.com/play
// 0000000000000000004d6ec16dafe9d8370958664c1dc422f452892264c59526
const gameResult = (seed, salt) => {
  const nBits = 52; // number of most significant bits to use

  // 1. HMAC_SHA256(message=seed, key=salt)
  const hmac = CryptoJS.HmacSHA256(seed, salt);
  seed = hmac.toString(CryptoJS.enc.Hex);

  // 2. r = 52 most significant bits
  seed = seed.slice(0, nBits / 4);
  const r = parseInt(seed, 16);

  // 3. X = r / 2^52
  let X = r / Math.pow(2, nBits); // uniformly distributed in [0; 1)

  // 4. X = 99 / (1-X)
  X = 99 / (1 - X);

  // 5. return max(trunc(X), 100)
  const result = Math.floor(X);
  return Math.max(1, result / 100);
};

// Calculate possibility
const suitable_bits = 24;
const max_pos_revenue = 0.99;
let possibility = [];
let max_x_list = [];

for (let i = 0; i < Math.pow(2, suitable_bits); i++) {
  let X = i / Math.pow(2, suitable_bits);
  X = 99 / (1 - X);
  let result = Math.floor(X);
  result = Math.min(5432100, result);

  for (let k = 0; k <= result; k++) {
    if (possibility[k] == undefined) {
      possibility[k] = 0;
    }

    possibility[k]++;
  }
}

let max_x = 100;
let max_revenue = 0;

for (let pos_x in possibility) {
  pos_revenue = possibility[pos_x] * (pos_x / 100.0) / Math.pow(2, suitable_bits);

  if (( pos_revenue >= max_revenue) && (pos_x > max_x)) {
    max_x = pos_x;
    max_revenue = pos_revenue;

    if ( pos_revenue > max_pos_revenue - 0.0001) {
      max_x_list.push({x: pos_x / 100.0, revenue: pos_revenue});
    }
  }
}

console.log(max_x_list);
console.log('x: ' + max_x + ', revenue: ' + max_revenue);

for (let i = 0; i < 100; i++) {
  pos_x = i * 100;
  pos_revenue = possibility[pos_x] * (pos_x / 100.0) / Math.pow(2, suitable_bits);
  max_x = pos_x;
  max_revenue = pos_revenue;

  console.log('x: ' + max_x / 100.0 + ', revenue: ' + max_revenue);
}

/////////////////////////////////////////////

max_x = 100;
max_revenue = 0;

for (let i = 2000; i < 3000; i++) {
  pos_x = i;
  pos_revenue = possibility[pos_x] * (pos_x / 100.0) / Math.pow(2, suitable_bits);

  if (( pos_revenue >= max_revenue) && (pos_x > max_x)) {
    max_x = pos_x;
    max_revenue = pos_revenue;
  }
}

console.log('x: ' + max_x + ', revenue: ' + max_revenue);

// 4: {x: 1.28, revenue: 0.99}
// 5: {x: 1.32, revenue: 0.99}
// 6: {x: 1.44, revenue: 0.99}
// 7: {x: 1.76, revenue: 0.99}
// 8: {x: 1.92, revenue: 0.99}
// 9: {x: 1.98, revenue: 0.99}
// 10: {x: 2.56, revenue: 0.99}
// 11: {x: 2.64, revenue: 0.99}
// 12: {x: 2.88, revenue: 0.99}
// 13: {x: 3.52, revenue: 0.99}
// 14: {x: 3.84, revenue: 0.99}
// 15: {x: 3.96, revenue: 0.99}
// 16: {x: 5.12, revenue: 0.99}
// 17: {x: 5.28, revenue: 0.99}
// 18: {x: 5.76, revenue: 0.99}
// 19: {x: 7.04, revenue: 0.99}
// 20: {x: 7.68, revenue: 0.99}
// 21: {x: 7.92, revenue: 0.99}
// 22: {x: 81.92, revenue: 0.99}
// 23: {x: 84.48, revenue: 0.99}
// 24: {x: 92.16, revenue: 0.99}
// 25: {x: 983.04, revenue: 0.99}

// Strategy
// x bit
// 1.28 / 0.28 * x bit
// 4.57143
