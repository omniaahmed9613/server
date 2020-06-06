const puppeteer = require('puppeteer');
const currency = require('currency.js');
var metals = (async (metal,count,unit) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0)
  const link='https://goldprice.org/'
  await page.goto(link, { waitUntil: 'networkidle2' });
  let country;
  let selectedcountry;
  let price;
  let Pricestring;
  let weight;
  let req_weight;


  try {
    await page.waitForSelector('#gpxtickerLeft_curr');
    selectedcountry= await page.$eval('#gpxtickerLeft_curr', select => select.value);
     country=await page.select('#gpxtickerLeft_curr',count);

  }
  catch (error) {
  }
  try{
      await page.waitForSelector('#gpxtickerLeft_wgt-au');
      weight=await page.$eval('#gpxtickerLeft_wgt-au',value =>value.value);
      req_weight=await page.select('#gpxtickerLeft_wgt-au',unit);
  }
  catch(error)
  {}

  try{
  
  await page.waitForSelector('#gpxtickerLeft_price');
  await page.waitFor(3000);
  Pricestring = await page.$eval('#gpxtickerLeft_price', price => price.textContent);
  price=currency(Pricestring).value;
}
catch(error)
{}
  await browser.close();
  return {
    country:country[0],
    weight:req_weight[0],
    price:price,
    
  }
});
module.exports=metals;
