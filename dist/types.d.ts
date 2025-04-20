export type Question = {
    id: string;
    question: string;
    type: "question" | "response";
    next: string[];
};
export type Response = {
    id: string;
    response: string;
};
export type ResponsesData = {
    questions: Question[];
    responses: Response[];
};
