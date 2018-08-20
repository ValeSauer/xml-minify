# xml-minify

[![License](http://img.shields.io/npm/l/xmlbuilder.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.com/ValeSauer/xml-minify.svg?branch=master)](https://travis-ci.com/ValeSauer/xml-minify)

A simple tool that reads XML structures from a source file, filters nodes and attributes against a whitelist and writes the hopefully much smaller result into an target file. As it uses read- and write-streams its able to process very large XML files.

## Usage

You can either use xml-minify as a node module or as as CLI. Both ways require a config file.

```javascript
[{
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
  }
``` 

### Use xml-minify as CLI

    $ npm install -g xml-stream

```
Usage: xml-minify.js -input -config -output

Options:
  --help        Show help                                              [boolean]
  --version     Show version number                                    [boolean]
  -i, --input   Relative path to XML source file             [string] [required]
  -c, --config  Relative path to config.js file  [string] [default: "config.js"]
  -o, --output  Relative path to XML target file   [string] [default: "out.xml"]

Examples:
  xml-minify.js -i input.xml -c config.xml -o output.xml
```

### Use xml-minify as node module

    $ npm install xml-stream
