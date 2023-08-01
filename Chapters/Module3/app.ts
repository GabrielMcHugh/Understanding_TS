//Tuple rest parameters
const add = (...numbers: [number, number, number]) => {
    return numbers.reduce((acc, curr) => {
        return acc + curr
    })
}

const addNumbers = add(5, 6, 4)
console.log(addNumbers)
// const addMoreNumbers = add(5,6,7,8)  #Doesn't work because too many param in tuple


let hobbies = ["Cooking", "Cleaning", "Childrearing"]

//Array destructuring
const [hobby1, hobby2, ...remainingHobbies] = hobbies

let animals = { cat: 1, dog: 2, bird: 3, horse: 4}

//Object destructing
const { cat, dog, ...remainingAnimals} = animals