const express = require("express");
const psl = require("psl");
const metals=require("../websites/metals");
const currency=require("../websites/Currency")
const {
  ae,
  lacoste,
  pullandbear,
  zara,
  hm,
  bershka,
} = require("../websites/clothing");
const {
  btech,
  elarabygroup,
  fresh,
  ikea,
  inandoutfurniture,
} = require("../websites/homeapp");
const { amazon, olx, souq, jumia } = require("../websites/ecommerce");
const {
  anastasiabeverlyhills,
  hudabeauty,
  mazayastores,
  sephora,
} = require("../websites/beauty");
const { adidas, nike, puma, reebok } = require("../websites/sports");
const {
  azzamwatches,
  gcwatches,
  iwatchstores,
} = require("../websites/jewlery");
const router = express.Router();
router.post("/", async (req, res) => {
  const info = req.body;
  const link = new URL(info.link);
  const name = psl.parse(link.hostname);
  eval(`${name.sld}('${link}').then((results)=>{giveresults(results)})`);
  function giveresults(results) {
    res.send(results);
    res.end();
  }
});
router.post('/findmetals',async(req,res)=>{
  const {metal,country,unit}=req.query;
  metals(metal,country,unit).then((value)=>{res.status(200).send(value)});
});
router.post('/currency',async(req,res)=>{
  const{Have,Want,Amount}=req.query;
  currency(Have,Want,Amount).then((values)=>{res.status(200).send(value)});
})



module.exports = router;
