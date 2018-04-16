/*********************************************
 * Action
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

/**
 *
 * Class Action
 */
public class Action {
    
    // Declarations
    private final String direction;
    private int [] position;
    private final int value;

    /**
     * Action Constructor
     * 
     * @param direction
     * @param value 
     */
    public Action(String direction, int value) {
        this.direction = direction;
        this.value = value;
    }
    
    /**
     * Action Constructor
     * 
     * @param direction
     * @param value 
     * @param position
     */
    public Action(String direction, int value, int [] position) {
        this.direction = direction;
        this.value = value;
        this.position = position;
    }

    /**
     * Action to String
     * @return 
     */
    @Override
    public String toString() {
        
        if (position != null) {
            return "{" + "'position': " + String.valueOf(position[0])+ String.valueOf(position[1]) + ", 'direction': " + direction + ", 'value': " + value + "}";
        }
        
        return "{" + "'direction': " + direction + ", 'value': " + value + "}";
    }

    /**
     * Direction getter
     * @return 
     */
    public String getDirection() {
        return direction;
    }

    /**
     * Position getter
     * @return 
     */
    public int[] getPosition() {
        return position;
    }

    /**
     * Value getter
     * @return 
     */
    public int getValue() {
        return value;
    }
}
