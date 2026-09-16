const fs = require('fs');

//Define Two variables
let a = 10;
let b = 20;

//Basic arithmetic operations
let sum = a + b;
let product = a * b;

//Prepare data to write 
let data = `Sum: ${sum}\nProduct: ${product}`;
console.log(data);

//Write data to a Local file
fs.writeFile('output.txt', data, (err) => {
  if (err) throw err;
  console.log('Data has been written to file');
});