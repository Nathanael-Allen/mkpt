const makeTemplateFiles = require('./createTemplate.js');
const getPathName = require('./getPathName.js');
const openCode = require('./openCode.js');

async function createProject(){
    try{
        const dirPath = await getPathName();
        await makeTemplateFiles(dirPath);
        console.log('Directory successfully created at: ' + dirPath);
        await openCode(dirPath);
    }
    catch (error){
        console.log(`ERROR: ${error.message}`)
        process.exit()
    }
}

createProject();