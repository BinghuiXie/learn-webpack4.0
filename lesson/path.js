const path = require('path');

console.log(__dirname);
console.log(__dirname + '../dist');
console.log(path.resolve(__dirname, '../dist'));
console.log(path.resolve(__dirname, '/dist'));
console.log(path.resolve(__dirname, 'dist'));