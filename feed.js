const https = require('https');
const { uri } = require('./config');
const { makeArr } = require('./helper');

let getJson = async (id, res) => {
    await https.get(`${uri}${id}`, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        //res data
        resp.on('end', async () => {
            await makeArr(data, res);
        });
    //res end
    });
};

module.exports = {
    getJson,
};
