# 🧠 PiChat-next – Customizable Button-Based Chatbot for Next.js

**PiChat-next** is a plug-and-play chatbot component built with React and Next.js. It's fully customizable through a simple JSON structure—no need to modify core components! With a flow-based system and button-driven interactions, it provides a user-friendly experience, enhanced with icons and intuitive UX design.

---

## 🚀 Features

- ✅ Fully customizable with a single `responses.json` file
- 🧠 Flow-based, button-driven chat experience (no free-text input)
- 🤖 Human-like responses powered by semantic similarity matching (Jaccard-based)
- 💬 Friendly UI/UX with bot and user icons
- 🔁 Reset button to start new conversations
- 🧩 Type-safe structure using TypeScript
- 🎨 Easy to integrate, extend, and theme

---

## 📦 Installation

```bash
npm install pichat-next
# or
yarn add pichat-next
```

---

## 🛠️ Usage

### 1. Add the Component

```tsx
import Chatbot from "pichat-next";
import responsesJson from "../data/responses.json"; // Path to your conversation flow

const customButtons = [
  { label: "Support", action: () => alert("Support clicked!") },
  { label: "More Info", action: () => alert("Learn more!") },
];

export default function HomePage() {
  return (
    <div>
      <Chatbot responsesJson={responsesJson} customButtons={customButtons} />
    </div>
  );
}
```

---

### 2. Define `responses.json` with Strict Typing

> ✅ **New in v1.1+**: Strict typing enforces `type` to be `"question"` or `"response"` only. Be sure to use string literals exactly as specified.

```json
{
  "questions": [
    {
      "id": "q1",
      "question": "How can I help you today?",
      "type": "question",
      "next": ["q2", "q3"]
    },
    {
      "id": "q2",
      "question": "What kind of service are you looking for?",
      "type": "question",
      "next": ["q4"]
    },
    {
      "id": "q3",
      "question": "Are you looking for technical support?",
      "type": "question",
      "next": ["q4"]
    },
    {
      "id": "q4",
      "question": "Thank you for your response. How else can I assist?",
      "type": "response",
      "next": []
    }
  ],
  "responses": [
    {
      "id": "q1",
      "response": "I'm a chatbot ready to help you with anything!"
    },
    {
      "id": "q2",
      "response": "We offer a variety of services including web development, mobile apps, and AI solutions."
    },
    {
      "id": "q3",
      "response": "Our technical support team is available 24/7 to assist you with any issues."
    },
    {
      "id": "q4",
      "response": "Thank you! Feel free to ask anything else."
    }
  ]
}
```

🛑 **Important:** The `type` field must be either `"question"` or `"response"`—not a generic string.

---

## ✏️ Customization

### 🔘 Custom Buttons

```tsx
const customButtons = [
  { label: "Start Support", action: () => openSupportModal() },
  { label: "FAQ", action: () => navigateToFaq() },
];
```

### 🎨 Styling

Use Tailwind CSS to style the bot UI. The `Chatbot` component supports wrapper-level `className` customization.

---

## ⚙️ API Reference

### `<Chatbot />` Props

| Prop             | Type                                               | Description                                  |
| ---------------- | -------------------------------------------------- | -------------------------------------------- |
| `responsesJson`  | `{ questions: Question[]; responses: Response[] }` | Required. Structured JSON conversation flow. |
| `customButtons?` | `{ label: string; action: () => void; }[]`         | Optional. Array of custom action buttons.    |

### Type Definitions

```ts
type QuestionType = "question" | "response";

interface Question {
  id: string;
  question: string;
  type: QuestionType;
  next: string[];
}

interface Response {
  id: string;
  response: string;
}
```

---

## 🧪 Test Locally

```bash
npm run dev
```

Open your browser at `http://localhost:3000` to see the bot in action.

---

## 🔍 Advanced Usage

- Extend NLP in `/pages/api/chat.ts`
- Swap Jaccard with cosine similarity, TF-IDF, or LLM
- Add telemetry with `onResponse` callback (coming soon)

---

## 🧼 Common Errors & Fixes

| Error                                                                | Fix                                                                                      |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `Type 'string' is not assignable to type '"question" \| "response"'` | Make sure `type` values in `responses.json` are **exactly** `"question"` or `"response"` |
| `Type is not assignable to 'Question[]'`                             | Your `questions` array might be missing required fields or using incorrect types         |

---

## 📤 Publishing (for Maintainers)

1. Ensure type safety
2. `npm run build`
3. `npm publish --access public`

---

## 📄 License

MIT License © [Piyush Parashar]

---
