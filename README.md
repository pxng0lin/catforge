# catforge

Describe your dream cat, and let Echo route the request to your configured image model (GPT-Image) to create a meme-ready feline still.

## Stack

- **Frontend:** Next.js 15, App Router, Tailwind, shadcn/ui
- **AI:** Echo router (OpenAI image endpoints, configurable per app)
- **Auth:** Echo OAuth with automatic token management
- **Optional:** Foundry smart contract (`smart_contract/CatForgePayments.sol`) for on-chain payment receipts

## Environment

Create `.env.local` (or copy `.env.example`) with:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_ECHO_APP_ID=<your_echo_app_id>        # required client-side
ECHO_APP_ID=<your_echo_app_id>                    # required server-side
ECHO_ROUTER_URL=https://echo.router.merit.systems # optional override
CATFORGE_IMAGE_MODEL=gpt-image-1                  # optional override
```

> Use the Echo dashboard to manage which providers/models back your image calls. Environment overrides let you pin a specific model when needed.

## Scripts

```bash
pnpm dev     # start the local dev server
pnpm build   # production build
pnpm start   # serve the production build
pnpm lint    # run lint checks
```

## Flow

1. User describes the cat (`city`, `colour`, `scenery`, `theme`).
2. Client calls the `generateCat` server action.
3. `generateCat` builds the prompt and calls Echo’s router.
4. Echo router calls the configured image model (defaults to `gpt-image-1`).
5. The UI displays the image and lets the user copy, open, or download the result.

Webhook scaffolding lives in `src/app/api/webhook/route.ts` — connect it to Echo usage events when you wire the live flow.

## Project layout

- `src/app` – App Router routes, server actions, providers, and styling.
- `src/components` – UI building blocks (forms, previewer, Echo auth widgets, shadcn/ui primitives).
- `src/lib` – Echo router utilities, prompt helpers, and shared types.
- `public` – Runtime assets served by Next (`/background.png`, `/header.png`, `/logo/*`, favicon).
- `assets/marketing` – High-res concept art and brand references that shouldn't ship to the client bundle.
- `assets/samples/forged` – Example generations for pitch decks or store listings.
- `smart_contract` – Optional Foundry project for `CatForgePayments.sol`.

## Smart Contract (optional)

`smart_contract/CatForgePayments.sol` emits a `PaymentLogged` event for each generation. Deploy it on Base if you want an immutable ledger and wire it to your webhook relay.

## Deploying to Vercel

1. Push this repository to GitHub (or any Git provider Vercel supports).
2. In Vercel create a new project pointing to CatForge.
3. Import the environment variables from `.env.local` (at minimum `NEXT_PUBLIC_ECHO_APP_ID` + `ECHO_APP_ID`; optionally `ECHO_ROUTER_URL`, `CATFORGE_IMAGE_MODEL`).
4. The included `vercel.json` ensures pnpm is used (`pnpm install --frozen-lockfile`) and runs `pnpm build`. The project also has the Echo TypeScript SDK as a direct dependency so the bundler never misses it.
5. Locally run `pnpm lint && pnpm build` before pushing to catch regressions early.
6. Trigger a deployment (dashboard or `vercel --prod`). Once live, authenticate with Echo and run a generation to verify billing + router configuration.

### GitHub → Vercel workflow

1. Ensure `.env.local` contains your real Echo IDs but is **not** committed (it’s ignored by `.gitignore`). Keep `.env.example` in sync with any new variables so teammates and Vercel have the same list.
2. Initialise and push:
   ```bash
   git init
   git add .
   git commit -m "chore: bootstrap catforge"
   git remote add origin git@github.com:<you>/catforge.git
   git push -u origin main
   ```
3. In the Vercel dashboard, “Import Project from GitHub” and select the new repo.
4. During the import step, add the same environment variables from your local `.env.local`. It’s fine if `NEXT_PUBLIC_ECHO_APP_ID` is publicly readable—Echo uses it to route auth, but the real secrets stay on Vercel.
5. Every push to `main` (or whichever branch you select) will automatically create a preview/prod deployment, so you can review changes before shipping.

## Next Steps

- Persist generation history (e.g., Supabase, Farcaster frames, or on-chain storage).
- Add NFT minting or sharing flows once the core generation path is solid.
