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
           let result =  await makeArr(data);
           //console.log(result)
           res.write(JSON.stringify(result))
           res.end()
        });
    //res end
    });
};

module.exports = {
    getJson,
};
