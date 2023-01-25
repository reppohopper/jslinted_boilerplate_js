/*
** @param a, b        - values (Object, RegExp, Date, etc.)
** @returns {boolean} - true if a and b are the object or same primitive value or
**                      have the same properties with the same values
*/

// Credit https://stackoverflow.com/a/30478344 ; thank you RobG .
const deep_equals = function (a, b) {

    // If a and b reference the same value, return true
    if (a === b) {
        return true;
    }

    // If a and b aren't the same type, return false
    if (typeof a !== typeof b) {
        return false;
    }

    // We already know types are the same, so if type is number
    // and both NaN, return true
    if (
        (typeof a === "number")
        && Number.isNaN(a)
        && Number.isNaN(b)
    ) {
        return true;
    }

    // Get internal [[Class]] (kind of like a deeper type.)
    const a_deep_type = Object.prototype.toString.call(a);
    const b_deep_type = Object.prototype.toString.call(b);

    // Return false if not same class
    if (a_deep_type !== b_deep_type) {
        return false;
    }

    // If they're Boolean, String or Number objects, check values
    if (
        [
        "[object Boolean]", "[object String]", "[object Number]"
        ].includes(a_deep_type)
    ) {
        return a.valueOf() === b.valueOf();
    }

    // If they're RegExps, Dates or Error objects, check stringified values
    if (
        [
            "[object RegExp]", "[object Date]","[object Error]"
        ].includes(a_deep_type)
    ) {
        return a.toString() === b.toString();
    }

    // Otherwise they're Objects, Functions or Arrays or some
    // kind of host object
    if (typeof a === "object" || typeof a === "function") {

        // For functions, check stringigied values are the same
        // Almost certainly false if a and b aren't trivial
        // and are different functions
        if (
            a_deep_type === "[object Function]"
            && a.toString() !== b.toString()
        ) {
            return false;
        }

        const a_keys = Object.keys(a);
        const b_keys = Object.keys(b);

        // If they don't have the same number of keys, return false
        if (a_keys.length !== b_keys.length) {
            return false;
        }

        // Check they have the same keys
        if (
            !(a_keys.every(function (key) {
                return b.hasOwnProperty(key);
            }))
        ) {
            return false;
        }

        // Check key values - uses ES5 Object.keys
        return a_keys.every(function(key){
            return deep_equals(a[key], b[key]);
        });
    }
    return false;
};
// Last updated 25 Jan 2023
// Test me: 
//  console.log(
//     deep_equals(
//         {"a": [new Date("01/01/2023"), 2, true, /[a-z]/]}, 
//         {"a": [new Date("01/01/2023"), 2, true, /[a-z]/]}
//     )
// ); 
