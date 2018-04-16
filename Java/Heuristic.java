/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package applicationpuzzle;

/**
 *
 * @author pausanchezv
 */
public final class Heuristic {
    
    
    /**
     * Euclidean distance between two points
     * 
     * @param a
     * @param b
     * @return 
     */
    public static float euclideanDistance(int [] a, int [] b) {
        
        return (float) (Math.pow((Math.pow((a[0] - b[0]), 2) + Math.pow((a[1] - b[1]), 2)), 0.5));
    }
    
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
    public static float distancesHeuristic(String [][] state, char [][] goal) {
        
        // Create the return value
        float distancesSum = 0.0f;
        
        // Compute rows and columns
        int numRows = state.length;
        int numCols = state[0].length;
        
        // Need to traverse the whole matrix
        for (int row = 0; row < numRows; row++) {
            for (int col = 0; col < numCols; col++) {
                
                // Get the colors from coordinates
                char stateColor = (char) state[row][col].charAt(2);
                char goalColor = goal[row][col];
                
                // If the color from the current state is different from the goal's color
                // then it needs to compute the right distance
                if (stateColor != goalColor) {

                    // It's gonna hold the minimum distance between this point with the closest one
                    // that has the same color
                    float minDistance = Float.POSITIVE_INFINITY;
                    
                    // Need to traverse the whole matrix for each coordinate again
                    for (int x = 0; x < numRows; x++) {
                        for (int y = 0; y < numCols; y++) {
                            
                            // Get the colors from coordinates
                            char stateSubColor = (char) state[x][y].charAt(2);
                            char goalSubColor = goal[x][y];
                            
                            // Check if the outer state color matches with the inner goal color but
                            // the inner colors don't have to match. Otherwise it doesn't work!
                            if (stateColor == goalSubColor && stateSubColor != goalSubColor) {
                                
                                // Build the coordinates
                                int [] coordStart = {row, col};
                                int [] coordGoal = {x, y};
                                
                                // Computing distance
                                float distance = euclideanDistance(coordStart, coordGoal);

                                // Need the best distance, it doesn't matter if another coordinate 
                                // has been already matched with it. We want to the best distance ever!
                                if (distance < minDistance) {
                                    minDistance = distance;
                                }
                            } 
                        }
                    }
                    
                    // Add the distance to sum
                    distancesSum += minDistance;   
                }
            }
        }
        
        return distancesSum;    
    }
    
}
