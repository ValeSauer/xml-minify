const fs = require('fs')
const xmlMinify = require('./lib/xml-minify');

const config  = [{
  level: 0,
  filterNode: 'root products product',
  keepAttributes: ['id']
},{
  level: 1,
  filterNode: 'variant',
  attributeFilters: [{color: 'blue'}],
  keepAttributes: ['name'],
},{
  level: 1,
  filterNode: 'bullets',
  keepAttributes: ['name']
},{
  level: 2,
  filterNode: 'bullet',
  flatten: true
},{
  level: 3,
  filterNode: 'text',
  flatten: true
},{
  level: 2,
  filterNode: 'price',
  flatten: true
}];

//const writeStream = fs.createWriteStream(outputPath);
const readStream = fs.createReadStream('./test/test.xml');

xmlMinify(readStream, config);

