



Heuristic = {

    euclideanDistance: function(a, b) {
        return parseFloat(Math.pow(( Math.pow((a[0] - b[0]), 2) + Math.pow((a[1] - b[1]), 2)), 0.5));
    },

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
     * Distances heuristic
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
    distancesHeuristic: function(state, goal) {

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

        return distances_sum;// + Heuristic.matchesHeuristic(state, goal);
    }

};