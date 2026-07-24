# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Doyouneedgpt.com nudges users toward human-made stock photos (Unsplash, Pexels, Pixabay) before letting them fall back to AI image generation (OpenAI DALL-E 3). AI generation is gated behind Supabase auth and a per-user credit balance.

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build
npm run start    # run production build
npm run lint     # next lint (eslint-config-next/core-web-vitals)
```

There is no test suite configured in this repo.

Local dev requires a `.env.local` with keys for: Supabase (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`), OpenAI (`OPENAI_API_KEY`), Unsplash (`UNSPLASH_ACCESS_KEY`), Pexels, Pixabay, and Mailgun.

## Architecture

**Stack:** Next.js 14 (App Router), TypeScript, Zustand + Immer for state, Supabase (auth + Postgres), Tailwind + DaisyUI (theme: `nord`), next-intl for i18n, react-toastify for notifications.

**Search flow (stock images):**
- `Searchbar` → `hooks/useSearch.tsx` (`fetchNewSearch`/`loadMore`) → `GET /api/images` (`app/api/images/route.ts`)
- The route fans out in parallel to `controllers/{unsplash,pexels,pixabay}.ts`, each an axios call to the respective public API, and normalizes each provider's response into a common `IImage` shape (`interfaces/image.ts`) before returning `{ unsplash, pexels, pixabay }`.
- Results are merged client-side into `store/searchStore.ts` (`images`, plus a `searches` history list keyed by UUID). If the user is signed in, the search and its results are also persisted to the Supabase `searches` table.

**AI image flow (gated):**
- `fetchAiImage` in `useSearch` calls `GET /api/images/ai` (`app/api/images/ai/route.ts`) with `Authorization: Bearer <user.id>`.
- The route looks up the user in Supabase `users` by that id (this is the only "auth" check on this endpoint — the bearer token is just the user's row id, not a verified session token) before calling `controllers/openAi.ts` (`dall-e-3`, `n: 1`).
- On success, `hooks/useUsers.tsx#updateAiCredits` decrements `credits` for the user in Supabase and syncs `store/userStore.ts`. UI only shows the "generate" button when `user.credits > 0`.

**Auth & session:**
- `middlewares/middleware.ts` runs `utilities/supabase/middleware.ts#updateSession` on (almost) every request; it refreshes the Supabase session and redirects unauthenticated users to `/login` unless the path starts with `/login` or `/auth`.
- Three separate Supabase client constructors exist and are not interchangeable: `utilities/supabase/clients.ts` (browser client, used in hooks/components), `utilities/supabase/server.ts` (server component/action client using `next/headers` cookies), `utilities/supabase/middleware.ts` (edge middleware client that mutates the request/response cookie jars in place — don't add logic between `createServerClient` and `supabase.auth.getUser()` there, per the inline warning).
- `app/login/actions.ts` has `login`/`signup` server actions; `app/api/auth/confirm/route.ts` handles the email confirmation callback.
- `hooks/useAuth.tsx#getUser` fetches the Supabase auth user then joins against the `users` table to get `credits`, populating `userStore`. This is called from `app/page.tsx` on mount, not from middleware, so client-side user/credit state lags a beat behind the auth redirect.

**State:** Two Zustand stores, both non-persisted (reset on reload): `searchStore` (search history + current image results/pagination) and `userStore` (current user + credits, uses Immer's `produce` for the credits update).

**i18n:** `next-intl` with a single locale (`en`, hardcoded in `i18n.ts`) sourced from `translations/en.json`. All user-facing strings should go through `useTranslations()` / the `t()` helper rather than being hardcoded, even though only one locale exists today.

**Components:** organized by feature folder under `components/` (`search/`, `sidebar/`, `image/`, `loginActions/`, `loginBtn/`, `skeleton/`, `icons/`). Sidebar is composed of several small subcomponents (`SidebarHeader`, `SidebarSearch`, `SidebarFooter`, `SidebarNoResults`) plus a co-located `sidebar.scss` for styles not expressible in Tailwind/DaisyUI.

**Path alias:** `@/*` maps to the repo root (see `tsconfig.json`).
