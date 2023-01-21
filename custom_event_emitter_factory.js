// Code taken directly from ...
// https://github.com/turnbasedgames/urturn/blob/main/packages/client/src/util/eventEmitter.js
// adapted into a classless, this-less, JSLint-ed factory function.
// Last updated 21 Jan 2023
const create_event_emitter = function () {
    // STRUCTURE: listeners (object) {
    //   "<event_name>": Set([callback_1, callback_2, ...])
    // }
    const emitter = {
// listeners hash object to be filled with properties each with structure:
// "<event_name>": Set([callback_1, callback_2, ...])
        listeners: {}
    };
    // Add the function to the set, creating the set first if necessary.
    emitter.on = function (event_name, callback) {
        if (emitter.listeners.hasOwnProperty(event_name)) {
            emitter.listeners[event_name].add(callback);
        } else {
            emitter.listeners[event_name] = new Set([callback]);
        }
    };
    // Delete the function off of the set after silently checking if it exists.
    emitter.off = function (event_name, callback) {
        if (emitter.listeners.hasOwnProperty(event_name)) {
            emitter.listeners[event_name].delete(callback);
            if (emitter.listeners[event_name].size === 0) {
                delete emitter.listeners[event_name];
            }
        }
    };
// Call all the callbacks associated with an event, passing a data value
// to each of them in turn, and softly failing with just a console warning for
// any callback that throws an error for any reason.
    emitter.emit = function (event_name, data) {
        if (emitter.listeners.hasOwnProperty(event_name)) {
            emitter.listeners[event_name].forEach(function (callback) {
                try {
                    callback(data);
                } catch (error) {
                    console.warn("Error while handling callback:", error);
                }
            });
        }
    };
    // return this object that has been created.
    return emitter;
};


// Linted up to here 21 Jan 2023
// Some code for testing: 

// const just_log_the_data = function (data) {
//     console.log(data);
// };
// 
// const first_event_emitter = create_event_emitter();
// first_event_emitter.on("my_event", just_log_the_data);
// 
// first_event_emitter.on("my_event", function (data) {
//     console.log(data * 2);
// });
// 
// first_event_emitter.off("my_event", just_log_the_data)
// 
// first_event_emitter.emit("my_event", 2);