import puppeteer from "puppeteer";
import axios from 'axios';


const config = {
  headers :{
    "Content-Type" : "x-www-form-urlencoded"
  }
}


const payload = {
  grant_type : "authorization_code",
  code:"AQQuHz-0_b2eg_MP2UQwXQUkgIEdhR3oGCWCRcn4VO4MxetC9Pvo0tadA3PLVr8Uy9NMCNONCQDoF61qq0aqZ5prDIoj4uXCvxHbbNractvnkbtMLMo69cR-KeDuLO2uKuJpXFvN2uFcGVPkvcgdTTUz2rsrJKVeif7s_4b4bb6gIuGrO0wgq5lJ4iEZCbBMwCgbpceMHv-uyMrUFCQ",
  client_id : "78c5oqesflhfxv",
  redirect_uri : "http://localhost:4444/config",
  client_secret : "GAC2THjclaJmpQSN",
}


axios.post("https://www.linkedin.com/oauth/v2/accessToken",payload,config).then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
})

/*
(async () => {

    const browser = await puppeteer.launch({ headless: false, slowMo : 500});
    const page = browser.newPage()
    await page.goto("https://www.kombo.co/en/");

    await page.type("#form_departure_display", "paris")
    await page.keyboard.press('Enter');
    await page.type("#form_arrival_display", "bordeau")
    await page.keyboard.press('Enter');

    //await page.$eval("#form_departure_date", el => el.removeAttribute("readOnly"))
    //await page.$eval("#form_departure_date", el => el.setAttribute("value", "Thu ,1 Apr"))

    await page.click("#launchSearch")

   // await browser.close()
  })();

/**import axios from "axios"
import express from 'express';

const app = express();

app.get('/', function(req, res) {
    res.send("hello you !")
  });

  app.get('/config', function(req, res) {

    console.log(res);

    res.sendStatus(200)
  });

const url = "/oauth2/authorize/"

var response = axios.get(url , {
    params :{
        client_id : "e418a929646d4b9192668fdc52bdec5a",
        redirect_uri : "http://localhost:8080/config",
        response_type : "code",
        state : "ilovedata",
        scope : "all HTTP/1.1"
    }
}).then((response) => {
    console.log("good");
}).catch((err) => {
    console.log(err);
})

app.listen(8080)*/