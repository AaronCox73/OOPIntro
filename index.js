// Object literal
// not good to use this syntax and duplicate if they have at lease 1 method in the case that it does
// use factoires (line 21) or Construction.
// if an object has more than 1 method it has "behavior"
let obj = {
  //these key value paris are "properties"
  radius: 1,
  location: {
    x: 1,
    y: 1,
  },
  // function is called "Method"
  draw: function () {
    console.log("line 14 draw");
  },
};
// use dot notation to access properties and methods
obj.draw();

// Factory function
function createCircle(radius) {
  return {
    radius: radius, // ES6 you could just write the value because the names are the same so just "radius"
    draw: function () {
      console.log("line 25 draw");
    },
  };
}

const circle = createCircle(1);
circle.draw();

// constructor function
// first letter of a construction function should be uppercase
function Circle(radius) {
  this.radius = radius;
  this.draw = function () {
    console.log("line 38 draw");
  };
}

const another = new Circle(1); //NEW operator under the hood creates an empty object {}
// then sets "this." to point to ^ that object
// it will return the object form this object
another.draw();

// constructor property
// every object in JS has a property called Constructor
// references the function that was used to create that object

// functions are objects
// "Circle." purple icons are methods blue icons are properites

// line 42 is the same as
Circle.call({}, 1);
// if you forget to add the "new" keyword on like 42 it would be the same as writing
// Circle.call(window, 1)
// the "this" keyword on line 36 would reference the gloabl object if the "new" keyword is forgotten
Circle.apply({}, [1, 2, 3]);
// Functions are objects!

// Value vs Reference Types
// in JS we have two categoies of types
// Value types/Primitive. Number, String, Boolean, Symbol, Undefined, Null
// Reference types. Objects, Function, Array

// defining two primitives
let x = 10;
let y = x;

x = 20;
// in the console y & x are independent. that is Y = 10 and x = 20
// what happens if we use a Object or Reference type

let a = { value: 10 };
let b = a;

a.value = 20;
// console a and b both equal 20
// when we use an object, that object is not stored in the variable (ie 'let a').
// It is stored somewhere else in the memory
// the ADDRESS of that memory is stored inside that variable
// so when we copy a into b, its the address or reference that is copied
// ie both A and B are pointing to the same object in memory

// conclusion
// PRIMITIVES are copied by their value
// Reference / OBJECTS are copied by their reference
// another example - PRIMITIVE
let number = 10;
function increase(number) {
  number++;
}
increase(number);
console.log(number); // 10
// ^ the numbers are independent hence why the number remains 10 when consoled

// Reference
let obj2 = { value: 10 };

function increaseRef(obj2) {
  obj2.value++;
}

increaseRef(obj2);
console.log(obj2); // 11
// ^ the obj2 is passed by its reference and it will point to the same object in memory

// adding/removing properties

function Oval(radius) {
  this.radius = radius;
  this.draw = function () {
    console.log("line 116 draw");
  };
}

const oval = new Oval(10);
// objects in JS are dynamic meaning we can add and remove properties
//
// this adds location to oval
oval.location = { x: 1 };
// oval.location is the same as oval['location'] = {x:1}
// if propertyName has special characters use bracket notation
// for example oval[center--location]

delete oval.location;

// Enumerating Properties
// in every iteration key will hold the value 1 key
for (let key in oval) {
  console.log(key, "- line 131 key"); // returning both properties and methods
  console.log(key, oval[key], "- line 132"); // getting the value of these properties

  // getting properties and not the methods (below)
  if (typeof oval[key] !== "function") {
    console.log(key, oval[key], "- line 134");
  }
}

// all the keys in an object
const keys = Object.keys(oval);
console.log(keys);

// find if an obkect has a given property
if ("radius in oval") {
  console.log("Oval and radius is complex");
}

// Abstraction - hide the details/complexity and show the essentials
function Square(radius) {
  this.radius = radius;

  this.defaultLocation = { x: 0, y: 0 };

  this.computeOptimumLocation = function () {
    //...
  };

  this.draw = function () {
    this.computeOptimumLocation();
    console.log("draw ");
  };
}
const square = new Square(10);
// "sqaure." not all these members should be accessible to the client / consumer of this object
// for example square.defaultLocation = false will cause issues with the object

// Private Properties and Methods

function Cube(radius) {
  // this is a local variable not accessible to the outside
  let color = "red";

  this.radius = radius;
  // by getting rid of the "this" keyword these(line 178 & 181) have now become local vairables
  let defaultLocation = { x: 0, y: 0 };

  let computeOptimumLocation = function () {
    //...
  };

  this.draw = function () {
    computeOptimumLocation();
    console.log("line 185 draw");
  };

  // allows us to see defaultLocation from the global scope and access it with dot notation
  // but we cannot change it just see it
  Object.defineProperty(this, "defaultLocation", {
    get: function () {
      return defaultLocation;
    },
    set: function (value) {
      if (!value.x || !value.y) throw new Error("Invalid Location");
      defaultLocation = value;
    },
  });
}
const cube = new Cube(10);
// 'cube.' only has access to the draw method and radius property,
// it can no longer see computeOptimumLocation & defaultLocation
cube.defaultLocation = 2;
cube.draw();
