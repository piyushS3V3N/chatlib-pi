# 🧠 PiChat-next – Customizable Button-Based Chatbot for Next.js

**PiChat-next** is a plug-and-play chatbot component built with React and Next.js. It's fully customizable through a simple JSON structure—no need to modify core components! With a flow-based system and button-driven interactions, it provides a user-friendly experience, enhanced with icons and intuitive UX design.

---

## 🚀 Features

- ✅ Fully customizable with a single `responses.json` file
- 🧠 Flow-based, button-driven chat experience (no free-text input)
- 🤖 Human-like responses powered by semantic similarity matching (Jaccard-based)
- 💬 Friendly UI/UX with bot and user icons
- 🔁 Reset button to start new conversations
- 🎨 Easy to integrate, extend, and theme

---

## 📦 Installation

1. Clone or install the package:

```bash
npm install pichat-next
# or
yarn add pichat-next
```

> ⚠️ _Publishing to npm? Replace `pichat-next` with your actual package name._

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

### 2. Structure your `responses.json`

Place your conversation flow in `data/responses.json`:

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

---

## ✏️ Customization

You can customize your bot in several ways without touching core logic:

### 🔘 Custom Buttons

Add custom CTAs (calls-to-action):

```ts
const customButtons = [
  { label: "Start Support", action: () => openSupportModal() },
  { label: "FAQ", action: () => navigateToFaq() },
];
```

### 🎨 Styling

Use Tailwind to override styles or customize using the `className` props in the wrapper.

### 💬 Responses

Update `responses.json` to add new conversation paths.

---

## 🧪 Testing the Flow

To test locally in development mode:

```bash
npm run dev
```

Visit `http://localhost:3000` to interact with the chatbot.

---

## 📚 Advanced

Want to power the bot with smarter NLP or integrate with a backend?

- Modify `/pages/api/chat.ts` for custom NLP logic (currently using Jaccard similarity)
- Hook into a real LLM or vector DB for smart matching
- Add analytics or tracking in the `onResponse()` callback

---

## 📤 Publishing Guide (for maintainers)

- Ensure everything is typed and default props are provided
- Build: `npm run build`
- Publish to npm: `npm publish --access public`

---

## 📄 License

MIT License © [Piyush Parashar]

---
