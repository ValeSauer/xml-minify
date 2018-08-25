const test = require('ava');
const xmlMinify = require('../lib/xml-minify');
const fs = require('fs');
const product = require('./_product.js');
const config = require('./_config.js');

test('it should throw on missing arguments', t => {
    const error = t.throws(() => {
		xmlMinify('test');
	}, TypeError);

    t.is(error.message, 'Function arguments readStream and whitelists must be given');
});

test('It should correctly minify a complex object', t => {
  const result = xmlMinify.minify(product, config);
  
  const expected = { product:
    [ { _attr: { id: '111' } },
      { variant: [ { _attr: { name: 'Blue Jacket' } }, '100.00' ] },
      { bullets: [ { _attr: { name: 'pros' } }, 'Nice color;Even nicer fit' ] } ] };

  t.deepEqual(result, expected);
});