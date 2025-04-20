// pages/api/chat.ts

import type { NextApiRequest, NextApiResponse } from "next";
import responsesData from "../../data/responses.json";
import natural from "natural";
import stopword from "stopword";

// Define the structure of a question and a response
interface Question {
  id: string;
  question: string;
  type: "question" | "response";
  next: string[];
}

interface Response {
  id: string;
  response: string;
}

interface ResponsesData {
  questions: Question[];
  responses: Response[];
}

type Data = {
  response: string;
};

// Initialize the tokenizer and tfidf
const tokenizer = new natural.WordTokenizer();
const tfidf = new natural.TfIdf();

// Type responsesData as ResponsesData
const responses: ResponsesData = {
  questions: responsesData.questions.map((q) => ({
    ...q,
    type: q.type as "question" | "response",
  })),
  responses: responsesData.responses,
};

// Preprocess response dataset
responses.responses.forEach((entry) => tfidf.addDocument(entry.response));

const preprocess = (text: string): string[] => {
  return stopword.removeStopwords(tokenizer.tokenize(text.toLowerCase()));
};

const getBestResponse = (message: string): string => {
  const processedMessage = preprocess(message).join(" ");

  let bestMatchIndex = -1;
  let bestScore = 0;

  tfidf.tfidfs(processedMessage, (i, measure) => {
    if (measure > bestScore) {
      bestScore = measure;
      bestMatchIndex = i;
    }
  });

  if (bestMatchIndex !== -1 && bestScore > 0.1) {
    return responses.responses[bestMatchIndex].response;
  }

  return "Sorry, I didn't understand that. Could you please rephrase?";
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ response: "Method not allowed" });
  }

  const { message } = req.body;
  if (typeof message !== "string") {
    return res.status(400).json({ response: "Invalid message format" });
  }

  const bestResponse = getBestResponse(message);
  return res.status(200).json({ response: bestResponse });
}
