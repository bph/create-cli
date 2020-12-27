#!/usr/bin/env node
const path = require('path');
const copy = require('copy-template-dir');
const { Input } = require('enquirer');
const to = require('await-to-js').default;
const handleError = require('cli-handle-error');

const init = require('./utils/init');

(async () => {
    init();

    // User Inputs handling together with await-to-js
    const [err,name] = await to (new Input({
        message: `CLI name?`,
        hint: `(use kebab-case only)`
    }).run()
    );
    handleError(`INPUT`,err);

    // will be replace by user inputs.
    const vars = { 
      name,
      description: `CLI to distribute the gutenberg nightly`,
      version: `0.0.1`,
    };
  

// Create templates
  const inDir = path.join(__dirname, `template`);
  const outDir = path.join(process.cwd(), vars.name);

  copy(inDir, outDir, vars, (err, createdFiles) => {
    if (err) throw err;
    console.log();
    console.log(`Creating files in ./${vars.name}`);

    createdFiles.forEach((filePath) => {
        const filename = path.basename(filePath);
        console.log(`Created: ${filename}`);

    })
    console.log('Done!')
    console.log();
  });
})();
/**
 * Earlier exercises. Still needs some review !
 
const vars = { 
    name: `cli-gb-build`,
    description: `CLI to distribute the gutenberg nightly`,
    version: `0.0.1`,
  };
const inDir = path.join(__dirname, `template`);
// anything in the inDir directory will be duplicated for the scaffolding. 
// .gitignore or other .files need to start with an "_." to be replicated.
// while doing it, the cli also replaces the key value pairs in vars. 
const outDir = path.join(process.cwd(), vars.name);

// cwd = current working directory

copy(inDir, outDir, vars, (err, createdFiles) => {
    if (err) throw err;
    console.log();
    console.log(`Creating files in ./${vars.name}`);

    createdFiles.forEach((filePath) => {
        const filename = path.basename(filePath);
        console.log(`Created: ${filename}`);

    })
    console.log('Done!')
    console.log();
  })
*/