/*********************************************
 * Color
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
 * @author pausanchezv
 */
public class Color {
    
    // variables
    private char [][] color;
    
    /**
     * Color Constructor
     * @param puzzle 
     */
    public Color(String[][] puzzle) {
        
        addColor(puzzle);
    }
    
    /**
     * Color getter
     * @return 
     */
    public char [][] getColor() {
        return color;
    }
    
    /**
     * Add color to puzzle
     */
    private void addColor(String [][] puzzle) {
        
        char [][] colorPuzzle = new char[puzzle.length][puzzle[0].length];
        
         for (int i = 0; i < puzzle.length; i++) {
             
            for (int j = 0; j < puzzle.length; j++) {
             
                colorPuzzle[i][j] = puzzle[i][j].charAt(2);
            } 
         }
         
         this.color = colorPuzzle;
    }

    /**
     * Color hash code
     * @return 
     */
    @Override
    public int hashCode() {
        int hash = 7;
        return hash;
    }

    /**
     * Color equals
     * @param obj
     * @return 
     */
    @Override
    public boolean equals(Object obj) {
        
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Color other = (Color) obj;
        
        return Arrays.deepEquals(this.color, other.color);
    }  
}
