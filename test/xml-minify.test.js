const test = require('ava');
const xmlMinify = require('../lib/xml-minify');
const fs = require('fs');
var streams = require('memory-streams');

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

test('Missing arguments', t => {
    const error = t.throws(() => {
		xmlMinify('test');
	}, TypeError);

    t.is(error.message, 'Function arguments readStream and whitelists must be given');
});

test('Correct result of complex XML', t => {

  const readStream = fs.createReadStream('./test/test.xml');
  const writeStream = process.stdout;

  writeStream.on('write', function() {
 
    console.log("Done");
    console.log(writer.toString());
  });

  xmlMinify(readStream, config, writeStream);
  

});