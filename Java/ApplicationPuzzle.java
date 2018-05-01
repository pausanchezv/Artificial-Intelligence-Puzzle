/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package applicationpuzzle;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;

/**
 *
 * @author pausanchezv
 */
public class ApplicationPuzzle {
    

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        
        // TODO: quit this motherfucker iteration
        for (int i = 0; i < 1; i++) {
        
            LevelGenerator generator = new LevelGenerator("expert");

           // Generate a random level
            ArrayList<String[][]> level = generator.getGeneratedLevel(true);

             // Get start and goal puzzles
            String [][] start = level.get(0);
            String [][] g = level.get(1);
            
            char [][] goal = Util.toGoalColor(g);
            ArrayList<ArrayList<Action>> solutions = new ArrayList();
           
            SearchProblem problem = new SearchProblem(start, goal);
            long startTime = System.nanoTime();
            System.out.println("");
            problem.AStarSearchSolver(Heuristic.Kind.EUCLIDEAN);
            problem.showResult();
            long endTime = System.nanoTime();
            long totalTime = (endTime - startTime)/ 1000000;
            System.out.println("AStarSearch: " + totalTime + "ms");
            solutions.add(problem.getSolution());
            
            problem = new SearchProblem(start, goal);
            startTime = System.nanoTime();
            System.out.println("");
            problem.AStarSearchSolver(Heuristic.Kind.EUCLIDEAN_MATCHINGS);
            problem.showResult();
            endTime   = System.nanoTime();
            totalTime = (endTime - startTime)/ 1000000;
            System.out.println("AStarSearch: " + totalTime + "ms");
            solutions.add(problem.getSolution());
            
            ArrayList<Action> bestSolution = LevelGenerator.getBestSolution(solutions);
            System.out.println("Best solution >> " + bestSolution.size()); 
        }
    }
    
    /**
     * Show Actions
     * 
     * @param actions 
     */
    public static void showActions(HashMap actions) {
        
        Iterator it = actions.entrySet().iterator();
        
        while (it.hasNext()) {
            HashMap.Entry pair = (HashMap.Entry) it.next();
            
            int [] key = (int []) pair.getKey();
            
            System.out.println((String.valueOf(key[0]) + String.valueOf(key[1])) + " = " + pair.getValue());
            //it.remove();
        }
    } 
}
