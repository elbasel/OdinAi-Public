"use server";

import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { GoogleVertexAIEmbeddings } from "langchain/embeddings/googlevertexai";
import { getChatCompletion } from "@app/ai/actions";
// import { HNSWLib } from "langchain/vectorstores/hnswlib";

export const requestDeepDive = async (
  userId: string,
  searchQuery: string,
  deepDiveUrl: string
) => {
  if (!deepDiveUrl) throw new Error("Invalid Deep dive url");
  if (!searchQuery) throw new Error("Invalid search query");

  const loader = new CheerioWebBaseLoader(deepDiveUrl);
  const firstDocs = await loader.load();
  let firstTotalCharacterLength = 0;
  firstDocs.forEach((d) => {
    const pageCharLength = d.pageContent.length;
    firstTotalCharacterLength += pageCharLength;
  });

  // max number of in-memory docs is 4
  const firstSplitChunkSize = firstTotalCharacterLength / 2;

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: firstSplitChunkSize,
  });

  const firstDocSplit = await splitter.splitDocuments(firstDocs);

  const vectorStore = await MemoryVectorStore.fromDocuments(
    firstDocSplit,
    new GoogleVertexAIEmbeddings()
  );

  // const vectorStore = await HNSWLib.fromDocuments(
  //   firstDocSplit,
  //   new GoogleVertexAIEmbeddings()
  // );

  const firstSimilarDocs = await vectorStore.similaritySearch(searchQuery, 1);
  const firstResultText: string = firstSimilarDocs[0].pageContent;

  // if (firstResultText.length <= 1000) {
  //   const aiResponse = await getChatCompletion(
  //     `Answer the user's query: \`${searchQuery}\` using the following text as context: \`\`\`${firstResultText
  //       .replaceAll("\n", " ")
  //       .trim()}\`\`\``
  //   );
  //   // //   console.log(aiResponse);
  //   console.log({ userId, firstResultText, aiResponse });
  //   await kv.set<string[]>(userId + ":" + "responseList", [aiResponse]);
  //   await kv.set<boolean>(userId + ":" + "deepDiveEnabled", false);
  //   revalidatePath("/search");
  //   return;
  // }

  const similarDocsSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
  });

  const similarDocsSplit = await similarDocsSplitter.splitDocuments(
    firstSimilarDocs
  );

  const similarDocsWithScore = [];

  const numLoops = Math.ceil(similarDocsSplit.length / 4);
  for (let i = 0; i < numLoops; i += 4) {
    const tempMemVectorStore = await MemoryVectorStore.fromDocuments(
      similarDocsSplit.slice(i, i + 4),
      new GoogleVertexAIEmbeddings()
    );

    const similarSearchWithScoreResult =
      await tempMemVectorStore.similaritySearchWithScore(searchQuery, 3);
    similarDocsWithScore.push(...similarSearchWithScoreResult);
  }

  const sortedSimilarDocsWithScore = [...similarDocsWithScore].sort(
    (a, b) => b[1] - a[1]
  );

  // console.log(sortedSimilarDocsWithScore);

  const topThreeDocs = sortedSimilarDocsWithScore.slice(0, 3);
  const finalContext = topThreeDocs
    .map((d) => d[0].pageContent.replaceAll("\n", " ").trim())
    .join(" ");
  // //   const deepDiveUrlFetchResponse = await fetch(deepDiveUrl);
  // //   const deepDiveHTML = await deepDiveUrlFetchResponse.text();
  // //   const cheerioClient = cheerio.load(deepDiveHTML);
  // //   const body = cheerioClient("body");
  // //   const bodyText = body.text().toString().trim().replaceAll("\n", " ");
  // //   console.log({ bodyText });
  // const finalContext = secondResultText.replaceAll("\n", " ").trim();
  // console.log({ finalContext });
  const aiResponse = await getChatCompletion(
    `Answer the user's query: \`${searchQuery}\` using the following text as context: \`\`\`${finalContext}\`\`\``
  );
  // );
  // // //   console.log(aiResponse);
  console.log({ userId, finalContext, aiResponse });
  await kv.set<string[]>(userId + ":" + "responseList", [aiResponse]);
  await kv.set<boolean>(userId + ":" + "deepDiveEnabled", false);
  revalidatePath("/search");
};
