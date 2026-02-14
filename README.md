# Algorithms Specialization
## Review



## Prerequites
Some Discrete Math is essential for understand
- Writing proof by contradiction and by induction
- Basics of Counting Discrete Probability:
  - Random Variables, Expectation, Independence
  - Linearity of Expectation is one of the most important topics
  - Pigeonhole principle basics
  - Conditional Probability basics


## Course 1
### Week 1
> "Perhaps the most important principle for the good algorithm designer is to refuse to be content." Aho, Hopcroft, and Ullman, The Design and Analysis of Computer Algorithms, 1974

- how to think about the $log$ function
	- $log_k(n)$, how many times you divide $n$ by $k$ to get a value ≤ 1
	- for instance, $log_2(32)$, how many times you divide 36 by 2 to get a values ≤ 1
		- $32/2/2/2/2/2 = 1$, hence $log_2(32) = 5$

- some notes about the runtime analysis of merge sort
	- we get $nlog(n)$ because of an interesting behavior
	- this happens because of the perfect equilibrium between two competing forces
	- the number of sub problems is doubling each level in the tree, but the input size is halving each level.
	- in each level $j$, we are doing:
		- $2^j . (n/2^j) = n$ (it is independant of $j$ !)
		- (i.e. *number of sub-problems* $\times$  sub problem size at level j)

- worst case analysis seems natural, but anyway what else could we do?
	- *average-case analysis*, under some assumption of the relative frequencies of inputs.
	- *benchmark analysis*, we agree upfront about 10 or 20 benchmark inputs that we all consider as representative of the problem.
	- but they require **domain knowledge**.

- The importance of constant factors
	- In some cases it is important to optimize like crazy!
	- In some libraries they would switch from merge sort to insertion sort because if the number of elements because of the constant factors 
- Asymptotic Analysis, it's a language in which serious programmers and computer scientists discuss the high lever performance of algorithms.
  - you often hear serious programmers talk "this code runs in $O(n^2)$ while this code runs in $O(log(n))$"
  - It's the famous big-oh notation.
  - it's a "sweet spot" for high level reasoning about algorithms
  - it's coarse enough to suppress architecture/language details, it supresses constant terms and lower order terms
  - it's sharp enough to be useful, i.e. to make comparisons especially in large inputs
  - "the run time of the algorithm X is O(something)"
  - "the algorithm X runs in O(something)"
  - "The runtime complexity of the algorithm X..."
  - "The asymptotic running time of algorith X..."

- the difference between $\theta$ and $O$
  - for instance, a searching for the maximum in array, is $\theta(n)$, since the worst and best case are the same, we will *always* go through the entire array.
but we usually say it's O(n), we don't bother with making a stronger statement.
we focus on the upper bound, the worst case.

- Warning: it is a mistake to say $2^{(2n)}$ is $O(2^n)$ because constant factors matter in exponents.
  - $2^{2n}$ = $(2^2)^n = 4^n$

### Week 2
#### Master Method
#### Using The Master Method:

$$
\text{If } T(n) \le a\,T\!\left(\frac{n}{b}\right) + O\!\left(n^{d}\right)
$$

$$
\text{then}
$$

$$
T(n) =
\begin{cases}
O\!\left(n^{d}\log n\right) & \text{if } a = b^{d} \quad (\text{Case 1}), \\
O\!\left(n^{d}\right)       & \text{if } a < b^{d} \quad (\text{Case 2}), \\
O\!\left(n^{\log_b a}\right) & \text{if } a > b^{d} \quad (\text{Case 3})
\end{cases}
$$
$O(n^d)$ is the complexity we do in the "combine" step.
$a$ is the number of recursive calls

- Think of it as a black box, it's a tool, you input some parameters, and it outputs the complexity.
- note: the master method works only if in each recursive call, it has the same input size.



**Example 1:** **Binary Search**

The recurrence: $T(n) \le T(\frac{n}{2}) + O(n^0)$
$a = 1, \space b = 2, \space d = 0$
$b^d = 2^0 = 1 = a$, hence it's the first case
**The runtime complexity** is $O(n^0log \space n) = O(log \space n)$

**Example 2:** **Merge Sort**

The recurrence: $T(n) \le 2.T(\frac{n}{2}) + O(n)$
$a = 2, \space b = 2, \space d = 1$
$b^d = 2^1 = 2$ and $a = 2 = b^d$, hence it's the first case
**The runtime complexity** is $O(n^1 log \space n) = O(nlog \space n)$


**Example 3:** **Karatsuba Multiplication**

before Karatsuba Multiplication, we create a simple approach, which was divide each of the number x and y into (a, b) and (c, d), respectively into two parts, and use cool math tricks to calculate the product of x . y
for instance x = 1234, y = 6789
a = 12, b = 34, c = 67, d = 89
here is the formula: $x \cdot y = ac \cdot 10^{n} + (ad + bc)\cdot 10^{\frac{n}{2}} + bd$
as you can see, we have 4 main products $ac$, $ad$, $bc$, and $bd$
so, we will have 4 recursive calls.

now, let's think about the complexity of such computation, using the master method.

$T(n) \le 4.T(\frac{n}{2}) + O(n)$
$O(n)$ because it's just a bunch of additions and padding with 0s (that $10^n$ and so on)
$a = 4, \space b = 2, \space d = 1$
$b^d = 2$, and $a = 4 > 2$, hence it's the third case

**The runtime complexity** is $O(n^{log_2(4)}) = O(n^2)$ 
so… it didn't work.
the key idea now, which seems like a pattern  to me. we try to reduce the number of recursive calls.
and that's where Karatsuba trick comes in. there is a way to find all the products $ad$, $ad$, $bc$, and $bd$ using by computing just 3 products (see the video or book for more details)
so… let's compute the worst case complexity again.

$T(n) \le 3.T(\frac{n}{2}) + O(n)$
$a = 3, \space b = 2, \space d = 1$
$b^d = 2$, and $a = 3 > 2$, hence it's the third case
**The runtime complexity** is $O(n^{log_2(3)}) = O(n^{1.584})$ 

side note:
$O(n.log_2(n)) = O(n.log_{10}(n)) = O(n.log_k(n))$ it's all the same!
because $\log_k n = \frac{\log n}{\log k}$ and $log_{10}(k)$ just a constant. so all log functions are equivalent in this case.

BUT. if the log is in the exponent,then the constant matters! the bases there has essential.
$n^{\log_2 n} \neq n^{\log_{10} n}$

**Example 4:** **Strassen's Subcubic Matrix Multiplication Algorithm**
the brute force approach for matrix multiplication is $O(n^3)$
**could we do better?**
we'll try a Divide and Conquer approach.
to compute $A.B$ we can instead think of each matrix in terms  of its quadrants.
let's say A is composed of 4 quadrants, i.e. matrices with n/2 dimension. and B is also composed of 4 other quadrants
and using some algebra, we can compute A.B in by computing smaller products.
there is a well know formula, we compute 8 products (between those smaller matrices) and then we can combine them (add them, so on, and place them in their appropriate plaace)  to get $A.B$
let's see… the complexity:
$T(n) <= 8.T(n/2) + O(n^2)$
$a=8, \space b=2,\space d=2$
$a = 8 > b^d = 4$, so it's third case
**The runtime complexity** is $O(n^{log_2(8)}) = O(n^{3})$

but we got $O(n^3)$ again.. we divided but it seems we got conquered.
Yet there is hope! it's like the Karatsuba case… there must be some neat trick.
that's what Strassen did. 
there is a algebra trick to compute $A.B$ by with 7 recursive calls instead of 8.  
$T(n) <= 7.T(n/2) + O(n^2)$
$a=7, \space b=2,\space d=2$
$a = 7 > b^d = 4$, so it's third case
**The runtime complexity** is $O(n^{log_2(7)}) = O(n^{2.8})$


>  I think it's an interesting pattern. First you figure out how to divide the problem into some problem, but then, you try to reduce the number of recursive calls.

#### Understanding The Master Method
- Understanding why the master method works is so useful, once I got the hang of it I was able to reverse engineer the master method easily.

- how to interpret it: there is a war, there are two forces, forces of good, and forces of evil
- $a$ (the number of recursive calls made by the algorithm) is the force of EVIL
	- a is rate of subproblem proliferation (RSP)
- $b^d$ is the force of good
	- it is the rate of work shrinkage per sub problem (RWS)
	- b = 2, i.e. the input is halphed in each sub problem
	- but we don't care only about the shrinkage of input size, what actually matters is the rate the *work* is shrinking.
	- so imagine b is 2 and d is 1 (like in merge sort), in each subproblem, we are doing 50% less work
	- but imagine d is 2, i.e. we do quadratic amount of work (in the combine step, like in the case of matrices, we add them, etc.) then in each sub problem, we are doing just 25% of the work.
		- because you were going to do O(n^2) , but in each subproblem, you'll do O((n/2)^2))
	
- in this battle between good and evil, there are three possible outcomes
a tie, the forces of good win, or the forces of evil win.

- recall that recursion tree.
what we want to know, the amount of work going up per level or going down per level. or is it exactly the same?


- If RSP < RWS, then the amount of work is decreasing with the recursion level j.
that is. if the work shrinkage rate is higher than the rate of sub problem proliferation 
the forces of good beat the forces of evil.
*that means after each tree level, we'll be doing less work*


- If RSP > RWS, then the amount of work is increasing with the recursion level j. the forces of evil win.
- the rating of new subproblems is so high that the savings aren't enough.
*that means after each tree level, we'll be doing more work* (even though we are trying to reducing the work, but it's not enough)


- If RSP = RWS, then the amount of work is the same in each recursion level j.
a tie.
- our savings cancel with the rate of new sub problems. 


- So, the take away:
  - if RSP = RWS => same amount of work each level (like merge sort)
so you should expect $O(n^d . log(n))$ i.e. the amount of work at the root ($n^d$) times the number of levels.

  - if RSP < RWS => less work each level 
so, most work is at the root (you might expect $O(n^d)$, and your expectation is correct)
the total amount of work in the entire tree is just a constant factor larger than the amount of work at the root level. 


  - if RSP > RWS => more work each level, the recursive calls are outpacing the savings then the most work will be at the leaves and since we have constant amount of work in the leaves (base cases) might expect a running time of O(#number of leaves) which is $O(a^{log_b{n}})$ which is equivalent to $O(n^{log_b{a}})$ which don't we say $O(a^{log_b{n}})$ in the master method since it is more intuitive? because it is easier to apply. remember the karatsuba example. $O(n^{log_2(3)}) = O(n^{1.584})$  that's much easier to think about compared to $3^{log(n)}$ even though it is actually the same


- and, we PROVED this intuition. it's actually correct :D
- the idea is not that hard: would start with the recursion tree, then we count up the work done by the algorithm, going level by level. then we realize there are three kinds of recursion trees. some where the work increases per level, decreses, or stays the same.

- Note: "work increases per level" = the amount of work in the entire level, not just one call


- the proof is so beautiful, it almost makes me cry
- At that moment I felt yeah, Tim is a great teacher

- NOTE: an error I keep doing, I say "the runtime complexity of this problem is $n^2$". Instead I should say
"the runtime complexity of this problem is $O(n^2)$"


#### Aside: Fast Power
```
FastPower(a,b) :
  if b = 1
    return a
  else
    c := a*a
    ans := FastPower(c,[b/2])
  if b is odd
    return a*ans
  else return ans
end
```
I didn't know about this algorithm! cool!
it uses the fact that
if b is even, $a^b = (a^{2})^{\frac{b}{2}}$
if b is odd, $a^b = a \cdot (a^2)^{\lfloor b/2 \rfloor}$

it's $O(log(b))$

### Week 3: Quick Sort
- As Tim describes it, it's one of the "greatest hits" in algorithms.

- merge sort isn't in place… remember, you merge arrays, and to merge them you need an  temporary array (with k as its pointer)
- quick sort works *in place*
- IMPORTANT CONCEPT: **For-Free Primitives**
  - there are some "For-Free Primitives" that you should keep in mind
  >We can think of an algorithm with linear or nearlinear running time as a primitive that we can use essentially "for free," since the amount of computation used is barely more than what is required just to read the input. Sorting is a canonical example of a for-free primitive. *For example*, you can always sort your data in a preprocessing step, even if you’re not quite sure how it’s going to be helpful later.


### Week 4
#### Randomized Selection (RSelect Algorithm)

- ith order statistic = ith smallest number in the input array
- example: [10, 24, 52, 46, 60]
  - 1st order statistic: 10
  - 2nd order statistic: 24
  - 3rd order statistic: 46
  - 4th order statistic: 52
  - 5th order statistic: 60
- easiest solution: using sorting i.e. $O(n\space log(n))$
  - It is called *reduction*: when you solve one problem by reducing it to another problem you already know how to solve.
- median vs average (mean)
  - the median is a more robust version of the mean, esp. when there is an extreme value, it makes the mean unreliable, it doesn't give good insights about the data.
  - salaries [$30k, $35k, $40k, $45k, and $1M]
    - average: 230k
    - median: 40k 
- On of the uses of the selection algorithm is to find the median 
- let arr be [20, 32, 11, 47, 55]
- let length be 5
- let mid = ((length + 1) / 2) => 3
- SelectionAlgorithm(arr, mid) => 32

- Note about median, odd and even:
  - 1, 3, 3, **6**, 7, 8, 9 -> median = **6**
  - 1, 2, 3, **4**, **5**, 6, 8, 9 -> median = (4 + 5) / 2 = **4.5**



- as an algorithm who is "worth their salt", one has to ask "could be do better?" :D
- Randomized Selection Algorithm:
```
notation: i is the order statistic
example: RSelect([11, 6, 8], 3, 2) => 8

RSelect(A: arr, n: int, i: int) : number
  if n == 1
    return A[1]
  choose pivot p at random from A
  partition A around p
  let j = the new index of p
  if j == i return p
  # if j is at index 5, i.e. it is the 5th smallest element, and say i = 2, i.e. we are looking for the second smallest element, we know that everything to the left of the pivot is smaller:
  if j > i 
    return RSelect(A, j - 1, i)
  # if j is at index 2, i.e. it is the 2nd smallest element, and say i = 5, i.e we are looking for the 5th smallest element, everything to the left of p is smaller, so we ignore them, but everything on the right is larger, hence we would look for the 3rd smallest element in the subarray on the right.
  if j < i:
    return RSelect(A, n - j, i - j)
```
- so far so good, but what is the runtime complexity?
- it depends on the pivot, if we get good balanced splits
- in the worst case, we will end up with $O(n^2)$
  - we look for the minimum, but the pivot choice is so bad
  - `[1, 2, 3, 4, 5, 6]`
  - you choose the pivot at random, you get 6, you do the partitioning; $O(n)$; we recurse over the left part of the array
  - `[1, 2, 3, 4, 5]`
  - you choose the pivot at random, you get 5, you do the partitioning; $O(n)$
  - etc.
- what is the best possible pivot? the median, because it will give us 50-50 splits every time. but that's circular, our algorithm's objective is to find 
- in that imaginary case, we can easily use the Master Method to compute the runtime complexity
  - $T(n) <= a.T(n/b) + O(n^d)$
  - $T(n) <= T(n/2) + O(n)$
    - Note: O(n) because of partitioning
  - forces of good vs forces of evil
    - $b^d$  vs $a$
    - $2^1$ > $1$ => (second case)
  - complexity = $O(n)$ 

What we want to prove: on average, Randomized Selection is O(n)
Now, let's work on the proof:

we will use a clever idea, we will use the idea of *phases* to quantify the work we have done so far.
we say that we are at phase j if the current array size is between $(3/4)^{j+1}n$ and $(3/4)^{j}n$.

let's say we have the array: 

`[|1, 2, 3, 4, 5, 6, 7, 8, 9, 10|]`

phase0, means the array size is between $0.75n$ and $n$
for example, `[|1, 2, 3, 4, 5, 6, 7|, 8, 9, 10]`
- phase1, means the array size is between $0.56n$ and $0.75n$
- phase2, means the array size is between $0.42n$ and $0.56n$
- phase3, means the array size is between $0.31n$ and $0.43xn$
- phase4, means the array size is between $0.23n$ and $0.31xn$
- ...


phase0 recursive calls operate on arrays on size n and 75% of n

certainly the outer most call is phase0
depending on the phase of the pivot, you may or may not get out of phase0. 
we say "this recruive call is phase j" if it consumes an array of a size of phase j

here is an example, let's say we are looking for a the 4th smallest element (i.e. 4)
`{x}` means x is the pivot (chose randomly)
the array is sorted to simplify the example
`|a1, a2, ...|` means that's the subarray we are operating
`[|1, 2, 3, 4, 5, 6, 7, 8, 9, 10|]` phase0
`[|1, 2, 3, 4, 5, 6, 7, 8, {9}, 10|]` 
`[|1, 2, 3, 4, 5, 6, 7, 8|, 9, 10]` phase0
`[|1, 2, 3, 4, 5, [6], 7, 8|, 9, 10]`
`[|1, 2, 3, 4, 5|, 6, 7, 8, 9, 10]` phase2
`[|1, [2], 3, 4, 5|, 6, 7, 8, 9, 10]`
`[1, 2, |3, 4, 5|, 6, 7, 8, 9, 10]` phase4
etc


now we introduce a random variable:

$X_j$ = number of recursive calls during phase j.
it is a nice random variable, let's say you want to compute the total number of recurisve calls? we would write:
$\sum_{\forall phase\space j} X_j$

we can write the running time using this notation too!

(\*) Running time of RSelect $\le \sum_{\forall phase\space j} X_j (3/4)^{j}n$

$(3/4)^{j}n$ is the maximum length of array in phase j.

now, focus on $(*)$, we have two quantites there. the expression on the left "Running time of RSelect" is a random variable, we can think of it as a function getRuntime() that will output a random running time each time we run it (because it depends on the pivot)
and same goes to the expression on the right side, because Xj is a random value (because the depends on the chosen pivot)

We care about the expectation:

(\*\*) ***Expected*** Running time of RSelect $\le E[\sum_{\forall phase\space j} X_j (3/4)^{j}n]$

we can use the linearity of expectation:

(\*\*) ***Expected*** Running time of RSelect $\le \sum_{\forall phase\space j} E[X_j] (3/4)^{j}n$

remember, $X_j$ is number of recursive calls during phase j.
$E[X_j]$ is the expected number of recursive calls during phase j.

It is a geometric distribution.
with paramter $p = 0.5$. because we have a 50% change of getting a split with one side having at least 25% of the array and the other having at most 75%.

Hence we can directy apply the formula, $E[X_j] = 1/p = 2$


Running time of RSelect $\le \sum_{\forall phase\space j} E[X_j] (3/4)^{j}n$
Running time of RSelect $\le \sum_{\forall phase\space j} 2.(3/4)^{j}n$
Running time of RSelect $\le 2n\sum_{\forall phase\space j} (3/4)^{j}$

that's a geometric sum, we can simply use the formula.

$\sum_{\forall phase\space j} (3/4)^{j} = ... = 4$

Running time of RSelect $\le 2n.4$
Running time of RSelect is $O(n)$

It's just amazing :)

#### Deterministic Selection
It's not in-place like RSelect, and it has larger constant factors, hence it's not RSelect is preferred in practice.
But it's always linear time, unlike RSelect

median of medians method

DSelect is mind blowing, like.. really mind blowing.
published in 1973 by Manuel Blum, Robert W. Floyd (behind the famous shortest path algorithm), Vaughan Pratt, Ron Rivest (behind the RSA), and Robert Tarjan. (4 of them were awarded with a Turing Award)

I didn't write lots of notes, I was just sitting there mesmerised by what i was seeing.
but at the end there was a Proof by Induction that catched my eyes, I didn't quite understand it, esp. since the Tim's style is very condenced, in fact I didn't immediately realize it was a Strong Induction.
here is the proof but re-written, by the style I learned from Susanna Epp, which is sharp and beautiful.
It's an interesting idea, this is an ad-hoc method to prove the complexity of any D&C algorithm. We will use it since the version of Master Method we have learned wouldn't work well here (only works if all recrusive call receive the same inupt size).
It's a ... and guess method. we guessed it must be O(n) so we will try to prove it.

---

what is *true*:

$T(1)=1$

(*) $T(n) \le cn + T(\frac{n}{5}) +T(\frac{7}{10}n)$

claim: 

let $a = 10c$ (this constant was reverse engineered, when reached the point (\*\*) in the proof)

$T(n) \le an$ for all $n \ge 1$

proof:

let $P(n)$ be the property $T(n) \le an$.

Design Recipe for Strong induction.
to prove P(n) is true:
- Base case:
  - we must show that P(a), p(a + 1), ... P(b) are true.
    - useful sometimes, example:
      - $a_1 = 1, a_2 = 3, a_k=a_{k-2} + 2a_{k-1}$ for $k\ge 3$
      - you want to prove $a_n$ is odd for all n.
- Inductive case:
  - we must show that for all k >= b, if P(i) is true for all integers i from a to k, then P(k + 1) is true.


- the idea of Strong induction is that we need to suppose more. if you look carefully at the inductive case, it's clear we need to use a direct proof, but we cannot do it if we only suppose P(k), its' not enough to prove P(k+1).
  - Induction: prove $P(k) \to P(k+1)$ is true
  - Strong induction: prove $P(i) \forall i \in \{a, ...,  k\} \to P(k+1)$

- Base case:
  - $T(1) = 1 \le a$ therefore $P(1)$ is true.
- Inductive case:
  - we must show that for all $k \ge 1$, if $P(i)$ is true for all integers $i$ from 1 to k, then $P(k+1)$ is true.
  - Direct Proof:
    - let k [particular but arbitrary chosen] integer $\ge 1$ and $P(i)$ is true for all every integer i between 1 and $k$
    - [we must show that $P(k+1)$ is true]
    - we have the following expression (*) which is true for all $n\ge1$, hence we can substite n with k + 1 (we can't do the same with $P(n)$, It's what we are trying to prove!)
    - $T(k + 1) \le c(k + 1) + T(\frac{k + 1}{5}) +T(\frac{7}{10}(k + 1))$
    - that's a mess, so let n = k + 1 
    - $T(n) \le cn + T(\frac{n}{5}) +T(\frac{7}{10}n)$
    - $T(n/5) = T(\frac{k + 1}{5})$ and $1 \le \frac{k + 1}{5} \le k$. Therefore, base on the inductive hypothesis, $P(i) = P(\frac{k + 1}{5})$ is true. So $T(n/5) \le a(n/5)$
    - In the same way, $T(\frac{7}{10}(k + 1)) \le a(\frac{7}{10}n)$
    - we substitute:
    - $T(n) \le cn + a(n/5) + a(\frac{7}{10}n)$
    - $T(n) \le n(c + a/5 + a(\frac{7}{10}))= n(c  + \frac{9}{10}a)$ (\*\*)
    - now we only need to simplify it, by a clever choice of constant:$a=10c$
    - $T(n) \le n(10c) = an$
- Conclusion, $P(n)$ is true for all integers $n\ge 1$

---

#### Lower bound for comparison based sorting
comparison based sorting are general purpous sorting algorithms, the access elements only via comparisons
think of it a function that takes as arguments an input array and another function which does comparisons between ADTs. All you can do is to use this API that allows you to do comparisons, you don't do anything else with elements.
The sorting algorithm doesn't need to know anything about the internal structure of the elements—it just needs the comparison function.

```
function sort(array, compare):
  ...
    ...
    compare(e1, e2)
    ...
    ...
    ...
  ...
```
non comparison based algorithms try to exploit properties of data itself to make it more efficient. but it leads to the loss of generality.
examples:
- counting sort: good when the data is integers and they are small (or within a known range)
- bucket sort

### Graphs and Minimum Cuts
a cut of a graph (V, E) is a partition of V into non-empty sets A and B.
the crossing edges of cut (A, B) are those edges with:
- one endpoint in each of (A, B) [undirected graph]
- tail in A and head in B [directed graph]

roughly how many cuts does a graph with n vertices have?
- think of the set A, it can contain any subset of the graph, B will contain the rest of nodes.
- $\sum_{i=0}^{n}C(i, n) = 2^n$

Minimum Cut Problem
Input: an undirected graph
Output: compute a cut with fewest number of crossing edges (a min cut)


applications:
- identify network weaknesses and bottlenecks
- community detection in social media: you can think of a community as an densly connected group of vertices but which is weakly connected to others
- image segmentation, the graph is an image (graph of pixels) with weights (higher values if two pixel values are closer)

Min # of edges is n - 1
Maximum number of edges in a graph (connected, and no parallel edges) = C(2, n) = n(n-1)/2
imagine all nodes to be in a set, {1, 2, 3, 4, 5...}
C(2, n) is the number of subsets of size 2 in that set. e.g. {1, 2}, {1, 3}...

Sparse vs Dense graphs: important distinction, some algorithms work better on one kind of graph, some work best on the other kind.
let n = # of vertices and m = # of edges
In most applications (but not all) applications, m is omega(n) and O(n^2)

usually people are a bit loose about this terminology

in a sparse graph, m is O(n) or close to it
in a dense graph, m is closer to O(n^2)

Adjacency Matrix
- space: O(n^2)
- super wasteful is the graph is sparse but fine if the graph is dense

Adjaceny List
for example, each node will map to the neighboring nodes
```python
graph = {
  1: [2, 3, 4]
  2: [2, 4, 7]
  ...
}
```
- Space: O(n + m)
but this confusing a bit...
what if each node is connected to each other node? wouldn't that be O(n^2) too?
that would be in case of a dense graph, it is too harsh to assume it's dense.
Space: O(n + m) is a better approximation. even if the graph is a complete graph, it will be O(n + n(n-1)/2) = O(n^2)

#### Random Contraction Algorithm (Kargar)
contraction: the process of becoming smaller.

The algorithm is so simple and elegant. kind of reminds me of Kruskal's algorithm elegance.
but this one, it's not always correct. 
The question now, is it correct enough so that it can be useful?


general principle.
we found that the algorithm's probability of success is low, it's lower bounded by 1/n^2
I was not... so impressive. but in fact, it really a good value for such an algorithm, that, basically does nothing! it literally just picks random edges and fuses nodes.
1/n^2 is really good. we have 2^n possible cuts, and so if we simply pick a random cut, that's around probability of 1/2^n of getting a min cut.
so 1/n^2 is not bad.
because now, we can actually execute the contraction algorithm repeatedly and keep track of the cut with least crossing edges. we do this to increase the change of getting a min cut.
Let N be the number of times we execute the min cut algorithm, then with N = n^2.log(n), the probability of failure <= 1/n, which is almost magical.

if we have a graph with 1000 nodes, and we reapat the randomized contraction algorithm a couple of million time, we have a change of 0.001 of failure, i.e. we'll find a min cut with a change of 99.999%


the run time is polynomial in m and n but slow
the algorithm is the vicinity of n^2.log(n), and in each trial you will look over all the edges, so around n^2log(n)m. which is a lot.
but this is the simplest and most elegant but slowest implementation.
there are better implementations that reduce the constant factors and do a lot of clever work.

"compute the min cut"

#### Insights

Randomized Algorithms are mind blowing.

the approach we can use to find the runtime complexity of divide and conquer algorithms is using recurrences. 
we cannot use that approach because we don't really know the size of the subarray, it's randomized! 


