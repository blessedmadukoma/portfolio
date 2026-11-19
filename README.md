# Portfolio

Personal site and blog at [mblessed.space](https://mblessed.space). Nuxt 4 with
server-side rendering, deployed on Vercel. Blog and research content is authored
in Obsidian and synced at build time.

## Stack

- Nuxt 4 (Vue 3) with Nitro, SSR enabled
- Nuxt Content for Markdown, with Shiki dual-theme highlighting
- Tailwind CSS, with `@nuxtjs/color-mode` for class-based dark mode
- Vercel KV (Upstash Redis) for blog view counts
- Yarn Berry

## Setup

```bash
yarn install
yarn dev
```

`yarn dev` and `yarn build` both run `scripts/sync-blog.mjs` first, which pulls
content from the Obsidian vault. Run `yarn nuxt dev` to skip the sync and use the
content already in `content/blog/`.

| Script | Purpose |
| --- | --- |
| `yarn dev` | Sync content, then start the dev server |
| `yarn sync` | Sync content only |
| `yarn build` | Sync content, then build for production |
| `yarn preview` | Serve the production build locally |

## Environment

Copy `.env.example` to `.env`. All values are optional for local development
except where noted.

| Variable | Purpose |
| --- | --- |
| `GITLAB_TOKEN` | Read access to the Obsidian vault repository. Required for `yarn sync` and for serving blog images. |
| `GITLAB_PROJECT_ID` | Vault project id on GitLab. |
| `KV_REST_API_URL`, `KV_REST_API_TOKEN` | Vercel KV credentials. Required in production. Without them, local runs fall back to a filesystem store under `.data/`. The blog sync also keeps its last good result here. |
| `CANARY_SECRET` | Gates the contact attribution review. |
| `VERCEL_DEPLOY_HOOK` | A CI/CD variable of the vault project on GitLab, not read by the app. The vault pipeline posts to it to trigger a rebuild. See Deployment. |

Production credentials in `.env` are used by local runs too. Anything written
while developing goes to the live store.

## Structure

```
app/
  components/   ui/, navs/, icons/, content/
  data/         experience, projects, research, tools
  composables/  useBlogPosts, usePostViews
  pages/        index, blog/, blog/[slug]
  pkg/enums.ts  tab to component map
server/
  api/          blog images, view counts
  utils/        KV client and per-feature stores
shared/utils/   code shared between app and server
scripts/        Obsidian sync and its tests
docs/           post template and writing guide
```

The homepage is a single route. The Thoughts, Experience, Research, Projects and
Tools sections are client-side tabs registered in `app/pkg/enums.ts`, not
separate pages.

`/blog` lists every published post grouped by year and then month, newest first,
with a count on each group. The Research, Engineering and Building buttons filter
the list through a `?category=` query parameter, and the groups re-form around the
result.

## Obsidian publishing

Write articles and research records, including exploratory pilots, in the
Obsidian vault. Do not create a Vue page or hardcoded research card for a new
article or pilot. The sync reads flagged Markdown files from any vault folder.
To publish a note, set these YAML properties in Obsidian:

```yaml
portfolio: true
draft: false
research: true
```

`portfolio: true` and `draft: false` publish the note on the blog.
`research: true` also lists it under Records on the Research tab.
Notes with `status: draft` or `status: archived` are excluded. Other status text,
such as `completed empirical pilot`, is displayed on the research card. The card
uses the note's `title`, `description`, `tags`, and `type`. Use `experiment` or
`learning-log` to place it in the corresponding group. Other types appear under
Research notes. Set a unique `slug` to keep the public URL stable when you rename
or move the file.

These rules apply equally to `Research/`, `Blogs - Published/` and other vault
folders. Formal publication entries are maintained separately in
`app/data/research.ts`.

Changes take effect after the vault is pushed to GitLab and the portfolio syncs
and rebuilds. Run `yarn sync` to update the local content. A successful sync
removes notes that were deleted or no longer meet the publication rules.

If GitLab cannot be reached, or answers with a 5xx error, the sync retries with
exponential backoff: the wait doubles from 1 s up to 32 s, with jitter, for at
most 7 retries (about 48 to 95 s in total). If it still fails, it keeps the
previous local content. A fresh build has no local content,
so it restores the posts and the image list from the last good sync, which the
sync saves in the KV store (key `blog-sync:snapshot`). A build stops only when
there is no saved sync either, so the site never goes out with an empty blog.

`content/blog/` is generated and gitignored. Edits there are overwritten by the
next sync.

## Writing

New posts start from `docs/post-template.md`. `docs/writing-guide.md` describes the
structure it follows: a concrete opening, the takeaway stated up front as a claim,
the body, limitations, what changes next, and references. Optional blocks cover
posts that report their own measurements, approaches that were tried, or a survey
of other people's work.

Copy the template into the vault to write. `docs/` sits outside the `blog/**`
content collection, so the sync never touches it.

Set `category` on every post, one of `research`, `engineering` or `building`. It
drives the filters on `/blog`. Without it the site infers the category from a fixed
tag list, so a post with an unlisted tag is filed under Engineering. Leave
`readingTime` unset and the sync computes it.

## View counts

Counts are the sum of a baseline in the note's frontmatter and a live counter in
KV. Increments are deduplicated per visitor for 24 hours using an httpOnly
cookie, and are skipped for known bot user agents and cross-site requests.

## Contact attribution

Inbound outreach carries a reference code, so messages drafted by automated tools
can be distinguished from ones a person wrote and a sender's claimed identity can
be checked before replying. Entry point is `shared/utils/canary.ts`.
`CANARY_SECRET` gates the review.

## Tests

```bash
node --test scripts/sync-blog.test.mjs
```

## Deployment

Vercel builds from `main`. Publishing a note does not need a commit here: the
vault's GitLab pipeline (`.gitlab-ci.yml` in the vault, job `trigger-vercel`)
runs on each push to its `main`. If a changed note has, or had, a `portfolio:`
key, the job posts to the Vercel deploy hook "Obsidian sync", and Vercel
rebuilds `main`. The hook URL is the vault's masked CI/CD variable
`VERCEL_DEPLOY_HOOK`.
