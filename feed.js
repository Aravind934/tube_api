const https = require("https");
const { parseString } = require("xml2js");
const { uri } = require("./config");

let getJson = async (id, res) => {
  if (id) {
    await https.get(uri, (resp) => {
      let data = "";
      resp.on("data", (chunk) => {
        data += chunk;
      });

      resp.on("end", () => {
        parseString(data, (err, json) => {
          if (err) throw err;
          let arr = [];
          let { entry } = json.feed;

          //iterate all entries
          entry.forEach((item) => {
            if (item.id[0].split(":")[2] === id) {
              arr.push({
                videoId: item.id[0].split(":")[2],
                title: item.title[0],
                thumbnail: item["media:group"][0]["media:thumbnail"][0]["$"][
                  "url"
                ].replace(/hqdefault/g, "mqdefault"),
                description: item["media:group"][0]["media:description"][0],
                views:
                  item["media:group"][0]["media:community"][0][
                    "media:statistics"
                  ][0]["$"]["views"],
              });
              break
            }
          });
          //console.log(arr);
          if (arr.length) {
            res.write(JSON.stringify(arr));
            res.end();
          } else {
            res.writeHead(404);
            res.write("no details found for this channel id");
            res.end();
          }
        });
      });
    });
  } else {
    res.write("channelid must be provided");
    res.end();
  }
};

module.exports = {
  getJson,
};
