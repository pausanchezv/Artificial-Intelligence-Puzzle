/*********************************************
 * Puzzle
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

import java.util.Arrays;

/**
 *
 * Class Puzzle
 */
public class Puzzle {
      
    // Declarations
    private final String [][] puzzle;
    private final Color color;
    private final int numRows;
    private final int numCols;
    
    // Constants
    private static final String WALL = "###";
    private static final String BLANK = "...";

    /**
     * Puzzle Constructor
     * 
     * @param puzzle 
     */
    public Puzzle(String[][] puzzle) {
        
        this.puzzle = puzzle;
        this.numRows = this.puzzle.length;
        this.numCols = this.puzzle[0].length;
        
        //addPuzzleColor();
        
        this.color = new Color(puzzle);
    }
    
    /**
     * Check if a coordinate contains either a wall or a blank
     * 
     * @param row
     * @param col
     * @return 
     */
    public boolean containsWall(int row, int col) {
        return WALL.equals(this.puzzle[row][col]) || BLANK.equals(this.puzzle[row][col]);
    }
    

    
    /**
     * Convert a puzzle to String
     * 
     * @return 
     */
    public String puzzleToString() {
        
        String response = "";
        
        for (String[] row : this.puzzle) {
            
            response += "[ ";
            
            for (String col : row) {
                response += col + " "; 
            }
            
            response += "]\n";
        }
 
        return response;
    }
    
    /**
     * Convert a puzzle to String
     * 
     * @return 
     */
    public String colorToString() {
        
        String response = "";
        
        for (char[] row : color.getColor()) {
            
            response += "[ ";
            
            for (char col : row) {
                response += col + " "; 
            }
            
            response += "]\n";
        }
 
        return response;
    }

    /**
     * Puzzle getter
     * @return 
     */
    public String[][] getPuzzle() {
        return puzzle;
    }

    /**
     * Color getter
     * @return 
     */
    public Color getColor() {
        return color;
    }

    /**
     * Get number of rows
     * @return 
     */
    public int getNumRows() {
        return numRows;
    }

    /**
     * Get number of columns
     * @return 
     */
    public int getNumCols() {
        return numCols;
    }

    /**
     * Puzzle HasCode
     * @return 
     */
    @Override
    public int hashCode() {
        int hash = 7;
        return hash;
    }

    /**
     * Puzzle equals
     * 
     * @param obj
     * @return 
     */
    @Override
    public boolean equals(Object obj) {
       
        if (getClass() != obj.getClass()) {
            return false;
        }
        
        final Puzzle other = (Puzzle) obj;
        if (this.numRows != other.numRows) {
            return false;
        }
        
        if (this.numCols != other.numCols) {
            return false;
        }
        
        return Arrays.deepEquals(this.puzzle, other.puzzle);
    }  
}
