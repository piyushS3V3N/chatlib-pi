import Chatbot from "@/components/Chatbot";
import responsesJson from "@/data/responses.json";

export default function HomePage() {
  return (
    <div>
      <Chatbot responsesJson={responsesJson} />
    </div>
  );
}
