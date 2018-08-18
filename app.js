var fs        = require('fs')
var XmlStream = require('xml-stream') ;
var readStream = fs.createReadStream('test_big.xml');
//var readStream = fs.createReadStream('test.xml');
const writeStream = fs.createWriteStream('out.xml');
var xmlIn = new XmlStream(readStream);

var xml = require('xml');

xmlIn.preserve('PGR PRO', false);

xmlIn.on('updateElement: PRO', function(readProduct) {

  var writeProduct = [{
    PRO: [{
      _attr: {
        id: readProduct.$.id
      }
    }]
  }]

  getVariants = function(writeProduct, readVariants){
    readVariants.forEach(readVariant => {
      if(readVariant.$name == "PRV"){
        writeVariant = { 
          PRV: [{
            _attr: {
              id: readVariant.$.id
            }
          }]
        }
        writeVariant = getChildren(writeVariant, readVariant.$children);
        writeProduct[0].PRO.push(writeVariant);
      }   
    })
    return writeProduct;
  }

  getChildren = function(writeVariant, readChildren){
    readChildren.forEach(readChild => {
      if(readChild.$name == "PRAT" && (readChild.$.name == "hoehe" || readChild.$.name == "breite")){
        writeChild = { 
          PRAT: [{
            _attr: {
              name: readChild.$.name
            }
          },
          readChild.$text]
        }
        writeVariant.PRV.push(writeChild);
      }   
    })
    return writeVariant;
  }

  writeProduct = getVariants(writeProduct, readProduct.$children);

  writeStream.write(xml(writeProduct, true));
  writeStream.write('\n');

});

// the finish event is emitted when all data has been flushed from the stream
writeStream.on('finish', () => {  
  console.log('wrote all data to file');
});

// close the stream


/*
xmlIn.on('end', function(){
  writeStream.end();
  xmlOut.end(writer);
})*/



