export type AppMessage = {
  id: string;
  text: string;
  author: "human" | "ai" | "system";
  createdAt: string;
};
