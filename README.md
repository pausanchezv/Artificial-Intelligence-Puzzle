# puzzle-x
Artificial Intelligence - Puzzle Game

## Level Generator

There are basically two models of generated levels. The first one is based on an absolutely random way.

The first thing that we have to do to generate this kind of level is obtaining a valid distribution. A distribution is an object that contains the percentages of the amount of characters for the level. For example, it doesn't have sense generating a level that contains only bishops because it has no solution.

Now we have to get a valid puzzle size, both number of rows and columns. It will be given depending on the difficulty which is passed through the instance of the object.

After that it's necessary to obtain the colors of the puzzle. The number of the colors depends on the puzzle size obtained in the previous step.

The next stage involves generating the level. First of all we generate the level as an array which will be used to build a graph that it help us to check whether or not the level is absolutely connected. We can do it using
the Depth First Search Algorithm. If the generated level has any isolated node, then a recursive call is produced and this stage starts yet again until we get a valid level.

As a result we have a puzzle array now, that is based on 3-positional items, first refers to kind of item (tower, bishop or queen), the second shows the scoop of its move, an finally, third indicates the square color. Now, we are able to get The goal array which is based on the color. To do that, we can obtain it from the puzzle array catching just the third position for each item.

Finally both puzzles start and goal are created using the arrays and depending on the puzzle size. The puzzles are saved in the levelGenerator object to extract the best solution by using the A* Search Algorithm. But that's another story which is explained in its section.

The second kind of level is one where the start puzzle is constructed beforehand by a human, but the goal state is randomized starting from the first one.

The first kind of level is better than the second if we are looking for a level really difficult because the player doesn't have any strong model to keep in sight. On the other hand the second type of level is better than the first if we want a beautiful model, the realism decreases but it's easier enjoy the level because you have the feeling that you're building something that makes sense to see.

The basic idea is to mix both kind of levels, random and half-random in order to obtain a final game hard and realistic by using the first level type, but kind of nice to look at by using the second one.
 
 ## A-Star Heuristic
 
Since the problem we're trying to solve is absolutely NP-HARD, we have to get an approximate solution becauseif we need a fast algorithm, then cannot spend much time expanding more nodes than the necessary ones.
 
First of all I tried to get the the best solution always, and I got it by using the Backtracking technique inthe heuristic. But there is a problem: the heuristic is called for each node expansion, in our case, about 8 times. The backtraking was used to find the best square pairs which the distance among all of them was lower. And it worked perfectly because the states was expanded following always the best path since the exhaustive search explores absolutely all the possibilities to select the best one. The problem was that even if including branch and bound techniques, the A* wasn't able to hold if the puzzle size was greater than 9-12 squares.

Finally a Greedy heuristic is used and it's so fast that we can have four distinct heuristics, then throw four A* Search and finally choose the best. It is necessary to keep in mind that there are cases that for example, an heuristic based on the euclidean distance works better than the manhattan distance, and so on...
If in most cases the solutions found varies around [-2, +2] among themselves, so it's much possible that the best is one of them, and if it's not, then there is no problem because we are very close to the best solution.

But even if we are using a greedy solution, there are some cases that a good solution is extremely difficult to find, especially when the difficulty level is 'expert' and we are using puzzles 5x5, 6x5, 5x6 or 6x6 size. It's difficult to stop the algorithm if some solution is harder to be found. Setting a timer cannot be a good solution, so there is a limit depth on A* Search, then if more than 5000 states have been expanded and we still have no solution, a new puzzle is recomputed and the whole process starts yet again.
 
The conclusion is that, given that the heuristic is just a numerical value, we can have some different heuristics which return different values of different scales, so we cannot call different heuristics from the same A*, but we can call 4 distinct A*, compare 4 results and finally choose the best one.
 
 
