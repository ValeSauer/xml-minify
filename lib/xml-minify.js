const fs = require('fs')
const XmlStream = require('xml-stream');
const _ = require('lodash');
const xml = require('xml');

function xmlMinify(readStream, whitelists, writeStream = process.stdout, progressTicker) {

  if (typeof readStream === "undefined" || typeof whitelists === "undefined") {
    throw new TypeError('Function arguments readStream and whitelists must be given');
  }

  if(typeof progressTicker !== "undefined"){
    readStream = readStream.pipe(progressTicker);
  }
  const xmlIn = new XmlStream(readStream);

  xmlIn.preserve(_.first(whitelists).filterNode, false);

  var rootNodePaths = _.first(whitelists).filterNode.split(' ');
  whitelists[0].filterNode = _.last(rootNodePaths);

  xmlIn.on('updateElement: ' + _.first(whitelists).filterNode, function (baseNode) {
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



