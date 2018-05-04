/*********************************************
 * JavaScript Heuristic
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
 * Since the problem we are trying to solve is absolutely NP-HARD, we have to get an approximate solution because if we need a fast algorithm, then cannot spend much time expanding more nodes than the necessary ones.
 *
 * First of all I tried to get the best solution always, and I got it by using Backtracking techniques in the heuristic. But there is a problem: the heuristic is called for each node expansion, in our case, around 200 times for each expansion (it is brutally hard to solve). The backtracking was used to find the best square pairs which the distance among all of them was lower (it is another hard problem because you know what you want, but you have to explore all to find it).
 *
 * The truth is that it worked perfectly because the states were expanded following always the best path since the exhaustive search explores absolutely all the possibilities to select the best one. And it finds it! The problem was that even if including branch and bound techniques, the A* was not able to hold itself if the puzzle size was greater than 9-12 squares. I had imagined that it was going to happen, but anyway, it had to be tested to make me able to rest in peace.
 *
 * Finally a Greedy heuristic is used and it is really fast, so we can throw four distinct heuristics, then run four A* Search and finally choose the best solution. It is necessary to keep in mind that there are cases that for example, an heuristic based on the euclidean distance works better than the other one that uses manhattan distance, and so on... If in most cases the solutions found varies around [-2, +2] among themselves, so it's much possible that the best is one of them, and if it's not, then there is no problem because we are very close to the best solution.
 *
 * But even if we are using a greedy solution, there are some cases in which a good solution is extremely difficult to find, especially when the difficulty level is 'expert' and we are using puzzles 5x5, 6x5, 5x6 or 6x6 size. It's difficult to stop the algorithm if some solution is harder to be found. Setting a timer cannot be a good solution, so there is a limit depth on A* Search, then if more than 5000 states have been expanded and we still have no solution, a new puzzle is recomputed and the whole process starts yet again (It is true that the worst case involves that the A-Star overcomes 5000 states, then it is called once more time, and so on..., but it is not going to happen due to pure statistic). So the average time that an user has to wait for a level is around 0-5 seconds. It seems quite reasonable if we keep in mind the brutal problem we are dealing with.
 *
 * The conclusion is that, given that the heuristic is just a numerical value, we can have some different heuristics which return different values from different scales, so we cannot call different heuristics from the same A*, but we can call 4 distinct A*, compare 4 results and finally choose the best one.
 *
 **********************************************/

/**
 * Heuristic Static Class
 */
Heuristic = {

    /**
     * Euclidean distance
     * @param a
     * @param b
     * @returns {Number}
     */
    euclideanDistance: function(a, b) {
        return parseFloat(Math.pow((Math.pow((a[0] - b[0]), 2) + Math.pow((a[1] - b[1]), 2)), 0.5));
    },

    /**
     * Manhattan distance
     * @param a
     * @param b
     * @returns {Number}
     */
    manhattanDistance: function(a, b) {
        return parseFloat(Math.abs(a[0] - b[1]) + Math.abs(a[1] - b[1]));
    },

    /**
     * Matches Heuristic based on counting the squares which are placed well
     * @param state
     * @param goal
     * @returns {number}
     */
    matchesHeuristic: function(state, goal) {

        var matching_sum = 0;

        for (var row = 0; row < state.length; row++) {
            for (var col = 0; col < state[0].length; col++) {
                if (state[row][col][2] !== goal[row][col]) {
                    matching_sum++;
                }
            }
        }

        return matching_sum;
    },

    /**
     * Euclidean Distances heuristic
     *
     * It's a Greedy heuristic which admits repetitions. The only thing it's important
     * here is to get the best distance and return the best sum.
     *
     * To do that, it needs to check all the coordinates twice since we have to match
     * everything with everything to find the best solution.
     *
     * @param state
     * @param goal
     * @return
     */
    euclideanDistancesHeuristic: function(state, goal) {

        // Create the return value, computing rows and columns
        var distances_sum = 0, numRows = state.length, numCols = state[0].length;

        // Need to traverse the whole matrix
        for (var row = 0; row < numRows; row++) {
            for (var col = 0; col < numCols; col++) {

                // Get the colors from coordinates
                var stateColor = state[row][col][2], goalColor = goal[row][col];

                // If the color from the current state is different from the goal's color
                // then it needs to compute the right distance
                if (stateColor !== goalColor) {

                    // It's gonna hold the minimum distance between this point with the closest one
                    // that has the same color
                    var min_distance = Infinity;

                    // Need to traverse the whole matrix for each coordinate again
                    for (var x = 0; x < numRows; x++) {
                        for (var y = 0; y < numCols; y++) {

                            // Get the colors from coordinates
                            var stateSubColor = state[x][y][2], goalSubColor = goal[x][y];

                            // Check if the outer state color matches with the inner goal color but
                            // the inner colors don't have to match. Otherwise it doesn't work!
                            if (stateColor === goalSubColor && stateSubColor !== goalSubColor) {

                                // Computing distance
                                var distance = Heuristic.euclideanDistance([row, col], [x, y]);

                                // Need the best distance, it doesn't matter if another coordinate
                                // has been already matched with it. We want to the best distance ever!
                                if (distance < min_distance) {
                                    min_distance = distance;
                                }
                            }
                        }
                    }
                    distances_sum += min_distance;
                }
            }
        }

        return distances_sum;
    },

    /**
     * Euclidean Distances heuristic + Matches Heuristic
     *
     * It's a Greedy heuristic which admits repetitions. The only thing it's important
     * here is to get the best distance and return the best sum.
     *
     * To do that, it needs to check all the coordinates twice since we have to match
     * everything with everything to find the best solution.
     *
     * @param state
     * @param goal
     * @return
     */
    euclideanDistancesHeuristicWithMatches: function(state, goal) {
        return Heuristic.euclideanDistancesHeuristic(state, goal) + Heuristic.matchesHeuristic(state, goal);
    },

    /**
     * Manhattan Distances heuristic
     *
     * It's a Greedy heuristic which admits repetitions. The only thing it's important
     * here is to get the best distance and return the best sum.
     *
     * To do that, it needs to check all the coordinates twice since we have to match
     * everything with everything to find the best solution.
     *
     * @param state
     * @param goal
     * @return
     */
    manhattanDistancesHeuristic: function(state, goal) {

        // Create the return value, computing rows and columns
        var distances_sum = 0, numRows = state.length, numCols = state[0].length;

        // Need to traverse the whole matrix
        for (var row = 0; row < numRows; row++) {
            for (var col = 0; col < numCols; col++) {

                // Get the colors from coordinates
                var stateColor = state[row][col][2], goalColor = goal[row][col];

                // If the color from the current state is different from the goal's color
                // then it needs to compute the right distance
                if (stateColor !== goalColor) {

                    // It's gonna hold the minimum distance between this point with the closest one
                    // that has the same color
                    var min_distance = Infinity;

                    // Need to traverse the whole matrix for each coordinate again
                    for (var x = 0; x < numRows; x++) {
                        for (var y = 0; y < numCols; y++) {

                            // Get the colors from coordinates
                            var stateSubColor = state[x][y][2], goalSubColor = goal[x][y];

                            // Check if the outer state color matches with the inner goal color but
                            // the inner colors don't have to match. Otherwise it doesn't work!
                            if (stateColor === goalSubColor && stateSubColor !== goalSubColor) {

                                // Computing distance
                                var distance = Heuristic.manhattanDistance([row, col], [x, y]);

                                // Need the best distance, it doesn't matter if another coordinate
                                // has been already matched with it. We want to the best distance ever!
                                if (distance < min_distance) {
                                    min_distance = distance;
                                }
                            }
                        }
                    }
                    distances_sum += min_distance;
                }
            }
        }

        return distances_sum;
    },

    /**
     * Manhattan Distances heuristic + matches
     *
     * It's a Greedy heuristic which admits repetitions. The only thing it's important
     * here is to get the best distance and return the best sum.
     *
     * To do that, it needs to check all the coordinates twice since we have to match
     * everything with everything to find the best solution.
     *
     * @param state
     * @param goal
     * @return
     */
    manhattanDistancesHeuristicWithMatches: function(state, goal) {
        return Heuristic.manhattanDistancesHeuristic(state, goal) + Heuristic.matchesHeuristic(state, goal);
    }
};