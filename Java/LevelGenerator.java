/*********************************************
 * Level Generator
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
 * ********************************************
 * 
 * There are basically two models of generated levels. The first one is based on an absolutely random way.
 *
 * The first thing that we have to do to generate this kind of level is to obtain a valid distribution. A distribution is an object that contains the amount percentage of characters for the level. For example, it doesn't make sense generating a level that contains only bishops because it has no solution.
 *
 * Now we have to get a valid puzzle size, both number of rows and columns. It will be given depending on the difficulty which is passed through the instance of the object.
 * 
 * After that it's necessary to obtain the colors of the puzzle. The number of the colors depends on the puzzle size obtained in the previous step.
 *
 * The next stage involves generating the level. First of all we generate the level as an array which will be used to build a graph in order to help us to check whether or not the level is connected. We can check the graph connection by using the Depth First Search Algorithm using it as a traversal algorithm instead of search algorithm. Then if the generated level has any isolated node, a recursive call is produced and this stage starts yet again until we get a valid level.
 * 
 * As a result we have a puzzle array now, that is based on 3-positional items, first refers to kind of item (tower, bishop or queen), the second shows the scope of its move, an finally, third indicates the square color. Now, we are able to get the goal array which is based on the color. All we have to do is get it from the puzzle array catching just the third position for each item.
 * 
 * Finally both puzzles start and goal are created using the arrays and depending on the puzzle size. The puzzles are saved in the levelGenerator object to extract the best solution by using the A* Search Algorithm. But that's another story which is explained in its section.
 *
 * The second kind of level is one where the start puzzle is constructed beforehand by a human, but the goal state is randomized starting from the first one.
 *
 * The first kind of level is better than the second one if we are looking for a level really difficult because the player doesn't have any strong visual model to keep in sight. On the other hand the second type of level is better than the first if we want a beautiful model, the realism decreases but it's easier to enjoy the level because you feel that you are building something that makes sense to see.
 * 
 * The basic idea is to mix both kind of levels, random and half-random in order to obtain a final game hard and realistic by using the first level type, but kind of nice to look at, by using the second one.
 *
 **********************************************/
package applicationpuzzle;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;

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
            char color = genericColors[(int) Math.round((Math.random() * (genericColors.length - 1)))];
            
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
    
    /**
     * Add color to puzzle
     * @param puzzleArray
     * @param colors
     * @return 
     */
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
                
                if (numColor < numColors -1)
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
                
                if (!arrayCont.contains(String.valueOf(array.get(i).charAt(2)))) {
                   
                    arrayCont.add(String.valueOf(array.get(i).charAt(2)));
                }
            }
        }
        
        return arrayCont.size() > 1;
    }
    
    
    private ArrayList<String> getGeneratedArray(Distribution distribution, ArrayList<String> colors, int numRows, int numCols) {
        
        // get the size and generate an empty array that's gonna hold the generated puzzle
        ArrayList<String> puzzleArray = new ArrayList();
        int size = numRows * numCols;
        
        // Get the number of blocks
        int numBlocks = (int) Math.round(distribution.getBlockPercentage() * size / 100);
        
        // Need to correct the block amount because of the puzzle size
        // It's much better do it specially referring to small puzzles
        if (size <= 6) {
            numBlocks = 0;
        } else if (size < 9) {
            numBlocks = (int) Math.round(Math.random()); // 0 or 1
        }
        
        // Get the rest of characters' amount
        int numQueens = (int) Math.round(distribution.getQueenPercentage() * size / 100);
        int numBishops = (int) Math.round(distribution.getBishopPercentage() * size / 100);
        int numTowers = size - numBlocks - numQueens - numBishops;
        
        // Add the characters to the puzzle
        for (int i = 0; i < numBlocks; i++) puzzleArray.add(Puzzle.WALL);
        for (int i = 0; i < numQueens; i++) puzzleArray.add("Q" + this.getCharacterScope());
        for (int i = 0; i < numBishops; i++) puzzleArray.add("B" + this.getCharacterScope());
        for (int i = 0; i < numTowers; i++) puzzleArray.add("T" + this.getCharacterScope());
        
        // Shuffle the puzzle before adding the colors
        Collections.shuffle(puzzleArray);
        
        // Add colors to the puzzle
        if (!addCharacterColor(puzzleArray, colors)) {
            
            // TODO: Test
            System.err.println("Recursion Color");
            int [] aSize = {numRows, numCols};
            ArrayList<String> newColors = getPuzzleColors(aSize);
            return getGeneratedArray(distribution, newColors, numRows, numCols);
        }
        
        // Shuffle the puzzle before adding the colors
        Collections.shuffle(puzzleArray);
        
        return puzzleArray;
    }
    
    /**
     * Get 2-dimensional puzzle from array
     * @param array
     * @param numRows
     * @param numCols
     * @return 
     */
    private String [][] getPuzzleFromArray(ArrayList<String> array, int numRows, int numCols) {
        
        // Create the array that's gonna hold the puzzle
        String [][] puzzle = new String[numRows][numCols];
        int offset = 0;
        
        // Fill the array with sub-arrays depending on the column size
        for (int row = 0; row < numRows; row++) {
            for (int col = 0; col < numCols; col++) { 
                puzzle[row][col] = array.get(offset++);
            }   
        }
        
        return puzzle;
    }
    
    
    /**
     * Get goal array
     * @param array
     * @return 
     */
    private ArrayList<String> getGoalArray(ArrayList<String> array) {
        
        // Arrays
        ArrayList<String> arrayColor;
        ArrayList<String> cloneColor;
        ArrayList<String> clone;
        
        do {
            
            // Get a clone of start array
            clone = (ArrayList<String>) array.clone();
            
            // Shuffling the clone but the blocks
            Util.arrayShuffleWithNeedle(clone, Puzzle.WALL);

            // Get the array colors
            arrayColor = Util.getArrayColor(array);
            cloneColor = Util.getArrayColor(clone);
            
        } while (Util.arrayListEquals(arrayColor, cloneColor));
        
        // Goal array
        ArrayList<String> goal = new ArrayList();
        
        // Fill the goal array out
        for (int i = 0; i < array.size(); i++) {
            goal.add(String.valueOf(clone.get(i).charAt(2)));
        }
        
        return goal; 
    }
    
    /**
     * Show console execution
     * @param rows
     * @param cols
     * @param colors
     * @param distribution
     * @param array
     * @param puzzle
     * @param goal
     * @param numRecursiveCalls
     */
    public void showLevelFeatures(
            int rows,
            int cols,
            ArrayList<String> colors,
            Distribution distribution,
            ArrayList<String> array,
            String[][] puzzle,
            String[][] goal,
            int numRecursiveCalls
    ) {
        System.out.println("");
        System.out.println("Puzzle distribution percentages:");
        System.out.println("Queen percentage: " + distribution.getQueenPercentage() + "%");
        System.out.println("Bishop percentage: " + distribution.getBishopPercentage() + "%");
        System.out.println("Tower percentage: " + (100 - distribution.getBishopPercentage() - distribution.getQueenPercentage()  - distribution.getBlockPercentage()) + "%");
        System.out.println("Block percentage: " + distribution.getBlockPercentage() + "%");
        System.out.println("");
        System.out.println("Difficulty level: " + this.difficulty);
        System.out.println("Number of rows: " + rows);
        System.out.println("Number of columns: " + cols);
        System.out.println("");
        System.out.println("Is connected: true");
        System.out.println("Number of recursive calls needed: " + numRecursiveCalls);
        System.out.println("");
        System.out.println("Colors (" + colors.size() + "): "  + colors);
        System.out.println("Puzzle as array: " + array);
        System.out.println("");
        System.out.println("Start state:");

        for (int i = 0; i < puzzle.length; i++) {
            System.out.println(Arrays.toString(puzzle[i]));
        }
        System.out.println("");
        System.out.println("Goal state:");
        
        for (int i = 0; i < goal.length; i++) {
            System.out.println(Arrays.toString(goal[i]));
        }
        System.out.println("");
    }
    
    
    /**
     * Generate the level
     * @param showFeatures
     * @return 
     */
    public ArrayList<String [][]> getGeneratedLevel(boolean showFeatures) {
        
        // Get a distribution puzzle
        Distribution distribution = getPuzzleDistibution();
        
        // Get the puzzle size depending on the difficulty
        int [] size = getPuzzleSize();
        
        // get the colors depending on the size which depends on the difficulty
        ArrayList<String>colors = this.getPuzzleColors(size);
               
        String [][] puzzle;
        ArrayList<String> puzzleArray;
        
        // Counting the necessary recursive calls
        int numRecursiveCalls = 0;
        
        do {
            
            puzzleArray = getGeneratedArray(distribution, colors, size[0], size[1]);
            puzzle = getPuzzleFromArray(puzzleArray, size[0], size[1]);
            numRecursiveCalls++;
            
        } while(!SearchAlgorithms.isConnectedPuzzle(puzzle));
        
        // Get the goal array
        ArrayList<String> goalArray = this.getGoalArray(puzzleArray);
        
        // Convert the goal array into a matrix
        String [][] goal = getPuzzleFromArray(goalArray, size[0], size[1]);

        // Show the computes
        if (showFeatures) {
            this.showLevelFeatures(size[0], size[1], colors, distribution, puzzleArray, puzzle, goal, numRecursiveCalls);
        }
        
        // Level
        ArrayList<String[][]> level = new ArrayList();
        level.add(puzzle);
        level.add(goal);
        
        return level;
    }
    
    /**
     * Get one of the predetermined possible distributions
     * @return 
     */
    private Distribution getPuzzleDistibution() {
        
        // Array that's gonna hold the distributions
        ArrayList<Distribution> distributions = new ArrayList();
        
        // Distributions
        Distribution distribution_1 = new Distribution(20, 20, 10);
        Distribution distribution_2 = new Distribution(30, 10, 20);
        Distribution distribution_3 = new Distribution(10, 20, 20);
        Distribution distribution_4 = new Distribution(5, 30, 15);
        Distribution distribution_5 = new Distribution(30, 20, 10);
        Distribution distribution_6 = new Distribution(0, 20, 30);
        Distribution distribution_7 = new Distribution(10, 15, 25);
        Distribution distribution_8 = new Distribution(5, 5, 5);
        Distribution distribution_9 = new Distribution(5, 0, 0);
        
        // Get a random number
        distributions.add(distribution_1); distributions.add(distribution_2);
        distributions.add(distribution_3); distributions.add(distribution_4);
        distributions.add(distribution_5); distributions.add(distribution_6);
        distributions.add(distribution_7); distributions.add(distribution_8);
        distributions.add(distribution_9);
        
        int randNum = (int) Math.round(Math.random() * ((distributions.size() - 1)));
        
        // return a random distribution
        return distributions.get(randNum);
    }
}
