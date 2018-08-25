# xml-minify

[![License](http://img.shields.io/npm/l/xmlbuilder.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.com/ValeSauer/xml-minify.svg?branch=master)](https://travis-ci.com/ValeSauer/xml-minify)

A simple tool that reads XML structures from a source file, filters nodes and attributes against a whitelist and writes the hopefully much smaller result into an target file. As it uses read- and write-streams its able to process very large XML files.

## Usage

You can either use xml-minify as a node module or as as CLI. Both ways require a config file. You can specify whitelist-entries for every level, node and attribute. Every element that does not match a whitelist entry, will be removed. Duplicate entries for the same level, node and attributes are not allowed. The first element (level 0) defines the stream-chunks. Only the level-0 entry is allowed to have a path as a filterNode.

```javascript
[{
    level: 0,
    filterNode: 'root products product',
    keepAttributes: ['id']
  },{
    level: 1,
    filterNode: 'variant',
    attributeFilters: [{color: 'blue'}],
    keepAttributes: ['name'],
  },{
    level: 2,
    filterNode: 'price',
    flatten: true
    }]
``` 

Aboves config will transform 

```xml
<root>
    <products>
        <product id="111" category="jackets">
            <variant color="blue" name="Blue Jacket">
                <price>100.00</price>
            </variant>
            <variant color="red" name="Red Jacket">
                <price>150.00</price>
            </variant>
            <brand>Awesome Clothing Company</brand>
            <bullets name="pros">
                <bullet>
                    <text>Nice color</text>
                </bullet>
                <bullet>
                    <text>Even nicer fit</text>
                </bullet>
            </bullets>
        </product>
        <product id="222" category="jeans">
            <variant color="blue" name="Blue Jeans">
                <price>50.00</price>
            </variant>
            <variant color="red" name="Red Jeans">
                <price>75.00</price>
            </variant>
            <brand>Awesome Clothing Company</brand>
        </product>
    </products>
</root>
```
into this structure:
```xml
<products>
    <product id="111">
        <variant name="Blue Jacket">100.00</variant>
        <bullets name="pros">Nice color;Even nicer fit</bullets>
    </product>
    <product id="222">
        <variant name="Blue Jeans">50.00</variant>
    </product>
</products>
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
