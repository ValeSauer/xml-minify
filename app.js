var fs        = require('fs')
var XmlStream = require('xml-stream') ;
var stream=fs.createReadStream('test.xml');
var xml = new XmlStream(stream);
xml.preserve('PGR PRO PRAT', true);
xml.collect('PGR PRO PRAT');
xml.preserve('PGR PRO PRV PRAT', true);
xml.collect('PGR PRO PRV PRAT');
xml.on('endElement: PRO', function(item) {
  console.log(JSON.stringify(item));
});