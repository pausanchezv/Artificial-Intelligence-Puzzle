/*********************************************
 * State
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

import java.util.Comparator;


/**
 *
 * Class State
 */
public class State implements Comparable{
    
    // Declarations
    private float cost;
    private State parent;
    private final Puzzle puzzle;
    private Action action;
    private static Comparator<State> comparator = null;
    
    /**
     * State Constructor
     * 
     * @param puzzle
     * @param cost
     * @param parent 
     */
    public State(String [][] puzzle, float cost, State parent) {
        
        this.puzzle = new Puzzle(puzzle);
        this.cost = cost;
        this.parent = parent;
    }
    
    /**
     * State Constructor
     * 
     * @param puzzle
     * @param cost
     * @param parent 
     * @param action 
     */
    public State(String [][] puzzle, float cost, State parent, Action action) {
        
        this.puzzle = new Puzzle(puzzle);
        this.cost = cost;
        this.parent = parent;
        this.action = action;
    }
    
  
    /**
     * State to String
     * 
     * @return 
     */
    @Override
    public String toString() {
        
        String response = "";
        
        response += "cost = " + this.cost + "\n";
        response += "parent = " + this.parent + "\n";
        response += "action = " + this.action + "\n\n";
        response += "puzzle\n" + this.puzzle.puzzleToString() + "\n";
        response += "color\n" + this.puzzle.colorToString();
        
        return response;
    }
    
    /**
     * Cost getter
     * @return 
     */
    public float getCost() {
        return cost;
    }

    /**
     * Cost setter
     * @param cost 
     */
    public void setCost(float cost) {
        this.cost = cost;
    }

    /**
     * Action getter
     * @return 
     */
    public Action getAction() {
        return action;
    }

    /**
     * Action setter
     * @param action 
     */
    public void setAction(Action action) {
        this.action = action;
    }

    /**
     * Parent getter
     * @return 
     */
    public State getParent() {
        return parent;
    }
    
    /**
     * Parent setter
     * @param parent 
     */
    public void setParent(State parent) {
        this.parent = parent;
    }

    /**
     * Parent setter
     * @return 
     */
    public Puzzle getPuzzle() {
        return this.puzzle;
    }

    /**
     * State HashCode
     * @return 
     */
    @Override
    public int hashCode() {
        int hash = 7;
        return hash;
    }

    /**
     * State equals
     * This method is based on equals method of the class puzzle.
     * A state will be equal from another one if the puzzles of them are equals.
     * 
     * @param obj
     * @return 
     */
    @Override
    public boolean equals(Object obj) {
       
        if (obj instanceof State) {
            final State other = (State) obj;
            return other.getPuzzle().equals(this.puzzle);
        }
        return false;
    }  

    /**
     * State compare
     * @param other
     * @return 
     */
    @Override
    public int compareTo(Object other) {
        
        if (this.getCost() < ((State) other).getCost())
            return -1;
        if (this.getCost() > ((State) other).getCost())
            return 1;

        return 0;
        
    }
    
    /**
     * State comparator
     * @return 
     */
    public static Comparator comparatorState() {
        
        if (comparator == null) {
        
            comparator = new Comparator<State>() {
                @Override
                public int compare(State t, State t1) {
                    return t.compareTo(t1);
                }
            };
        }
        
        return comparator;
    }  
}


