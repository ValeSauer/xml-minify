const xmlMinify = require('./xml-minify');
fs = require('fs')

const argv = require('yargs')
    .usage('Usage: $0 -input -config -output')
    .option('input', {
    describe: 'Relative path to XML source file',
    type: 'string',
    })
    .option('config', {
    default: 'config.js',
    describe: 'Relative path to config.js file',
    type: 'string',
    })
    .option('output', {
        default: 'out.xml',
        describe: 'Relative path to XML target file',
        type: 'string',
      })
    .example('$0 -i input.xml -c config.xml -o output.xml')
    .alias('i', 'input')
    .alias('c', 'config')
    .alias('o', 'output')
    .demandOption(['input'])
    .argv;

    fs.readFile(argv.config, 'utf8', function (err, configData) {
    if (err) {
        return console.log(err);
    }
        xmlMinify(argv.input, configData, argv.output);
    });



