/*********************************************
 * JavaScript Binary Heap
 *********************************************
 *
 * Developed by: Pau Sanchez V.
 *
 * website:     pausanchezv.com
 * Github:      github.com/pausanchezv
 * Linkedin:    linkedin.com/in/pausanchezv
 * Twitter:     twitter.com/pausanchezv
 * Facebook:    facebook.com/pausanchezv
 *
 * All rights reserved. - Barcelona 2018 -
 *
 **********************************************/

/**
 * Binary Heap Class
 */
function BinaryHeap(){
    this.content = [];
}

/**
 * Binary Heap Prototype
 */
BinaryHeap.prototype = {

    /**
     * Add a node to the heap
     * @param element
     */
    push: function(element) {

        // Add the new element to the end of the array.
        this.content.push(element);

        // Allow it to bubble up.
        this.upHeap(this.content.length - 1);
    },

    /**
     * Pop the priority node
     * @returns {*}
     */
    pop: function() {

        // Store the first element so we can return it later.
        var result = this.content[0];

        // Get the element at the end of the array.
        var end = this.content.pop();

        // If there are any elements left, put the end element at the
        // start, and let it sink down.
        if (this.content.length > 0) {
            this.content[0] = end;
            this.downHeap(0);
        }

        return result[0];
    },

    /**
     * Heap size
     * @returns {Number}
     */
    size: function() {
        return this.content.length;
    },

    /**
     * Check if the heap is empty
     * @returns {boolean}
     */
    isEmpty: function() {
        return this.size() < 1;
    },

    /**
     * Up heap
     * @param n
     */
    upHeap: function(n) {

        // Fetch the element that has to be moved.
        var element = this.content[n], score = this.content[n][1];

        // When at 0, an element can not go up any further.
        while (n > 0) {

            // Compute the parent element's index, and fetch it.
            var parentN = Math.floor((n + 1) / 2) - 1,
                parent = this.content[parentN];

            // If the parent has a lesser score, things are in order and we
            // are done.
            if (score >= parent[1])
                break;

            // Otherwise, swap the parent with the current element and
            // continue.
            this.content[parentN] = element;
            this.content[n] = parent;
            n = parentN;
        }
    },

    /**
     * Down heap
     * @param n
     */
    downHeap: function(n) {

        // Look up the target element and its score.
        var length = this.content.length,
            element = this.content[n],
            elemScore = element[1];

        while(true) {

            // Compute the indices of the child elements.
            var child2N = (n + 1) * 2, child1N = child2N - 1;

            // This is used to store the new position of the element,
            // if any.
            var swap = null;

            // If the first child exists (is inside the array)...
            if (child1N < length) {

                // Look it up and compute its score.
                var child1 = this.content[child1N],
                    child1Score = child1[1];

                // If the score is less than our element's, we need to swap.
                if (child1Score < elemScore)
                    swap = child1N;
            }

            // Do the same checks for the other child.
            if (child2N < length) {

                var child2 = this.content[child2N],
                    child2Score = child2[1];
                if (child2Score < (swap === null ? elemScore : child1Score))
                    swap = child2N;
            }

            // No need to swap further, we are done.
            if (swap === null) break;

            // Otherwise, swap and continue.
            this.content[n] = this.content[swap];
            this.content[swap] = element;
            n = swap;
        }
    }
};