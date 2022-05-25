const fs = require('fs');
const path = require('path');

const mockDataFolder = `${__dirname}/../cypress/mock-data`;
const assetsDir = `${mockDataFolder}/static-assets`;
const routesFile = `${mockDataFolder}/assets/scully-routes.json`;
const staticFolder = `${__dirname}/../dist/static`;
const outAssetsFolder = `${staticFolder}/static-assets`;

// Remove all existing files
fs.rmSync(staticFolder, { recursive: true });
// Create the directory
fs.mkdirSync(staticFolder, { recursive: true });

const fullData = {};

const combineAndCopyMockData = () => {
    const routes = fs.readFileSync(routesFile).toString('utf8');
    JSON.parse(routes).forEach(route => {
        const dataFile = path.join(mockDataFolder, route.route, 'data.json');
        if (!fs.existsSync(dataFile)) {
            return;
        }
        const data = fs.readFileSync(dataFile).toString('utf8');
        const jsonData = JSON.parse(data);
        Object.entries(jsonData).forEach(([key, value]) => {
            fullData[key] = value;
        });
    });
    fs.writeFileSync(`${staticFolder}/data.json`, JSON.stringify(fullData));
};

const copyMockAssets = (relativeDir = '/') => {
    const currentFolder = path.join(assetsDir, relativeDir);
    fs.mkdirSync(path.join(outAssetsFolder, relativeDir), { recursive: true });

    const contents = fs.readdirSync(currentFolder);
    contents.forEach(content => {
        const relativeContentPath = path.join(relativeDir, content);
        if (fs.lstatSync(path.join(currentFolder, content)).isDirectory()) {
            copyMockAssets(relativeContentPath);
        } else {
            copyFile(relativeContentPath)
        }
    })
};

const copyFile = (relativeDir) => {
    const basePath = path.join(assetsDir, relativeDir);
    const toPath = path.join(outAssetsFolder, relativeDir);
    fs.copyFileSync(basePath, toPath);
}


try {
    combineAndCopyMockData()
    copyMockAssets()
} catch(err) {
    console.error(err);
    process.exit(1);
}
