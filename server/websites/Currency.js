const puppeteer = require('puppeteer');
const currency = require('currency.js');
var Currency = (async (Have, Want, Amount) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const link = 'https://www1.oanda.com/currency/converter/'
  page.setDefaultNavigationTimeout(0);
  await page.goto(link, { waitUntil: 'networkidle0' });

  let currhave;
  let y;
  let currwant;
  let x;
  let count;
  let z;
  let i;
  let price;


  try {
    await page.waitForSelector('#quote_currency_input')
    currhave = await page.$('#quote_currency_input');
    await currhave.type(Have, { delay: 1000 });
    await page.waitForSelector('.ltr_list_item.list_item_hover')
    y = await page.$('.ltr_list_item.list_item_hover')
    await y.click();

  }
  catch (error) {
  }
  try {
    await page.waitForSelector('#base_currency_input')
    currwant = await page.$('#base_currency_input');
    await currwant.type(Want, { delay: 1000 });
    await page.waitForSelector('.ltr_list_item.list_item_hover')
    x = await page.$('.ltr_list_item.list_item_hover')
    await x.click();
  }
  catch (error) { }

  try {

    await page.waitForSelector('#quote_amount_input')
    count = await page.$('#quote_amount_input');
    await count.click();
    await page.keyboard.press('Backspace');
    await count.type(Amount, { delay: 1000 });
  }

  catch (error) { }
  try {

    await page.waitForSelector('#base_amount_input')
    await page.waitFor(3000);
    i = await page.$eval('#base_amount_input', price => price.value);
    price = await parseFloat(i);
  }
  catch (error) { }
  await browser.close();
  return {
    price: price,
  }
});
module.exports=Currency