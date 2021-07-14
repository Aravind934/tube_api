const http = require("http");
const { port } = require("./config");
const { getJson } = require("./feed");
const url = require("url");

//server
http
  .createServer(async (req, res) => {
    let channelID = url.parse(req.url).pathname.split("/")[2];
    res.writeHead(200, { "content-type": "text/json" });
    if (req.method === "GET" && channelID) {
      await getJson(channelID, res);
    }
  })
  .listen(port, () => console.log(`app running in 8000`));
