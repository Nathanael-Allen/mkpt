const { readFile, writeFile, mkdir } = require('fs/promises');
const { join } = require('path');

async function makeTemplateFiles(dirName){
    try {
        const htmlTemplate = await readFile('template.html');
        const cssTemplate = await readFile('template.css');
        await mkdir(dirName);
        await writeFile(join(dirName, 'test.html'), htmlTemplate);
        await writeFile(join(dirName, 'test.css'), cssTemplate);
        await writeFile(join(dirName, 'main.js'), '');
    }
    catch (error){
        console.log(`ERROR: ${error.message}`)
        process.exit()
    }
}

module.exports = makeTemplateFiles