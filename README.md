# Kid-Friendly Recipe Generator

A Next.js application that generates fun, kid-friendly recipes based on ingredients you have available.

## Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

3. Add your OpenAI API key to the `.env` file:
```
OPENAI_API_KEY=your_actual_api_key_here
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Features

- Enter ingredients (comma-separated)
- AI-powered recipe generation using OpenAI
- Kid-friendly language and instructions
- Beautiful, responsive UI with light blue theme
- Fun facts included with each recipe

## Deployment

This project is ready to deploy on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Add your `OPENAI_API_KEY` environment variable in Vercel project settings
4. Deploy!

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- TailwindCSS
- OpenAI API
