import Chatbot from "@/components/Chatbot";
import { Question, Response } from "../types";
import responsesData from "@/data/responses.json";

const responsesJson = {
  questions: responsesData.questions.map((q) => ({
    ...q,
    type: q.type as "question" | "response",
  })),
  responses: responsesData.responses,
};

export default function HomePage() {
  return (
    <div>
      <Chatbot responsesJson={responsesJson} />
    </div>
  );
}
