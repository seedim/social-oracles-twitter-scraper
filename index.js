const { Builder, By, Key, until } = require("selenium-webdriver");
async function scrap_text(tweet_link) {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get(tweet_link);
    let tweet = By.xpath(
      '//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div/div/div[2]/div/section/div/div/div[1]/div/div/article/div/div/div/div[3]/div[1]/div/div'
    );
    await driver.wait(until.elementLocated(tweet, 50));
    tweet = await driver.findElement(tweet);
    tweet_text = await tweet.getText();
    return tweet_text;
  } finally {
    await driver.quit();
  }
}
async function main() {
  let args = process.argv.slice(2);
  if (args.length < 1) {
    console.log("Missing twitter link in arguments, exiting");
    return;
  }
  const tweet_link = args[0];
  const keyword = "#darkforest";
  const tweet_text = await scrap_text(tweet_link);
  console.log("***************");
  console.log(tweet_link);

  const contains_keyword = tweet_text
    .toLowerCase()
    .includes(keyword.toLowerCase());
  if (contains_keyword) {
    console.log(`${keyword} found in tweet!\n`);
    let hex_re = new RegExp("(0[xX][0-9a-fA-F]+)");
    const hash = hex_re.exec(tweet_text)[0];
    console.log("HASH: " + hash);
  } else {
    console.log(`${keyword} not found in tweet!`);
  }

  console.log("***************");
}
main();
