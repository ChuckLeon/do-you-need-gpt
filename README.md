# Do You Need GPT?

Doyouneedgpt.com encourages users to choose human-made images from Unsplash, Pexels, and Pixabay before generating an AI image. AI image generation is available as a fallback for signed-up users.

## Features

- Search human-made images across Unsplash, Pexels, and Pixabay
- Generate an AI image with OpenAI when nothing else fits
- Account signup and login via Supabase, with credits gating AI generation
- Responsive layout for desktop and mobile

## Tech Stack

- Next.js (App Router) and TypeScript
- Tailwind CSS with DaisyUI
- Zustand for state management
- Supabase for auth and database
- OpenAI API for AI image generation

## Getting Started

### Prerequisites

- Node.js and npm

### Installation

```bash
git clone https://github.com/ChuckLeon/do-you-need-gpt.git
cd do-you-need-gpt
npm install
```

Create a `.env.local` file with the following keys:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `OPENAI_API_KEY`
- `UNSPLASH_ACCESS_KEY`
- Pexels API key
- Pixabay API key
- Mailgun API key

Then start the dev server:

```bash
npm run dev
```

The app runs at `http://localhost:3000`.

## Scripts

- `npm run dev` - start the development server
- `npm run build` - build for production
- `npm run start` - run the production build
- `npm run lint` - lint the codebase

## Roadmap

- Payments so signed-in users can buy AI generation credits
- General UI cleanup

## Contributing

Contributions are welcome. Please open an issue or submit a pull request.

## Contact

charlesheon@gmail.com
