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
declare const Chatbot: React.FC<ChatbotProps>;
export default Chatbot;
