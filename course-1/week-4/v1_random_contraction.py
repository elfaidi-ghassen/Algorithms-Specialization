import random

def get_neighbors(graph, n):
  return graph[n][0]
def random_edge(graph):
  random_key = random.choice(list(graph.keys()))
  random_neighbor = random.choice(get_neighbors(graph, random_key))
  return (random_key, random_neighbor)
def vertices(graph):
  return list(graph.keys())
def nodes_within(graph, n):
  return graph[n][1]

# min_cut({node: [neighbors, nodes_within]}) -> int
# nodes_within: the contracted nodes
def min_cut(graph):
  for i in range(len(vertices(graph)) - 2):
    u, v = random_edge(graph)
    # we will delete v later, so we add it to the nodes "within" u
    nodes_within(graph, u).append(v)
    nodes_within(graph, u).extend(nodes_within(graph, v))
    get_neighbors(graph, u)[:] = [n for n in get_neighbors(graph, u) if n != v]
    # for every neighbor of v (that is not u):
    for neighbor in get_neighbors(graph, v):
      if neighbor == u:
        continue

      # instead of being connected to v
      # it should be connected to u
      # and we should update u's neighbors accordingly
      for i, n in enumerate(get_neighbors(graph, neighbor)):
        if n == v:
          get_neighbors(graph, neighbor)[i] = u
          get_neighbors(graph, u).append(neighbor)
    del graph[v]
  return len(graph[vertices(graph)[0]][0])


  
if __name__ == "__main__":
  graph = {}
  with open("course-1/week-4/input") as file:
    for line in file:
      node, *neighbors = list(map(int, line.split()))
      graph[node] = [neighbors, []]
  m = len(graph)
  for i in range(100):
    graph_copy = {k: [v[0][:], v[1][:]] for k, v in graph.items()}
    m = min(m, min_cut(graph_copy))
  print(m)