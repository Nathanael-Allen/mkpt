const readline = require('readline');
const { join } = require('path');
const { stdin, stdout } = require('process');
const { defaultPath } = require('./config.json');


async function getPathName(){
    const rl = readline.createInterface({
        input: stdin,
        output: stdout
    })
        
    const projectName = await new Promise(resolve => {
        rl.question('Name of new project: ', resolve)
    });
    const customPath = await new Promise(resolve => {rl.question('Path to save project (enter to use default): ', resolve)});
    rl.close();
    if(customPath === ''){
        return join(defaultPath, projectName);
    }else{
        return join(customPath, projectName);
    }
}

module.exports = getPathName 