// components/Chatbot.tsx
import { useState } from "react";
import { User, Bot } from "lucide-react";

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

interface ChatbotProps {
  responsesJson: {
    questions: Question[];
    responses: Response[];
  };
}

const Chatbot: React.FC<ChatbotProps> = ({ responsesJson }) => {
  const { questions, responses } = responsesJson;

  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    [],
  );
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(
    "q1",
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const addMessage = (text: string, isUser: boolean) => {
    setMessages((prev) => [...prev, { text, isUser }]);
  };

  const handleUserSelection = async (nextId: string) => {
    const selectedQuestion = questions.find((q) => q.id === nextId);
    if (!selectedQuestion) return;

    addMessage(selectedQuestion.question, true);

    const responseObj = responses.find((r) => r.id === selectedQuestion.id);

    if (responseObj) {
      addMessage(responseObj.response, false);
    } else {
      // Use fallback API if no matching response is found
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: selectedQuestion.question }),
        });
        const data = await res.json();
        addMessage(data.response, false);
      } catch (error) {
        addMessage("An error occurred while fetching the response.", false);
      }
    }

    setCurrentQuestionId(selectedQuestion.id);
  };

  const getNextOptions = (): Question[] => {
    const current = questions.find((q) => q.id === currentQuestionId);
    if (!current || current.next.length === 0) return [];
    return current.next
      .map((id) => questions.find((q) => q?.id === id))
      .filter((q): q is Question => !!q);
  };

  const handleOpen = () => {
    setIsOpen(true);
    startConversation();
  };

  const startConversation = () => {
    const firstQuestion = questions.find((q) => q.id === "q1");
    const firstResponse = responses.find((r) => r.id === "q1");

    if (firstQuestion && firstResponse) {
      setMessages([
        { text: firstQuestion.question, isUser: false },
        { text: firstResponse.response, isUser: false },
      ]);
      setCurrentQuestionId("q1");
    }
  };

  const resetConversation = () => {
    setMessages([]);
    setCurrentQuestionId("q1");
    startConversation();
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full text-xl shadow-lg hover:bg-blue-700"
      >
        💬
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-800 rounded-xl shadow-lg flex flex-col max-h-[80vh] overflow-hidden">
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center rounded-t-xl">
            <span className="font-bold text-lg">AI Assistant</span>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:text-red-300"
            >
              ✕
            </button>
          </div>

          <div className="p-4 flex-1 overflow-y-auto space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex items-start gap-2 p-2 max-w-[80%] rounded-xl text-sm shadow-md ${
                    msg.isUser
                      ? "bg-green-100 dark:bg-green-900 text-right"
                      : "bg-gray-100 dark:bg-zinc-800"
                  }`}
                >
                  {!msg.isUser && (
                    <Bot className="w-5 h-5 mt-1 text-blue-500" />
                  )}
                  <div>{msg.text}</div>
                  {msg.isUser && (
                    <User className="w-5 h-5 mt-1 text-green-600" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-gray-50 dark:bg-zinc-950 border-t border-gray-300 dark:border-zinc-700 space-y-2">
            <div className="flex flex-wrap gap-2">
              {getNextOptions().length > 0 ? (
                getNextOptions().map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleUserSelection(option.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all text-sm"
                  >
                    {option.question}
                  </button>
                ))
              ) : (
                <div className="flex flex-col gap-3 w-full text-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    No more options. Thank you!
                  </span>
                  <button
                    onClick={resetConversation}
                    className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-all text-sm mx-auto"
                  >
                    🔄 Reset Conversation
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
