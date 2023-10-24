import { NextApiRequest, NextApiResponse } from "next";
import puppeteer, { executablePath, PuppeteerLaunchOptions } from "puppeteer";
const { join } = require("path");
import chromium from "chrome-aws-lambda";

/* eslint-disable */
interface CustomPuppeteerLaunchOptions extends PuppeteerLaunchOptions {
  cacheDirectory: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const browser = await puppeteer.launch({
    ignoreDefaultArgs: ["--disable-extensions"],
    headless: "new", // Enable headless mode
    // // cacheDirectory: join(__dirname, ".cache", "puppeteer"),
    executablePath: executablePath(),

    // args: chromium.args,
    // defaultViewport: chromium.defaultViewport,
    // executablePath: await chromium.executablePath,
    // ignoreHTTPSErrors: true,
  } as CustomPuppeteerLaunchOptions);

  try {
    const page = await browser.newPage();
    await page.goto(
      "https://www.amazon.in/OnePlus-Wireless-Earbuds-Drivers-Playback/dp/B0C8JB3G5W/ref=lp_80662755031_1_1?sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&th=1"
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
    const data = await page.evaluate(() => {
      const productTitleElement = document.querySelector("#productTitle");
      const currentPriceElement = document.querySelector(
        ".priceToPay span.a-price-whole"
      );
      const originalPriceElement = document.querySelector(
        ".a-price.a-text-price span.a-offscreen"
      );

      const ratingElement = document.querySelector(
        "#acrPopover .a-declarative a span"
      );

      const outOfStockElement = document.querySelector("#availability span");

      return {
        productTitle: productTitleElement
          ? productTitleElement?.textContent?.trim()
          : null,
        currentPrice: currentPriceElement
          ? currentPriceElement?.textContent?.trim()
          : null,
        originalPrice: originalPriceElement
          ? originalPriceElement?.textContent?.trim()
          : null,
        rating: ratingElement ? ratingElement.textContent?.trim() : null,
        outOfStock: outOfStockElement
          ? outOfStockElement.textContent?.trim().toLowerCase() ===
            "currently unavailable"
          : false,
      };
    });
    // for (let j = 1; j <= 5; j++) {
    //   const page = await browser.newPage();
    //   for (let i = 1; i <= 10000; i++) {
    //     await page.goto(
    //       "https://www.amazon.in/OnePlus-Wireless-Earbuds-Drivers-Playback/dp/B0C8JB3G5W/ref=lp_80662755031_1_1?sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&th=1"
    //     );

    //     const data = await page.evaluate(() => {
    //       const productTitleElement = document.querySelector("#productTitle");
    //       const currentPriceElement = document.querySelector(
    //         ".priceToPay span.a-price-whole"
    //       );
    //       const originalPriceElement = document.querySelector(
    //         ".a-price.a-text-price span.a-offscreen"
    //       );

    //       const ratingElement = document.querySelector(
    //         "#acrPopover .a-declarative a span"
    //       );

    //       const outOfStockElement =
    //         document.querySelector("#availability span");

    //       return {
    //         productTitle: productTitleElement
    //           ? productTitleElement?.textContent?.trim()
    //           : null,
    //         currentPrice: currentPriceElement
    //           ? currentPriceElement?.textContent?.trim()
    //           : null,
    //         originalPrice: originalPriceElement
    //           ? originalPriceElement?.textContent?.trim()
    //           : null,
    //         rating: ratingElement ? ratingElement.textContent?.trim() : null,
    //         outOfStock: outOfStockElement
    //           ? outOfStockElement.textContent?.trim().toLowerCase() ===
    //             "currently unavailable"
    //           : false,
    //       };
    //     });
    //     console.log("dataa", i * j, data);
    //   }
    //   await browser.close();
    // }

    res.status(200).json(data);
  } catch (error) {
    res.status(200).json({ error: (error as Error).message });
  } finally {
    await browser.close();
  }
};

/* eslint-enable */
