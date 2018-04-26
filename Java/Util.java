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
}
