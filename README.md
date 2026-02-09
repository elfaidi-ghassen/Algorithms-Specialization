# Algorithms Specialization
## Review






## Prerequites
- Writing Direct Proof, proof by contradiction, and by induction
- Basics of Discrete Probability: Random Variables, Expectation, Independence
  - more advanceed concepts are not needed
- optional: proving array invariants (by induction)


## Course 1

#### Master Method
all subproblem size must have the same size


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


#### Insights

Randomized Algorithms are mind blowing.

the approach we can use to find the runtime complexity of divide and conquer algorithms is using recurrences. 
we cannot use that approach because we don't really know the size of the subarray, it's randomized! 


