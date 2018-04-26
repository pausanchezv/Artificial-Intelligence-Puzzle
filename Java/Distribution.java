/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package applicationpuzzle;

/**
 *
 * @author pausanchezv
 */
public final class Distribution {
        
    // Percentages
    private final int blockPercentage;
    private final int bishopPercentage;
    private final int queenPercentage;
    private final int towerPercentage;

    /**
     * Distribution Constructor
     * @param blockPercentage
     * @param bishopPercentage
     * @param queenPercentage 
     */
    public Distribution(int blockPercentage, int bishopPercentage, int queenPercentage) {

        this.blockPercentage = blockPercentage;
        this.bishopPercentage = bishopPercentage;
        this.queenPercentage = queenPercentage;
        this.towerPercentage = addTowerPercentage();

    }

    /**
     * Add tower percentage
     * @return 
     */
    private int addTowerPercentage() {
        return 100 - this.blockPercentage - this.bishopPercentage - this.queenPercentage;
    }

    /**
     * Block percentage
     * @return 
     */
    public int getBlockPercentage() {
        return blockPercentage;
    }

    /**
     * Bishop percentage
     * @return 
     */
    public int getBishopPercentage() {
        return bishopPercentage;
    }

    /**
     * Queen percentage
     * @return 
     */
    public int getQueenPercentage() {
        return queenPercentage;
    }

    /**
     * Tower percentage
     * @return 
     */
    public int getTowerPercentage() {
        return towerPercentage;
    }

}