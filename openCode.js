const { spawn } = require('child_process');

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

module.exports = openCode