/*********************************************
 * Search Problem
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

/**
 *
 * @author pausanchezv
 */
public final class SearchProblem {
    
    // States invloved
    private final State startState;
    private final char [][] goal;
    
    // problem variables

    public static ArrayList<Action> actions;
    public static ArrayList<Puzzle> puzzles;
    
    
    /**
     * SearchProblem Constructor
     * 
     * @param start
     * @param goal 
     */
    public SearchProblem(String [][] start, char [][] goal) {
        
        SearchProblem.actions = new ArrayList();
        SearchProblem.puzzles = new ArrayList();
    
        this.startState = new State(start, 0, null);
        this.goal = goal; 
    }
    
    /**
     * Breadth First Search Solver
     */
    public void breadthFirstSearchSolver() {
        cleanVariables();
        SearchAlgorithms.breadthFirstSearch(startState, goal);
    }
    
    /**
     * Uniform Cost Search Solver
     */
    public void uniformCostSearchSolver() {
        cleanVariables();
        SearchAlgorithms.uniformCostSearch(startState, goal);
    }
    
    /**
     * A* Search Solver
     * @param heuristic
     */
    public void AStarSearchSolver(Heuristic.Kind heuristic) {
        cleanVariables();
        SearchAlgorithms.AStarSearch(startState, goal, heuristic);
    }
    
    /**
     * Show solution
     */
    public void showResult() {
        
         for (int i = 0; i < actions.size(); i++) {
            System.out.println("Action >> " + actions.get(i));
            System.out.println("\n" + puzzles.get(i).puzzleToString());
        }
        
        System.out.println("Num actions >> " + actions.size());
        System.out.println("Num expanded estates >> " + SearchAlgorithms.numExpandedStates);
    }

    /**
     * Clean problem variables
     */
    private void cleanVariables() {
        SearchProblem.actions.clear();
        SearchProblem.puzzles.clear();
        SearchAlgorithms.numExpandedStates = 0;
    }
    
    /**
     * Solution
     * @return 
     */
    public ArrayList<Action> getSolution() {
        return actions;
    }
    
}
