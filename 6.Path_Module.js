const { log } = require('console');
const path = require('path');

// console.log(path.join(__dirname,'testing'));

                //or

// console.log(__filename);

console.log(path.basename(__filename));
console.log(path.delimiter);    //'C:\Windows\system32;C:\Windows;C:\Program Files\node\'     to      Returns ['C:\\Windows\\system32', 'C:\\Windows', 'C:\\Program Files\\node\\'] 
console.log(path.dirname(__filename));
console.log(path.extname(__filename));
console.log(path.parse(__filename));

const t = path.parse(__filename);
console.log(t.base);
console.log(t.dir);
console.log(t.ext);
console.log(t.name);
console.log(t.root);



const formatted = path.format({
        // root: '/ignore', or
    root:'/',
        // base:'HetPatel.txt', or
    name: 'HetPatel',
    ext: '.txt',
    dir: '/Node_Testing',
});

console.log(formatted); // Output: /Node_Testing/HetPatel.txt


/*
The path.isAbsolute() method determines if path is an absolute path.


path.isAbsolute('/foo/bar'); // true
path.isAbsolute('/baz/..');  // true
path.isAbsolute('qux/');     // false
path.isAbsolute('.');        // false 


path.isAbsolute('//server');    // true
path.isAbsolute('\\\\server');  // true
path.isAbsolute('C:/foo/..');   // true
path.isAbsolute('C:\\foo\\..'); // true
path.isAbsolute('bar\\baz');    // false
path.isAbsolute('bar/baz');     // false
path.isAbsolute('.');           // false
*/


console.log(path.join(__dirname,'testing','TimePass')); 

console.log(path.normalize(__filename));
/*

The path.normalize() method normalizes the given path, resolving '..' and '.' segments.

path.normalize('/foo/bar//baz/asdf/quux/..');
// Returns: '/foo/bar/baz/asdf' 
path.normalize('C:\\temp\\\\foo\\bar\\..\\');
// Returns: 'C:\\temp\\foo\\' COPY
path.win32.normalize('C:////temp\\\\/\\/\\/foo/bar');
// Returns: 'C:\\temp\\foo\\bar'

*/


/**

path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb');
// Returns: '../../impl/bbb' 

path.relative('C:\\orandea\\test\\aaa', 'C:\\orandea\\impl\\bbb');
// Returns: '..\\..\\impl\\bbb' 

*/

