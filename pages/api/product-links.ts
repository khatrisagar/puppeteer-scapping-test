import { NextApiRequest, NextApiResponse } from "next";
import puppeteer, { PuppeteerLaunchOptions } from "puppeteer";
// import puppeteer, { PuppeteerLaunchOptions } from "puppeteer-core";
// import chromium from "chrome-aws-lambda";

/* eslint-disable */
interface CustomPuppeteerLaunchOptions extends PuppeteerLaunchOptions {
  cacheDirectory: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // const executablePath = await chromium.executablePath;
  // console.log("executablePath", executablePath);
  const browser = await puppeteer.launch({
    // args: ["--no-sandbox"],
    // headless: "new", // Enable headless mode
    // cacheDirectory: join(__dirname, ".cache", "puppeteer"),
    // ignoreHTTPSErrors: true,
    // executablePath,
    // args: chromium.args,
    headless: "new",
  } as CustomPuppeteerLaunchOptions);

  try {
    const page = await browser.newPage();
    await page.goto(
      "https://www.amazon.in/s?k=speaker&page=4&crid=3N7DM90DM0OKD&qid=1698484424&sprefix=speake%2Caps%2C231&ref=sr_pg_4"
    );
    // const selectors = [
    //   "#productTitle",
    //   ".a-price-whole",
    //   ".a-offscreen",
    //   ".a-size-base",
    // ];
    // const screenshot = await page.screenshot({ encoding: "base64" });
    // await Promise.all(
    //   selectors.map(async (selector) => {
    //     await page.waitForSelector(selector);
    //   })
    // );

    // const data = await page.evaluate(() => {
    //   const productTitleElement: any = document.querySelector(
    //     " .a-size-mini .a-link-normal"
    //   );
    //   // console.log("Aaaaaaa", productLinks);
    //   //   const productTitleElement = document.querySelector("#productTitle");
    //   //   const currentPriceElement = document.querySelector(
    //   //     ".priceToPay span.a-price-whole"
    //   //   );
    //   //   const originalPriceElement = document.querySelector(
    //   //     ".a-price.a-text-price span.a-offscreen"
    //   //   );

    //   //   const ratingElement = document.querySelector(
    //   //     "#acrPopover .a-declarative a span"
    //   //   );
    //   return {
    //     productLinks: productTitleElement ? productTitleElement?.href : null,
    //   };

    const hrefValues = await page.$$eval(
      ".a-size-mini .a-link-normal",
      (links) => {
        return links.map((link: any) => link.href);
      }
    );
    //   const outOfStockElement = document.querySelector("#availability span");

    //   return {
    //     productTitle: productTitleElement
    //       ? productTitleElement?.textContent?.trim()
    //       : null,
    //     currentPrice: currentPriceElement
    //       ? currentPriceElement?.textContent?.trim()
    //       : null,
    //     originalPrice: originalPriceElement
    //       ? originalPriceElement?.textContent?.trim()
    //       : null,
    //     rating: ratingElement ? ratingElement.textContent?.trim() : null,
    //     outOfStock: outOfStockElement
    //       ? outOfStockElement.textContent?.trim().toLowerCase() ===
    //         "currently unavailable"
    //       : false,
    //   };
    // });
    // });

    res.status(200).json(hrefValues);
  } catch (error) {
    res.status(200).json({ error: (error as Error).message });
  } finally {
    await browser.close();
  }
};

/* eslint-enable */
