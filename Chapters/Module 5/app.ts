//60. Creating a First Class
class Department {
    constructor( public name: string = "default", ) { //constructor() is a reserved keyword
    }

    describe(this: Department) { 
        console.log('Department: ' + this.name) //must use this to refer to member variables
    }
}

class ITDepartment extends Department {
    constructor(public admins: string[]) {
        super("IT Department")
    }
}

const iT = new ITDepartment(["John Bobson", "Babel JS"])

console.log(iT)

interface Named {
    name: string
}

interface Greetable {
    greet: () => string
}

interface namedAndGreetable extends Named, Greetable {}