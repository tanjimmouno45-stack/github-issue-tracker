What is the difference between var, let, and const?

Answer:

In JavaScript, var, let, and const are used to declare variables. They differ in scope, redeclaration, and reassignment.

| Feature        | `var`           | `let`                         | `const`                       |
| -------------- | --------------- | ----------------------------- | ----------------------------- |
| Scope          | Function-scoped | Block-scoped                  | Block-scoped                  |
| Redeclaration  | Allowed         | Not allowed in the same scope | Not allowed in the same scope |
| Reassignment   | Allowed         | Allowed                       | Not allowed                   |
| Initialization | Optional        | Optional                      | Required                      |

What is the spread operator (...)?

Answer:

The spread operator (...) was introduced in ES6. It is used to expand the elements of an array or the properties of an object.
Example 1: Using spread with an array :
const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4, 5];

console.log(newNumbers);
Output:[1, 2, 3, 4, 5]

Example 2: Using spread with an object :
const person = { name: "Rahim", age: 20 };

const updatedPerson = { ...person, city: "Dhaka" };

console.log(updatedPerson);
Output:{ name: "Rahim", age: 20, city: "Dhaka" }

What is the difference between map(), filter(), and forEach()?

Answer:
map(), filter(), and forEach() are JavaScript array methods, but they perform different tasks.
| Method      | Purpose                                   | Return value |
| ----------- | ----------------------------------------- | ------------ |
| `map()`     | Transforms each element                   | A new array  |
| `filter()`  | Selects elements that satisfy a condition | A new array  |
| `forEach()` | Executes a function for each element      | `undefined`  |

What is an arrow function?

Answer:

An arrow function is a shorter way to write a function in JavaScript. It was introduced in ES6 and uses the => symbol.

Example:

Traditional function:
function add(a, b) {
    return a + b;
}

Arrow function:
const add = (a, b) => {
    return a + b;
};

console.log(add(5, 3));

Output:8

What are template literals?

Answer:

Template literals are a feature of JavaScript ES6 that allows us to create strings using backticks (`). They allow variables and expressions to be inserted directly into strings using ${}.
Example:
const name = "Rahim";
const age = 20;

const message = `My name is ${name} and I am ${age} years old.`;

console.log(message);
Output:

My name is Rahim and I am 20 years old.

