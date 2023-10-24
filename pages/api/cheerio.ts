import { NextApiRequest, NextApiResponse } from "next";
import cheerio, { Cheerio } from "cheerio";
import axios from "axios";
/* eslint-disable */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await axios.get(
      "https://www.amazon.in/OnePlus-Wireless-Earbuds-Drivers-Playback/dp/B0C8JB3G5W/ref=lp_80662755031_1_1?sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&th=1"
    );
    const html = response.data;
    const $ = cheerio.load(html);

    const productTitleElement = $("#productTitle");
    const currentPriceElement = $(".priceToPay span.a-price-whole");
    const originalPriceElement = $(".a-price.a-text-price span.a-offscreen");
    const ratingElement = $(
      "#acrPopover .a-declarative .a-popover-trigger .a-color-base"
    );
    const outOfStockElement = $("#availability span");

    const productTitle = productTitleElement.text().trim();
    const currentPrice = currentPriceElement.text().trim();
    const originalPrice = originalPriceElement.text().trim();

    console.log("ratingElement");
    const rating = ratingElement.text().trim().split(" ")?.[0];
    const outOfStock =
      outOfStockElement.text().trim().toLowerCase() === "currently unavailable";

    const data = {
      productTitle: productTitle,
      currentPrice: currentPrice,
      originalPrice: originalPrice,
      rating: rating,
      outOfStock: outOfStock,
    };

    console.log(data);

    res.json(data);
  } catch (error) {
    res.json({ error: (error as Error).message });
    console.error("Error fetching the web page:", error);
  }
};

/* eslint-enable */
