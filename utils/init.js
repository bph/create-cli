const welcome = require('cli-welcome');
const pkg = require('./../package.json');
const unhandled = require('cli-handle-unhandled');

module.exports = () => {
    unhandled();
    welcome({
        title: 'create-cli',
        tagline: 'by Pauli Systems',
        description: pkg.description,
        version: pkg.version,
        bgcolor:'#6cc24a',
        color: '#000000',
        bold: true, 
        clear: true,

    })
}