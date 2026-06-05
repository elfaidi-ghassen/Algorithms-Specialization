# "Median Maintenance" algorithm
import heapq
file_stream = open("data.txt")

def rebalance(lo_heap, hi_heap):
  if len(lo_heap) - len(hi_heap) >= 2:
    left = heapq.heappop_max(lo_heap)
    heapq.heappush(hi_heap, left)
  if len(hi_heap) - len(lo_heap) >= 2:
    right = heapq.heappop(hi_heap)
    heapq.heappush_max(lo_heap, right)

def get_median(lo_heap, hi_heap):
  if len(lo_heap) >= len(hi_heap):
    return get_max(lo_heap)
  else:
    return get_min(hi_heap)

def get_min(heap):
  return heap[0] # root of min-heap is the smallest
def get_max(heap):
  return heap[0] # root of max-heap is the largest

medians_sum = 0
hi_heap = []
lo_heap = []
for line in file_stream:
  number = int(line)
  if not lo_heap or number < get_max(lo_heap):
    heapq.heappush_max(lo_heap, number)
  else:
    heapq.heappush(hi_heap, number)
  
  rebalance(lo_heap, hi_heap)
  medians_sum += get_median(lo_heap, hi_heap)


print(medians_sum % 10_000)

