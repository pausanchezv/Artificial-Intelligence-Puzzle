/**
 * Level Generator Class Constructor
 *
 * @param difficult
 * @constructor
 */
function LevelGenerator(difficult) {

    // It's the difficulty of the level
    this.difficult = difficult;

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
    getPuzzleSize: function(difficult) {

        // Difficulty will be 'hard' if it's not defined
        if (difficult === undefined) {
            difficult = 'expert';
        }

        // Compute the range values
        var maxSize = difficult === 'easy' ? 3 : difficult === 'medium' ? 4 : difficult === 'hard' ? 5 : 6;
        var minSize = difficult === 'easy' ? 2 : difficult === 'medium' ? 2 : difficult === 'hard' ? 3 : 4;

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
    getPuzzleColors: function (size) {

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
    getCharacterColor: function(puzzleArray, colors) {

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
                numColor++;
            }

            // Add the color to the square
            if (puzzleArray[i] !== Util.Constants.WALL) {
                puzzleArray[i] += colors[numColor];
            }
        }
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
        this.getCharacterColor(puzzleArray, colors);

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
            Util.arrayShuffle2(clone, Util.Constants.WALL);

            // Get the array colors
            var arrayColor = Util.getArrayColor(array);
            var cloneColor = Util.getArrayColor(clone);

            // Temp prints
            console.log("AQUI");
            console.log(arrayColor);
            console.log(cloneColor);

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

        console.log("Puzzle distribution percentages:");
        console.log("Queen percentage: " + distribution.queenPercentage + "%");
        console.log("Bishop percentage: " + distribution.bishopPercentage + "%");
        console.log("Tower percentage: " + (100 - distribution.queenPercentage - distribution.bishopPercentage - distribution.blockPercentage) + "%");
        console.log("Block percentage: " + distribution.blockPercentage + "%");
        console.log("");
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
    },


    /**
     * Level generator
     * @param showFeatures
     * @param difficult
     * @returns {[null,null]}
     */
    getGeneratedLevel: function(showFeatures, difficult) {

        // The difficulty will be expert whether it's not defined
        if (difficult === undefined) {
            difficult = 'expert';
        }

        // Get a distribution puzzle
        var distribution = this.getPuzzleDistribution();

        // Get the puzzle size depending on the difficulty
        var size = this.getPuzzleSize(difficult);

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

        // Make array with the distributions
        var distributions = [distribution_1, distribution_2, distribution_3, distribution_4, distribution_5,
            distribution_6, distribution_7, distribution_8, distribution_9];

        // Get a random number
        var randNum = Math.round(Math.random() * ((distributions.length - 1)));

        // return a random distribution
        return distributions[randNum];

    },

};