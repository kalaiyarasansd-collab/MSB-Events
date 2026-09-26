# Contributing

## Start a task

Agree on a small task in an issue and note which components you will edit. Avoid working on the same large component at the same time.

```sh
git switch main
git pull --ff-only origin main
git switch -c feature/describe-your-task
```

Use `fix/describe-the-fix` for bug fixes. Keep each branch focused on one task.

## Check and submit

```sh
npm ci
npm run lint
npm run build
git status
git add src/path-to-your-file.tsx
git commit -m "Describe the change"
git push -u origin feature/describe-your-task
```

Replace the example filename and branch with your own. Open a pull request into `main`. Explain the change, include screenshots for UI work, and describe checks performed. Ask a teammate to review before merging. Do not commit credentials, customer data, `.env.local`, `node_modules`, or `dist`.

For dependency changes, commit both `package.json` and `package-lock.json`. Use npm as the shared package manager.

## After merging

```sh
git switch main
git pull --ff-only origin main
```

Create a fresh branch for the next task. If there is a merge conflict, coordinate with the other author and preserve both intended changes. Never force-push `main`.

## Manual checks for UI work

Check desktop and mobile layouts, navigation, modal open/close behavior, form validation, and keyboard access. For booking changes, check the pending, confirmed, cancelled, and blocked-date states using development data. Browser storage is local to each browser; it is not a shared backend.
