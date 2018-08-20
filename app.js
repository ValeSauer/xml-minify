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
  level: 2,
  filterNode: 'price',
  flatten: true
  }];

xmlMinify('./test/test.xml', config);

