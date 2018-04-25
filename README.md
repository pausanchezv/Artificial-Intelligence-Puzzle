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
