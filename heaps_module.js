// heaps are arrays that use array[0] as an int representing the "size";
// and then start at array[1] so that there are no indexing problems.

const heaps = (function heaps_module_loader (default_prioroty_func) {

    let exp = {};
    let dpf = default_prioroty_func || function (a, b) {
        return a > b;
    };

    const prio_funcs = new Map();
    exp.discard_heap = function (heap) {
        prio_funcs.delete(heap);
    };

    exp.heapify = function (heap, i) {
        const priority_func = prio_funcs.get(heap);
        const [left, right] = [(i * 2) + 1, (i * 2)];
        let largest = (
            (
                left <= heap[0]
                && priority_func(heap[left], heap[i])
            ) 
            ? left
            : i
        );
        if (
            right <= heap[0]
            && priority_func(heap[right], heap[largest])
        ) {
            largest = right;
        }
        if (i !== largest) {
            [heap[i], heap[largest]] = [heap[largest], heap[i]];
            exp.heapify(heap, largest);
        }
    };
    
    exp.insert = function (heap, new_value) {
        const priority_func = prio_funcs.get(heap);
        heap[0] += 1, heap[heap[0]] = new_value;
        let i = heap[0];
        while (
            i > 1
            && priority_func(heap[i], heap[Math.floor(i/2)])
        ) {
            [heap[i], heap[Math.floor(i/2)]] =
            [heap[Math.floor(i/2)], heap[i]];
            i = Math.floor(i/2);
        }
    };

    exp.peek = function (heap) {
        return heap[1];
    };

    exp.extract = function (heap) {
        if (heap[0] < 1) {
            return undefined; // The heap is empty
        }
        // Swap the root with the last element of the heap. 
        [heap[1], heap[heap[0]]] = [heap[heap[0]], heap[1]]; 
        heap[0] -= 1; // Reduce the size of the heap
        exp.heapify(heap, 1); // Restore the heap property
        return heap.pop();
    };

    exp.build_from_array = function (array, priority_func=dpf) {
        const heap = [array.length].concat(array.slice());
        prio_funcs.set(heap, priority_func);
        for (let i = Math.floor(heap[0] / 2); i >= 1; i -= 1) {
            exp.heapify(heap, i);
        }
        return heap;
    };

    return exp;
// defaults to max heaps. for min heaps, simply pass
// (a, b) => a < b to this closure:  
}());

/*

SOME BASIC TESTS

function assert (condition, message) {
    if (!condition) {
        throw new Error(message || "Assertion failed");
    }
}

// 1. Test build_from_array and peek
let array = [3, 1, 4, 1, 5, 9, 2, 6];
let heap = heaps.build_from_array(array);
assert(heap[0] === array.length, "Heap size is correct");
assert(heaps.peek(heap) === Math.max(...array), "Max element is at the top of the heap");

// 2. Test insert
heaps.insert(heap, 10);
assert(heap[0] === array.length + 1, "Heap size is increased after insert");
assert(heaps.peek(heap) === 10, "Inserted element is at the top of the heap");

// 3. Test extract
let maxElement = heaps.extract(heap);
assert(maxElement === 10, "Extract returns the max element");
assert(heap[0] === array.length, "Heap size is decreased after extract");
assert(heaps.peek(heap) === Math.max(...array), "Max element is at the top of the heap after extract");

// 4. Test min heap
let minHeap = heaps.build_from_array(array, (a, b) => a < b);
assert(heaps.peek(minHeap) === Math.min(...array), "Min element is at the top of the min heap");

console.log("All tests passed");
*/
