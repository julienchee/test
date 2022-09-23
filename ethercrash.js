function divisible(hash, mod) {
  var val = 0;

  var o = hash.length % 4;
  for (var i = o > 0 ? o - 4 : 0; i < hash.length; i += 4) {
      val = ((val << 16) + parseInt(hash.substring(i, i+4), 16)) % mod;
  }

  return val === 0;
}

function hmac(key, v) {
  var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
  return hmacHasher.finalize(v).toString();
}

function gameResult(serverSeed, salt) {
  var hash = hmac(serverSeed, salt);

  if (divisible(hash, 101))
      return 0;

  var h = parseInt(hash.slice(0,52/4),16);
  var e = Math.pow(2,52);

  return Math.floor((100 * e - h) / (e - h));
};

// Calculate possibility
const suitable_bits = 20;
const max_pos_revenue = 0.99;
let possibility = [];
let max_x_list = [];
var e = Math.pow(2, suitable_bits);

for (let i = 0; i < Math.pow(2, suitable_bits); i++) {

  let X = Math.floor((100 * e - i) / (e - i));

  X = Math.min(5432100, X);

  for (let k = 0; k <= X; k++) {
    if (possibility[k] == undefined) {
      possibility[k] = 0;
    }

    possibility[k]++;
  }
}

let max_x = 100;
let max_revenue = 0;

for (let pos_x in possibility) {
  pos_revenue = possibility[pos_x] * (pos_x / 100.0) / Math.pow(2, suitable_bits) * 100.0 / 101.0;

  if (( pos_revenue >= max_revenue) && (+pos_x > +max_x)) {
    max_x = pos_x;
    max_revenue = pos_revenue;

    // if ( pos_revenue > max_pos_revenue - 0.0001) {
      max_x_list.push({x: pos_x / 100.0, revenue: pos_revenue});
    // }
  }
}

console.log(max_x_list);
console.log('x: ' + max_x + ', revenue: ' + max_revenue);

for (let i = 0; i < 100; i++) {
  pos_x = i * 100;
  pos_revenue = possibility[pos_x] * (pos_x / 100.0) / Math.pow(2, suitable_bits) * 100.0 / 101.0;
  max_x = pos_x;
  max_revenue = pos_revenue;

  console.log('x: ' + (max_x / 100.0).toFixed(2) + ', revenue: ' + max_revenue);
}
