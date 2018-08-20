const fs = require('fs')
const XmlStream = require('xml-stream');
const _ = require('lodash');
const xml = require('xml');
var StreamCounter = require('stream-counter');

function xmlMinify(inputPath, whitelists, outputPath = 'out.xml') {

  if (typeof inputPath === "undefined" || typeof whitelists === "undefined") {
    throw new TypeError('Function arguments inputPath and whitelists must be given');
  }

const stats = fs.statSync(inputPath)
const fileSize = Math.round(stats.size / 1000000);

  var counter = new StreamCounter();
  counter.on('progress', function() {
    console.log(Math.round(counter.bytes / 1000000) + "/" + fileSize +   " MB");
  });
  const readStream = fs.createReadStream(inputPath).pipe(counter);
  const writeStream = fs.createWriteStream(outputPath);
  const xmlIn = new XmlStream(readStream);

  xmlIn.preserve('EXPORT PUB PGR PGR PGR PGR PGR PGR ' + whitelists[0].filterNode, false);

  xmlIn.on('updateElement: ' + whitelists[0].filterNode, function (baseNode) {
    try {
      writeNode = getChildren([baseNode], whitelists);
      writeStream.write(xml(writeNode, true));
      writeStream.write('\n');
    }
    catch (e) {
      console.error(e);
    }
  });
}

getChildren = function (readChildren, whitelists, level = 0) {

  if (level == 0) {
    i = i + 1;
    console.log("Minifying node " + i)
  }

  var writeChildren = [];
  readChildren.forEach(readChild => {
    // Check node against whitelist, abort if no match is found
    var currentWhitelist = _.find(whitelists, whitelist => {
      if (whitelist.level == level && whitelist.filterNode == readChild.$name) {
        if (whitelist.attributeFilters && _.isArray(whitelist.attributeFilters)) {
          for (i = 0; i < whitelist.attributeFilters.length; i++) {
            if (!_.find([readChild.$], whitelist.attributeFilters[i])) {
              return false;
            }
          }
        }
        return true;
      }
    })

    if (currentWhitelist) {
      if (currentWhitelist.flatten) {
        // Flatten the node
        writeChildren.push(readChild.$children[0]);
      } else {
        // Take over attributes from input to output node
        var attributes = {}
        currentWhitelist.keepAttributes.forEach(keepAttribute => {
          attributes[keepAttribute] = readChild.$[keepAttribute];
        })

        if (_.isArray(readChild.$children)) {
          var writeChild = {};
          writeChild[readChild.$name] = [];
          writeChild[readChild.$name].push({ _attr: attributes });
          if (_.isString(readChild.$children[0])) {
            writeChild[readChild.$name].push(readChild.$children[0]);
          } else if (_.isObject(readChild.$children[0])) {
            newChildren = getChildren(readChild.$children, whitelists, level + 1);
            newChildren.forEach(newChild => {
              writeChild[readChild.$name].push(newChild);
            })
          }
          writeChildren.push(writeChild);
        }
      }
    }
  })
  return writeChildren;
}

module.exports = xmlMinify;



