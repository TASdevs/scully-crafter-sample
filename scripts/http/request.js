const http = require('http');

const getRequest = (url) => {
    return new Promise((resolve, reject) => {
        const parsedUrl = new URL(url);
        console.log(url);

        const options = {
            host: parsedUrl.hostname,
            port: parsedUrl.port,
            path: parsedUrl.pathname + parsedUrl.search,
            method: 'GET'
        };

        const req = http.request(options, (res) => {
            var responseBody = '';
            res.setEncoding('binary');

            res.on('data', (chunk) => {
                responseBody += chunk;
            });

            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    body: responseBody,
                    contentType: res.headers['content-type']
                });
            });

            res.on('error', (error) => {
                reject(new Error(`Error with API response: ${error.message}`, 500));
            });
        });

        req.on('error', (error) => {
            reject(new Error(`Error with API request: ${error.message}`, 500));
        });

        req.end();
    });
};

module.exports = { getRequest };
