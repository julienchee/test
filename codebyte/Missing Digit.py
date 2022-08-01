# Missing Digit
# Have the function MissingDigit(str) take the str parameter,
# which will be a simple mathematical formula with three numbers,
# a single operator (+, -, *, or /) and an equal sign (=) and
# return the digit that completes the equation.
# In one of the numbers in the equation, there will be an x character, and your program should determine what digit is missing.
# For example, if str is "3x + 12 = 46" then your program should output 4.
# The x character can appear in any of the three numbers and
# all three numbers will be greater than or equal to 0 and
# less than or equal to 1000000.
# Examples
# Input: "4 - 2 = x"
# Output: 2
# Input: "1x0 * 12 = 1200"
# Output: 0

def evaluate(unknown, k):
  if unknown == 'x':
    return k

  known = str(k)

  if len(unknown) != len(known):
    return 0

  for i in range(0, len(unknown)):
    if known[i] != unknown[i]:
      return known[i]
  
  return 0
def Oposite(sSimbol, a, b):
  if sSimbol == '+':
    return a - b
  if sSimbol == '-':
    return a + b
  if sSimbol == '*':
    return a / b
  if sSimbol == '/':
    return a * b

def Onward(sSimbol, a, b):
  if sSimbol == '+':
    return a - b
  if sSimbol == '-':
    return b - a
  if sSimbol == '*':
    return a / b
  if sSimbol == '/':
    return b / a

def Normal(sSimbol, a, b):
  if sSimbol == '+':
    return a + b
  if sSimbol == '-':
    return a - b
  if sSimbol == '*':
    return a * b
  if sSimbol == '/':
    return a / b

def MissingDigit(strParam):
  blocks = strParam.split(' ')

  # if 1st operator contains x
  if 'x' in blocks[0]:
    return evaluate(blocks[0],
      Oposite(blocks[1],
        int(blocks[4]), 
        int(blocks[2])
      )
    )

  # if 2nd operator contains x
  if 'x' in blocks[2]:
    return evaluate(blocks[2],
      Onward(blocks[1],
        int(blocks[4]), 
        int(blocks[0])
      )
    )
  

  return evaluate(blocks[4],
    Normal(blocks[1],
      int(blocks[0]),
      int(blocks[2])
    )
  )


# keep this function call here 
print(MissingDigit(input()))
