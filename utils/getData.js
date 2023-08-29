const axios = require("axios");
const cheerio = require("cheerio");
//const cron = require("node-cron");

const getData = async () => {
  const result=[];
  let URLS = [
    { url: "https://freestuff.dev/", data: [] },
    { url: "https://finddev.tools/", data: [] },
  ];

  URLS.forEach( async(url, index) => {
    try {
      let res = await axios.get(url.url);
      let data = await res.data;
      let $ = cheerio.load(data);
      let card = $(".cards");
      card.each((i, el) => {
        let item = {};
        item.imgSrc = $(el).find("img").attr("src") || null;
        item.title = $(el).find("h3").text().trim() || null;
        item.description =
          $(el).find("p.snippet").text().trim() ||
          $(el).find("div p:nth-child(2)").text().trim() ||
          null;
        let link =
          $(el).find("div:nth-child(3) > a:nth-child(4)").attr("href") ||
          $(el)
            .find("div:nth-child(3) > p:nth-child(1) > a:nth-child(1)")
            .attr("href") ||
          null;
        item.tag =
          $(el)
            .find("div.flex.items-start.relative > div:nth-child(3) > div")
            .text()
            .trim()
            .slice(1)
            .replace("#", ",") ||
          $(el).find("div > p.mt-20 > em").text().trim().slice(5) ||
          null;

        item.link = link.split("?")[0];

        if (index < 2) {
          if (URLS[index].data.length <= 74) {
            URLS[index].data.push(item);
            result.push(item)
          } else {
            index++;
          }
        } else {
          return false;
        }

      });
      console.log('the urls');
     //result.push(URLS)
    return result
    console.log(data)
    } catch (err) {
      console.error(err.message);
      //resend the request
      //return 0
    }
  });

  

  //return result;

};

module.exports = getData;
