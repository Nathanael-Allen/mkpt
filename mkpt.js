const {mkdir, writeFile} = require('fs/promises');
const { join } = require('path');
const { spawn } = require('child_process');
let rootDir = "C:/personalprojects";
let dirName;

function openCode(){
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

try {
    if(process.argv[3]){
    rootDir = process.argv[3]
    }
    dirName = join(rootDir, process.argv[2]);
}
catch(error){
    if(error.code === 'ERR_INVALID_ARG_TYPE'){
        console.log('ERROR: Invalid argument for path.')
    }
    else{
        console.log(error)
    }
    return
}

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

async function makeNewDir(dirName){
    return await mkdir(dirName);
}

makeNewDir(dirName)
.then(async () => {
    return await writeFile(join(dirName, 'index.html'), html)
})
.then(async () => {
    return await writeFile(join(dirName, 'main.js'), '')
})
.then(async () => {
    return await writeFile(join(dirName, 'styles.css'), css)
})
.then(() => {
    console.log('Directory successfully created at: ' + dirName)
})
.then(openCode)
.catch((error) => {
    if(error.code === 'EEXIST'){
        console.log('ERROR: Directory already exists')
    }
    else if(error.code === 'ENOENT'){
        console.log('ERROR: invalid path')
    }
    else{console.log(error)}
})
