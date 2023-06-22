"use server";

import { getChatCompletion, getDefaultChatClient } from "@app/ai/actions";
import { getLLMClient } from "@app/ai/actions/getLLMClient";
import { kv } from "@vercel/kv";
import * as cheerio from "cheerio";
import { revalidatePath } from "next/cache";
const striptags = require("striptags").striptags;

const betweenBracesRegex = /\{([^}]+)\}/g;
const textStaringWithDotRegex = /\.[^.\s]*/g;
// const codeRegexOne = /<[^>]+>/g;
// const codeRegexTwo = /[\t\r\n]/g;

export const requestSearchResults = async (
  searchTerm: string,
  userId: string
) => {
  if (searchTerm == "") throw new Error("search term is empty");
  if (!userId || userId?.length < 0) throw new Error("Invalid UserId");
  const aiSearchTerm = await getChatCompletion(
    `The user's query is ${searchTerm} . Reply with only a string and only that string where that string can be used in a search engine to locate the information needed to answer the user's query`
  );
  // console.log({ aiResponse: aiSearchTerm });
  // return

  const googleSearchUrl = `https://www.google.com/search?q=${aiSearchTerm
    .split(" ")
    .join("+")}&hl=en`;

  const googlePageFetchResponse = await fetch(googleSearchUrl);
  const googlePageFetchHTML = await googlePageFetchResponse.text();

  const cheerioClient = cheerio.load(googlePageFetchHTML);

  const googleSearchInfo = new Set<string>();

  const allElements = cheerioClient("body *");
  allElements.map((i, el) => {
    const {
      attribs,
      attributes,
      childNodes,
      children,
      name,
      nodeType,
      tagName,
      type,
    } = el;
    if (type === "script") return;
    if (type === "style") return;
    if (attribs?.id !== "main") return;

    const newEl = cheerioClient(el);
    const elemText = newEl.text();

    // const textBetweenBraces = elemText.matchAll(betweenBracesRegex);
    const textWithoutBraces = elemText.replace(betweenBracesRegex, " ");
    // console.log({ textWithoutBraces });

    // const textStartingWithDot = elemText.matchAll(textStaringWithDotRegex)
    const textWithoutBracesOrDot = textWithoutBraces.replace(
      textStaringWithDotRegex,
      " "
    );
    googleSearchInfo.add(textWithoutBracesOrDot);
    // console.log({ textWithoutBracesOrDot });

    // const textWithoutCode = textWithoutBracesOrDot.replace(codeRegexOne, "");
    // console.log({ textWithoutCode });
    // console.log({attribs})
    // console.log({attributes})
    // console.log({name})
    // console.log({tagName})
    // console.log({type})
    // console.log({elemText})
    // console.log(
    //   "===============================================================\n\n"
    // );
    // return;
    // if (elemText == null) return;
    // if (elemText.trim() == "") return;
    // if (elemText.includes("http")) return;
    // if (elemText.includes("www")) return;
    // if (elemText.includes("px")) return;
    // if (elemText.split(" ").length < 5) return;
    // if (elemText.trim() === "-") return;
    // if (tagName === "a") return;
    // if (tagName === "img") return;
    // if (tagName === "svg") return;
    // if (tagName === "path") return;
    // if (tagName === "g") return;
    // if (tagName === "rect") return;
    // if (tagName === "circle") return;
    // if (tagName === "defs") return;
    // if (tagName === "clipPath") return;
    // if (tagName === "polygon") return;
    // // console.log({tagName})
    // // console.log({elemText})
    // // googleSearchInfo.add(elemText);

    // console.log({
    // attribs,
    // attributes,
    // childNodes,
    // children,
    // name,
    // nodeType,
    // tagName,
    // type,
    // });
  });

  // console.log(Array.from(googleSearchInfo).join("\n"));
  const googleSearchResult = Array.from(googleSearchInfo).join(" ");
  const finalAiResponse = await getChatCompletion(
    `Answer the following question: ${searchTerm} in more than 150 characters, make your answer clear and concise, use the following text as context: \`${googleSearchResult}\``,
    1000
  );

  const validSearchResultUrls: string[] = [];

  const allLinks = cheerioClient("a");
  allLinks.each((i, link) => {
    const linkAttributes = link.attributes;
    linkAttributes.forEach((attr) => {
      if (attr.name == "href") {
        const href = attr.value;
        if (!href?.startsWith("/url?q=")) return;
        validSearchResultUrls.push(href.replace("/url?q=", "").split("&")[0]);
      }
    });
  });
  // console.log({ validSearchResultUrls });

  const bestSearchResult = await getChatCompletion(
    `Choose one from ${validSearchResultUrls.join(
      " - "
    )} that most likely has the information to answer the following user's query: \`${searchTerm}\`, only reply with your selection and nothing else`
  );
  // console.log({ bestSearchResult });
  console.log({ userId, searchTerm });

  await kv.set<string[]>(userId + ":" + "responseList", [finalAiResponse]);
  // await kv.set<string>(userId + ":" + "sourceUrl", googleSearchUrl);
  // await kv.set<string>(userId + ":" + "sourceUrl", googleSearchUrl);
  await kv.set<string>(userId + ":" + "diveDeeperURl", bestSearchResult);
  // await kv.set<boolean>(userId + ":" + "deepDiveEnabled", true);
  // await kv.set<string>(userId + ":" + "searchTerm", searchTerm);
  // await kv.set<string>(userId + ":" + "lastDeepDive", "");

  revalidatePath("/search");
};

// const bestSearchResult = await getChatCompletion(
//   `Choose one from ${validSearchResultUrls} that is the most relevant to ${searchTerm}}, only reply with your selection and nothing else`
// );
// console.log({ bestSearchResult });

// const bestSearchResultFetchResponse = await fetch(bestSearchResult);
// const bestSearchResultFetchHTML = await bestSearchResultFetchResponse.text();
// const bestSearchResultCheerioClient = cheerio.load(bestSearchResultFetchHTML);
// const bestSearchResultText: string =
//   bestSearchResultCheerioClient("body").text();
// console.log({ bestSearchResultText });

// const strippedText: string = striptags(
//   bestSearchResultText.trim().replaceAll("\n", " ")
// );

// console.log({ strippedText });

// const responseList: string[] = [];
// for (let i = 0; i < 1000; i += 1000) {
//   const aiResponse = await getChatCompletion(
//     "Use the following text to answer the following question: Text: `" +
//       strippedText.slice(i, 1000) +
//       "` . Question: `" +
//       searchTerm +
//       "`"
//   );
//   responseList.push(aiResponse);
// }

// const bestResponse = await getChatCompletion(
//   `Answer the following question: ${searchTerm} using the following text: ${responseList.join(
//     " "
//   )}`
// );
// console.log({ bestResponse });
