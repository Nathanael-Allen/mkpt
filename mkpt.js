const {mkdir, writeFile} = require('fs/promises');
const { join } = require('path');
const { spawn } = require('child_process');
const { stdin, stdout } = require('process')
const readline = require('readline')
const { defaultPath } = require('./config.json');

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <script src='main.js'></script>
    <title>Document</title>
</head>
<body>
</body>
</html>
`

const css = `
:root{
    font-size: 16px;
    --bg-color: #1c1b22;
    --bg-color-2: #143133;
    --bg-color-3: #515059;
    --txt-color: white;
    --accent-color: #469A84;
    --accent-color-2: #37878C;
}

html {
    box-sizing: border-box;
    font-family: 'Segoe UI', sans-serif;
    background-color: var(--bg-color);
    color: var(--txt-color);
    max-width: 1920px;
    margin: auto;
}

* {
    box-sizing: inherit;
}

a{
    text-decoration: none;
    color: var(--txt-color);
}

button{
    background-color: transparent;
    border: none;
    cursor: pointer;
}

body, h1, h2, h3, h4, h5, h6, p, ol, ul, button {
    margin: 0;
    padding: 0;
    font-weight: normal;
}

ol, ul {
    list-style: none;
}

img {
    max-width: 100%;
    height: auto;
}
` 
async function getInputs(){
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

async function openCode(dirName){
    const child =
    spawn(
        'code', [dirName],
        { shell: true }
    );

    child.stderr.on('data',
        (data) => {
            console.error(`stderr: ${data}`);
        });
}

async function makeTemplateFiles(dirName){
    try {
        await mkdir(dirName);
        await writeFile(join(dirName, 'index.html'), html)
        await writeFile(join(dirName, 'styles.css'), css)
        await writeFile(join(dirName, 'main.js'), '');
    }
    catch (error){
        console.log(`ERROR: ${error.message}`)
    }
}

async function createProject(){
    try{
        const dirPath = await getInputs();
        await makeTemplateFiles(dirPath);
        console.log('Directory successfully created at: ' + dirPath);
        await openCode(dirPath);
    }
    catch (error){
        console.log(`ERROR: ${error.message}`)
    }
}

createProject();