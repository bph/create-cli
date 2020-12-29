const path = require('path');
const copy = require('copy-template-dir');
const alert = require('cli-alerts');
const execa = require('execa');
const ora = require('ora');
const spinner = ora({text:''});
const { yellow: y, green: g, dim: d } = require('chalk');

const questions = require('./questions');

module.exports = async () => {

    const vars = await questions();
    const outDir = vars.name;
    const inDirPath = path.join(__dirname, `../template`);
    const outDirPath = path.join(process.cwd(), outDir);

    copy(inDirPath, outDirPath, vars, async (err, createdFiles) => {
        if (err) throw err;
        
        console.log(d(`\nCreating files in ${g(`./${outDir}`)} directory:\n`));
  
        createdFiles.forEach((filePath) => {
            const filename = path.basename(filePath);
            console.log(`Created: ${filename}`);
        })

        spinner.start(`${y(`Dependencies`)} installing ... \n\n${d(`It may take a moment or two.`)}`);
        process.chdir(outDirPath);
       
        // And now we need to install all the dependencies for the new cli. 
        const pkgs = [
            'meow',
            'cli-meow-help',
            'cli-welcome',
            'cli-alerts',
            'cli-handle-unhandled'
        ]
        await execa(`npm`, [`install`, ...pkgs]);
        await execa(`npm`, [`install`, `prettier`, `-D`]);
        await execa(`npm`, [`dedupe`]);
        spinner.succeed(`${g(`Dependencies`)} installed.`)

        alert({
          type:`success`,
          name: `All Done!`,
          msg: `\n\n${createdFiles.length} files created in ${d(`./${outDir}`)} directory`,
        });
      }); 
}