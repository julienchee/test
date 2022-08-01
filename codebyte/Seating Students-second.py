# Seating Students
# Have the function SeatingStudents(arr)
# read the array of integers stored in arr
# which will be in the following format: [K, r1, r2, r3, ...]
# where K represents the number of desks in a classroom, and 
# the rest of the integers in the array will be in sorted order and 
# will represent the desks that are already occupied.
# All of the desks will be arranged in 2 columns, where desk
# #1 is at the top left, desk #2 is at the top right, 
# desk #3 is below #1, desk #4 is below #2, etc. 
# Your program should return the number of ways 2 students
# can be seated next to each other.
# This means 1 student is on the left and 1 student on the right, or
# 1 student is directly above or below the other student.

# For example: if arr is [12, 2, 6, 7, 11] then this classrooms
# looks like the following picture:



# Based on above arrangement of occupied desks,
# there are a total of 6 ways to seat 2 new students next to each other.
# The combinations are: [1, 3], [3, 4], [3, 5], [8, 10], [9, 10], [10, 12].
# So for this input your program should return 6.
# K will range from 2 to 24 and will always be an even number.
# After K, the number of occupied desks in the array can range from 0 to K.
# Examples
# Input: [6, 4]
# Output: 4
# Input: [8, 1, 8]
# Output: 6

def SeatingStudents(arr):
  total_non_rep = arr[0] // 2
  odd_rep = total_non_rep - 1
  even_rep = total_non_rep - 1
  total_count = total_non_rep + odd_rep + even_rep

  if len(arr) >1:
    students = arr[1:]
    students = list(dict.fromkeys(students))

    students.sort()

    for i in range(0, len(students)):
      # check nested
      remove_count = 3

      if (students[i] - 1) // 2 == 0:
        remove_count = 2

      if (students[i] + 1) // 2 >= total_non_rep:
        remove_count = 2
      

      if students[i] % 2 == 0:
        if ((i - 2) >= 0) and (students[i] - students[i - 2] <= 2):
          remove_count -= 1
        if ((i - 1) >= 0) and (students[i] - students[i - 1] <= 2):
          remove_count -= 1
      else:
        if ((i - 2) >= 0) and (students[i] - students[i - 2] == 2):
          remove_count -= 1
        if ((i - 1) >= 0) and (students[i] - students[i - 1] == 2):
          remove_count -= 1

      total_count -= remove_count

  return total_count
  
  

# keep this function call here 
# print(SeatingStudents(input()))

print(SeatingStudents([8, 1, 8]))
print(SeatingStudents([6, 4]))
print(SeatingStudents([6]))
print(SeatingStudents([6, 4, 3]))
print("[6, 4, 3, 5] returned " + str(SeatingStudents([6, 4, 3, 5])))
print("[8, 1, 8, 7] returned " + str(SeatingStudents([8, 1, 8, 7])))
print("[8, 1, 8, 7,1,8,7,1] returned " + str(SeatingStudents([8, 1, 8, 7,1,8,7,1])))
print("[10, 1, 8, 7,2,3,4,5,6,9,10] returned " + str(SeatingStudents([10, 1, 8, 7,2,3,4,5,6,9,10])))