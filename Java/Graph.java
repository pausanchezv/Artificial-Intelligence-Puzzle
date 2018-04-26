/*********************************************
 * Simple Graph based on strings
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
import java.util.HashSet;



/**
 *
 * @author pausanchezv
 */
public final class Graph {
    
    // Nodes & edges
    public final HashSet nodes;
    public final HashSet edges;
    
    /**
     * Graph Constructor
     */
    public Graph() {
        nodes = new HashSet();
        edges = new HashSet();
    }
    
    /**
     * Add node
     * @param x 
     */
    public void addNode(String x) {
        
        if (!nodes.contains(x))
            nodes.add(x);
    }
    
    /**
     * Add edge
     * @param x
     * @param y 
     */
    public void addEdge(String x, String y) {
        
        if (!hasEdge(x, y)) {
            
            addNode(x);
            addNode(y);
            
            String [] edge = {x, y};
            edges.add(edge);
        }
    }
    
    /**
     * Get neighbors
     * @param node
     * @return 
     */
    public ArrayList neighbors(String node) {
        
        ArrayList<String> neighbors = new ArrayList();
        
        for (Object edge: edges) {
            
            String [] stringEdge = (String []) edge;
            
            if (stringEdge[0].equals(node) || stringEdge[1].equals(node)) {
                
                String neighbor = stringEdge[0].equals(node) ? stringEdge[1] : stringEdge[0];
                neighbors.add(neighbor); 
            } 
        }
        
        return neighbors; 
    }
    
    /**
     * Check whether or not the graph has an specific edge
     * @param A
     * @param B
     * @return 
     */
    public boolean hasEdge(String A, String B) {
        
        boolean found = false;
        
        for (Object edge : edges) {
            
            String [] key = (String []) edge;
            
            if ((key[0].equals(A) && key[1].equals(B)) || (key[0].equals(B) && key[1].equals(A))) {
                found = true;
            } 
        }
        
        return found;   
    }
    
    /**
     * Get number of nodes
     * @return 
     */
    public int getNumNodes() {
        return nodes.size();
    }
    
    
    /**
     * Get any node
     * @return 
     */
    public String getAnyNode() {
        
        for (Object node : nodes) {
            
            return (String) node;
        }
        return "";
    } 
    
    public static void addPuzzleEdges(Graph graph, State state) {
        
        Puzzle puzzle = state.getPuzzle();
        
        for (int row = 0; row < puzzle.getNumRows(); row++) {
            for (int col = 0; col < puzzle.getNumCols(); col++) {

                if (!puzzle.containsWall(row, col)) {

                    // perpendicular
                    if (!puzzle.containsWall(row - 1, col) && !graph.hasEdge(String.valueOf(row) + String.valueOf(col), String.valueOf(row - 1) + String.valueOf(col)))
                        graph.addEdge(String.valueOf(row) + String.valueOf(col), String.valueOf(row - 1) + String.valueOf(col));

                    if (!puzzle.containsWall(row + 1, col) && !graph.hasEdge(String.valueOf(row) + String.valueOf(col), String.valueOf(row + 1) + String.valueOf(col)))
                        graph.addEdge(String.valueOf(row) + String.valueOf(col), String.valueOf(row + 1) + String.valueOf(col));

                    if (!puzzle.containsWall(row, col - 1) && !graph.hasEdge(String.valueOf(row) + String.valueOf(col), String.valueOf(row) + String.valueOf(col - 1)))
                        graph.addEdge(String.valueOf(row) + String.valueOf(col), String.valueOf(row) + String.valueOf(col -1));

                    if (!puzzle.containsWall(row, col + 1) && !graph.hasEdge(String.valueOf(row) + String.valueOf(col), String.valueOf(row) + String.valueOf(col + 1)))
                        graph.addEdge(String.valueOf(row) + String.valueOf(col), String.valueOf(row) + String.valueOf(col + 1));

                    // diagonals
                    if (!puzzle.containsWall(row - 1, col - 1) && !graph.hasEdge(String.valueOf(row) + String.valueOf(col), String.valueOf(row - 1) + String.valueOf(col - 1)))
                        graph.addEdge(String.valueOf(row) + String.valueOf(col), String.valueOf(row - 1) + String.valueOf(col - 1));

                    if (!puzzle.containsWall(row + 1, col - 1) && !graph.hasEdge(String.valueOf(row) + String.valueOf(col), String.valueOf(row + 1) + String.valueOf(col - 1)))
                        graph.addEdge(String.valueOf(row) + String.valueOf(col), String.valueOf(row + 1) + String.valueOf(col - 1));

                    if (!puzzle.containsWall(row - 1, col + 1) && !graph.hasEdge(String.valueOf(row) + String.valueOf(col), String.valueOf(row - 1) + String.valueOf(col + 1)))
                        graph.addEdge(String.valueOf(row) + String.valueOf(col), String.valueOf(row - 1) + String.valueOf(col + 1));

                    if (!puzzle.containsWall(row + 1, col + 1) && !graph.hasEdge(String.valueOf(row) + String.valueOf(col), String.valueOf(row + 1) + String.valueOf(col + 1)))
                        graph.addEdge(String.valueOf(row) + String.valueOf(col), String.valueOf(row + 1) + String.valueOf(col + 1));
                }
            }
        }
    }
}
