import {note} from "./note.js"

// Our Plugin
export const textPlugin = {
    name: 'text',
    exec: function(currentValue: number) {
        return currentValue * currentValue;
    }
};

note.register(textPlugin);

// Using the calculator
note.setValue(3);      // => 3
note.press('plus', 2); // => 5
note.press('squared'); // => 25
note.press('squared'); //

console.log("testttt")