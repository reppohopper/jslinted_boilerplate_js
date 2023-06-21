// heaps are arrays that use array[0] as an int representing the "size";
// and then start at array[1] so that there are no indexing problems.

// void function modifies an array by reference. 
const heaps = (function heaps_module_loader (default_greater_func) {

    let exp = {};
    let dgf = default_greater_func || function (a, b) {
        return a > b;
    };

    exp.heapify = function (heap, i, greater_func=dgf) {
        const size = heap[0];
        const [left, right] = [(i * 2) + 1, (i * 2)];
        let largest = (
            (
                left <= size
                && greater_func(heap[left], heap[i])
            ) 
            ? left
            : i
        );
        if (
            right <= size
            && greater_func(heap[right], heap[largest])
        ) {
            largest = right;
        }
        if (i !== largest) {
            [heap[i], heap[largest]] = [heap[largest], heap[i]];
            exp.heapify(heap, largest, greater_func);
        }
    };
    
    exp.insert = function (heap, new_value, greater_func=dgf) {
        heap[0] += 1, heap[heap[0]] = new_value;
        let i = heap[0];
        while (
            i > 1
            && greater_func(heap[i], heap[Math.floor(i/2)])
        ) {
            [heap[i], heap[Math.floor(i/2)]] =
            [heap[Math.floor(i/2)], heap[i]];
            i = Math.floor(i/2);
        }
    };

    exp.build_from_array = function (array, greater_func=dgf) {
        const heap = [array.length].concat(array.slice());
        for (let i=heap[0]; i >= 2; i--) {
            [heap[1], heap[i]] = [heap[i], heap[1]];
            copy[0] -= 1;
            exp.heapify(heap, greater_func);
        }
        return heap;
    };

    return exp;
// defaults to max heaps. for min heaps, simply pass
// (a, b) => a < b to this closure:  
}());

