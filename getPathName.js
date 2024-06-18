const readline = require('readline');
const { join } = require('path');
const { stdin, stdout } = require('process');
const { defaultPath } = require('./config.json');

async function getPathName(){
    const rl = readline.createInterface({
        input: stdin,
        output: stdout
    })
    try{
        if(defaultPath.trim() === ''){
            throw new Error('No default directory set, set default in config.json...');
        }
        // console.log('Default path: ' + defaultPath)
            
        const projectName = await new Promise(resolve => {
            rl.question('Name of new project: ', resolve)
        });
        const customPath = await new Promise(resolve => {rl.question('Path to save project (enter to use default): ', resolve)});
        rl.close();
        if(projectName.trim() === ''){
            throw new Error('No directory name...')
        }
        if(customPath === ''){
            return join(defaultPath, projectName);
        }
        else{
            return join(customPath, projectName);
        }
    }
    catch (error) {
        console.log(error.message)
        process.exit();
    }
}

module.exports = getPathName 