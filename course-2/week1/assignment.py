import time, sys
sys.setrecursionlimit(100000)

def dfs1(node, graph, visited, t, finishing_time):
	visited[node] = True	
	for neighbor in graph[node]:
		if not visited[neighbor]:
			dfs1(neighbor, graph, visited, t, finishing_time)
	increment_counter(t)
	finishing_time[counter_value(t)] = node



def dfs2(node, graph, visited, leader, s):
	stack = [node]
	visited[node] = True
	leader[node] = s
	nodes = []
	while stack:
		current = stack.pop()
		nodes.append(current)
		for neighbor in graph[current]:
			if not visited[neighbor]:
				visited[neighbor] = True
				stack.append(neighbor)
	return nodes

def reverse_graph(graph):
	graph_r = {}
	nodes_count = len(graph)
	for i in range(1, nodes_count + 1):
		graph_r[i] = []
	for node in graph:
		for neighbor in graph[node]:
			graph_r[neighbor].append(node)
	return graph_r

def create_counter():
	return [0]
def increment_counter(counter):
	counter[0] += 1
def counter_value(counter):
	return counter[0]

# input: a directed graph
# graph: {node: [neighbor, ...], ...}
# output: [[nodes of first SCC], [nodes of second SCC], ...]
def get_components(graph):
	components = []
	nodes_count = len(graph)
	graph_r = reverse_graph(graph)
	finishing_time = {}
	visited = [False] * (nodes_count + 1)
	t = create_counter() # finishing time
	for node in graph_r:
		if not visited[node]:
			dfs1(node, graph_r, visited, t, finishing_time)


	s = None
	leader = {}
	visited = [False] * (nodes_count + 1)
	for n in range(nodes_count, 0, -1):
		node = finishing_time[n]
		s = node
		if not visited[node]:
			nodes = dfs2(node, graph, visited, leader, s)
			components.append(nodes)
	return components


def read_graph(file, nodes_count):
	graph = {}
	for i in range(1, nodes_count + 1):
		graph[i] = []
	for line in file:
		n, m = list(map(int, line.split()))
		graph[n].append(m)
	return graph


path = "graph.txt"
nodes_count = 875714
graph = read_graph(open(path), nodes_count)
components = get_components(graph)
top_5 = sorted(map(len, components), reverse=True)[:5]
print(top_5)

