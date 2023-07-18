"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
//Tuple rest parameters
const add = (...numbers) => {
    return numbers.reduce((acc, curr) => {
        return acc + curr;
    });
};
const addNumbers = add(5, 6, 4);
console.log(addNumbers);
// const addMoreNumbers = add(5,6,7,8)  #Doesn't work because too many param in tuple
let hobbies = ["Cooking", "Cleaning", "Childrearing"];
//Array destructuring
const [hobby1, hobby2, ...remainingHobbies] = hobbies;
let animals = { cat: 1, dog: 2, bird: 3, horse: 4 };
//Object destructing
const { cat, dog } = animals, remainingAnimals = __rest(animals, ["cat", "dog"]);
