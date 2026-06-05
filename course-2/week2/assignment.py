
def read_graph(file, nodes_count):
	graph = {}
	for line in file:
		n, *m = line.split()
		graph[int(n)] = dict([toPair(p) for p in m])
	return graph

def toPair(p):
  parts = p.split(",")
  return (int(parts[0]), int(parts[1]))

def dijkstra(graph, source, N):
  L = {}
  visited = set([source])
  for i in range(1, N + 1):
    L[i] = 1_000_000
  L[source] = 0
  for i in range(N - 1):
    crossing = crossing_edges(graph, visited, N)
    min_edge = min(crossing, key=(lambda p: dijkstra_cost(p, graph, L)))
    visited.add(min_edge[1])
    L[min_edge[1]] = dijkstra_cost(min_edge, graph, L)
  return L



def crossing_edges(graph, visited, N):
  crossing = []
  for u in graph:
    if u not in visited:
      continue
    for v in graph[u].keys():
      if v not in visited:
        crossing.append((u, v))
  return crossing

def dijkstra_cost(pair, graph, L):
  u, v = pair
  return L[u] + graph[u][v]

N = 200
graph = read_graph(open("graph.txt"), N)
L = dijkstra(graph, 1, N)
nodes = [7, 37, 59, 82, 99, 115, 133, 165, 188, 197]
print(",".join([str(L[node]) for node in nodes]))