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

//Type Alias
type Combinable = number | string
type ObjectAlias = {
    alias: Combinable,
    user: {
        name: string,
        age: number,
    }
}

//Function types
let functionType: Function;
let exampleFunction: (a: number, b: number) => number;
//Callback function in Function Types
let exampleCallback: (a: string, cb: (str: string) => void) => string;

//Objects
const person: {
    name: string;
    age: number;
    job: [number, string]; //Tuple: fixed length array (push() is exception)
    role: Role;
    literal: 'as-admin' | 'as-user'
    alias: Combinable
} = {
    name: 'Gabriel',
    age: 40,
    job: [2, 'author'],
    role: Role.ADMIN,
    literal: 'as-admin',
    alias: 1
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