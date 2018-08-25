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
      writeNode = minify(baseNode, whitelists);
      writeStream.write(xml(writeNode, true));
      writeStream.write('\n');
    }
    catch (e) {
      console.error(e);
    }
  });

  xmlIn.on('end', function(){
    console.log("Processing completed")
  })
}

minify = function (readNode, whitelists, level = 0) {

  // Check node against whitelist, abort if no match is found
  var currentWhitelist = _.find(whitelists, whitelist => {
    if (whitelist.level == level && whitelist.filterNode == readNode.$name) {
      if (whitelist.attributeFilters && _.isArray(whitelist.attributeFilters)) {
        for (i = 0; i < whitelist.attributeFilters.length; i++) {
          if (!_.find([readNode.$], whitelist.attributeFilters[i])) {
            return false;
          }
        }
      }
      return true;
    }
  })

  if (currentWhitelist) {

    if(!currentWhitelist.separator){
      currentWhitelist.separator = "";
    }

    if(!currentWhitelist.flatten){
      // Take over attributes from input to output node
      var attributes = {}
      if(currentWhitelist.keepAttributes && _.isArray(currentWhitelist.keepAttributes)){
        currentWhitelist.keepAttributes.forEach(keepAttribute => {
          attributes[keepAttribute] = readNode.$[keepAttribute];
        })
      }
      var writeNode = {};
      writeNode[readNode.$name] = [{ _attr: attributes }];
    }

    // Iterate over all Children
    if (_.isArray(readNode.$children)){
      readNode.$children.forEach(readNodeChild => {
        if (_.isString(readNodeChild)) {
          if (currentWhitelist.flatten) {
            writeNode = readNodeChild;
          }else{
            writeNode[readNode.$name].push(readNodeChild);
          }
        }else if(_.isObject(readNodeChild)){
          newChild = minify(readNodeChild, whitelists, level + 1);
          if(_.isString(newChild)){
            if(currentWhitelist.flatten){
              writeNode = newChild;
            }else{
              if(writeNode[readNode.$name].length == 1){
                writeNode[readNode.$name].push(newChild);
              }else{
                //console.log("test" + JSON.stringify(currentWhitelist))
                writeNode[readNode.$name][1] = writeNode[readNode.$name][1] + currentWhitelist.separator + newChild;
              }
            }

          }else if (_.isObject(newChild)){
            if(currentWhitelist.flatten){
              writeNode = newChild;
            }else{
              writeNode[readNode.$name].push(newChild);
            } 
          }
        }
      })
    }
    return writeNode;
  }
}

module.exports = xmlMinify;



