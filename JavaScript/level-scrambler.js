/*********************************************
 * Level Scrambler
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
 * Level Scrambler
 *
 * A scrambled level represents the second kind of generated levels. It starts from a goal state which has been previously created by a human.
 *
 * The first step that we have to do is to get a random goal created previously. The returned level will just have blocks and numbers.
 *
 * The easiest way to create this type of level is starting from natural numbers. If we suppose that a level contains just blocks and numbers, then it is so easy to convert the numbers to random colors.
 *
 * The next step involves creating a LevelGenerator object, since we can take advantage of some methods which are already implemented. The method I'm gonna use is one that returns the scope of the figure. At this time we don't know what figure we will have but it doesn't matter now. The only thing we want to do in this step is add the scope of the move.
 *
 * As far as the figure, it will be random according to the percentages that we have created, but these probabilities will ever be different from each other.
 *
 * Lastly, the start state is shuffled and then the levels are ready to be returned.
 *
 *********************************************/

/**
 *
 * @constructor
 */
function LevelScrambler(difficulty) {

    // It's the difficulty of the level
    this.difficulty = difficulty;

    // Difficulty will be 'hard' if it's not defined
    if (difficulty === undefined) {
        this.difficulty = 'expert';
    }

    // colors
    this.colors = [];

    // goals
    this.goals = this.getGoals();
}

/**
 * LevelScrambler Class Prototype
 */
LevelScrambler.prototype = {


    /**
     * Add color
     * @param matrix
     */
    addColor: function(matrix) {

        var genericColors = ["R", "B", "Y", "G", "O", "M"];
        Util.arrayShuffle(genericColors);

        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[0].length; j++) {
                if (matrix[i][j] !== '#') {

                    var color = genericColors[parseInt(matrix[i][j]) - 1];
                    matrix[i][j] = color;

                    if (this.colors.indexOf(color) < 0) {
                        this.colors.push(color);
                    }
                }
            }
        }
    },

    /**
     * Get random scope of characters depending on a simple random number
     * @returns {*}
     */
    addCharacterScope: function (generator, matrix) {

        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[0].length; j++) {
                if (matrix[i][j] !== '#') {
                    matrix[i][j] = generator.getCharacterScope() + matrix[i][j];
                } else {
                    matrix[i][j] = '#' + matrix[i][j];
                }
            }
        }
    },


    /**
     * Add figure
     * @param matrix
     */
    addCharacter: function(matrix) {

        var characters = ['T', 'B', 'Q'];
        Util.arrayShuffle(characters);

        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[0].length; j++) {
                if (matrix[i][j] !== '##') {

                    var num = Math.round(Math.random() * 100);

                    if (num > 80) {
                        matrix[i][j] = characters[0] + matrix[i][j];
                    } else if (num > 40) {
                        matrix[i][j] = characters[1] + matrix[i][j];
                    } else {
                        matrix[i][j] = characters[2] + matrix[i][j];
                    }

                } else {
                    matrix[i][j] = '#' + matrix[i][j];
                }
            }
        }
    },

    /**
     * Level Scrambler Generator
     * @returns {[null,null]}
     */
    getGeneratedLevel: function(showFeatures) {

        // Create level generator object in order to uses some of its methods
        var generator = new LevelGenerator();

        // Generate a random goal
        var goal = this.goals[Math.round(Math.random() * (this.goals.length - 1))];

        // Add color to goal
        this.addColor(goal);

        // Create start state starting from the goal state
        var start = Util.createPuzzleCopy(goal);

        // Add the scope of the figure
        this.addCharacterScope(generator, start);

        // Add the figure
        this.addCharacter(start);

        // Shuffle the start state
        Util.matrixShuffleWithNeedle(start);

        if (showFeatures)
            this.showLevelFeatures(start, goal);

        // Return the states
        return [start, goal];
    },

    /**
     * Show console execution
     * @param start
     * @param goal
     */
    showLevelFeatures: function(start, goal) {

        console.log("");
        console.log("Level's kind: Half random");
        console.log("Puzzle distribution percentages:");
        console.log("Queen percentage: predetermined");
        console.log("Bishop percentage: predetermined");
        console.log("Tower percentage: predetermined");
        console.log("Block percentage: predetermined");
        console.log("");
        console.log("Difficulty level: " + this.difficulty);
        console.log("Number of rows: " + start.length);
        console.log("Number of columns: " + start[0].length);
        console.log("");
        console.log("Colors (" + this.colors.length + "): " + "[" + this.colors + "]");
        console.log("");
        console.log("Start state:");
        console.log(start);
        console.log("Goal state:");
        console.log(goal);
        console.log("");
    },

    /**
     * Get predetermined goals
     */
    getGoals: function() {

        // Expert goals
        var expertGoals = [
            [['#', '#', '1', '1', '#', '#'],['#', '#', '1', '1', '#', '#'],['2', '2', '3', '3', '4', '4'],['2', '2', '3', '3', '4', '4'],['#', '#', '5', '5', '#', '#'], ['#', '#', '5', '5', '#', '#']],
            [['1', '1', '#', '#', '2', '2'],['1', '1', '#', '#', '2', '2'],['#', '#', '3', '3', '#', '#'],['#', '#', '3', '3', '#', '#'],['4', '4', '#', '#', '5', '5'], ['4', '4', '#', '#', '5', '5']],
            [['1', '1', '2', '3', '3'], ['1', '#', '2', '#', '3'], ['1', '#', '2', '#', '3'], ['1', '#', '2', '#', '3'], ['1', '#', '2', '#', '3'], ['1', '1', '2', '3', '3']],
            [['3', '3', '3', '3', '3', '3'], ['3', '#', '#', '#', '#', '3'], ['2', '2', '2', '2', '2', '2'], ['1', '#', '#', '#', '#', '1'], ['1', '1', '1', '1', '1', '1']],
            [['1', '1', '1', '1', '#'], ['1', '1', '1', '#', '2'], ['1', '1', '#', '2', '2'], ['1', '#', '2', '2', '2'], ['#', '2', '2', '2', '2']],
            [['#', '2', '2', '2', '2'], ['1', '#', '2', '2', '2'], ['1', '1', '#', '2', '2'], ['1', '1', '1', '#', '2'], ['1', '1', '1', '1', '#']],
            [['#', '#', '#', '1', '1', '1'],['#', '#', '#', '2', '2', '2'],['#', '#', '#', '3', '3', '3'],['4', '4', '4', '#', '#', '#'],['5', '5', '5', '#', '#', '#'], ['6', '6', '6', '#', '#', '#']],
            [['6', '5', '4', '#', '#', '#'],['6', '5', '4', '#', '#', '#'],['6', '5', '4', '#', '#', '#'],['#', '#', '#', '3', '2', '1'],['#', '#', '#', '3', '2', '1'], ['#', '#', '#', '3', '2', '1']]
        ];

        // declare the goal array
        var goals;

        // Add goals depending on the difficulty level
        switch (this.difficulty) {

            case "expert":
                goals = expertGoals;
                break;

            case "hard":
                goals = [];
                break;

            case "medium":
                goals = [];
                break;

            default:
                goals = [];
                break;
        }


        // Return the goals
        return goals;
    }
};
