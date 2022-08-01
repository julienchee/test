// Missing Digit
// Have the function MissingDigit(str) take the str parameter,
// which will be a simple mathematical formula with three numbers,
// a single operator (+, -, *, or /) and an equal sign (=) and
// return the digit that completes the equation.
// In one of the numbers in the equation, there will be an x character, and your program should determine what digit is missing.
// For example, if str is "3x + 12 = 46" then your program should output 4.
// The x character can appear in any of the three numbers and
// all three numbers will be greater than or equal to 0 and
// less than or equal to 1000000.
// Examples
// Input: "4 - 2 = x"
// Output: 2
// Input: "1x0 * 12 = 1200"
// Output: 0

function evaluate(unknown, k) {
  if (unknown === 'x') return k;
  const known = `${k}`
  if (unknown.length !== known.length) return null;
  for (let i in known) {
    if(known[i] !== unknown[i]) return known[i]
  }
  return null;
}
const Oposite = {
  '+': (a, b) => { return a - b },
  '-': (a, b) => { return a + b },
  '*': (a, b) => { return a / b },
  '/': (a, b) => { return a * b },
}
const Onward = {
  '+': (a, b) => { return a - b },
  '-': (a, b) => { return b - a },
  '*': (a, b) => { return a / b },
  '/': (a, b) => { return b / a },
}
const Normal = {
  '+': (a, b) => { return a + b },
  '-': (a, b) => { return a - b },
  '*': (a, b) => { return a * b },
  '/': (a, b) => { return a / b },
}

function MissingDigit(str) { 
  const blocks = str.split(' ')
  // if 1st operator contains x
  if (blocks[0].includes('x')) {
    return evaluate(blocks[0],
      Oposite[blocks[1]](
        parseInt(blocks[4]), 
        parseInt(blocks[2])
      )
    )
  }
  // if 2nd operator contains x
  if (blocks[2].includes('x')) {
    return evaluate(blocks[2],
      Onward[blocks[1]](
        parseInt(blocks[4]), 
        parseInt(blocks[0])
      )
    )
  }

  return evaluate(blocks[4],
    Normal[blocks[1]](
      parseInt(blocks[0]),
      parseInt(blocks[2])
    )
  )

}
   
// keep this function call here 
console.log(MissingDigit(readline()));
