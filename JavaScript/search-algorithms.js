/*********************************************
 * JavaScript Search Algorithms
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
 * Depth First Search
 * Breadth First Search
 * Uniform Cost Search
 * A-Star Search
 *
 **********************************************/


/**
 * Search Algorithms Class Constructor
 */
var SearchAlgorithms = {

    // Declarations
    numExpandedStates: 0,
    maxExpandedStates: 5000,
    actions: [],
    puzzles: [],

    /**
     * Building the search solution
     * @param node
     * @param goal
     */
    constructSearchSolution: function(node, goal) {

        do {
            // Push the new action
            SearchAlgorithms.actions.push(node.getAction());
            SearchAlgorithms.puzzles.push(node.getPuzzle());
            node = node.getParent();
        }

        // Traverse through the node whilst it has parent
        while (node.getParent() !== null);

        // Reverse the solution arrays
        SearchAlgorithms.actions.reverse();
        SearchAlgorithms.puzzles.reverse();

        // If the expected color is not equal to goal, then empty the arrays
        var expected = SearchAlgorithms.puzzles[SearchAlgorithms.puzzles.length - 1].getColor().getColor();
        for (var i = 0; i < goal.length; i++) {
            for (var j = 0; j < goal[0].length; j++) {
                if (expected[i][j] !== goal[i][j]) {
                    SearchAlgorithms.actions = [];
                    SearchAlgorithms.puzzles = [];
                }
            }
        }
    },

    /**
     * Compute the cost of the state
     * @param node
     * @param neighbor
     * @returns {*}
     */
    getCost: function(node, neighbor) {

        var cost = node.getCost() + 1;

        if (cost < neighbor.getCost()) {
            neighbor.setCost(cost);
            neighbor.setParent(node);
        }

        return cost
    },

    /**
     * Breadth First Search Algorithm
     *
     * @param start
     * @param goal
     * @returns {*}
     */
    breadthFirstSearch: function(start, goal) {

        // A couple of arrays are gonna hold both the queue and the visited nodes
        var queue = [start], visited = [];

        // Compute the algorithm until the queue is empty
        while (queue.length > 0) {

            // Get the node and its color
            var node = queue.shift();
            var color = node.getPuzzle().getColor();

            // Check if the color matrix is found in visited array
            if (!Util.checkIfArrayContainsMatrix(visited, node.getPuzzle())) {

                // Expanded states control
                SearchAlgorithms.numExpandedStates++;
                if (SearchAlgorithms.numExpandedStates > SearchAlgorithms.maxExpandedStates) {
                    return [];
                }

                // Return the solution
                if (Util.matrixEquals(color.getColor(), goal)) {
                    return SearchAlgorithms.constructSearchSolution(node, goal);
                }

                visited.push(node.getPuzzle());

                var successors = getSuccessors(node, getActions(node));

                // Expand the node's children
                for (var i in successors) {

                    var neighbor = successors[i];

                    // Compute the neighbor's parent
                    if (!Util.checkIfArrayContainsMatrix(visited, neighbor.getPuzzle()) && neighbor.getParent() === null) {
                        neighbor.setParent(node);
                    }
                    queue.push(neighbor);
                }
            }
        }
        return [];
    },

    /**
     * Breadth First Search Algorithm
     *
     * @param start
     * @param goal
     * @returns {*}
     */
    uniformCostSearch: function(start, goal) {

        // A Binary Heap is gonna hold the queue
        var queue = new BinaryHeap();
        queue.push([start, 0]);

        // Array of visited nodes
        var visited = [];

        // Compute the algorithm until the queue is empty
        while (queue.content.length > 0) {

            // Get the node and its color
            var node = queue.pop();
            var color = node.getPuzzle().getColor();

            // Check if the color matrix is found in visited array
            if (!Util.checkIfArrayContainsMatrix(visited, node.getPuzzle())) {

                // Expanded states control
                SearchAlgorithms.numExpandedStates++;
                if (SearchAlgorithms.numExpandedStates > SearchAlgorithms.maxExpandedStates) {
                    return [];
                }

                // Return the solution
                if (Util.matrixEquals(color.getColor(), goal)) {
                    return SearchAlgorithms.constructSearchSolution(node, goal);
                }

                visited.push(node.getPuzzle());

                var successors = getSuccessors(node, getActions(node));

                // Expand the node's children
                for (var i in successors) {

                    var neighbor = successors[i];

                    SearchAlgorithms.getCost(node, neighbor);
                    queue.push([neighbor, neighbor.getCost()]);
                }
            }
        }
        return [];
    },

    /**
     * Breadth First Search Algorithm
     *
     * @param start
     * @param goal
     * @param heuristic
     * @returns {*}
     */
    AStarSearch: function(start, goal, heuristic) {

        // A Binary Heap is gonna hold the queue
        var queue = new BinaryHeap();

        queue.push([start, 0]);

        // Array of visited nodes
        var visited = [];

        // Compute the algorithm until the queue is empty
        while (!queue.isEmpty()) {

            // Get the node and its color
            var node = queue.pop();
            var color = node.getPuzzle().getColor();

            // Check if the color matrix is found in visited array
            if (!Util.checkIfArrayContainsMatrix(visited, node.getPuzzle())) {

                // Expanded states control
                SearchAlgorithms.numExpandedStates++;
                if (SearchAlgorithms.numExpandedStates > SearchAlgorithms.maxExpandedStates) {
                    return [];
                }

                // Return the solution
                if (Util.matrixEquals(color.getColor(), goal)) {
                    return SearchAlgorithms.constructSearchSolution(node, goal); //TODO: don't pass goal state
                }

                visited.push(node.getPuzzle());

                var successors = getSuccessors(node, getActions(node));

                // Expand the node's children
                for (var i in successors) {

                    // Get the neighbor
                    var neighbor = successors[i];

                    // Compute the neighbor's cost
                    var cost = SearchAlgorithms.getCost(node, neighbor);

                    // Compute the heuristic
                    var heuristicValue = heuristic(neighbor.getPuzzle().getPuzzle(), goal);

                    // Add neighbor to the heap
                    queue.push([neighbor, cost + heuristicValue]);
                }
            }
        }

        return [];
    },


    /**
     * Traversal depth first search which is not a search algorithm here!
     * @param graph
     * @param start
     * @returns {Array}
     */
    depthFirstSearch: function(graph, start) {

        // A couple of arrays are gonna hold both the queue and the visited nodes
        var stack = [start], visited = [];

        // Compute the algorithm until the queue is empty
        while (stack.length > 0) {

            // Get the last node
            var node = stack.pop();

            // Pushing the node to visited array
            if (visited.indexOf(node) < 0) {
                visited.push(node);
            }

            // get the node's neighbors
            var neighbors = graph.neighbors(node);

            // Traverse through the neighbors
            for (var i = 0; i < neighbors.length; i++) {

                // get the neighbor
                var neighbor = neighbors[i];

                // Push the neighbors to the stack
                if (visited.indexOf(neighbor) < 0) {
                    stack.push(neighbor);
                }
            }
        }

        return visited;
    },

    /**
     * Verifying whether or not a puzzle is connected
     * @param puzzle
     * @returns {boolean}
     */
    isConnectedPuzzle: function(puzzle) {

        // Create a test state
        var testState = new State(puzzle, 0, null);

        // Create the graph
        var graph = new Graph();

        // Add edges to graph
        Util.addPuzzleEdges(graph, testState);

        // Depth first search
        var dfsPath = SearchAlgorithms.depthFirstSearch(graph, graph.getAnyNode());

        // Return connectivity
        return dfsPath.length === testState.getPuzzle().getNumCharactersNotWall();

    }

};

/**
 * SearchProblem Class Constructor
 *
 * @param startPuzzle
 * @param goalPuzzle
 * @param searchAlgorithm
 * @param heuristic
 * @constructor
 */
function SearchProblem(startPuzzle, goalPuzzle, searchAlgorithm, heuristic) {

    var startState = new State(startPuzzle, 0, null);
    this.cleanVariables();

    // If there is heuristic then the A-Star algorithm is involved in the search
    if (heuristic === undefined) {
        searchAlgorithm(startState, goalPuzzle);

        // Depth First Search, Breadth First Search or Uniform Cost Search
    } else {
        searchAlgorithm(startState, goalPuzzle, heuristic);
    }
}

/**
 * SearchProblem Class Prototype
 */
SearchProblem.prototype = {

    cleanVariables: function() {
        SearchAlgorithms.numExpandedStates = 0;
        SearchAlgorithms.actions = [];
        SearchAlgorithms.puzzles = [];

    },

    /**
     * Get the number of states expanded for an specific search problem
     * @returns {number}
     */
    getNumExpandedStates: function() {
        return SearchAlgorithms.numExpandedStates;
    },

    /**
     * Num actions getter
     * @returns {number}
     */
    getNumActions: function() {
        return SearchAlgorithms.actions.length;
    },

    /**
     * Solution
     * @returns {Array}
     */
    getSolution: function() {
        return SearchAlgorithms.actions;
    },

    /**
     * Show the result of the problem
     */
    showResult: function() {

        /*for (var i = 0; i < this.getNumActions(); i++) {
            console.log(SearchAlgorithms.actions[i]);
            console.log(SearchAlgorithms.puzzles[i]);
        }*/

        console.log("");
        console.log("A* Search");
        console.log("Number of actions: " + this.getNumActions());
        console.log("Number of states expanded: " + this.getNumExpandedStates());
    }
};


/**
 * Static functions and utilities
 */
var Util = {

    /**
     * Constants
     */
    Constants: {
        WALL: "###",
        BLANK: "..."
    },

    /**
     * Create a clone of a given puzzle
     */
    createPuzzleCopy: function (puzzle) {

        var new_puzzle = [];
        var num_rows = puzzle.length, num_cols = puzzle[0].length;

        for (var i = 0; i < num_rows; i++) {

            var row = [];

            for (var j = 0; j < num_cols; j++) {
                row.push(puzzle[i][j]);
            }

            new_puzzle.push(row);
        }

        return new_puzzle;
    },

    /**
     * Array shuffle.
     */
    arrayShuffle: function (array) {

        var j, x, i;
        for (i = array.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = array[i];
            array[i] = array[j];
            array[j] = x;
        }
    },

    /**
     * Array shuffle.
     */
    arrayShuffleWithNeedle: function (array, needle) {

        var j, x, i;
        for (i = array.length - 1; i > 0; i--) {

            /*do {
                j = Math.floor(Math.random() * (i + 1));
            } while (array[j] === needle);*/
            j = Math.floor(Math.random() * (i + 1));
            if (array[i] !== needle && array[j] !== needle) {

                x = array[i];
                array[i] = array[j];
                array[j] = x;
            }
        }
    },

    /**
     * Add successor to state successors
     *
     * @private
     */
    addSuccessor: function (newPuzzle, successors, action, row, col) {

        // First of all the Action is created
        var newAction = new Action(action.getDirection(), action.getValue(), [row, col]);

        // The action object allows us to create the successor
        var successor = new State(newPuzzle, Infinity, null, newAction);

        // check if the puzzle is already in successors
        if (!this.checkIfArrayContainsMatrix(successors, successor)) {
            successors.push(successor);
        }
    },

    /**
     * Check if array contains matrix
     *
     * @param array
     * @param matrix
     * @returns {boolean}
     */
    checkIfArrayContainsMatrix: function (array, matrix) {

        for (var i = 0; i < array.length; i++) {
            if (array[i].equals(matrix)) {
                return true;
            }
        }
        return false;
    },


    /**
     * Check whether or not a couple of matrices are equal
     * @param A
     * @param B
     * @returns {boolean}
     */
    matrixEquals: function (A, B) {

        for (var i = 0; i < A.length; i++) {
            for (var j = 0; j < A[0].length; j++) {
                if (A[i][j] !== B[i][j]) {
                    return false;
                }
            }
        }
        return true;
    },

    /**
     * Check whether or not a couple of arrays are equal
     * @param A
     * @param B
     * @returns {boolean}
     */
    arrayEquals: function(A, B) {
        for (var i = 0; i < A.length; i++) {
            if (A[i] !== B[i]) {
                return false;
            }
        }
        return true;
    },

    /**
     * Make array copy
     * @param array
     */
    arrayCopy: function(array) {

        var clone = [];

        for (var i = 0; i < array.length; i++) {
            clone[i] = array[i];
        }
        return clone;

    },

    /**
     * Get Array Color
     * @param array
     * @returns {Array}
     */
    getArrayColor: function(array) {

        var color = [];

        for (var i = 0; i < array.length; i++) {
            color[i] = array[i][2];
        }
        return color;

    },

    /**
     * Add edges to puzzle
     * @param graph
     * @param state
     */
    addPuzzleEdges : function(graph, state) {

        var puzzle = state.getPuzzle();

        for (var row = 0; row < puzzle.getNumRows(); row++) {
            for (var col = 0; col < puzzle.getNumCols(); col++) {

                if (!puzzle.containsWall(row, col)) {

                    // perpendicular
                    if (!puzzle.containsWall(row - 1, col) && !graph.hasEdge(row.toString() + col.toString(), (row - 1).toString() + col.toString()))
                        graph.addEdge(row.toString() + col.toString(), (row - 1).toString() + col.toString());

                    if (!puzzle.containsWall(row + 1, col) && !graph.hasEdge(row.toString() + col.toString(), (row + 1).toString() + col.toString()))
                        graph.addEdge(row.toString() + col.toString(), (row + 1).toString() + col.toString());

                    if (!puzzle.containsWall(row, col - 1) && !graph.hasEdge(row.toString() + col.toString(), row.toString() + (col - 1).toString()))
                        graph.addEdge(row.toString() + col.toString(), row.toString() + (col - 1).toString());

                    if (!puzzle.containsWall(row, col + 1) && !graph.hasEdge(row.toString() + col.toString(), row.toString() + (col + 1).toString()))
                        graph.addEdge(row.toString() + col.toString(), row.toString() + (col + 1).toString());

                    // diagonals
                    if (!puzzle.containsWall(row + 1, col + 1) && !graph.hasEdge(row.toString() + col.toString(), (row +  1).toString() + (col + 1).toString()))
                        graph.addEdge(row.toString() + col.toString(), (row +  1).toString() + (col + 1).toString());

                    if (!puzzle.containsWall(row + 1, col - 1) && !graph.hasEdge(row.toString() + col.toString(), (row +  1).toString() + (col - 1).toString()))
                        graph.addEdge(row.toString() + col.toString(), (row +  1).toString() + (col - 1).toString());

                    if (!puzzle.containsWall(row - 1, col + 1) && !graph.hasEdge(row.toString() + col.toString(), (row -  1).toString() + (col + 1).toString()))
                        graph.addEdge(row.toString() + col.toString(), (row -  1).toString() + (col + 1).toString());

                    if (!puzzle.containsWall(row - 1, col - 1) && !graph.hasEdge(row.toString() + col.toString(), (row -  1).toString() + (col - 1).toString()))
                        graph.addEdge(row.toString() + col.toString(), (row -  1).toString() + (col - 1).toString());

                }
            }
        }
    }
};


/**
 * Returns the possible actions from an specific state
 *
 * @param state
 */
function getActions(state) {

    // Get the state puzzle
    var puzzle = state.getPuzzle();

    // Get both number of rows and number of columns
    var numRows = puzzle.getNumRows(), numCols = puzzle.getNumCols();

    // A dictionary is gonna hold the actions depending on the key
    // In this way the same key will be able to hold different actions
    var actions = {};

    // Traverse the puzzle of the state
    for (var row = 0; row < numRows; row++) {
        for (var col = 0; col < numCols; col++) {

            // The square is just the string extracted from the coordinates
            var square = puzzle.getPuzzle()[row][col];

            // An array is gonna hold the possible actions for each key
            actions[[row, col]] = [];

            // Straight actions
            if (puzzle.isTower(square) || puzzle.isQueen(square)) {

                // Adding distance 1
                if (puzzle.getScope(square) === '1' || puzzle.getScope(square) === '2' || puzzle.getScope(square) === '3') {

                    if (row > 0 && !puzzle.containsWall(row - 1, col)) {
                        actions[[row, col]].push(new Action("up", 1));
                    }

                    if (row < numRows - 1 && !puzzle.containsWall(row + 1, col)) {
                        actions[[row, col]].push(new Action("down", 1));
                    }

                    if (col > 0 && !puzzle.containsWall(row, col - 1)) {
                        actions[[row, col]].push(new Action("left", 1));
                    }

                    if (col < numCols - 1 && !puzzle.containsWall(row, col + 1)) {
                        actions[[row, col]].push(new Action("right", 1));
                    }
                }

                // Adding distance 2
                if (puzzle.getScope(square) === '2' || puzzle.getScope(square) === '3') {

                    if (row > 1 && !puzzle.containsWall(row - 2, col) && !puzzle.containsWall(row - 1, col)) {
                        actions[[row, col]].push(new Action("up", 2));
                    }

                    if (row < numRows - 2 && !puzzle.containsWall(row + 2, col) && !puzzle.containsWall(row + 1, col)) {
                        actions[[row, col]].push(new Action("down", 2));
                    }

                    if (col > 1 && !puzzle.containsWall(row, col - 2) && !puzzle.containsWall(row, col - 1)) {
                        actions[[row, col]].push(new Action("left", 2));
                    }

                    if (col < numCols - 2 && !puzzle.containsWall(row, col + 2) && !puzzle.containsWall(row, col + 1)) {
                        actions[[row, col]].push(new Action("right", 2));
                    }
                }

                // Adding distance 3
                if (puzzle.getScope(square) === '3') {

                    if (row > 2 && !puzzle.containsWall(row - 3, col) && !puzzle.containsWall(row - 2, col) && !puzzle.containsWall(row - 1, col)) {
                        actions[[row, col]].push(new Action("up", 3));
                    }

                    if (row < numRows - 3 && !puzzle.containsWall(row + 3, col) && !puzzle.containsWall(row + 2, col) && !puzzle.containsWall(row + 1, col)) {
                        actions[[row, col]].push(new Action("down", 3));
                    }

                    if (col > 2 && !puzzle.containsWall(row, col - 3) && !puzzle.containsWall(row, col - 2) && !puzzle.containsWall(row, col - 1)) {
                        actions[[row, col]].push(new Action("left", 3));
                    }

                    if (col < numCols - 3 && !puzzle.containsWall(row, col + 3) && !puzzle.containsWall(row, col + 2) && !puzzle.containsWall(row, col + 1)) {
                        actions[[row, col]].push(new Action("right", 3));
                    }
                }
            }

            // Diagonal actions
            if (puzzle.isBishop(square) || puzzle.isQueen(square)) {

                // Adding distance 1
                if (puzzle.getScope(square) === '1' || puzzle.getScope(square) === '2' || puzzle.getScope(square) === '3') {

                    if (row > 0 && col > 0 && !puzzle.containsWall(row - 1, col - 1)) {
                        actions[[row, col]].push(new Action("up-left", 1));
                    }

                    if (row < numRows - 1 && col > 0 && !puzzle.containsWall(row + 1, col - 1)) {
                        actions[[row, col]].push(new Action("down-left", 1));
                    }

                    if (col < numCols - 1 && row > 0 && !puzzle.containsWall(row - 1, col + 1)) {
                        actions[[row, col]].push(new Action("up-right", 1));
                    }

                    if (col < numCols - 1 && row < numRows - 1 && !puzzle.containsWall(row + 1, col + 1)) {
                        actions[[row, col]].push(new Action("down-right", 1));
                    }
                }

                // Adding distance 2
                if (puzzle.getScope(square) === '2' || puzzle.getScope(square) === '3') {

                    if (row > 1 && col > 1 && !puzzle.containsWall(row - 2, col - 2) && !puzzle.containsWall(row - 1, col - 1)) {
                        actions[[row, col]].push(new Action("up-left", 2));
                    }

                    if (row < numRows - 2 && col > 1 && !puzzle.containsWall(row + 2, col - 2) && !puzzle.containsWall(row + 1, col - 1)) {
                        actions[[row, col]].push(new Action("down-left", 2));
                    }

                    if (col < numCols - 2 && row > 1 && !puzzle.containsWall(row - 2, col + 2) && !puzzle.containsWall(row - 1, col + 1)) {
                        actions[[row, col]].push(new Action("up-right", 2));
                    }

                    if (col < numCols - 2 && row < numRows - 2 && !puzzle.containsWall(row + 2, col + 2) && !puzzle.containsWall(row + 1, col + 1)) {
                        actions[[row, col]].push(new Action("down-right", 2));
                    }
                }

                // Adding distance 3
                if (puzzle.getScope(square) === '3') {

                    if (row > 2 && col > 2 && !puzzle.containsWall(row - 3, col - 3) && !puzzle.containsWall(row - 2, col - 2) && !puzzle.containsWall(row - 1, col - 1)) {
                        actions[[row, col]].push(new Action("up-left", 3));
                    }

                    if (row < numRows - 3 && col > 2 && !puzzle.containsWall(row + 3, col - 3) && !puzzle.containsWall(row + 2, col - 2) && !puzzle.containsWall(row + 1, col - 1)) {
                        actions[[row, col]].push(new Action("down-left", 3));
                    }

                    if (col < numCols - 3 && row > 2 && !puzzle.containsWall(row - 3, col + 3) && !puzzle.containsWall(row - 2, col + 2) && !puzzle.containsWall(row - 1, col + 1)) {
                        actions[[row, col]].push(new Action("up-right", 3));
                    }

                    if (col < numCols - 3 && row < numRows - 3 && !puzzle.containsWall(row + 3, col + 3) && !puzzle.containsWall(row + 2, col + 2) && !puzzle.containsWall(row + 1, col + 1)) {
                        actions[[row, col]].push(new Action("down-right", 3));
                    }
                }
            }
        }
    }

    return actions;
}


/**
 * Obtain the state successors
 *
 * @param state
 * @param actions
 * @returns {Array}
 */
function getSuccessors(state, actions) {

    // Array which will hold the successors of the state
    var successors = [];

    // Get the puzzle of the state
    var puzzle = state.getPuzzle().getPuzzle();

    // Traversing the actions
    for (var key in actions) {

        if (actions.hasOwnProperty(key)) {

            // Get the matrix both row and column
            key = key.split(',');
            var row = parseInt(key[0]), col = parseInt(key[1]);

            // Add the successors depending on the actions
            for (var i = 0; i < actions[key].length; i++) {

                // Get a puzzle copy
                var newPuzzle = Util.createPuzzleCopy(puzzle);

                // Get the action
                var action = actions[key][i];

                // Add straight successor
                if (action.direction === 'down') {

                    newPuzzle[row][col] = puzzle[row + action.value][col];
                    newPuzzle[row + action.value][col] = puzzle[row][col];

                    if (!state.equals(new State(newPuzzle))) {
                        Util.addSuccessor(newPuzzle, successors, action, row, col);
                    }
                }

                /// Add straight successor
                if (action.direction === 'up') {

                    newPuzzle[row][col] = puzzle[row - action.value][col];
                    newPuzzle[row - action.value][col] = puzzle[row][col];

                    if (!state.equals(new State(newPuzzle))) {
                        Util.addSuccessor(newPuzzle, successors, action, row, col);
                    }
                }

                // Add straight successor
                if (action.direction === 'left') {

                    newPuzzle[row][col - action.value] = puzzle[row][col];
                    newPuzzle[row][col] = puzzle[row][col - action.value];

                    if (!state.equals(new State(newPuzzle))) {
                        Util.addSuccessor(newPuzzle, successors, action, row, col);
                    }
                }

                // Add straight successor
                if (action.direction === 'right') {

                    newPuzzle[row][col] = puzzle[row][col + action.value];
                    newPuzzle[row][col + action.value] = puzzle[row][col];

                    if (!state.equals(new State(newPuzzle))) {
                        Util.addSuccessor(newPuzzle, successors, action, row, col);
                    }
                }

                // Add diagonal successor
                if (action.direction === 'down-left') {

                    newPuzzle[row][col] = puzzle[row + action.value][col - action.value];
                    newPuzzle[row + action.value][col - action.value] = puzzle[row][col];

                    if (!state.equals(new State(newPuzzle))) {
                        Util.addSuccessor(newPuzzle, successors, action, row, col);
                    }
                }

                // Add diagonal successor
                if (action.direction === 'down-right') {

                    newPuzzle[row][col] = puzzle[row + action.value][col + action.value];
                    newPuzzle[row + action.value][col + action.value] = puzzle[row][col];

                    if (!state.equals(new State(newPuzzle))) {
                        Util.addSuccessor(newPuzzle, successors, action, row, col);
                    }
                }

                // Add diagonal successor
                if (action.direction === 'up-left') {

                    newPuzzle[row][col] = puzzle[row - action.value][col - action.value];
                    newPuzzle[row - action.value][col - action.value] = puzzle[row][col];

                    if (!state.equals(new State(newPuzzle))) {
                        Util.addSuccessor(newPuzzle, successors, action, row, col);
                    }
                }

                // Add diagonal successor
                if (action.direction === 'up-right') {

                    newPuzzle[row][col] = puzzle[row - action.value][col + action.value];
                    newPuzzle[row - action.value][col + action.value] = puzzle[row][col];

                    if (!state.equals(new State(newPuzzle))) {
                        Util.addSuccessor(newPuzzle, successors, action, row, col);
                    }
                }
            }
        }
    }

    Util.arrayShuffle(successors);
    return successors;
}
