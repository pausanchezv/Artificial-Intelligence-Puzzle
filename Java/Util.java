/*********************************************
 * Utilities
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


/**
 *
 * @author pausanchezv
 */
public class Util {
    
    /**
     * Compare ArrayLists
     * @param A
     * @param B
     * @return 
     */
    public static boolean arrayListEquals(ArrayList<String> A, ArrayList<String> B) {
        
        if (A.size() != B.size()) {
            return false;
        }
        
        for (int i = 0; i < A.size(); i++) {
            if (!A.get(i).equals(B.get(i))) {
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * Shuffling array with needle
     * @param array
     */
    public static void arrayShuffle(String[] array) {
       
        int j, i;
        String x;
        for (i = array.length - 1; i > 0; i--) {
            j = (int) Math.floor(Math.random() * (i + 1));
            x = array[i];
            array[i] = array[j];
            array[j] = x;
        }
    }

    /**
     * Shuffling array with needle
     * @param array
     * @param needle 
     */
    public static void arrayShuffleWithNeedle(ArrayList<String> array, String needle) {
       
        int j;
        String x;
        
        for (int i = array.size() - 1; i > 0; i--) {
            
            j = (int) Math.floor(Math.random() * (i + 1));

            if (!array.get(i).equals(needle) && !array.get(j).equals(needle)) {

                x = array.get(i);
                array.set(i, array.get(j));
                array.set(j, x);
            }
        }
    }

    /**
     * Get array color
     * @param array
     * @return 
     */
    public static ArrayList<String> getArrayColor(ArrayList<String> array) {
        
        ArrayList<String> color = new ArrayList();
       
        for (int i = 0; i < array.size(); i++) {
            color.add(String.valueOf(array.get(i).charAt(2)));
        }
        return color; 
    }
    
    /**
     * To goal color
     * @param colorArrayString
     * @return 
     */
    public static char [][] toGoalColor(String [][] colorArrayString) {
        
        char [][] color = new char [colorArrayString.length][colorArrayString[0].length];
        
        for (int i = 0; i < colorArrayString.length; i++) {
            for (int j = 0; j < colorArrayString[0].length; j++) {
                color[i][j] = colorArrayString[i][j].charAt(0);
            }
        }
        
        return color;
    }
    
    
    /**
     * Create puzzle clone
     * @param puzzle
     * @return 
     */
    public static String [][] createPuzzleCopy(String [][] puzzle) {
        
        int rows = puzzle.length;
        int cols = puzzle[0].length;
        
        String [][] copy = new String[rows][cols];
        
        for (int i = 0; i < rows; i ++) {
            System.arraycopy(puzzle[i], 0, copy[i], 0, cols);
        }
       
        return copy;
    }
    
    /**
     * Get array from matrix
     * @param matrix
     * @return 
     */
    private static ArrayList<String> arrayFromMatrix(String[][] matrix) {
        
        ArrayList<String> array = new ArrayList();
        
        for (String[] row : matrix) {
            array.addAll(Arrays.asList(row));
        }
        
        return array;
        
    }
    
    /**
     * Shuffle matrix depends on a needle
     * @param matrix 
     */
    public static void matrixShuffleWithNeedle(String [][] matrix) {
        
        ArrayList<String> array = arrayFromMatrix(matrix);

        arrayShuffleWithNeedle(array, Puzzle.WALL);

        int cont = 0;

        for (String[] row : matrix) {
            for (int j = 0; j < matrix[0].length; j++) {
                row[j] = array.get(cont++);
            }
        }
    }
}
