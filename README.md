# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Obsidian publishing

Obsidian controls which research notes appear on the portfolio. The sync reads
Markdown files under `Research/`, including its subfolders. To publish a note,
set these YAML properties in Obsidian:

```yaml
portfolio: true
draft: false
```

Notes with `status: draft` or `status: archived` are excluded. Other status text,
such as `completed empirical pilot`, is displayed on the research card. The card
uses the note's `title`, `description`, `tags`, and `type`. Use `experiment` or
`learning-log` to place it in the corresponding group. Other types appear under
Research notes. Set a unique `slug` to keep the public URL stable when you rename
or move the file.

The sync also imports notes from `Blogs - Published/`, except drafts and archived
notes. Set `portfolio: true` there to include a note in the research cards.
Formal publication entries are maintained separately in `app/data/research.ts`.

Changes take effect after the vault is pushed to GitLab and the portfolio syncs
and rebuilds. Run `yarn sync` to update the local content. A successful sync
removes notes that were deleted or no longer meet the publication rules. If the
sync fails, the previous local content is retained.

Run the sync checks with `node --test scripts/sync-blog.test.mjs`.
