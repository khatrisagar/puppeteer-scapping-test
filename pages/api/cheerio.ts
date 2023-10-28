import { NextApiRequest, NextApiResponse } from "next";
import cheerio, { Cheerio } from "cheerio";
import axios from "axios";
import productUrl from "./data/urls.json";

const urls = productUrl.urls;
// const getURLResponse = async (url: string) => {
//   try {
//     const;
//   } catch (error) {
//     console.log("Error", error);
//   }
// };

const axiosInstance = axios.create();

const scrapPage = async (url: string) => {
  const response = await axiosInstance.get(url);
  console.log("ressssssssssssssssssssssssssssssssss");
  const html = response.data;
  const $ = cheerio.load(html);

  const productTitleElement = $("#productTitle");
  const currentPriceElement = $(".priceToPay span.a-price-whole");
  const originalPriceElement = $(".a-price.a-text-price span.a-offscreen");
  const ratingElement = $(
    "#acrPopover .a-declarative .a-popover-trigger .a-color-base"
  );
  const outOfStockElement = $("#availability span");

  const productTitle = productTitleElement.text()?.trim();
  const currentPrice = currentPriceElement.text()?.trim();
  const originalPrice = originalPriceElement.text()?.trim();

  const rating = ratingElement.text()?.trim()?.split(" ")?.[0];
  const outOfStock =
    outOfStockElement.text()?.trim()?.toLowerCase() === "currently unavailable";

  const data = {
    productTitle,
    currentPrice,
    originalPrice,
    rating,
    outOfStock,
  };

  return data;
};

// const scrapPage = (url: string) => {
//   console.log("111111111111111111111");
//   return axios
//     .get(url)
//     .then((response) => {
//       console.log("ressssssssssssssssssssssssssssssssss");
//       const html = response.data;
//       const $ = cheerio.load(html);

//       const productTitleElement = $("#productTitle");
//       const currentPriceElement = $(".priceToPay span.a-price-whole");
//       const originalPriceElement = $(".a-price.a-text-price span.a-offscreen");
//       const ratingElement = $(
//         "#acrPopover .a-declarative .a-popover-trigger .a-color-base"
//       );
//       const outOfStockElement = $("#availability span");

//       const productTitle = productTitleElement.text()?.trim();
//       const currentPrice = currentPriceElement.text()?.trim();
//       const originalPrice = originalPriceElement.text()?.trim();

//       const rating = ratingElement.text()?.trim()?.split(" ")?.[0];
//       const outOfStock =
//         outOfStockElement.text()?.trim()?.toLowerCase() ===
//         "currently unavailable";

//       const data = {
//         productTitle,
//         currentPrice,
//         originalPrice,
//         rating,
//         outOfStock,
//       };

//       return data;
//     })
//     .catch((error) => {
//       // Handle errors here
//       console.error("Error scraping page:", error);
//       return null;
//     });
// };

/* eslint-disable */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // const response = await axios.get(
    //   "https://www.amazon.in/OnePlus-Wireless-Earbuds-Drivers-Playback/dp/B0C8JB3G5W/ref=lp_80662755031_1_1?sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&th=1"
    // );
    // const html = response.data;
    // const $ = cheerio.load(html);

    // const productTitleElement = $("#productTitle");
    // const currentPriceElement = $(".priceToPay span.a-price-whole");
    // const originalPriceElement = $(".a-price.a-text-price span.a-offscreen");
    // const ratingElement = $(
    //   "#acrPopover .a-declarative .a-popover-trigger .a-color-base"
    // );
    // const outOfStockElement = $("#availability span");

    // const productTitle = productTitleElement.text()?.trim();
    // const currentPrice = currentPriceElement.text()?.trim();
    // const originalPrice = originalPriceElement.text()?.trim();

    // console.log("ratingElement");
    // const rating = ratingElement.text()?.trim()?.split(" ")?.[0];
    // const outOfStock =
    //   outOfStockElement.text()?.trim()?.toLowerCase() ===
    //   "currently unavailable";

    // const data = {
    //   productTitle,
    //   currentPrice,
    //   originalPrice,
    //   rating,
    //   outOfStock,
    // };

    const scrapingPromises = urls.map(scrapPage as any);
    console.log("scrappppppppppppppppppppppppppppppppp");

    const data = await Promise.allSettled(scrapingPromises);
    // console.log("dattt", data);
    res.json(data);
  } catch (error) {
    res.json({ error: (error as Error).message });
    console.error("Error fetching the web page:", error);
  }
};

/* eslint-enable */
