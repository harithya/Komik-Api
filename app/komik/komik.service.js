const axios = require("axios").default;
const cheerio = require("cheerio");

const getKomik = async (url) => {
  try {
    const response = await axios.get("https://komikstation.co/" + url);
    const $ = cheerio.load(response.data);

    const komik = $(".listupd")
      .find(".bs")
      .map(function () {
        const thumb = $(this).find("img").attr("src");
        const title = $(this).find(".tt").text();
        const rating = $(this).find(".numscore").text();
        const type = $(this).find(".type").text();
        const chapter = $(this).find(".epxs").text();
        const slug = $(this).find("a").attr("href").split("/")[4];

        return {
          thumb,
          title,
          type,
          rating,
          chapter,
          slug,
        };
      });

    return komik.get();
  } catch (error) {
    throw new Error(error);
  }
};

const getUpdated = async () => {
  try {
    const komik = await getKomik("manga/?status=&type=&order=update");
    return komik;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getKomik,
  getUpdated,
};
