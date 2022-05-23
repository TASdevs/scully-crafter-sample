const fs = require('fs');
const path = require('path');
const { getRequest } = require('./http/request');

const outDir = `${__dirname}/../dist/static`;
const assetsDir = `${outDir}/static-assets`;
const crafterBaseUrl = 'http://localhost:8080';

fs.mkdirSync(assetsDir, { recursive: true });

const downloadedImages = [];

const cacheImages = () => {
    const data = fs.readFileSync(`${outDir}/data.json`).toString('utf8');
    const jsonData = JSON.parse(data);
    handleData(jsonData);
};

const handleData = (data) => {
    Object.values(data).forEach((value) => {
        if (typeof value === 'string' && isStringImage(value)) {
            downloadImage(value);
        } else if (typeof value === 'object') {
            handleData(value);
        }
    })
}

const isStringImage = (string) => {
    return string.toLowerCase().endsWith('.png');
}

const downloadImage = (imagePath) => {
    if (downloadedImages.includes(imagePath)) {
        return;
    }

    getRequest(`${crafterBaseUrl}${imagePath}?crafterSite=newton-practice`).then(image => {
        downloadedImages.push(imagePath);
        const outputLocation = `${outDir}${imagePath}`;
        fs.mkdirSync(path.dirname(outputLocation), { recursive: true });
        fs.writeFileSync(outputLocation, image.body, { encoding: 'binary', recursive: true });
    });
}

try {
    cacheImages()
} catch(err) {
    console.error(err);
    process.exit(1);
}
