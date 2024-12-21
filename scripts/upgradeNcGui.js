const fs = require('fs')
const path = require('path')

const execSync = require('child_process').execSync;

// extract latest version from package.json
const ncLibPackage = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'packages', 'nc-lib-gui', 'package.json')))


const replacePackageName = (filePath) => {
    return new Promise((resolve, reject) => {
        return fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) return reject(err)
            var result = data.replace(/nc-lib-gui/g, ncLibPackage.name);
            return fs.writeFile(filePath, result, 'utf8', function (err) {
                if (err) return reject(err)
                return resolve()
            });
        });
    })
}

const bumbVersionAndSave = () => {
    // upgrade nc-lib-gui version in clairview
    execSync(`pnpm --filter=clairview install --ignore-scripts ${ncLibPackage.name}@${ncLibPackage.version}`, {});
    const clairviewPackageFilePath = path.join(__dirname, '..', 'packages', 'clairview', 'package.json')
    const nocoLibPackage = JSON.parse(fs.readFileSync(clairviewPackageFilePath))
    if (process.env.targetEnv === 'DEV') {
        nocoLibPackage.name = `${nocoLibPackage.name}-daily`
    }
    nocoLibPackage.version = ncLibPackage.version
    fs.writeFileSync(clairviewPackageFilePath, JSON.stringify(nocoLibPackage, null, 2));
}

if (process.env.targetEnv === 'DEV') {
    // replace nc-lib-gui by nc-lib-gui-daily if it is nightly build / pr release
    const filePaths = [
        path.join(__dirname, '..', 'packages', 'clairview', 'Dockerfile'),
        path.join(__dirname, '..', 'packages', 'clairview', 'package.json'),
        path.join(__dirname, '..', 'packages', 'clairview', 'src', 'Noco.ts'),
        path.join(__dirname, '..', 'packages', 'clairview', 'src', 'nocobuild.ts'),
        path.join(__dirname, '..', 'packages', 'clairview', 'src', 'middlewares', 'gui', 'gui.middleware.ts'),
    ]
    Promise.all(filePaths.map(filePath => { return replacePackageName(filePath) })).then(() => {
        bumbVersionAndSave();
    })
} else {
    bumbVersionAndSave();
}
