"use server";

import {
  type BaseChatMessage,
  AIChatMessage,
  HumanChatMessage,
  SystemChatMessage,
} from "langchain/schema";
import { getChatClient } from "../getChatClient";
import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";
import { GoogleVertexAIChatInput } from "langchain/chat_models/googlevertexai";

type Args = {
  userId: string;
  userPrompt: string;
  context: string;
  aiName: string | null;
  userName?: string;
};

export const requestContextualAiResponse = async ({
  userId,
  userPrompt,
  context,
  aiName,
  userName,
}: Args) => {
  const chatClient = await getChatClient(askAiConfig);

  // setup ai name prompt
  // const aiNameTemplate = aiName
  // ? ` Your name is ${aiName}, your replies should reflect the corropposonding character's style of talking`
  // : "";

  // format user prompt to include context and ai name
  // const formattedUserPrompt = `Context: ${context} . Question: ${userPrompt}`;

  // * get previous conversation string array
  const prevConversation: string[] | null = await kv.get<string[]>(
    `conversationOf${userId}`
  );
  // if ((prevConversation?.length ?? 0) % 2 !== 0)
  //   throw new Error(
  //     "Previous conversation has an odd number of messages, must be even"
  //   );

  // * convert previous conversation string array to BaseChatMessage array to use it with langchain chat model
  const prevLangchainMessages: BaseChatMessage[] = [];
  prevConversation?.forEach((msg, i) => {
    if (i % 2 === 0) prevLangchainMessages.push(new HumanChatMessage(msg));
    if (i % 2 !== 0) prevLangchainMessages.push(new AIChatMessage(msg));
  });

  // const initAiResponse = await chatClient.call([
  //   new SystemChatMessage(
  //     'you are a backend function that returns a json object. you will receive an input of one argument, a string of text which is the user"s query and you should reply with the following format exactly: {type_of_query: "info" | "question" | "other" }, for example a user"s query of "my age is 20" should be "info" and a  user"s query of "hello" should be "other"'
  //   ),
  //   new HumanChatMessage(userPrompt),
  // ]);

  // * the prevLangchainMessages preceded by a system message and followed by the new user prompt
  // * must have an odd number of messages excluding the first system chat message
  // * should always start with a system message
  const updatedLangchainMessages = [
    new SystemChatMessage(
      `user with the name of ${userName}, take the previous info into consideration, greet the user using their name, be talkative and funny, always keep the conversation going and act as a futuristic sci-fi artificial intelligence assistant.`
    ),
    // prevLangchainMessages has an even number of messages, ignoring the first system message, this makes
    // the updatedLangchainMessages odd
    ...prevLangchainMessages,
    new HumanChatMessage(context + "-0- " + userPrompt),
    // new HumanChatMessage(formattedUserPrompt),
  ];

  const { text: aiResponse }: BaseChatMessage = await chatClient.call(
    updatedLangchainMessages
  );
  if (!aiResponse) throw new Error("No text returned from AI");

  // * the updated conversation string array after adding the ai response to the prev one
  // * this should follow the pattern of [userMessage, aiResponse, userMessage, aiResponse, ...]
  // * notice that the first message is a system message, so it is not stored on the server
  const updatedConversation: string[] = [];
  updatedLangchainMessages.forEach((q, i) => {
    const msgText = q.text;
    if (i !== updatedLangchainMessages.length - 1) {
      updatedConversation.push(msgText);
    } else {
      updatedConversation.push(msgText.split("-0- ")[1]);
    }
  });
  // * add the latest ai response to the updated conversation
  updatedConversation.push(aiResponse);

  // * store the new conversation on the server
  // * remove the first system message
  const conversationToStore: string[] = [...updatedConversation.slice(1)];
  // update the conversation to include the original user prompt instead of the formatted one
  // remove the last two messages, where the last message is the new ai response
  // the the second to last message is the formatted user prompt
  // conversationToStore.pop();
  // conversationToStore.pop();
  // add the original user prompt to the end of the conversation
  // conversationToStore.push(userPrompt);
  // add the ai response to the end of the conversation
  // conversationToStore.push(aiResponse.replaceAll("Jarvis: ", ""));
  // updated the user's conversation on the server
  console.log({ userId, conversationToStore, context });
  await kv.set<string[]>(`conversationOf${userId}`, conversationToStore);
  // await kv.set<string[]>(`conversationOf${userId}`, []);

  revalidatePath("/ai/ask");
};

const askAiConfig: GoogleVertexAIChatInput = {
  examples: [
    {
      input: new HumanChatMessage("Hi"),
      output: new AIChatMessage(
        "Hey John! How are you doing today? the information you provides so far says:..."
      ),
    },
    // {
    //   input: new HumanChatMessage(
    //     "Context: 'My name is {user's name} - I'm {user's age} - I need to wake up tomorrow at {time} - Today is {today's date} . Question: 'Hey'"
    //   ),
    //   output: new AIChatMessage(
    //     "Hey {user's name}! How can I help? You can ask me: * When do you I need to wake up tomorrow?\n * What is the date?\n * How old am I?"
    //   ),
    // },
    // {
    //   input: new HumanChatMessage(
    //     "Context: 'Your name is {Ai's name}, your replies should reflect a the corropposonding character's style of talking. Question: 'Hey, what's your name?'"
    //   ),
    //   output: new AIChatMessage(
    //     "Hey {user's name}! I'm {Ai's name} How can I help? You can ask me: * When do you I need to wake up tomorrow?\n * What is the date?\n * How old am I?"
    //   ),
    // },
    // {
    //   input: new HumanChatMessage(
    //     "Context: 'Your name is {Ai's Name}, your replies should reflect a the corropposonding character's style of talking - My name is {user's name} . Question: 'Hey, what's your name?'"
    //   ),
    //   output: new AIChatMessage(
    //     "Hey sam! My name is {Ai's name}. How can I help? You can ask me: * When do you I need to wake up tomorrow?\n * What is the date?\n * How old am I?"
    //   ),
    // },
    // {
    //   input: new HumanChatMessage(
    //     "Context: I have 1000 EGP - My name is {user's Name} Question: 'Hey, what's your name?'"
    //   ),
    //   output: new AIChatMessage(
    //     "Hey {user's name} My name is {Ai's name}. How can I help? You can ask me: * When do you I need to wake up tomorrow?\n * What is the date?\n * How old am I?"
    //   ),
    // },
    // {
    //   input: new HumanChatMessage(
    //     "Context: I have 1000 EGP - My name is {user's Name} Question: 'Make a budget"
    //   ),
    //   output: new AIChatMessage(
    //     "Sure, I can help you with that. You currently have 1000EGP, you can spend them ."
    //   ),
    // },
  ],
  temperature: 0.2,
  topK: 3,
  maxOutputTokens: 1024,
};
