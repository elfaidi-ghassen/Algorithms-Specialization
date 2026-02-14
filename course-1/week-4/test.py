from v2_random_contraction import min_cut, random_edge
G1 = {
    1: [[2, 3], []],
    2: [[1, 3], []],
    3: [[1, 2], []]
  }

def test_random_edge():
  print(random_edge(G1))

# test_random_edge()

def test_min_cut():
  assert min_cut(G1) == 2
  print("all tests pass")

test_min_cut()