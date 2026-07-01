# CLAUDE.md — harryf.github.io

Guidance for anyone (human or Claude) working in this repo.

## What this is

My personal GitHub Pages **user site**, live at **https://harryf.github.io/**.
It's a home for one-off HTML pages and experiments. The homepage is an
auto-generated index of every page in the repo, newest first.

Because the repo is named `harryf.github.io`, GitHub serves it at the root
domain (not under a `/repo/` path). It **must stay public** for free Pages
hosting, and the default branch is `main`.

## How it works

1. **You add HTML files.** Drop any `.html` file anywhere in the repo — root or
   a subfolder.
2. **`build.ts` regenerates the homepage.** It scans the repo for `.html`
   files, extracts a title and last-modified date for each, and writes a styled
   `index.html` listing them newest-first.
   - **Title** = the page's `<title>`, falling back to its first `<h1>`, then a
     humanised version of the filename.
   - **Date** = the file's last git commit date (CI checks out full history so
     this is accurate).
   - A page whose file is named `index.html` inside a subfolder is linked as the
     folder (e.g. `demos/thing/index.html` → `/demos/thing/`).
3. **GitHub Actions deploys.** `.github/workflows/deploy.yml` runs on every push
   to `main`: it runs `bun build.ts`, uploads the whole tree as a Pages
   artifact, and deploys. Takes ~40s end to end.
4. **`.nojekyll`** tells Pages to serve the files as-is (no Jekyll processing).

## The `private/` convention (unlisted pages)

Anything under the top-level **`private/`** folder is still served — you can
share its direct URL — but it is **never listed on the homepage**.

```
hello.html            → listed on the homepage
demos/thing.html      → listed on the homepage
private/draft.html    → live at /private/draft.html, but NOT listed
```

> ⚠️ "Private" here means **unlisted, not access-controlled.** GitHub Pages is
> public, so anyone who has (or guesses) the URL can open a `private/` page.
> Never put secrets or anything sensitive here.

`build.ts` excludes any directory named `private` (and `node_modules`, and
dotfiles/dot-dirs like `.git` / `.github`) from the index.

## How to update / publish pages

### Easiest: the `publish` helper

`bin/publish` copies a single HTML file in from anywhere on disk, asks whether
it's public or private, then commits and pushes for you:

```sh
publish ~/Desktop/chart.html            # asks public/private, then deploys
publish ./demo.html cool-demo --public  # rename + skip the prompt
publish notes.html --private -y         # unlisted, no confirmations
publish anything.html --dry-run         # show the plan, change nothing
```

Symlink it onto your PATH once so it works everywhere:

```sh
ln -s /Users/harry/Code/personal/harryf.github.io/bin/publish ~/bin/publish
```

### Manual

```sh
# add or edit a page, then:
git add . && git commit -m "add my-page.html" && git push
# Actions rebuilds the index and deploys.
```

### Changing the homepage look

Edit **`build.ts`** — it contains the index template and CSS. Do **not** edit
`index.html` by hand: it's generated (and git-ignored), so any manual change is
overwritten on the next deploy.

## Local preview

```sh
bun build.ts             # regenerate index.html locally
python3 -m http.server   # or any static server → http://localhost:8000
```

## Conventions & gotchas

- **`index.html` is generated and git-ignored.** Source of truth is `build.ts`.
- **`private/` = unlisted, not secure.** See the warning above.
- **First-ever deploy** of the site (already done) required Pages to be set to
  "GitHub Actions" build type: `gh api --method POST repos/harryf/harryf.github.io/pages -f build_type=workflow`.
- **CI never commits back.** The index is built inside the Actions run and only
  exists in the deployed artifact, so `main` won't drift on its own — a plain
  `git push` from any machine is safe.
- **`bun`, not `npm`.** The build is a single dependency-free `bun` script; keep
  it that way if you can.
