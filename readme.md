# create-cli

This CLI creates the scaffolding for a new node CLI package. 

## Install 

`npm install @paulisystems/create-cli
`

## Input: 
* name:  Give your new CLI a name in kebab-notation.  This is also used as a directory name of the new CLI. 
- _command:_ command to initiate the CLI. Optional. If left blank the cli name is used as command, too. 
- description: Enter a description for your new CLI. 
- version: default `0.0.1` 
- license: default  `MIT`
- author information with name, email and url. These will be stored in the /utils/.history folder for future scaffolding


Modify the files in the */template* folder for additional default settings. 

Use `ncli help` for commands and options. 

## Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](code_of_conduct.md). By participating in this project you agree to abide by its terms.

## History

This is an example project of <a href="https://nodecli.com/">the NodeJS CLI course</a> by Ahmad Awais