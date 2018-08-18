const fs        = require('fs')
const XmlStream = require('xml-stream') ;
const readStream = fs.createReadStream('test.xml');
const writeStream = fs.createWriteStream('out.xml');
const xmlIn = new XmlStream(readStream);
const _ = require('lodash');

var xml = require('xml');

xmlIn.preserve('PGR PRO', false);

whitelists = [{
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


createProduct = function(readProduct){
  var writeProduct = [{
    PRO: [{
      _attr: {
        id: readProduct.$.id
      }
    }]
  }]

 newChildern = getChildren(readProduct.$children);
 newChildern.forEach(newChild => {
  writeProduct[0].PRO.push(newChild);
 })

  //console.log(xml(writeProduct, true));
  
  writeStream.write(xml(writeProduct, true));
  writeStream.write('\n');

}

getChildren = function(readChildren, level = 0){
  level++;
  var writeChildren = [];
  readChildren.forEach(readChild => {

    // Check node against whitelist, abort if no match is found
    var currentWhitelist = _.find(whitelists, whitelist => {        
      if(whitelist.level == level && whitelist.filterNode == readChild.$name){
        if(whitelist.attributeFilters && _.isArray(whitelist.attributeFilters)){
          for (i = 0; i < whitelist.attributeFilters.length; i++) { 
            if(!_.find([readChild.$], whitelist.attributeFilters[i])){
              return false;
            }
          }
        }
        return true;
      }
    })

    if(currentWhitelist){

      if(currentWhitelist.flatten){
        // Flatten the node
        writeChildren.push(readChild.$children[0] );
      }else{
        // Take over attributes from input to output node
        var attributes = {}
        currentWhitelist.keepAttributes.forEach(keepAttribute => {
          attributes[keepAttribute] = readChild.$[keepAttribute];
        })

        if(_.isArray(readChild.$children)){
          var writeChild = {};
          writeChild[readChild.$name] = [];
          writeChild[readChild.$name].push({_attr: attributes});
          if(_.isString(readChild.$children[0])){
            writeChild[readChild.$name].push(readChild.$children[0]);
          }else if (_.isObject(readChild.$children[0])){
            newChildren = getChildren(readChild.$children, level);
            newChildren.forEach(newChild => {
              writeChild[readChild.$name].push( newChild );
            })
          }
          writeChildren.push(writeChild);
        }
      }
    }
  })
  return writeChildren;
}

xmlIn.on('updateElement: PRO', function(readProduct) {
  try {
    createProduct(readProduct);
  }
  catch (e) {
   console.error(e);
  }

});

// the finish event is emitted when all data has been flushed from the stream
writeStream.on('finish', () => {  
  console.log('wrote all data to file');
});


xmlIn.on('end', function(){
  console.log("End of Read Stream")
})



