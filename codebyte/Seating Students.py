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
  if len(arr) >1:
    list1= [ i for i in range(1,arr[0]+1)]
    nested  =[]
    for i in list1:
      if len(nested) !=0:
        if i % 2 != 0:
          nested.append([i])
        else:
          nested[len(nested)-1].append(i)
      else:
        nested.append([i])
    odd_list_seq= [ i  for i in range(1,arr[0]+1) if((i)% 2) !=0]
    odd_repetition_list=[i for i in zip(odd_list_seq[0:-1],odd_list_seq[1:])]
    
    even_list_seq = [ i  for i in range(1,arr[0]+1) if((i)% 2) ==0]
    even_repetition_list=[i for i in zip(even_list_seq[0:-1],even_list_seq[1:])]
    
    nested.extend(odd_repetition_list)
    nested.extend(even_repetition_list)
    
    result = [] 
    for i in nested:
      if i[0] in arr[1:] or i[1] in arr[1:]:
        pass
      else:
        result.append(i)
    return len(result)
    

      
  else:
    total_non_rep = arr[0] // 2
    odd_rep = total_non_rep - 1
    even_rep = total_non_rep - 1
    return total_non_rep+odd_rep+even_rep 
  
  

# keep this function call here 
print(SeatingStudents(input()))
