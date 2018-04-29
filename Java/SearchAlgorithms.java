/*********************************************
 * Search Algorithms
 *********************************************
 *
 * Developed by: Pau Sanchez V.
 *
 * Website:     pausanchezv.com
 * Github:      github.com/pausanchezv
 * Linkedin:    linkedin.com/in/pausanchezv
 * Twitter:     twitter.com/pausanchezv
 * Facebook:    facebook.com/pausanchezv
 *
 * All rights reserved. - Barcelona 2018 -
 *
 **********************************************/
package applicationpuzzle;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.PriorityQueue;

/**
 *
 * @author pausanchezv
 */
public class SearchAlgorithms {
    
    // Number of expanded nodes
    public static int numExpandedStates = 0;
    private static final int MAX_EXPANDED_STATES = 5000;
    
    /**
     * Get Actions
     * 
     * @param state
     * @return 
     */
    public static HashMap getActions(State state) {
        
        // Get the state puzzle
        Puzzle puzzle = state.getPuzzle();
        
        // Get both number of rows and number of columns
        int numRows = puzzle.getNumRows();
        int numCols = puzzle.getNumCols();
        
        // A dictionary is gonna hold the actions depending on the key
        // In this way the same key will be able to hold different actions
        HashMap<int[], ArrayList<Action>> actions = new HashMap();
        
        // Traverse the puzzle of the state
        for (int row = 0; row < numRows; row++) {
            for (int col = 0; col < numCols; col++) {
                
                // Get the key from coordinates
                int [] key = {row, col};
                
                //The square is just the string extracted from the coordinates
                String square = puzzle.getPuzzle()[row][col];
                
                // An array is gonna hold the posible actions for each key
                actions.put(key, new ArrayList<>());
                
                // Straight actions
                if (Puzzle.isTower(square) || Puzzle.isQueen(square)) {
                    
                    // Adding distance 1
                    if (Puzzle.getScope(square) == '1' || Puzzle.getScope(square) == '2' || Puzzle.getScope(square) == '3') {

                        if (row > 0 && !puzzle.containsWall(row - 1, col)) {
                            actions.get(key).add(new Action("up", 1));
                        }

                        if (row < numRows - 1 && !puzzle.containsWall(row + 1, col)) {
                            actions.get(key).add(new Action("down", 1));
                        }

                        if (col > 0 && !puzzle.containsWall(row, col - 1)) {
                            actions.get(key).add(new Action("left", 1));
                        }

                        if (col < numCols - 1 && !puzzle.containsWall(row, col + 1)) {
                            actions.get(key).add(new Action("right", 1));
                        }
                    }
                    
                    // Adding distance 2
                    if (Puzzle.getScope(square) == '2' || Puzzle.getScope(square) == '3') {

                        if (row > 1 && !puzzle.containsWall(row - 2, col) && !puzzle.containsWall(row - 1, col)) {
                            actions.get(key).add(new Action("up", 2));
                        }

                        if (row < numRows - 2 && !puzzle.containsWall(row + 2, col) && !puzzle.containsWall(row + 1, col)) {
                            actions.get(key).add(new Action("down", 2));
                        }

                        if (col > 1 && !puzzle.containsWall(row, col - 2) && !puzzle.containsWall(row, col - 1)) {
                            actions.get(key).add(new Action("left", 2));
                        }

                        if (col < numCols - 2 && !puzzle.containsWall(row, col + 2) && !puzzle.containsWall(row, col + 1)) {
                            actions.get(key).add(new Action("right", 2));
                        }
                    }
                    
                    // Adding distance 3
                    if (Puzzle.getScope(square) == '3') {

                        if (row > 2 && !puzzle.containsWall(row - 3, col) && !puzzle.containsWall(row - 2, col) && !puzzle.containsWall(row - 1, col)) {
                            actions.get(key).add(new Action("up", 3));
                        }

                        if (row < numRows - 3 && !puzzle.containsWall(row + 3, col) && !puzzle.containsWall(row + 2, col) && !puzzle.containsWall(row + 1, col)) {
                            actions.get(key).add(new Action("down", 3));
                        }

                        if (col > 2 && !puzzle.containsWall(row, col - 3) && !puzzle.containsWall(row, col - 2) && !puzzle.containsWall(row, col - 1)) {
                            actions.get(key).add(new Action("left", 3));
                        }

                        if (col < numCols - 3 && !puzzle.containsWall(row, col + 3) && !puzzle.containsWall(row, col + 2) && !puzzle.containsWall(row, col + 1)) {
                            actions.get(key).add(new Action("right", 3));
                        }
                    }
                }
                
                // Diagonal actions
                if (Puzzle.isBishop(square) || Puzzle.isQueen(square)) {
                    
                    // Adding distance 1
                    if (Puzzle.getScope(square) == '1' || Puzzle.getScope(square) == '2' || Puzzle.getScope(square) == '3') {

                        if (row > 0 && col > 0 && !puzzle.containsWall(row - 1, col - 1)) {
                            actions.get(key).add(new Action("up-left", 1));
                        }

                        if (row < numRows - 1 && col > 0 && !puzzle.containsWall(row + 1, col - 1)) {
                            actions.get(key).add(new Action("down-left", 1));
                        }

                        if (col < numCols - 1 && row > 0 && !puzzle.containsWall(row - 1, col + 1)) {
                            actions.get(key).add(new Action("up-right", 1));
                        }

                        if (col < numCols - 1 && row < numRows - 1 && !puzzle.containsWall(row + 1, col + 1)) {
                            actions.get(key).add(new Action("down-right", 1));
                        }
                    }
                    
                    // Adding distance 2
                    if (Puzzle.getScope(square) == '2' || Puzzle.getScope(square) == '3') {

                        if (row > 1 && col > 1 && !puzzle.containsWall(row - 2, col - 2) && !puzzle.containsWall(row - 1, col - 1)) {
                            actions.get(key).add(new Action("up-left", 2));
                        }

                        if (row < numRows - 2 && col > 1 && !puzzle.containsWall(row + 2, col - 2) && !puzzle.containsWall(row + 1, col - 1)) {
                            actions.get(key).add(new Action("down-left", 2));
                        }

                        if (col < numCols - 2 && row > 1 && !puzzle.containsWall(row - 2, col + 2) && !puzzle.containsWall(row - 1, col + 1)) {
                            actions.get(key).add(new Action("up-right", 2));
                        }

                        if (col < numCols - 2 && row < numRows - 2 && !puzzle.containsWall(row + 2, col + 2) && !puzzle.containsWall(row + 1, col + 1)) {
                            actions.get(key).add(new Action("down-right", 2));
                        }
                    }
                    
                    // Adding distance 3
                    if (Puzzle.getScope(square) == '3') {

                        if (row > 2 && col > 2 && !puzzle.containsWall(row - 3, col - 3) && !puzzle.containsWall(row - 1, col - 1) && !puzzle.containsWall(row - 1, col - 1)) {
                            actions.get(key).add(new Action("up-left", 3));
                        }

                        if (row < numRows - 3 && col > 2 && !puzzle.containsWall(row + 3, col - 3) && !puzzle.containsWall(row + 2, col - 2) && !puzzle.containsWall(row + 1, col - 1)) {
                            actions.get(key).add(new Action("down-left", 3));
                        }

                        if (col < numCols - 3 && row > 2 && !puzzle.containsWall(row - 3, col + 3) && !puzzle.containsWall(row - 2, col + 2) && !puzzle.containsWall(row - 1, col + 1)) {
                            actions.get(key).add(new Action("up-right", 3));
                        }

                        if (col < numCols - 3 && row < numRows - 3 && !puzzle.containsWall(row + 3, col + 3) && !puzzle.containsWall(row + 2, col + 2) && !puzzle.containsWall(row + 1, col + 1)) {
                            actions.get(key).add(new Action("down-right", 3));
                        }
                    }
                    
                }
            }
        }
       
        return actions;
    }
    
    /**
     * Add a new successor to a state
     * 
     * @param newPuzzle
     * @param successors
     * @param action
     * @param row
     * @param col 
     */
    private static void addSuccessor(String[][] newPuzzle, ArrayList<State> successors, Action action, int row, int col) {
        
        // Get the coordinates
        int [] position = {row, col};

        // First of all the Action is created
        Action newAction = new Action(action.getDirection(), action.getValue(), position);
        
        // The action object allows us to create the successor
        State successor = new State(newPuzzle, (float) Double.POSITIVE_INFINITY, null, newAction);
        
        // Add the successor if it is not added yet
        if (!successors.contains(successor)) {
            successors.add(successor);
        }   
    }
    
    /**
     * Obtain the state successors
     * 
     * @param state
     * @param actions
     * @return
     */
    public static ArrayList<State> getSuccessors(State state, HashMap actions) {
        
        // Array which will hold the successors of the state
        ArrayList<State> successors = new ArrayList();
        
        // Getting the current puzzle
        String [][] puzzle = state.getPuzzle().getPuzzle();
        
        // Creating an iterator
        Iterator it = actions.entrySet().iterator();
        
        // Traversing the actions
        while (it.hasNext()) {
        
            HashMap.Entry pair = (HashMap.Entry) it.next();
        
            // Extract the coordinates
            int [] key = (int []) pair.getKey();
            int row = key[0];
            int col = key[1];
            
            // Add successors to the current state
            for (Action action: (ArrayList<Action>) pair.getValue()) {
                
                // Get a new copy of the puzzle for each action
                Puzzle newPuzzleObj = createPuzzleCopy(state.getPuzzle());
                String [][] newPuzzle = newPuzzleObj.getPuzzle();
                
                if (action.getDirection().equals("down")) {
                    
                    newPuzzle[row][col] = puzzle[row + action.getValue()][col];
                    newPuzzle[row + action.getValue()][col] = puzzle[row][col];
                    
                    if (!Arrays.deepEquals(state.getPuzzle().getPuzzle(), newPuzzle)) {
                        addSuccessor(newPuzzle, successors, action, row, col);
                    } 
                }
                
                if (action.getDirection().equals("up")) {
                    
                    newPuzzle[row][col] = puzzle[row - action.getValue()][col];
                    newPuzzle[row - action.getValue()][col] = puzzle[row][col];
                    
                    if (!Arrays.deepEquals(state.getPuzzle().getPuzzle(), newPuzzle)) {
                        addSuccessor(newPuzzle, successors, action, row, col);
                    }                   
                }
                
                if (action.getDirection().equals("left")) {
                    
                    newPuzzle[row][col - action.getValue()] = puzzle[row][col];
                    newPuzzle[row][col] = puzzle[row][col - action.getValue()];
                    
                    if (!Arrays.deepEquals(state.getPuzzle().getPuzzle(), newPuzzle)) {
                        addSuccessor(newPuzzle, successors, action, row, col);
                    }                  
                }
                
                if (action.getDirection().equals("right")) {
                    
                    newPuzzle[row][col] = puzzle[row][col + action.getValue()];
                    newPuzzle[row][col + action.getValue()] = puzzle[row][col];
                    
                    if (!Arrays.deepEquals(state.getPuzzle().getPuzzle(), newPuzzle)) {
                        addSuccessor(newPuzzle, successors, action, row, col);
                    }                   
                }
                
                if (action.getDirection().equals("down-left")) {
                    
                    newPuzzle[row][col] = puzzle[row + action.getValue()][col - action.getValue()];
                    newPuzzle[row + action.getValue()][col - action.getValue()] = puzzle[row][col];
                    
                    if (!Arrays.deepEquals(state.getPuzzle().getPuzzle(), newPuzzle)) {
                        addSuccessor(newPuzzle, successors, action, row, col);
                    }                    
                }
                
                if (action.getDirection().equals("down-right")) {
                    
                    newPuzzle[row][col] = puzzle[row + action.getValue()][col + action.getValue()];
                    newPuzzle[row + action.getValue()][col + action.getValue()] = puzzle[row][col];
                    
                    if (!Arrays.deepEquals(state.getPuzzle().getPuzzle(), newPuzzle)) {
                        addSuccessor(newPuzzle, successors, action, row, col);
                    }
                    
                }
                
                if (action.getDirection().equals("up-left")) {
                    
                    newPuzzle[row][col] = puzzle[row - action.getValue()][col - action.getValue()];
                    newPuzzle[row - action.getValue()][col - action.getValue()] = puzzle[row][col];
                    
                    if (!Arrays.deepEquals(state.getPuzzle().getPuzzle(), newPuzzle)) {
                        addSuccessor(newPuzzle, successors, action, row, col);
                    }                   
                }
                
                if (action.getDirection().equals("up-right")) {
                    
                    newPuzzle[row][col] = puzzle[row - action.getValue()][col + action.getValue()];
                    newPuzzle[row - action.getValue()][col + action.getValue()] = puzzle[row][col];
                    
                    if (!Arrays.deepEquals(state.getPuzzle().getPuzzle(), newPuzzle)) {
                        addSuccessor(newPuzzle, successors, action, row, col);
                    }  
                } 
            }
        }
        
        // Shuffle the successors (it helps us when the AStar algorithm explores the successors to expand them)
        Collections.shuffle(successors);
        
        return successors;  
    }
    
    
    /**
     * Make a puzzle copy
     * 
     * @param puzzle
     * @return 
     */
    private static Puzzle createPuzzleCopy(Puzzle puzzle) {
        
        // Create a new matrix to hold the new puzzle
        String [][] newPuzzle = new String[puzzle.getNumRows()][puzzle.getNumCols()];
        
        // Fill the new matrix
        for (int row = 0; row < puzzle.getNumRows(); row++) {
            for (int col = 0; col < puzzle.getNumCols(); col++) {
                newPuzzle[row][col] = puzzle.getPuzzle()[row][col];
            } 
        }
        
        // Create and return the new puzzle
        return new Puzzle(newPuzzle); 
    }
    
    
    /**
     * Get solution
     * 
     * @param node
     * @return 
     */
    private static ArrayList<Action> getSearchSolution(State node) {
        
        // Traverse through the node whilst it has parent
        while (node.getParent() != null) {
            
            // Push the new action
            SearchProblem.actions.add(node.getAction());
            SearchProblem.puzzles.add(node.getPuzzle());
            node = node.getParent();         
        }
        
        // Reverse the solution arrays
        Collections.reverse(SearchProblem.actions);
        Collections.reverse(SearchProblem.puzzles);
        
        return SearchProblem.actions; 
    }
    
    /**
     * Get node cost
     * @param node
     * @param neighbor
     * @return 
     */
    private static float getCost(State node, State neighbor) {
        
        float cost = node.getCost() + 1;
        
        if (cost < neighbor.getCost()) {
            neighbor.setCost(cost);
            neighbor.setParent(node);
        }
        
        return cost;    
    }
    
    
    /**
     * Breadth First Search Algorithm
     * 
     * @param start
     * @param goal
     * @return 
     */
    public static ArrayList<Action> uniformCostSearch(State start, char [][] goal) {
        
        // Control the number of expanded states
        numExpandedStates = 0;
        
        // A couple of arrays are gonna hold both the queue and the visited nodes
        PriorityQueue<State> queue = new PriorityQueue(State.comparatorState());
        ArrayList<Puzzle> visited = new ArrayList();
        queue.add(start);
                
        // Compute the algorithm until the queue is empty
        while (!queue.isEmpty()) {
            
            // Get the node and its color
            State node = queue.remove();
            Color color = node.getPuzzle().getColor();
            
            // Check if the color matrix is found in visited array
            if (!visited.contains(node.getPuzzle())) {
                
                numExpandedStates++;
                
                // Check the expanded nodes and break if it's necessary
                if (numExpandedStates > MAX_EXPANDED_STATES) {
                    return new ArrayList();
                }
                
                // Return the solution
                if (Arrays.deepEquals(color.getColor(), goal)) {
                    return getSearchSolution(node);
                }
                
                visited.add(node.getPuzzle());
             
                // Expand the node's children
                for (State neighbor: getSuccessors(node, getActions(node))) {
                    
                    // Compute the cost of the node
                    getCost(node, neighbor);
                    queue.add(neighbor);
                }
            }
        }
        
        return null;
    }
    
    
    /**
     * Breadth First Search Algorithm
     * 
     * @param start
     * @param goal
     * @return 
     */
    public static ArrayList<Action> breadthFirstSearch(State start, char [][] goal) {
        
        // Control the number of expanded states
        numExpandedStates = 0;
        
        // A couple of arrays are gonna hold both the queue and the visited nodes
        ArrayList<State> queue = new ArrayList();
        ArrayList<Puzzle> visited = new ArrayList();
        queue.add(start);
                
        // Compute the algorithm until the queue is empty
        while (!queue.isEmpty()) {
            
            // Get the node and its color
            State node = queue.remove(0);
            Color color = node.getPuzzle().getColor();
            
            // Check if the color matrix is found in visited array
            if (!visited.contains(node.getPuzzle())) {
                
                numExpandedStates++;
                
                // Check the expanded nodes and break if it's necessary
                if (numExpandedStates > MAX_EXPANDED_STATES) {
                    return new ArrayList();
                }
                
                // Return the solution
                if (Arrays.deepEquals(color.getColor(), goal)) {
                    return getSearchSolution(node);
                }
                
                visited.add(node.getPuzzle());
             
                // Expand the node's children
                for (State neighbor: getSuccessors(node, getActions(node))) {
                    
                    // Compute the neighbor's parent
                    if (!visited.contains(neighbor.getPuzzle()) && neighbor.getParent() == null) {
                        neighbor.setParent(node);
                    }
                    queue.add(neighbor);
                }
            }
        }
        
        return null;
    }
    
    
    /**
     * A* Search Algorithm
     * 
     * @param start
     * @param goal
     * @param heuristic
     * @return 
     */
    public static ArrayList<Action> AStarSearch(State start, char [][] goal, Heuristic.Kind heuristic) {
        
        // Control the number of expanded states
        numExpandedStates = 0;
        
        // A couple of arrays are gonna hold both the queue and the visited nodes
        BinaryHeap queue = new BinaryHeap();
        ArrayList<Puzzle> visited = new ArrayList();
        queue.push(start, 0);
                
        // Compute the algorithm until the queue is empty
        while (!queue.isEmpty()) {
            
            // Get the node and its color
            State node = queue.pop();
            Color color = node.getPuzzle().getColor();
            
            // Check if the color matrix is found in visited array
            if (!visited.contains(node.getPuzzle())) {
                
                numExpandedStates++;
                
                // Check the expanded nodes and break if it's necessary
                if (numExpandedStates > MAX_EXPANDED_STATES) {
                    return new ArrayList();
                }
                
                // Return the solution
                if (Arrays.deepEquals(color.getColor(), goal)) {
                    return getSearchSolution(node);
                }
                
                // Add node to visited
                visited.add(node.getPuzzle());
             
                // Expand the node's children
                for (State neighbor: getSuccessors(node, getActions(node))) {
                    
                    // Compute the cost of the node
                    float cost = getCost(node, neighbor);
                    
                    // Heuristic value
                    float heuristicValue = 0;
                    
                    // Select heuristic kind
                    switch (heuristic) {
                        
                        case MANHATTAN:
                            heuristicValue = Heuristic.manhattanDistancesHeuristic(neighbor.getPuzzle().getPuzzle(), goal);
                            break;
                            
                        case EUCLIDEAN:
                            heuristicValue = Heuristic.euclideanDistancesHeuristic(neighbor.getPuzzle().getPuzzle(), goal);
                            break;
                            
                        case MANHATTAN_MATCHINGS:
                            heuristicValue = Heuristic.manhattanDistancesHeuristicWithMatches(neighbor.getPuzzle().getPuzzle(), goal);
                            break;
                        
                        case EUCLIDEAN_MATCHINGS:
                            heuristicValue = Heuristic.euclideanDistancesHeuristicWithMatches(neighbor.getPuzzle().getPuzzle(), goal);
                            break;
                    }
                    
                    // Compute neighbor
                    queue.push(neighbor, cost + heuristicValue);
                }
            }
        }
        
        return null;
    }
    
    
    /**
     * Depth First Search Algorithm. It's a traversal algorithm here. Not search!
     * 
     * @param graph
     * @param start
     * @return 
     */
    public static ArrayList depthFirstSearch(Graph graph, String start) {
        
        
        // A couple of arrays are gonna hold both the queue and the visited nodes
        ArrayList<String> stack = new ArrayList();
        ArrayList<String> visited = new ArrayList();
        stack.add(start);
                
        // Compute the algorithm until the queue is empty
        while (!stack.isEmpty()) {
            
            // Get the node and its color
            String node = stack.remove(stack.size() - 1);
            
            // Check if the color matrix is found in visited array
            if (!visited.contains(node)) {
                
                visited.add(node);
             
                // Expand the node's children
                for (Object neighbor: graph.neighbors(node)) {
                    
                    // Compute the neighbor's parent
                    if (!visited.contains((String) neighbor)) {
                        stack.add((String) neighbor);
                    }
                }
            }
        }
        
        return visited;
    }
    
    /**
     * Verifying whether or not a puzzle is connected
     * @param puzzle
     * @return 
     */
    public static boolean isConnectedPuzzle(String [][] puzzle) {
        
        // Create a test state
        State testState = new State(puzzle, 0, null);
        
        // Create the graph
        Graph graph = new Graph();
        
        // Add edges to graph
        Graph.addPuzzleEdges(graph, testState);
        
        // Depth first search
        ArrayList dfsPath = depthFirstSearch(graph, graph.getAnyNode());

        // Return connectivity
        return dfsPath.size() == testState.getPuzzle().getNumCharactersNotWall();
    }
}
