const product = { '$children':
[ { '$children':
     [ { '$children': [ '100.00' ],
         '$text': '100.00',
         '$name': 'price' } ],
    price:
     { '$children': [ '100.00' ],
       '$text': '100.00',
       '$name': 'price' },
    '$': { color: 'blue', name: 'Blue Jacket' },
    '$name': 'variant' },
  { '$children':
     [ { '$children': [ '150.00' ],
         '$text': '150.00',
         '$name': 'price' } ],
    price:
     { '$children': [ '150.00' ],
       '$text': '150.00',
       '$name': 'price' },
    '$': { color: 'red', name: 'Red Jacket' },
    '$name': 'variant' },
  { '$children': [ 'Awesome Clothing Company' ],
    '$text': 'Awesome Clothing Company',
    '$name': 'brand' },
  { '$children':
     [ { '$children':
          [ { '$children': [ 'Nice color' ],
              '$text': 'Nice color',
              '$name': 'text' } ],
         text:
          { '$children': [ 'Nice color' ],
            '$text': 'Nice color',
            '$name': 'text' },
         '$name': 'bullet' },
       { '$children':
          [ { '$children': [ 'Even nicer fit' ],
              '$text': 'Even nicer fit',
              '$name': 'text' } ],
         text:
          { '$children': [ 'Even nicer fit' ],
            '$text': 'Even nicer fit',
            '$name': 'text' },
         '$name': 'bullet' } ],
    bullet:
     { '$children':
        [ { '$children': [ 'Even nicer fit' ],
            '$text': 'Even nicer fit',
            '$name': 'text' } ],
       text:
        { '$children': [ 'Even nicer fit' ],
          '$text': 'Even nicer fit',
          '$name': 'text' },
       '$name': 'bullet' },
    '$': { name: 'pros' },
    '$name': 'bullets' } ],
variant:
{ '$children':
   [ { '$children': [ '150.00' ],
       '$text': '150.00',
       '$name': 'price' } ],
  price:
   { '$children': [ '150.00' ],
     '$text': '150.00',
     '$name': 'price' },
  '$': { color: 'red', name: 'Red Jacket' },
  '$name': 'variant' },
brand:
{ '$children': [ 'Awesome Clothing Company' ],
  '$text': 'Awesome Clothing Company',
  '$name': 'brand' },
bullets:
{ '$children':
   [ { '$children':
        [ { '$children': [ 'Nice color' ],
            '$text': 'Nice color',
            '$name': 'text' } ],
       text:
        { '$children': [ 'Nice color' ],
          '$text': 'Nice color',
          '$name': 'text' },
       '$name': 'bullet' },
     { '$children':
        [ { '$children': [ 'Even nicer fit' ],
            '$text': 'Even nicer fit',
            '$name': 'text' } ],
       text:
        { '$children': [ 'Even nicer fit' ],
          '$text': 'Even nicer fit',
          '$name': 'text' },
       '$name': 'bullet' } ],
  bullet:
   { '$children':
      [ { '$children': [ 'Even nicer fit' ],
          '$text': 'Even nicer fit',
          '$name': 'text' } ],
     text:
      { '$children': [ 'Even nicer fit' ],
        '$text': 'Even nicer fit',
        '$name': 'text' },
     '$name': 'bullet' },
  '$': { name: 'pros' },
  '$name': 'bullets' },
'$': { id: '111', category: 'jackets' },
'$name': 'product' };

module.exports = product;