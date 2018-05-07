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
            
            // Future generated level
            ArrayList<String[][]> level;
            
            // Array that's gonna hold the four solutions given for the four heuristics
            ArrayList<ArrayList<Action>> solutions = new ArrayList();
            
            // Variables
            boolean canStop = false;
            SearchProblem problem;
            long startTime, endTime, totalTime;
            
            // Repeat until at least one of heuristics returns a solution
            do {
                
                // Generator objects
                LevelGenerator generator = new LevelGenerator("expert");
                LevelScrambler scrambler = new LevelScrambler("expert");
                
                // Rand number
                int randNum = (int) Math.round(Math.random() * 2);

                // Generate a random level
                if (randNum < 2) {
                    level = generator.getGeneratedLevel(true);
                } else {
                    level = scrambler.getGeneratedLevel(true);
                }

                // Get start and goal puzzles
                String [][] start = level.get(0);
                String [][] g = level.get(1);
                char [][] goal = Util.toGoalColor(g);
                
                problem = new SearchProblem(start, goal);
                startTime = System.nanoTime();
                System.out.println("");
                problem.AStarSearchSolver(Heuristic.Kind.EUCLIDEAN);
                problem.showResult();
                endTime = System.nanoTime();
                totalTime = (endTime - startTime)/ 1000000;
                System.out.println("AStarSearch: " + totalTime + "ms");
                
                if (!problem.getSolution().isEmpty()) {
                    solutions.add(problem.getSolution());
                    canStop = true;
                }

                problem = new SearchProblem(start, goal);
                startTime = System.nanoTime();
                System.out.println("");
                problem.AStarSearchSolver(Heuristic.Kind.EUCLIDEAN_MATCHINGS);
                problem.showResult();
                endTime   = System.nanoTime();
                totalTime = (endTime - startTime)/ 1000000;
                System.out.println("AStarSearch: " + totalTime + "ms");
                
                if (!problem.getSolution().isEmpty()) {
                    solutions.add(problem.getSolution());
                    canStop = true;
                }             
                
            } while(!canStop);
            
            ArrayList<Action> bestSolution = LevelGenerator.getBestSolution(solutions);
            System.out.println("\nBest solution >> " + bestSolution.size()); 
           
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
