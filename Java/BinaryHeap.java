/*********************************************
 * Binary heap
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
public class BinaryHeap {
    
    // Heap array
    private final ArrayList<HeapItem> content;
    
    /**
     * Inner class to hold both the state and its priority
     */
    private class HeapItem {
        
        // Declarations
        private final State state;
        private final float priority;
        
        /**
         * HeapItem Constructor
         * @param state
         * @param priority 
         */
        public HeapItem(State state, float priority) {
            this.state = state;
            this.priority = priority;
        }

        /**
         * State getter
         * @return 
         */
        public State getState() {
            return state;
        }

        /**
         * Priority getter
         * @return 
         */
        public float getPriority() {
            return priority;
        }
    }
    
    /**
     * BinaryHeap Constructor
     */
    public BinaryHeap() {
        content = new ArrayList();
    }
    
    /**
     * Push a new item
     * @param state
     * @param priority 
     */
    public void push(State state, float priority) {
        
        // Add the new element to the end of the array
        content.add(new HeapItem(state, priority));
        
        // Allow it to bubble up
        upHeap(content.size() - 1);
        
    }
    
    /**
     * Pop the priority item
     * @return 
     */
    public State pop() {
        
        // Store the first element so we can return it later.
        HeapItem result = content.get(0);
        
        // Get the element at the end of the array.
        HeapItem end = content.remove(content.size() - 1);
        
        // If there are any elements left, put the end element at the
        // start, and let it sink down.
        if (!content.isEmpty()) {
            content.set(0, end);
            downHeap(0);
        }
        
        return result.getState();
        
    }
    
    /**
     * Size getter
     * @return 
     */
    public int size() {
        return content.size();
    }
    
    /**
     * Check whether the heap is empty or not
     * @return 
     */
    public boolean isEmpty() {
        return content.isEmpty();
    }
    
    /**
     * Up heap method
     * @param n 
     */
    private void upHeap(int n) {
        
        // Fetch the element that has to be moved.
        HeapItem element = content.get(n);
        float score = element.getPriority();
        
        // When at 0, an element can not go up any further.
        while (n > 0) {
            
            // Compute the parent element's index, and fetch it.
            int parentN = (int) (Math.floor((n + 1) / 2) - 1);
            HeapItem parent = content.get(parentN);
            
            // If the parent has a lesser score, things are in order and we
            // are done.
            if (score > parent.getPriority()) {
                break;
            }
            
            // Otherwise, swap the parent with the current element and
            // continue.
            content.set(parentN, element);
            content.set(n, parent);
            n = parentN;
        }  
    }
    
    /**
     * Down Heap method
     * @param n 
     */
    private void downHeap(int n) {
        
        // Look up the target element and its score.
        int length = content.size();
        HeapItem element = content.get(n);
        float elemScore = element.getPriority();
        
        while (true) {
            
            // Compute the indices of the child elements.
            int child2N = (n + 1) * 2;
            int child1N = child2N - 1;
            
            // This is used to store the new position of the element,
            // if any.
            int swap = -1;
            
            // If the first child exists (is inside the array)...
            if (child1N < length) {
                
                // Look it up and compute its score.
                HeapItem child1 = content.get(child1N);
                float child1Score = child1.getPriority();
                
                // If the score is less than our element's, we need to swap.
                if (child1Score < elemScore) {
                    swap = child1N;
                }  
            }
            
            // Do the same checks for the other child.
            if (child2N < length) {
                
                HeapItem child2 = content.get(child2N);
                float child2Score = child2.getPriority();
                
                if (child2Score < (swap == -1 ? elemScore : content.get(child1N).getPriority())) {
                    swap = child2N;
                }  
            }
            
            // No need to swap further, we are done.
            if (swap == -1){
                break;
            }
            
            // Otherwise, swap and continue.
            content.set(n, content.get(swap));
            content.set(swap, element);
            n = swap;   
        } 
    } 
}
