const { exec } = require('child_process');
const path = require('path');
const sdkPath = path.join(__dirname, '..', 'packages', 'clairview-sdk');
const guiPath = path.join(__dirname, '..', 'packages', 'nc-gui');
const clairviewPath = path.join(__dirname, '..', 'packages', 'clairview');

exec(`cd ${sdkPath} && pnpm i && npm run build`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error installing dependencies and building clairview-sdk: ${err}`);
      return;
    }
    
    console.log(`Dependencies installed and clairview-sdk built: ${stdout}`);

    const guiPromise = new Promise((resolve, reject) => {
      exec(`cd ${guiPath} && pnpm i ${sdkPath}`, (err, stdout, stderr) => {
        if (err) {
          reject(`Error installing dependencies for nc-gui: ${err}`);
        } else {
          resolve(`Dependencies installed for nc-gui: ${stdout}`);
        }
      });
    });
  
    const clairviewPromise = new Promise((resolve, reject) => {
      exec(`cd ${clairviewPath} && pnpm i ${sdkPath}`, (err, stdout, stderr) => {
        if (err) {
          reject(`Error installing dependencies for clairview: ${err}`);
        } else {
          resolve(`Dependencies installed for clairview: ${stdout}`);
        }
      });
    });

    Promise.all([guiPromise, clairviewPromise])
      .then((results) => {
        console.log(results.join('\n'));
      })
      .catch((err) => {
        console.error(err);
      });
  });