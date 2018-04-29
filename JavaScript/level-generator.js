/*********************************************
 * JavaScript Level Generator
 *********************************************
 *
 * Developed by: Pau Sanchez
 *
 * website:     pausanchezv.com
 * Github:      github.com/pausanchezv
 * Linkedin:    linkedin.com/in/pausanchezv
 * Twitter:     twitter.com/pausanchezv
 * Facebook:    facebook.com/pausanchezv
 *
 * All rights reserved. - Barcelona 2018 -
 *
 * *******************************************
 *
 * There are basically two models of generated levels. The first one is based on an absolutely random way.
 *
 * The first thing that we have to do to generate this kind of level is obtaining a valid distribution. A distribution
 * is an object that contains the amount percentage of characters for the level. For example, it doesn't have sense
 * generating a level that contains only bishops because it has no solution.
 *
 * Now we have to get a valid puzzle size, both number of rows and columns. It will be given depending on the difficulty
 * which is passed through the instance of the object.
 *
 * After that it's necessary to obtain the colors of the puzzle. The number of the colors depends on the puzzle size
 * obtained in the previous step.
 *
 * The next stage involves generating the level. First of all we generate the level as an array which will be used to
 * build a graph in order to help us to check whether or not the level is connected. We can check the graph connection
 * by using the Depth First Search Algorithm using it as a traversal algorithm instead of search algorithm. Then if the
 * generated level has any isolated node, a recursive call is produced and this stage starts yet again until we get a
 * valid level.
 *
 * As a result we have a puzzle array now, that is based on 3-positional items, first refers to kind of item (tower,
 * bishop or queen), the second shows the scope of its move, an finally, third indicates the square color. Now, we are
 * able to get the goal array which is based on the color. All we have to do is get it from the puzzle array catching
 * just the third position for each item.
 *
 * Finally both puzzles start and goal are created using the arrays and depending on the puzzle size. The puzzles are
 * saved in the levelGenerator object to extract the best solution by using the A* Search Algorithm. But that's another
 * story which is explained in its section.
 *
 **********************************************
 *
 * The second kind of level is one where the start puzzle is constructed beforehand by a human, but the goal state is
 * randomized starting from the first one.
 *
 * The first kind of level is better than the second if we are looking for a level really difficult because the player
 * doesn't have any strong visual model to keep in sight. On the other hand the second type of level is better than the
 * first if we want a beautiful model, the realism decreases but it's easier enjoy the level because you feel that
 * you're building something that makes sense to see.
 *
 * The basic idea is to mix both kind of levels, random and half-random in order to obtain a final game hard and
 * realistic by using the first level type, but kind of nice to look at, by using the second one.
 *
 **********************************************/

/**
 * Level Generator Class Constructor
 */
function LevelGenerator(difficulty) {

    // Difficulty will be 'hard' if it's not defined
    if (difficulty === undefined) {
        this.difficulty = 'expert';
    }

    // It's the difficulty of the level
    this.difficulty = difficulty;
}

/**
 * Level Generator Class Prototype
 */
LevelGenerator.prototype = {

    /**
     * Get both number of rows and number of cols from puzzle
     * There are 4 kinds of difficulty -Easy-Medium-Hard-Expert-
     * @returns [int,int]
     */
    getPuzzleSize: function() {

        // Compute the range values
        var maxSize = this.difficulty === 'easy' ? 3 : this.difficulty === 'medium' ? 4 : this.difficulty === 'hard' ? 5 : 6;
        var minSize = this.difficulty === 'easy' ? 2 : this.difficulty === 'medium' ? 2 : this.difficulty === 'hard' ? 3 : 4;

        // Assign both the number of rows and columns
        var numRows = Math.round(Math.random() * (maxSize - minSize) + minSize);
        var numCols = Math.round(Math.random() * (maxSize - minSize) + minSize);

        return [numRows, numCols];
    },


    /**
     * Get puzzle colors depending on the puzzle size
     * @param size
     * @returns {Array}
     */
    getPuzzleColors: function(size) {

        // Values
        var genericColors = ["R", "B", "Y", "G", "O", "M"];
        var colors = [], numColors;
        var numRows = size[0], numCols = size[1];
        var puzzleSize = numRows * numCols;

        // Assign the amount of colors depending on the size of the puzzle
        if (puzzleSize > 25) numColors = Math.round(Math.random() * (6 - 2) + 2);
        else if (puzzleSize > 20) numColors = Math.round(Math.random() * (5 - 2) + 2);
        else if (puzzleSize > 15) numColors = Math.round(Math.random() * (4 - 2) + 2);
        else if (puzzleSize > 8) numColors = Math.round(Math.random() * (3 - 2) + 2);
        else numColors = 2;

        // Fill the color array
        while (colors.length < numColors) {

            // Generate a random color
            var color = genericColors[Math.round(Math.random() * (genericColors.length - 1))];

            // Add to array whether it's not contained
            if (colors.indexOf(color) < 0) {
                colors.push(color);
            }
        }

        // Error if there are less than two colors
        if (colors.length < 1) {
            alert("Error number of colors!");
        }

        return colors;

    },

    /**
     * Get random scope of characters depending on a simple random number
     * @returns {*}
     */
    getCharacterScope: function () {

        // Get a random number between 0-100
        var randNumCharacter = Math.round(Math.random() * (100 - 1));
        var scope;

        // There is a 15% chance that the character has scope 3
        if (randNumCharacter > 85) {
            scope = "3";
        }

        // There is a 30% chance that the character has scope 3
        else if (randNumCharacter > 55) {
            scope = "2";
        }

        // There is a 55% chance that the character has scope 3
        else {
            scope = "1";
        }

        return scope;
    },

    /**
     * Add color to puzzle
     * @param puzzleArray
     * @param colors
     */
    addCharacterColor: function(puzzleArray, colors) {

        // Get the number of involved colors
        var numColors = colors.length;

        // Equitable amount of colors
        var colorsPosition = Math.ceil((puzzleArray.length) / numColors);
        var colorsStatic = colorsPosition;
        var numColor = 0;

        // Assign the color depending on the color position and the number of the current color
        for (var i = 0; i < puzzleArray.length; i++) {

            // Changing the color whether the index is greater than the color-position
            if (i >= colorsPosition) {
                colorsPosition += colorsStatic;

                if (numColor < numColors -1)
                    numColor++;
            }

            // Add the color to the square
            if (puzzleArray[i] !== Util.Constants.WALL && puzzleArray[i] !== Util.Constants.BLANK) {
                puzzleArray[i] += colors[numColor];
            }
        }

        return this.checkColorsLength(puzzleArray);
    },

    /**
     * Check whether or not the amount of color is OK
     * @param array
     */
    checkColorsLength: function(array) {

        var arrayCont = [];

        for (var i = 0; i < array.length; i++) {

            if (array[i] !== Util.Constants.WALL && array[i] !== Util.Constants.BLANK) {
                if (arrayCont.indexOf(array[i][2]) < 0) {
                    arrayCont.push(array[i][2]);

                }
            }
        }

        return arrayCont.length > 1;
    },


    /**
     * Generate the level array that afterwards it'll be converted into a matrix
     * @param distribution
     * @param colors
     * @param numRows
     * @param numCols
     * @returns {Array}
     */
    getGeneratedArray: function (distribution, colors, numRows, numCols) {

        // get the size and generate an empty array that's gonna hold the generated puzzle
        var size = numRows * numCols;
        var puzzleArray = [];

        // Get the number of blocks
        var numBlocks = Math.round(distribution.blockPercentage * size / 100);

        // Need to correct the block amount because of the puzzle size
        // It's much better do it specially referring to small puzzles
        if (size <= 6) {
            numBlocks = 0;
        } else if (size < 9) {
            numBlocks = Math.round(Math.random()); // 0 or 1
        }

        // Get the rest of characters' amount
        var numQueens = Math.round(distribution.queenPercentage * size / 100);
        var numBishops = Math.round(distribution.bishopPercentage * size / 100);
        var numTowers = size - numBlocks - numQueens - numBishops;

        // Add the characters to the puzzle
        for (var _ = 0; _ < numBlocks; _++) puzzleArray.push(Util.Constants.WALL);
        for (var _ = 0; _ < numQueens; _++) puzzleArray.push("Q" + this.getCharacterScope());
        for (var _ = 0; _ < numBishops; _++) puzzleArray.push("B" + this.getCharacterScope());
        for (var _ = 0; _ < numTowers; _++) puzzleArray.push("T" + this.getCharacterScope());

        // Shuffle the puzzle before adding the colors
        Util.arrayShuffle(puzzleArray);

        // Add colors to the puzzle
        if (!this.addCharacterColor(puzzleArray, colors)) {
            alert("Recursion color");
            var newColors = this.getPuzzleColors([numRows, numCols]);
            return this.getGeneratedArray(distribution, newColors, numRows, numCols);
        }

        // Shuffle the puzzle after adding the colors
        Util.arrayShuffle(puzzleArray);

        // In this point, we have the one-dimensional puzzle
        return puzzleArray;
    },

    /**
     * Get 2-dimensional puzzle from array
     * @param array
     * @param numRows
     * @param numCols
     * @returns {Array}
     */
    getPuzzleFromArray: function (array, numRows, numCols) {

        // Create the array that's gonna hold the puzzle
        var puzzle = [];
        var offset = 0;

        // Fill the array with sub-arrays depending on the column size
        for (var row = 0; row < numRows; row++) {

            puzzle.push(array.slice(offset, numCols + offset));
            offset += numCols;
        }

        return puzzle;
    },

    /**
     * Get the goal array
     * @param array
     * @returns {Array}
     */
    getGoalArray: function(array) {

        do {
            // Get a clone of start array
            var clone = Util.arrayCopy(array);

            // Shuffling the clone but the blocks
            Util.arrayShuffleWithNeedle(clone, Util.Constants.WALL);

            // Get the array colors
            var arrayColor = Util.getArrayColor(array);
            var cloneColor = Util.getArrayColor(clone);

        } while(Util.arrayEquals(arrayColor, cloneColor));

        // Goal array
        var goal = [];

        // Fill the goal array out
        for (var i = 0; i < clone.length; i++) {
            goal[i] = clone[i][2];
        }

        return goal;
    },


    /**
     * Show console execution
     * @param rows
     * @param cols
     * @param colors
     * @param distribution
     * @param array
     * @param puzzle
     * @param numRecursiveCalls
     * @param goal
     */
    showLevelFeatures: function(rows, cols, colors, distribution, array, puzzle, numRecursiveCalls, goal) {

        console.log("");
        console.log("Puzzle distribution percentages:");
        console.log("Queen percentage: " + distribution.queenPercentage + "%");
        console.log("Bishop percentage: " + distribution.bishopPercentage + "%");
        console.log("Tower percentage: " + (100 - distribution.queenPercentage - distribution.bishopPercentage - distribution.blockPercentage) + "%");
        console.log("Block percentage: " + distribution.blockPercentage + "%");
        console.log("");
        console.log("Difficulty level: " + this.difficulty);
        console.log("Number of rows: " + rows);
        console.log("Number of columns: " + cols);
        console.log("");
        console.log("Is connected: true");
        console.log("Number of recursive calls needed: " + numRecursiveCalls);
        console.log("");
        console.log("Colors (" + colors.length + "): " + "[" + colors + "]");
        console.log("Puzzle as array: [" + array + "]");
        console.log("");
        console.log("Start state:");
        console.log(puzzle);
        console.log("Goal state:");
        console.log(goal);
        console.log("");
    },

    /**
     * Level generator
     * @param showFeatures
     * @param difficult
     * @returns {[null,null]}
     */
    getGeneratedLevel: function(showFeatures) {

        // Get a distribution puzzle
        var distribution = this.getPuzzleDistribution();

        // Get the puzzle size depending on the difficulty
        var size = this.getPuzzleSize();

        // get the colors depending on the size which depends on the difficulty
        var colors = this.getPuzzleColors(size);
        var puzzle, puzzleArray;

        // Counting the necessary recursive calls
        var numRecursiveCalls = 0;

        // Do it until the puzzle is absolutely connected
        do {
            puzzleArray = this.getGeneratedArray(distribution, colors, size[0], size[1]);
            puzzle = this.getPuzzleFromArray(puzzleArray, size[0], size[1]);
            numRecursiveCalls++;
        }
        while (!SearchAlgorithms.isConnectedPuzzle(puzzle));

        // Get the goal array
        var goalArray = this.getGoalArray(puzzleArray);

        // Convert the goal array into a matrix
        var goal = this.getPuzzleFromArray(goalArray, size[0], size[1]);

        // Show the computes
        if (showFeatures) {
            this.showLevelFeatures(size[0], size[1], colors, distribution, puzzleArray, puzzle, numRecursiveCalls, goal);
        }

        // returning both puzzles start and goal
        return [puzzle, goal];
    },

    /**
     * Get one of the predetermined possible distributions
     * @returns {*}
     */
    getPuzzleDistribution: function () {

        // Distributions
        var distribution_1 = {blockPercentage: 20, bishopPercentage: 20, queenPercentage: 10};
        var distribution_2 = {blockPercentage: 30, bishopPercentage: 10, queenPercentage: 20};
        var distribution_3 = {blockPercentage: 10, bishopPercentage: 20, queenPercentage: 20};
        var distribution_4 = {blockPercentage: 5, bishopPercentage: 30, queenPercentage: 15};
        var distribution_5 = {blockPercentage: 30, bishopPercentage: 20, queenPercentage: 10};
        var distribution_6 = {blockPercentage: 0, bishopPercentage: 20, queenPercentage: 30};
        var distribution_7 = {blockPercentage: 10, bishopPercentage: 15, queenPercentage: 25};
        var distribution_8 = {blockPercentage: 5, bishopPercentage: 5, queenPercentage: 5};
        var distribution_9 = {blockPercentage: 5, bishopPercentage: 0, queenPercentage: 0};
        var distribution_10 = {blockPercentage: 45, bishopPercentage: 0, queenPercentage: 55};

        // Make array with the distributions
        var distributions = [distribution_1, distribution_2, distribution_3, distribution_4, distribution_5,
            distribution_6, distribution_7, distribution_8, distribution_9, distribution_10];

        // Get a random number
        var randNum = Math.round(Math.random() * ((distributions.length - 1)));

        // return a random distribution
        //return distribution_9;
        return distributions[randNum];

    },

    /**
     * Static method that returns the best solution
     * @param solutions
     * @returns {Array}
     */
    getBestSolution: function(solutions) {

        var bestSolutionSize = Infinity;
        var bestSolution = [];

        for (var key in solutions) {

            if (solutions.hasOwnProperty(key)) {

                if (solutions[key].length < bestSolutionSize && solutions[key].length > 0) {
                    bestSolutionSize = solutions[key].length;
                    bestSolution = solutions[key];
                }
            }
        }
        return bestSolution
    }

};