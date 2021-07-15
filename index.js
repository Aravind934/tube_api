const http = require('http');
const { port } = require('./config');
const url = require('url');
const { getJson } = require('./feed');

//server
http
    .createServer(async (req, res) => {
        let path = url.parse(req.url, true);
        let query = JSON.parse(JSON.stringify(path.query));
        switch (path.pathname) {
        case '/channel':
            res.writeHead(200, { 'content-type': 'text/json' });
            await getJson(query.id, res);
            break;
        default:
            res.writeHead(404);
            res.write('Route not found!');
            res.end;
        }
    })
    .listen(port, () => console.log('app running in 8000'));
