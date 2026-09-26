# MSB Event Management

A team project for exploring event services, packages, past events, date availability, and booking enquiries for MSB Event Management.

## Current status

This is a **frontend prototype** built with React 19, TypeScript, Vite 6, and Tailwind CSS 4. It includes customer pages, enquiry forms, a calendar, WhatsApp handoff, and an admin interface.

Bookings, accounts, and blocked dates currently live in browser storage. They do **not** sync between devices or teammates. Account passwords are stored locally in plain text, and admin checks run in the browser. Use only development data and unique throwaway passwords. Supabase authentication, shared PostgreSQL storage, and server-enforced access rules remain future work.

## Run locally

Install Git and Node.js 22, then run:

```sh
git clone https://github.com/kalaiyarasansd-collab/MSB-Events.git
cd MSB-Events
npm ci
npm run dev
```

Open **http://localhost:3000**. Run commands from the folder containing `package.json`; there is no extra nested project folder. On Windows, if PowerShell blocks `npm.ps1`, use `npm.cmd ci` and `npm.cmd run dev`, or use Command Prompt.

No API key is needed for the main website. Optional demo admin setup is described in [Development notes](docs/DEVELOPMENT.md).

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start local development on port 3000 |
| `npm run lint` | Check TypeScript types (not a style linter) |
| `npm run build` | Build the website into `dist/` |
| `npm run preview` | Preview the production build locally |

## Project files

| Path | Contents |
| --- | --- |
| `src/components/` | Website sections, forms, modals, and admin UI |
| `src/context/BookingContext.tsx` | Booking state and browser persistence |
| `src/data/mockData.ts` | Services, packages, gallery, and initial data |
| `src/utils/` | Analytics and SEO helpers |
| `public/` | Logos, social image, sitemap, and robots file |

## Team collaboration

Read [CONTRIBUTING.md](CONTRIBUTING.md) for the branch and pull request workflow. Use issues to agree on tasks before overlapping edits. Pull requests run type checking and a production build through GitHub Actions.

The repository owner can invite teammates under **Settings → Collaborators → Add people**. Each person must accept their invitation before they can push a branch directly. Public visibility alone does not grant write access.

See [the roadmap](docs/ROADMAP.md) for suggested next tasks. Repository setup does not deploy the website.
