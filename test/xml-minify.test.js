import test from 'ava';
import xmlMinify from '../lib/xml-minify';

test('Missing arguments', t => {
    const error = t.throws(() => {
		xmlMinify('./test/test.xml');
	}, TypeError);

    t.is(error.message, 'Function arguments inputPath and whitelists must be given');
});