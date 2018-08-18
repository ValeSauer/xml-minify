const fs        = require('fs')
const XmlStream = require('xml-stream') ;
const readStream = fs.createReadStream('test.xml');
const writeStream = fs.createWriteStream('out.xml');
const xmlIn = new XmlStream(readStream);
const _ = require('lodash');

var xml = require('xml');

xmlIn.preserve('PGR PRO', false);

configs = [{
  level: 1,
  filterNode: 'PRAT',
  attributeFilters: [{name: 'hoehe'}, {name: 'breite'}],
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
  filterNode: 'PRAT',
  attributeFilters: [{name: 'hoehe'}, {name: 'breite'}],
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

  console.log(xml(writeProduct, true));
  
  writeStream.write(xml(writeProduct, true));
  writeStream.write('\n');

}

getChildren = function(readChildren, level = 0){
  level++;
  writeChildren = [];
  readChildren.forEach(readChild => {
    var localConfig = _.find(configs, config => {        
      if(config.level == level && config.filterNode == readChild.$name){
        return true;
      }
    })
    if(localConfig){
      var attributes = {}
      localConfig.keepAttributes.forEach(keepAttribute => {
        attributes[keepAttribute] = readChild.$[keepAttribute];
      })
      var writeChild = {};
      writeChild[readChild.$name] = [];
      writeChild[readChild.$name].push({_attr: attributes});
      if(_.isArray(readChild.$children)){
        if(_.isString(readChild.$children[0])){
          console.log("Appending Value " + readChild.$children[0] + " to node " + readChild.$name)
          writeChild[readChild.$name].push(readChild.$children[0]);
        }else if (_.isObject(readChild.$children[0]) && 1 == 2){
          console.log("Appending Node")
          newChildren = getChildren(readChild.$children, level);
          newChildren.forEach(newChild => {
            writeChild[readChild.$name].push([{newChild}]);
          })
        }
      }
      writeChildren.push(writeChild);
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

// close the stream


xmlIn.on('end', function(){
  console.log("End of Read Stream")
})



