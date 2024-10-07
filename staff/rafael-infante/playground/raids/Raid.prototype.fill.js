console.log("TEST Raid.prototype.fill");
/*
currently trying to check to acccess the iterable on 
the return condition. Possible this.value? 
How to correctly pass the other values into the function

*/

var Raid = function () {
  this.length = 0;
};

Raid.prototype.fill = function (element, start, end) {

  for (var i = (start === undefined ? 0 : start);
    i < (end === undefined ? this.length : end);
    i++) {
    this[i] = element;
  };
  return this;
};

console.log("CASE replace all values with 6");
var numbers = new Raid()
numbers[0] = 1;
numbers[1] = 2;
numbers[2] = 3;
numbers[3] = 4;
numbers[4] = 5;
numbers.length = 5;

console.log(numbers.fill(6));
//expected output { '0': 6, '1': 6, '2': 6, '3': 6, '4': 6, length: 5 }

console.log("CASE replace values after 1 with 5")
var numbers = new Raid()
numbers[0] = 1;
numbers[1] = 2;
numbers[2] = 3;
numbers[3] = 4;
numbers[4] = 5;
numbers.length = 5;

console.log(numbers.fill(5, 1))
//expected output { '0': 1, '1': 5, '2': 5, '3': 5, '4': 5, length: 5 }

console.log("CASE replace values 3 and 4 with 0")
var numbers = new Raid()
numbers[0] = 1;
numbers[1] = 2;
numbers[2] = 3;
numbers[3] = 4;
numbers[4] = 5;
numbers.length = 5;

console.log(numbers.fill(0, 2, 4))
//expected output { '0': 1, '1': 2, '2': 0, '3': 0, '4': 5, length: 5 }