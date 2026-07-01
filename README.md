# harryf.github.io

My personal spot for publishing one-off HTML pages and experiments, live at
**https://harryf.github.io/**.

## How it works

- **Add a page:** drop any `.html` file anywhere in the repo (root or a
  subfolder) and `git push`. That's it.
- **The homepage rebuilds itself.** On every push a GitHub Action runs
  [`build.ts`](build.ts), which scans for `.html` files and regenerates a
  styled `index.html` listing them newest-first, then deploys the site.
- **Titles** come from each page's `<title>`, falling back to its first `<h1>`,
  then a humanised filename.
- **Dates** come from each file's last git commit.

## Keeping a page private (unlisted)

Anything under the **`private/`** folder is still served — you can share the
direct URL — but it is **never listed on the homepage**.

```
hello.html            → listed on the homepage
demos/thing.html      → listed on the homepage
private/draft.html    → live at /private/draft.html, but NOT listed
```

> "Private" here means *unlisted*, not access-controlled. GitHub Pages is
> public; anyone with the URL can open a `private/` page.

## Local preview

```sh
bun build.ts            # regenerate index.html
python3 -m http.server  # or any static server, then open http://localhost:8000
```

`index.html` is generated (and git-ignored) — don't edit it by hand; edit
`build.ts` instead.
