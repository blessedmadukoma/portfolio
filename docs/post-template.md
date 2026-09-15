---
title:
description:
date: YYYY-MM-DD
slug:
category:
type:
tags:
  -
image:
draft: true
---

%% Set `category` to one of: research | engineering | building.
   Set `type` to one of: engineering-note | essay | experiment | learning-log | research-note.
   Both are optional in the schema, but leaving them blank makes the site guess the category from a
   fixed tag list, and a post with an unlisted tag silently lands under Engineering.
   Leave `readingTime` out. The sync script computes it.
   Add `series` and `part` only when the post continues an earlier one. %%

%% OPENING. One concrete failure, question, or surprise. No background paragraph, no definitions.
   The reader should be able to picture the situation by the end of the third sentence. %%

%% THE TAKEAWAY. State it here, in a blockquote, before any explanation. This is the one thing a
   reader keeps if they stop at this line. Make it a claim, not a summary of the article. %%

> 

## %% First body section. Teach the thing. %%

%% Optional block, use when you measured something yourself. Delete if not. %%

## Setup

%% Hardware, model and library versions, sample size, seeds, and what one run costs.
   Enough that someone else could repeat it and get the same numbers. %%

## Results

| | | |
|---|---|---|
| | | |

%% Optional block, use when something behaved unexpectedly. Delete if not. %%

## What surprised me

%% Optional block, use when the post is about approaches you tried. Delete if not.
   One section per attempt, each ending in why it failed or what it cost. %%

## Attempt 1:

## Trade-offs

%% Optional block, use when the post surveys other people's work. Delete if not.
   Every row needs a Source column. Every figure needs an attribution line. %%

## What the literature has already built

| Method | Result | Source |
|---|---|---|
| | | |

## Limitations

%% What this does not establish. Conditions under which the result would not hold.
   This section is not optional. It is what makes the takeaway worth trusting. %%

## What changes next

## References

%% IEEE numbered, brackets escaped as \[1\]. Unescaped [1] is eaten by the MDC parser. %%

\[1\] Author, "Title", *Venue*, Year. https://example.com
