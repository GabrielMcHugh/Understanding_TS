let userInput: unknown;

userInput = 5
userInput = 'test'
//Cant do 
let userName: string;
// userInput = userName

//We know what to do with userInput if we know it is a type
if (typeof userInput === 'string') {
    userName = userInput
}