const axios = require("axios").default;
const cheerio = require("cheerio");
const { getInfoKomik } = require("../helper/main.helper");

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

const getDetailKomik = async (slug) => {
  try {
    const response = await axios.get("https://komikstation.co/manga/" + slug);
    const $ = cheerio.load(response.data);

    const thumb = $(".thumbook").find("img").attr("src");
    const title = $(".infox").find(".entry-title").text();
    const synopsis = $(".infox").find(".entry-content-single").text();
    const released = getInfoKomik($(".infox"), 0, 0);
    const author = getInfoKomik($(".infox"), 0, 1);
    const updatedAt = $(".infox").find("time").text();
    const rating = $(".rating").find(".num").text();
    const status = $(".tsinfo").find(".imptdt").eq(0).find("i").text();
    const type = $(".tsinfo").find(".imptdt").eq(1).find("a").text();

    const genre = $(".mgen")
      .find("a")
      .map(function () {
        const name = $(this).text();
        const slug = $(this).attr("href").split("/")[4];

        return {
          name,
          slug,
        };
      })
      .get();

    const chapter = $("#chapterlist")
      .find("ul")
      .find("li")
      .map(function () {
        const name = $(this).find(".eph-num").find(".chapternum").text();
        const slug = $(this)
          .find(".eph-num")
          .find("a")
          .attr("href")
          .split("/")[3];
        const updatedAt = $(this).find(".chapterdate").text();

        return {
          name,
          slug,
          updatedAt,
        };
      })
      .get();
    return {
      thumb: thumb,
      title: title,
      synopsis: synopsis,
      released: released,
      author: author,
      rating: rating,
      status: status,
      type: type,
      updatedAt: updatedAt,
      genre: genre,
      chapter: chapter,
    };
  } catch (error) {}
};

module.exports = {
  getKomik,
  getDetailKomik,
};
