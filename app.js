const xmlMinify = require('./lib/xml-minify');

const whitelists = [{
    level: 0,
    filterNode: 'PRO',
    attributeFilters: null,
    keepAttributes: ['id'],
    flatten: false
  },{
    level: 1,
    filterNode: 'PRAT',
    attributeFilters: [{name: 'name'}],
    keepAttributes: ['name'],
    flatten: false
  },{
    level: 1,
    filterNode: 'PRAT',
    attributeFilters: [{name: 'description'}],
    keepAttributes: ['name'],
    flatten: false
  },{
    level: 1,
    filterNode: 'PRV',
    attributeFilters: null,
    keepAttributes: ['id'],
    flatten: false
  },{
    level: 2,
    filterNode: 'VALUE',
    attributeFilters: null,
    keepAttributes: [],
    flatten: true
  },{
    level: 2,
    filterNode: 'PRAT',
    attributeFilters: [{name: 'hoehe'}],
    keepAttributes: ['name'],
    flatten: false
  },{
    level: 2,
    filterNode: 'PRAT',
    attributeFilters: [{name: 'breite'}],
    keepAttributes: ['name'],
    flatten: false
  },{
    level: 3,
    filterNode: 'VALUE',
    attributeFilters: null,
    keepAttributes: [],
    flatten: true
  }];

xmlMinify('./xml_test_big.xml', whitelists);

