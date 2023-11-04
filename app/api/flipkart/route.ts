import { NextApiRequest } from "next";

import { NextResponse } from "next/server";

import puppeteer from "puppeteer";

export const GET = async (req: any) => {
  try {
    const browser = await puppeteer.launch({
      headless: "new",
    });

    const page = await browser.newPage();
    await page.goto(
      "https://www.flipkart.com/apple-iphone-14-blue-128-gb/p/itmdb77f40da6b6d?pid=MOBGHWFHSV7GUFWA&lid=LSTMOBGHWFHSV7GUFWA3AV8J8&marketplace=FLIPKART&store=tyy%2F4io&spotlightTagId=BestsellerId_tyy%2F4io&srno=b_1_1&otracker=clp_bannerads_1_7.bannerAdCard.BANNERADS_D_mobile-phones-big-dussehra-sale-2023-2bc-store_DWLEGOATXWRA&fm=organic&iid=a4d8ce5f-c9d8-40c0-8e96-8cb58889e605.MOBGHWFHSV7GUFWA.SEARCH&ppt=browse&ppn=browse&ssid=at9pf7xexs0000001698588421481"
    );

    const data = await page.evaluate(() => {
      const productTitleElement = document.querySelector(".yhB1nd .B_NuCI");
      const currentPriceElement = document.querySelector("._25b18c ._16Jk6d");
      const actualPriceElement = document.querySelector("._25b18c ._2p6lqe");
      const ratingElement = document.querySelector("._1lRcqv ._3LWZlK");
      const outOfStockElement = document.querySelector(
        "._2GoDe3 ._3Mn1Gg ._1AtVbE ._16FRp0"
      );

      return {
        productTitle: productTitleElement
          ? productTitleElement?.textContent?.trim()
          : null,
        currentPrice: currentPriceElement
          ? currentPriceElement?.textContent?.trim()?.substring(1)
          : null,
        actualPrice: actualPriceElement
          ? actualPriceElement?.textContent?.trim()?.substring(1)
          : null,
        rating: ratingElement ? ratingElement.textContent?.trim() : null,

        outOfStock: outOfStockElement
          ? outOfStockElement.textContent?.trim().toLowerCase() === "sold out"
          : false,
      };
    });

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json("error");
  }
};
