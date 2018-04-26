/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package applicationpuzzle;

import java.util.ArrayList;

/**
 *
 * @author pausanchezv
 */
public class LevelGenerator {
    
    // Difficulty level
    private final String difficulty;
    
    /**
     * LevelGenerator Constructor
     */
    public LevelGenerator() {
        this.difficulty = "expert";
    }
    
    /**
     * LevelGenerator Constructor
     * @param difficulty
     */
    public LevelGenerator(String difficulty) {
        this.difficulty = difficulty;
    }
    
    /**
     * Get puzzle size
     * @return 
     */
    public int [] getPuzzleSize() {
        
        // Array that's gonna hold the puzzle size
        int [] puzzleSize = new int[2];
        
        // Compute the range values
        int maxSize = this.difficulty.equals("easy") ? 3 : this.difficulty.equals("medium") ? 4 : this.difficulty.equals("hard") ? 5 : 6;
        int minSize = this.difficulty.equals("easy") ? 2 : this.difficulty.equals("medium") ? 2 : this.difficulty.equals("hard") ? 3 : 4;
        
        // Assign both the number of rows and columns
        puzzleSize[0] = (int) Math.round(Math.random() * (maxSize - minSize) + minSize);
        puzzleSize[1] = (int) Math.round(Math.random() * (maxSize - minSize) + minSize);
        
        return puzzleSize;
    }
    
    /**
     * Get puzzle colors depending on the puzzle size
     * @param size
     * @return 
     */
    public ArrayList getPuzzleColors(int [] size) {
        
        ArrayList<String> colors = new ArrayList();
        char [] genericColors = {'R', 'B', 'Y', 'G', 'O', 'M'};
        int numRows = size[0];
        int numCols = size[1];
        int puzzleSize = numRows * numCols;
        int numColors;
        
        // Assign the amount of colors depending on the size of the puzzle
        if (puzzleSize > 25) numColors = (int) Math.round(Math.random() * (6 - 2) + 2);
        else if (puzzleSize > 20) numColors = (int) Math.round(Math.random() * (5 - 2) + 2);
        else if (puzzleSize > 15) numColors = (int) Math.round(Math.random() * (4 - 2) + 2);
        else if (puzzleSize > 8) numColors = (int) Math.round(Math.random() * (3 - 2) + 2);
        else numColors = 2;
        
        // Fill the color array
        while (colors.size() < numColors) {
            
            // Generate a random color
            char color = genericColors[(int) (Math.random() * (genericColors.length - 1))];
            
            // Add to array whether it's not contained
            if (!colors.contains(String.valueOf(color))) {
                colors.add(String.valueOf(color));
            }
        }
        
        // Error if there are less than two colors
        if (colors.isEmpty()) {
            System.err.println("Error number of colors!");
            System.exit(1);
        }
       
        return colors;
    }
    
    /**
     * Get random scope of characters depending on a simple random number
     * @return 
     */
    private String getCharacterScope() {
        
        // Get a random number between 0-100
        int randNumCharacter = (int) Math.round(Math.random() * (100 - 1));
        int scope;
        
        // There is a 15% chance that the character has scope 3
        if (randNumCharacter > 85) {
            scope = 3;
        }

        // There is a 30% chance that the character has scope 3
        else if (randNumCharacter > 55) {
            scope = 2;
        }

        // There is a 55% chance that the character has scope 3
        else {
            scope = 1;
        }

        return String.valueOf(scope);
    }
    
    private boolean addCharacterColor(ArrayList<String> puzzleArray, ArrayList<String> colors) {
        
        // Get the number of involved colors
        int numColors = colors.size();
        
        // Equitable amount of colors
        int colorsPosition = (int) Math.ceil((puzzleArray.size()) / numColors);
        int colorsStatic = colorsPosition;
        int numColor = 0;
        
        // Assign the color depending on the color position and the number of the current color
        for (int i = 0; i < puzzleArray.size(); i++) {

            // Changing the color whether the index is greater than the color-position
            if (i >= colorsPosition) {
                colorsPosition += colorsStatic;
                numColor++;
            }

            // Add the color to the square
            if (!puzzleArray.get(i).equals(Puzzle.WALL) && !puzzleArray.get(i).equals(Puzzle.BLANK)) {
                puzzleArray.set(i, puzzleArray.get(i).concat(colors.get(numColor)));
            }
        }
        
        return checkColorsLength(puzzleArray);
       
    }
    
    /**
     * Check whether or not the amount of color is OK
     * @param array
     * @return 
     */
    private boolean checkColorsLength(ArrayList<String> array) {
        
        ArrayList<String> arrayCont = new ArrayList();
        
        for (int i = 0; i < array.size(); i++) {

            if (!array.get(i).equals(Puzzle.WALL) && !array.get(i).equals(Puzzle.BLANK)) {
                
                if (arrayCont.contains(String.valueOf(array.get(i).charAt(2)))) {
                    arrayCont.add(String.valueOf(array.get(i).charAt(2)));
                }
            }
        }

        return arrayCont.size() > 1;
    }
    
    
    //TODO:
    // Acabaaaaaaaaaaaaaar Jodeeeeeeeeeeeer
    
 
}
