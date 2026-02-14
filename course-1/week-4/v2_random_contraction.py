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
  for i in range(len(graph) - 2):
    u, v = random_edge(graph)
    # we will delete v later, so we add it to the nodes "within" u
    nodes_within(graph, u).append(v)
    nodes_within(graph, u).extend(nodes_within(graph, v))
    get_neighbors(graph, u).extend(get_neighbors(graph, v))
    
    # change all references to v to be references to u
    for node in graph:
      graph[node][0] = [
          u if x == v else x
          for x in graph[node][0]
      ]
    # remove self loops
    graph[u][0] = [x for x in graph[u][0] if x != u]
    
    del graph[v]
  return len(graph[vertices(graph)[0]][0])


  
if __name__ == "__main__":
  graph = {}
  with open("course-1/week-4/input") as file:
    for line in file:
      node, *neighbors = list(map(int, line.split()))
      graph[node] = [neighbors, []]
  m = len(graph)
  for i in range(1000):
    graph_copy = {k: [v[0][:], v[1][:]] for k, v in graph.items()}
    m = min(m, min_cut(graph_copy))
  print(m)