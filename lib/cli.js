const xmlMinify = require('./xml-minify');
const _ = require('lodash');
fs = require('fs')

const argv = require('yargs')
    .usage('Usage: $0 -input -config -output')
    .option('input', {
    describe: 'Relative path to XML source file',
    type: 'string',
    })
    .option('config', {
    default: 'config.json',
    describe: 'Relative path to config.json file',
    type: 'string',
    })
    .option('output', {
        default: 'out.xml',
        describe: 'Relative path to XML target file',
        type: 'string',
      })
    .example('$0 -i input.xml -c config.json -o output.xml')
    .alias('i', 'input')
    .alias('c', 'config')
    .alias('o', 'output')
    .demandOption(['input'])
    .argv;

    try {
        fs.readFile(argv.config, 'utf8', function (err, configData) {
            if (err) {
                return console.log(err);
            }
            xmlMinify(argv.input, JSON.parse(configData), argv.output);
        });
      }
      catch (e) {
        console.error(e);
      }





