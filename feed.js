const https = require("https");
const { parseString } = require("xml2js");
const { uri } = require("./config");

let getJson = async (id, res) => {
  await https.get(`${uri}${id}`, (resp) => {
    let data = "";
    resp.on("data", (chunk) => {
      data += chunk;
    });
    //res data
    resp.on("end", () => {
      parseString(data, (err, json) => {
        if (err) throw err;
        let arr = [];
        let { entry } = json.feed;

        //iterate all entries
        entry.forEach((item) => {
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
        });
        //console.log(arr);
        res.write(JSON.stringify(arr));
        res.end();
      });
    });
    //res end
  });
};

module.exports = {
  getJson,
};
