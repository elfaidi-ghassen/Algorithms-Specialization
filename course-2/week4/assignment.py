# doesn't seem efficient
# but it solved the problem in around an hour

valid_range = set(range(-10_000, 10_001))
def solution(numbers):
  numbers = sorted(numbers)
  counts = {}
  for n in numbers:
    if n in counts:
      counts[n] += 1
    else:
      counts[n] = 1
  seen = set()
  for x in numbers:
    for t in valid_range - seen:
      if t - x in counts and t not in seen:
        if t - x == x and counts[x] == 1:
          continue
        seen.add(t)
  return len(seen)



if __name__ == '__main__':
  with open("data.txt") as file:
    print(solution([int(n) for n in file]))