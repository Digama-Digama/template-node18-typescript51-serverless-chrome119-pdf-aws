import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { GetPDFBuffer } from "./types/HelperTypes";

export class Helper {
  static getPDFBuffer: GetPDFBuffer = async (html, options) => {
    let browser = null;
    try {
       chromium.setGraphicsMode = false;
      let browserOptions : any = {
        args: process.env.IS_OFFLINE ? [] : chromium.args,
        headless: process.env.IS_OFFLINE ? "new" : chromium.headless,
      }
      if ((typeof(process.env.IS_OFFLINE) !== "undefined" && process.env.IS_OFFLINE)) {
        browserOptions = {
          ...browserOptions,
          executablePath : "C:\\Users\\fvhan\\AppData\\Local\\Google\\Chrome SxS\\Application\\Chrome.exe"
        }
      } else {
            browserOptions = {
              ...browserOptions,
              executablePath: await chromium.executablePath('https://i4-sls-lambda-commom-layer.s3.sa-east-1.amazonaws.com/chromium/chromium-v119.0.2-pack.tar'),
            }
      }
      
      browser = await puppeteer.launch(browserOptions);
     const page = await browser.newPage();
       const loaded = page.waitForNavigation({
        waitUntil: "load",
      });
      await page.setContent(html);
      await loaded;
      return await page.pdf(options);
      
    } catch (error) {
      console.error("ERROR Helper.getPDFBuffer : ", error);
      return error;
    } finally {
      if (browser !== null) {
        await browser.close();
      }
    }
  };
}
