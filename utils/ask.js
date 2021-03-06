const fs = require('fs');
const { Input } = require('enquirer');
const to = require('await-to-js').default;
const handleError = require('cli-handle-error');
const shouldCancel = require('cli-should-cancel');
const { Store } = require('data-store');


module.exports = async ({name, message, hint, initial}) => {
        let history = false; 
        if(
            !initial && 
            name !== `name` && 
            name !== `command` && 
            name !== `description`
        ) {
            history = {
                store: new Store({ path: `${__dirname}/.history/${name}.json`}),
                autosave: true
            }
        }
        const [err, response] = await to (
            new Input({
                name,
                message,
                hint,
                initial,
                history,
                validate(value, state){
                   
                    if (state && state.name === `command`) return true; 
                    if (state && state.name === `name`) {
                        if (fs.existsSync(value))  {
                            return `This directory already exists ./${value}`;
                        } else {
                            return true;
                        }
                    }
                    return !value ? `Please add a value`: true; 
                }
            })  //.on(`cancel`, () => process.exit(1)) or we could add the code from shouldCancel to this package.
                .on(`cancel`, () => shouldCancel())
                .run()
        );
        handleError(`INPUT`,err);

        return response
} 