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
            for (var j = 0; j < color_puzzle[0].length; j++) {
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
            for (var j = 0; j < other.color[0].length; j++) {
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

        if (row < 0 || col < 0 || row > this.getNumRows() - 1 || col > this.getNumCols() - 1) {
            return true;
        }

        var containsWall = false;

        try {
            containsWall = this.puzzle[row][col] === Util.Constants.WALL || this.puzzle[row][col] === Util.Constants.BLANK;

        } catch (error) {
            containsWall = true;
        }

        return containsWall;
    },

    /**
     * Check if a square is a tower
     * @param square
     * @returns {boolean}
     */
    isTower: function(square) {
        return square[0] === 'T';
    },

    /**
     * Check if a square is a bishop
     * @param square
     * @returns {boolean}
     */
    isBishop: function(square) {
        return square[0] === 'B';
    },

    /**
     * Check if a square is a queen
     * @param square
     * @returns {boolean}
     */
    isQueen: function(square) {
        return square[0] === 'Q';
    },

    /**
     * get scope from square
     * @param square
     * @returns {*}
     */
    getScope: function(square) {
        return square[1];
    },

    /**
     * Count the number of the characters which are not either wall or blank
     * @returns {number}
     */
    getNumCharactersNotWall: function() {

        var num = 0;

        for (var i = 0; i < this.numRows; i++) {
            for (var j = 0; j < this.numCols; j++) {
                if (!this.containsWall(i, j)) {
                    num++;
                }
            }
        }
        return num;

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
            for (var j = 0; j < other.puzzle[0].length; j++) {

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


/**
 * Simple JavaScript Graph to check the puzzles' connections
 * It's a very very very simple graph version created just by checking whether a puzzle has solution or not
 * @constructor
 */
function Graph() {

    // Object that's gonna hold the nodes, each node will be a dictionary where the node will a key that'll have some attributes
    this.nodes = {};

    // Do the same for the edges
    this.edges = {};
}

/**
 * Graph Prototype Class
 */
Graph.prototype = {

    /**
     * Get nodes
     * @returns {{}|*}
     */
    getNodes: function() {
        return this.nodes;
    },

    /**
     * get edges
     * @returns {{}|*}
     */
    getEdges: function() {
        return this.edges;
    },

    /**
     * Add a node to the graph
     * @param x
     */
    addNode: function(x) {

        // Just assign a dictionary key to create a new node
        this.nodes[x] = {};
    },

    /**
     * Add an edge to the graph
     * @param x
     * @param y
     */
    addEdge: function(x, y) {

        if (!this.hasEdge(x, y)) {

            // Just assign a dictionary key to create the nodes
            this.addNode(x);
            this.addNode(y);

            // Do the same to add the edge
            this.edges[[x, y]] = {};
        }
    },

    /**
     * Return the node's successors (neighbors)
     * @param x
     * @returns {Array}
     */
    neighbors: function(x) {

        // Array that's gonna hold the neighbors found
        var neighbors = [];

        // Iterate through the graph edges
        for (var key in this.edges) {

            // Verifying whether or not the key exists
            if (this.edges.hasOwnProperty(key)) {

                // Split the key
                key = key.split(',');

                // Check whether is a neighbor or not
                if (key.indexOf(x) >= 0) {

                    // Add the neighbor to the array
                    var neighbor = key[0] === x ? key[1]: key[0];
                    neighbors.push(neighbor);
                }
            }

        }

        return neighbors;
    },

    /**
     * Check whether or not the graph has an specific edge
     * @param A
     * @param B
     * @returns {boolean}
     */
    hasEdge: function (A, B) {

        var found = false;

        for (var key in this.edges) {

            if (this.edges.hasOwnProperty(key)) {

                key = key.split(',');

                if ((key[0].toString() === A && key[1].toString() === B) || (key[0].toString() === B && key[1].toString() === A)) {
                    found = true;
                }
            }
        }

        return found;
    },

    /**
     * Number of nodes
     * @returns {number}
     */
    getNumNodes : function() {

        var cont = 0;

        // Iterate through the graph nodes
        for (var key in this.nodes) {

            // Verifying whether or not the key exists
            if (this.nodes.hasOwnProperty(key)) {
                cont++;
            }
        }
        return cont;
    },

    /**
     * Get any node
     * @returns {string}
     */
    getAnyNode: function() {

        // Iterate through the graph nodes
        for (var key in this.nodes) {

            // Verifying whether or not the key exists
            if (this.nodes.hasOwnProperty(key)) {

                // Returning the first node found
                return key.toString();
            }
        }
    }
};
