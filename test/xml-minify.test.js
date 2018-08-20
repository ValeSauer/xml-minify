const test = require('ava');
const xmlMinify = require('../lib/xml-minify');

const config  = [{
    level: 0,
    rootPath: 'root products',
    filterNode: 'product',
    keepAttributes: ['id'],
  },{
    level: 1,
    filterNode: 'variant',
    attributeFilters: [{color: 'blue'}],
    keepAttributes: ['name'],
  },{
    level: 2,
    filterNode: 'price',
    flatten: true
    }];

test('Missing arguments', t => {
    const error = t.throws(() => {
		xmlMinify('./test/test.xml');
	}, TypeError);

    t.is(error.message, 'Function arguments inputPath and whitelists must be given');
});