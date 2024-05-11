const getInfoKomik = (selector, flexNum, itemNum) => {
  return selector
    .find(".flex-wrap")
    .eq(flexNum)
    .find("span")
    .eq(itemNum)
    .text();
};

module.exports = {
  getInfoKomik,
};
