/*********************************************
 * Level Scrambler
 *********************************************
 *
 * Developed by: Pau Sanchez
 *
 * website:     pausanchezv.com
 * Github:      github.com/pausanchezv
 * Linkedin:    linkedin.com/in/pausanchezv
 * Twitter:     twitter.com/pausanchezv
 * Facebook:    facebook.com/pausanchezv
 *
 * All rights reserved. - Barcelona 2018 -
 *
 * *******************************************
 *
 * Level Scrambler
 *
 * A scrambled level represents the second kind of generated levels. It starts from a goal state which has been previously created by a human.
 *
 * The first step that we have to do is to get a random goal created previously. The returned level will just have blocks and numbers.
 *
 * The easiest way to create this type of level is starting from natural numbers. If we suppose that a level contains just blocks and numbers, then it is so easy to convert the numbers to random colors.
 *
 * The next step involves creating a LevelGenerator object, since we can take advantage of some methods which are already implemented. The method I'm gonna use is one that returns the scope of the figure. At this time we don't know what figure we will have but it doesn't matter now. The only thing we want to do in this step is add the scope of the move.
 *
 * As far as the figure, it will be random according to the percentages that we have created, but these probabilities will ever be different from each other.
 *
 * Lastly, the start state is shuffled and then the levels are ready to be returned.
 *
 *********************************************/
package applicationpuzzle;

import java.util.ArrayList;
import java.util.Arrays;

/**
 *
 * @author pausanchezv
 */
public final class LevelScrambler {
    
    // Difficulty level
    private final String difficulty;
    
    // colors
    private final ArrayList<String> colors;
    
    // goals
    private ArrayList<String[][]> goals;
    
    /**
     * LevelGenerator Constructor
     */
    public LevelScrambler() {
        this.colors = new ArrayList();
        this.difficulty = "expert";
        addGoals();
    }
    
    /**
     * LevelGenerator Constructor
     * @param difficulty
     */
    public LevelScrambler(String difficulty) {
        this.colors = new ArrayList();
        this.difficulty = difficulty;
        addGoals();
    }
    
    
    /**
     * Add color
     */
    private void addColor(String [][] matrix) {
        
        String [] genericColors = {"R", "B", "Y", "G", "O", "M"};
        Util.arrayShuffle(genericColors);

        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[0].length; j++) {
                
                if (!matrix[i][j].equals("#")) {
                    String color = genericColors[Integer.parseInt(matrix[i][j]) - 1];
                    matrix[i][j] = color;
                    
                    if (!colors.contains(color)) {
                        colors.add(color);
                    }
                }
            }
        }
    }
    
    /**
     * Add figure scope
     * @param matrix 
     */
    private void addCharacterScope(String [][] matrix) {
        
        for (String[] row : matrix) {
            for (int j = 0; j < row.length; j++) {
                if (!row[j].equals("#")) {
                    row[j] = LevelGenerator.getCharacterScope() + row[j];
                } else {
                    row[j] = '#' + row[j];
                }
            }
        }
    }
    
    /**
     * Add figure
     * @param matrix 
     */
    private void addCharacter(String [][] matrix) {
        
        String [] characters = {"T", "B", "Q"};
        Util.arrayShuffle(characters);

        for (String[] row : matrix) {
            for (int j = 0; j < row.length; j++) {
                if (!row[j].equals("##")) {
                    int num = (int) Math.round(Math.random() * 100);
                    if (num > 80) {
                        row[j] = characters[0] + row[j];
                    } else if (num > 40) {
                        row[j] = characters[1] + row[j];
                    } else {
                        row[j] = characters[2] + row[j];
                    }
                } else {
                    row[j] = '#' + row[j];
                }
            }
        }  
    }
    
    /**
     * Get scrambled level
     * @param showFeatures
     * @return 
     */
    public ArrayList<String[][]> getGeneratedLevel(boolean showFeatures) {
        
        // Generate a random goal
        String [][] goal = this.goals.get((int) Math.round(Math.random() * (this.goals.size() - 1)));
        
        // Add color to goal
        addColor(goal);
        
        // Create start state starting from the goal state
        String [][] start = Util.createPuzzleCopy(goal);
        
        // Add the scope of the figure
        addCharacterScope(start);
        
        // Add the figure
        addCharacter(start);
        
        // Shuffle the start state
        Util.matrixShuffleWithNeedle(start);
        
        // Show features
        if (showFeatures) {
            showLevelFeatures(start, goal);
        }
        
        // Level
        ArrayList<String[][]> level = new ArrayList();
        level.add(start);
        level.add(goal);
        
        return level;  
    }
    
    /**
     * Show level features
     * @param start
     * @param goal 
     */
    private void showLevelFeatures(String[][] start, String[][] goal) {
        
        System.out.println("");
        System.out.println("Level's kind: Half random");
        System.out.println("Puzzle distribution percentages:");
        System.out.println("Queen percentage: random");
        System.out.println("Bishop percentage: random");
        System.out.println("Tower percentage: random");
        System.out.println("Block percentage: random");
        System.out.println("");
        System.out.println("Difficulty level: " + this.difficulty);
        System.out.println("Number of rows: " + start.length);
        System.out.println("Number of columns: " + start[0].length);
        System.out.println("");
        System.out.println("Colors (" + this.colors.size() + "): "  + Arrays.asList(colors));
        System.out.println("");
        System.out.println("Start state:");

        for (String[] x : start) {
            System.out.println(Arrays.toString(x));
        }
        System.out.println("");
        System.out.println("Goal state:");
        
        for (String[] x : goal) {
            System.out.println(Arrays.toString(x));
        }
        System.out.println("");
    }
    
    
    /**
     * Add goals
     */
    private void addGoals() {
        
        // declare the goal array
        ArrayList<String[][]> expertGoals = new ArrayList();
        
        // Expert goals
        String[][] goal_1 = {{"#", "#", "1", "1", "#", "#"}, {"#", "#", "1", "1", "#", "#"}, {"2", "2", "3", "3", "4", "4"}, {"2", "2", "3", "3", "4", "4"}, {"#", "#", "5", "5", "#", "#"}, {"#", "#", "5", "5", "#", "#"}};
        String[][] goal_2 = {{"1", "1", "#", "#", "2", "2"}, {"1", "1", "#", "#", "2", "2"}, {"#", "#", "3", "3", "#", "#"}, {"#", "#", "3", "3", "#", "#"}, {"4", "4", "#", "#", "5", "5"}, {"4", "4", "#", "#", "5", "5"}};
        String[][] goal_3 = {{"1", "1", "2", "3", "3"}, {"1", "#", "2", "#", "3"}, {"1", "#", "2", "#", "3"}, {"1", "#", "2", "#", "3"}, {"1", "#", "2", "#", "3"}, {"1", "1", "2", "3", "3"}};
        String[][] goal_4 = {{"3", "3", "3", "3", "3", "3"}, {"3", "#", "#", "#", "#", "3"}, {"2", "2", "2", "2", "2", "2"}, {"1", "#", "#", "#", "#", "1"}, {"1", "1", "1", "1", "1", "1"}};
        String[][] goal_5 = {{"1", "1", "1", "1", "#"}, {"1", "1", "1", "#", "2"}, {"1", "1", "#", "2", "2"}, {"1", "#", "2", "2", "2"}, {"#", "2", "2", "2", "2"}};
        String[][] goal_6 = {{"#", "2", "2", "2", "2"}, {"1", "#", "2", "2", "2"}, {"1", "1", "#", "2", "2"}, {"1", "1", "1", "#", "2"}, {"1", "1", "1", "1", "#"}};
        String[][] goal_7 = {{"#", "#", "#", "1", "1", "1"}, {"#", "#", "#", "2", "2", "2"}, {"#", "#", "#", "3", "3", "3"}, {"4", "4", "4", "#", "#", "#"}, {"5", "5", "5", "#", "#", "#"}, {"6", "6", "6", "#", "#", "#"}};
        String[][] goal_8 = {{"6", "5", "4", "#", "#", "#"}, {"6", "5", "4", "#", "#", "#"}, {"6", "5", "4", "#", "#", "#"}, {"#", "#", "#", "3", "2", "1"}, {"#", "#", "#", "3", "2", "1"}, {"#", "#", "#", "3", "2", "1"}};
        
        expertGoals.add(goal_1);    expertGoals.add(goal_2);    expertGoals.add(goal_3);
        expertGoals.add(goal_4);    expertGoals.add(goal_5);    expertGoals.add(goal_6);
        expertGoals.add(goal_7);    expertGoals.add(goal_8);    
        
        // Add goals depending on the difficulty level
        switch (difficulty) {

            case "expert":
                this.goals = expertGoals;
                break;

            case "hard":
                this.goals = new ArrayList();
                break;

            case "medium":
                this.goals = new ArrayList();
                break;

            default:
                this.goals = new ArrayList();
                break;
        }
    }
}
