

function Heap(){

    this.heapList = [];
    this.currentSize = 0;
}


Heap.prototype = {


    minChild: function(i) {

        if ((i * 2 + 1) > this.currentSize) {
            return i * 2;
        } else {

            if (this.heapList[i*2] < this.heapList[i*2+1]) {
                return i * 2;
            }

            else {
                return i * 2 + 1;
            }
        }
    },

    push: function(k) {
        this.heapList.push(k)
        this.currentSize = this.currentSize + 1
        this.heapUp(this.currentSize)
    },

    heapUp: function(i) {

        while (Math.floor(i / 2) > 0) {

            if (this.heapList[i] < this.heapList[Math.floor(i / 2)]){

                var tmp = this.heapList[Math.floor(i / 2)];
                this.heapList[Math.floor(i / 2)] = this.heapList[i];
                this.heapList[i] = tmp;
            }

            i = Math.floor(i / 2);
        }
    },

    heapDown: function(i) {

        while ((i * 2) < this.currentSize) {

            var mc = this.minChild(i);

            if (this.heapList[i] > this.heapList[mc]) {
                var tmp = this.heapList[i];
                this.heapList[i] = this.heapList[mc];
                this.heapList[mc] = tmp;
            }

            i = mc;

        }

    },

    delMin: function() {

        var retval = this.heapList[1];
        this.heapList[1] = this.heapList[this.currentSize];
        this.currentSize = this.currentSize - 1;
        this.heapList.pop();
        this.heapDown(1);
        return retval
    }

};