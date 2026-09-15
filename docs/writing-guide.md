# Writing guide

How posts on this site are structured. Use it with `post-template.md`.

The aim is a post that teaches a concept and also carries a result. A tutorial alone tells a reader
how to do something. A result alone tells them what you found. The structure below carries both,
without needing a different shape for experiments, build notes, and surveys.

## The spine

Six parts, in this order. Everything else is optional.

1. **Opening.** A concrete failure, question, or surprise.
2. **The takeaway.** One claim, in a blockquote, before any explanation.
3. **Body.** The teaching.
4. **Limitations.** What this does not establish.
5. **What changes next.** One paragraph.
6. **References.**

## Choosing the opening

Start inside the problem. The dependency-management post is the model:

> You push a change that works locally. The tests pass. CI runs and fails. You rerun the pipeline
> without touching the code, and this time it succeeds. Nothing changed, yet the outcome did.

Four sentences, no definitions, and the reader already knows what is at stake. Background, if it is
needed at all, goes after the takeaway, not before it.

## Writing the takeaway

This is the part most posts are missing. The claim usually exists already, in the `description`
frontmatter, but a reader never sees it because it does not appear in the body. Move it into the
post.

A takeaway is a claim, not a description of the article.

- Not a takeaway: "This post looks at whether long-context requests slow down short ones."
- A takeaway: "Long-context requests did not slow down short ones on an A100 80GB at 6,200-token
  inputs. The published interference effect is conditional on memory pressure, and this setup was
  nowhere near the ceiling."

The test: could a reader disagree with it? If not, it is a summary, and it is doing no work.

Put it in a blockquote so it survives skimming.

## Presenting evidence

**Use a table when there is more than one number to compare.** Columns for the condition, the
measurement, and, in a survey, the source. A single number belongs in a sentence.

**Give every result its conditions.** A latency figure without hardware, model size, and input
length is not reproducible, and a reader cannot tell whether it applies to them. This is what the
`Setup` block is for.

**Report the null and negative results first, not last.** Already the instinct in the LLM serving
post: "the null result is the most important output of this experiment. A result that shows no
effect under these conditions is honest and repeatable. It saves someone else from running the same
test." Keep doing that. It is also the part of a post other people cannot easily write.

**Report what broke in the method.** The data-discovery post listed five bugs in its own harness,
several of which pointed at the wrong conclusion. That section is worth more to a reader than the
headline number.

## Headings

Write findings as headings, not labels.

- Weak: `### Experiment 2`
- Strong: `### Tool exposure varied across identical runs`

A reader who only reads the table of contents should come away with the conclusions. Note that the
TOC on a post page is built at depth 3, so only `##` and `###` appear in the sidebar. Anything at
`####` is invisible to navigation.

## Voice

Consistent with recent posts, and worth keeping deliberate:

- First person, no contractions. "I did not", not "I didn't".
- Plain declarative sentences. Short paragraphs, one subject each.
- The concrete case before the framing.
- Bold for key terms and list lead-ins only.
- No emoji.

## Mechanics

- **Frontmatter.** Set `category` and `type` explicitly. They are optional in the schema, but when
  `category` is missing the site infers it from a fixed tag list, so a post with an unlisted tag is
  filed under Engineering without warning. Leave `readingTime` out, the sync script computes it. Use
  `series` and `part` when a post continues an earlier one.
- **References.** IEEE numbered, brackets escaped as `\[1\]`. An unescaped `[1]` is consumed by the
  MDC span parser and disappears.
- **Callouts** are plain blockquotes: `> **Note:** ...`. There are no custom callout components.
- **Diagrams.** Prefer a ` ```mermaid ` fence to a screenshot. It renders in both light and dark
  themes and needs no image hosting.
- **Figures** from other people's work need an attribution line: `*Fig 2. (Image source: Wei et al.
  2022)*`.
- **Drafts** stay in the vault. `draft: true` keeps a post out of the site entirely.
