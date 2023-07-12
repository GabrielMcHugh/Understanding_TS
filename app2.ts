// ENUM

//Instead of this...
const ADMIN = 0
const READ_ONLY = 1
//..which is unlimited in set


//Whe can do use an enum.
enum Role {ADMIN = 5, READ_ONLY, AUTHOR = 1, CHEF = 'CHEF'} 
//Enum: Assigns labels to numbers in a fixed set!!
//Allows us to have fixed list of values.
//It is a great construct whenever you identifiers wit




//Objects
const person: {
    name: string;
    age: number;
    job: [number, string]; //Tuple: fixed length array (push() is exception)
    role: Role;
} = {
    name: 'Gabriel',
    age: 40,
    job: [2, 'author'],
    role: Role.ADMIN 
}

console.log(person.name)

//Union Types
function combine(input1: number | string, input2: number) {
    let result;
    if (typeof input1 === 'number' && typeof input2 === 'number') {
         result = input1 + input2
    } else {
        result = input1.toString() + input2.toString()
    }
    
    return result
}