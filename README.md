# Puzzle
Artificial Intelligence - Puzzle Game

![Artificial Intelligence Puzzle](http://www.pausanchezv.com/puzzle-x/assets/img/astar-puzzle.jpg)
[/www.pausanchezv.com/artificial-intelligence/puzzle](http://www.pausanchezv.com/artificial-intelligence/puzzle) 

## Level Generator

There are basically two models of generated levels. The first one is based on an absolutely random way.

The first thing that we have to do to generate this kind of level is to obtain a valid distribution. A distribution is an object that contains the amount percentage of characters for the level. For example, it doesn't make sense generating a level that contains only bishops because it has no solution.

Now we have to get a valid puzzle size, both number of rows and columns. It will be given depending on the difficulty which is passed through the instance of the object.

After that it's necessary to obtain the colors of the puzzle. The number of the colors depends on the puzzle size obtained in the previous step.

The next stage involves generating the level. First of all we generate the level as an array which will be used to build a graph in order to help us to check whether or not the level is connected. We can check the graph connection by using the Depth First Search Algorithm using it as a traversal algorithm instead of search algorithm. Then if the generated level has any isolated node, a recursive call is produced and this stage starts yet again until we get a valid level.

As a result we have a puzzle array now, that is based on 3-positional items, first refers to kind of item (tower, bishop or queen), the second shows the scope of its move, an finally, third indicates the square color. Now, we are able to get the goal array which is based on the color. All we have to do is get it from the puzzle array catching just the third position for each item.

Finally both puzzles start and goal are created using the arrays and depending on the puzzle size. The puzzles are saved in the levelGenerator object to extract the best solution by using the A* Search Algorithm. But that's another story which is explained in its section.

The second kind of level is one where the start puzzle is constructed beforehand by a human, but the goal state is randomized starting from the first one.

The first kind of level is better than the second one if we are looking for a level really difficult because the player doesn't have any strong visual model to keep in sight. On the other hand the second type of level is better than the first if we want a beautiful model, the realism decreases but it's easier to enjoy the level because you feel that you are building something that makes sense to see.

The basic idea is to mix both kind of levels, random and half-random in order to obtain a final game hard and realistic by using the first level type, but kind of nice to look at, by using the second one.
 
 ## A-Star Heuristic
 
Since the problem we are trying to solve is absolutely NP-HARD, we have to get an approximate solution because if we need a fast algorithm, then cannot spend much time expanding more nodes than the necessary ones.
 
First of all I tried to get the best solution always, and I got it by using Backtracking techniques in the heuristic. But there is a problem: the heuristic is called for each node expansion, in our case, around 200 times for each expansion (it is brutally hard to solve). The backtracking was used to find the best square pairs which the distance among all of them was lower (it is another hard problem because you know what you want, but you have to explore all to find it). 

The truth is that it worked perfectly because the states were expanded following always the best path since the exhaustive search explores absolutely all the possibilities to select the best one. And it finds it! The problem was that even if including branch and bound techniques, the A* was not able to hold itself if the puzzle size was greater than 9-12 squares. I had imagined that it was going to happen, but anyway, it had to be tested to make me able to rest in peace.

Finally a Greedy heuristic is used and it is really fast, so we can throw four distinct heuristics, then run four A* Search and finally choose the best solution. It is necessary to keep in mind that there are cases that for example, an heuristic based on the euclidean distance works better than the other one that uses manhattan distance, and so on...
If in most cases the solutions found varies around [-2, +2] among themselves, so it's much possible that the best is one of them, and if it's not, then there is no problem because we are very close to the best solution.

But even if we are using a greedy solution, there are some cases in which a good solution is extremely difficult to find, especially when the difficulty level is 'expert' and we are using puzzles 5x5, 6x5, 5x6 or 6x6 size. It's difficult to stop the algorithm if some solution is harder to be found. Setting a timer cannot be a good solution, so there is a limit depth on A* Search, then if more than 5000 states have been expanded and we still have no solution, a new puzzle is recomputed and the whole process starts yet again (It is true that the worst case involves that the A-Star overcomes 5000 states, then it is called once more time, and so on..., but it is not going to happen due to pure statistic). So the average time that an user has to wait for a level is around 0-5 seconds. It seems quite reasonable if we keep in mind the brutal problem we are dealing with.
 
The conclusion is that, given that the heuristic is just a numerical value, we can have some different heuristics which return different values from different scales, so we cannot call different heuristics from the same A*, but we can call 4 distinct A*, compare 4 results and finally choose the best one.
 
## Animated Solver

An animated solver is needed to see that the A-Star algorithm is working correctly and it is not giving us any wrong sequence of actions.

First of all we need to build the html of the matrix. It is closed under a UL tag, so our squares are constituted through LI tags.

Every LI has several data attributes that are gonna help us to build the matrix as fast as possible. However these attributes won't useful to solve the problem since they are accessible through the browser console and it means that any user could hurt the application. And I don't want that! Instead, a closed JS Object is gonna manage the whole process.

Things are tight when we have to do the variable change since the start square will have to be the goal square and so on... The easiest way to do that involves refilling the whole matrix because doing that is easier than to have to recompute all distances, all effects, all timers, that's not worth it!

The next stage is easy, we just have to use the animate jQuery function to compute the square start effect, and then use its callback to compute the goal square effect.

The point is how we will make the effects happen one after another. Easy! We just have to use the async foreach provided by jQuery and set a timer inside it. This is not the unique way, but it works well!


 
[www.pausanchezv.com](http://pausanchezv.com/) 

Pau Sanchez - Computer Engineer & Software developer

