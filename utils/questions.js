const ask = require('./ask');

module.exports = (async () => {
    
    const name = await ask({ 
        name: `name`,
        message:`CLI name?`,
        hint:`(use kebab-case only)`
    });
    const command = await ask({ 
        name: `command`,
        message:`CLI command?`,
        hint:`(optional: if different from CLI name)`, 
        //initial: name,
    });
    const description = await ask({
        name: `description`, 
        message:`CLI description?`
    });
    const version = await ask({
        name: `version`, 
        message: `CLI version number`, 
        initial: `0.0.1`
    });
    const license = await ask({
        name: `license`, 
        message: `CLI license`, 
        initial: `MIT`
    });
    const authorName = await ask({
        name: `authorName`, 
        message: `Author Name`
    });
    const authorEmail = await ask({
        name: `authorEmail`, 
        message: `Author email address`});
    const authorUrl = await ask({
        name: `authorUrl`, 
        message: `Author's web site`});

    const vars = { 
    name,
    command,
    description,
    version,
    license,
    authorName,
    authorEmail,
    authorUrl,
    };

    return vars;
})