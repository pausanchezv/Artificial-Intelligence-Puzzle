
//$(document).ready(function(){

    /**
     * Action Class Constructor
     *
     * @param direction
     * @param value
     * @param position
     * @constructor
     */
    function Action(direction, value, position) {

        // Action attributes
        this.direction = direction;
        this.value = value;
        this.position = position;
    }

    /**
     * Action Prototype Class
     */
    Action.prototype = {

        /**
         * Direction getter
         */
        getDirection: function () {
            return this.direction;
        },

        /**
         * Value getter
         */
        getValue: function () {
            return this.value;
        },

        /**
         * Position getter
         */
        getPosition: function () {
            return this.position;
        }
    };


    /**
     * Color Class Constructor
     */
    function Color(puzzle) {

        this.color = this.addColor(puzzle);
    }

    /**
     * Color Prototype Class
     */
    Color.prototype = {

        /**
         * Get puzzle color
         *
         * @param puzzle
         * @returns {*}
         */
        addColor: function(puzzle) {

            // Create a copy of the current puzzle
            var color_puzzle = Util.createPuzzleCopy(puzzle);

            // Fill the copy with the same elements
            for (var i = 0; i < color_puzzle.length; i++) {
                for (var j = 0; j < color_puzzle.length; j++) {
                    color_puzzle[i][j] = color_puzzle[i][j][2];
                }
            }

            return color_puzzle;
        },

        /**
         * Color getter
         * @returns {*}
         */
        getColor: function() {
            return this.color;
        },

        /**
         *
         * @param other
         */
        equals: function(other) {

            // Get the value type
            var type = Object.prototype.toString.call(this.color);

            // Return whether the type is not an array
            if (type !== '[object Array]') return false;

            // If the two objects are not the same type, return false
            if (type !== Object.prototype.toString.call(other.color)) return false;

            // Compare the length of the length of the two items
            if (this.color.length !== other.color.length) return false;

            // Compare the values of the puzzle
            for (var i = 0; i < this.color.length; i++) {

                // Return if there are rows with different size
                if (this.color[i].length !== other.color[i].length) return false;

                // Compare the positions individually
                for (var j = 0; j < other.color.length; j++) {
                    if (this.color[i][j] !== other.color[i][j]) return false;
                }
            }

            return true;
        }

    };


    /**
     * Puzzle Class Constructor
     *
     * @param puzzle
     * @constructor
     */
    function Puzzle(puzzle) {

        // Attributes
        this.puzzle = puzzle;
        this.color = new Color(puzzle);
        this.numRows = this.puzzle.length;
        this.numCols = this.puzzle[0].length;
    }

    /**
     * Puzzle Prototype Class
     */
    Puzzle.prototype = {

        /**
         * Puzzle getter
         */
        getPuzzle: function () {
            return this.puzzle;
        },

        /**
         * Color getter
         */
        getColor: function () {
            return this.color;
        },

        /**
         * Number of rows
         */
        getNumRows: function () {
            return this.numRows;
        },

        /**
         * Number of cols
         */
        getNumCols: function () {
            return this.numCols;
        },

        /**
         * Check whether a coordinate contains either block or blank
         */
        containsWall: function (row, col) {
            return this.puzzle[row][col] === Util.Constants.WALL || this.puzzle[row][col] === Util.Constants.BLANK;
        },


        /**
         * Puzzle equals method
         *
         * @param other
         * @returns {boolean}
         */
        equals: function (other) {

            // Get the value type
            var type = Object.prototype.toString.call(this.puzzle);

            // Return whether the type is not an array
            if (type !== '[object Array]') return false;

            // If the two objects are not the same type, return false
            if (type !== Object.prototype.toString.call(other.puzzle)) return false;

            // Compare the length of the length of the two items
            if (this.puzzle.length !== other.puzzle.length) return false;

            // Compare the values of the puzzle
            for (var i = 0; i < this.puzzle.length; i++) {

                // Return if there are rows with different size
                if (this.puzzle[i].length !== other.puzzle[i].length) return false;

                // Compare the positions individually
                for (var j = 0; j < other.puzzle.length; j++) {

                    if (this.puzzle[i][j] !== other.puzzle[i][j]) return false;
                }
            }

            return true;
        }
    };


    /**
     * State Class Constructor
     *
     * @param puzzle
     * @param cost
     * @param parent
     * @param action
     * @constructor
     */
    function State(puzzle, cost, parent, action) {

        this.puzzle = new Puzzle(puzzle);
        this.cost = cost;
        this.parent = parent;
        this.action = action;
    }

    /**
     * State Prototype Class
     */
    State.prototype = {

        /**
         * Puzzle getter
         * @returns {Puzzle}
         */
        getPuzzle: function () {
            return this.puzzle;
        },

        /**
         * Cost getter
         * @param cost
         */
        setCost: function (cost) {
            this.cost = cost;
        },

        /**
         * Cost getter
         * @returns {*}
         */
        getCost: function () {
            return this.cost;
        },

        /**
         * Action getter
         * @returns {*}
         */
        getAction: function () {
            return this.action;
        },

        /**
         * Action setter
         * @param action
         */
        setAction: function (action) {
            this.action = action;
        },

        /**
         * Parent getter
         * @returns {*}
         */
        getParent: function () {
            return this.parent;
        },

        /**
         * Parent setter
         * @param parent
         */
        setParent: function (parent) {
            this.parent = parent;
        },

        /**
         * State equals
         *
         * @param other
         * @returns {*}
         */
        equals: function (other) {

            // Get the value type
            var type = Object.prototype.toString.call(this.puzzle);

            // If the two objects are not the same type, return false
            if (type !== Object.prototype.toString.call(other.puzzle)) return false;

            return other.getPuzzle().equals(this.puzzle);
        }

    };

//});