// ENUM
//Instead of this...
var ADMIN = 0;
var READ_ONLY = 1;
//..which is unlimited in set
//Whe can do use an enum.
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 5] = "ADMIN";
    Role[Role["READ_ONLY"] = 6] = "READ_ONLY";
    Role[Role["AUTHOR"] = 1] = "AUTHOR";
    Role["CHEF"] = "CHEF";
})(Role || (Role = {}));
//Enum: Assigns labels to numbers in a fixed set!!
//Allows us to have fixed list of values.
//It is a great construct whenever you identifiers wit
//Objects
var person = {
    name: 'Gabriel',
    age: 40,
    job: [2, 'author'],
    role: Role.ADMIN
};
console.log(person.name);
//Union Types
function combine(input1, input2) {
    var result;
    if (typeof input1 === 'number' && typeof input2 === 'number') {
        result = input1 + input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
}
