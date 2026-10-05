#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# deploy.sh — publish this static site to GitHub Pages in one command.
#
# Usage:
#   ./deploy.sh                 # creates/uses repo "personal-web", public
#   ./deploy.sh my-repo-name    # custom repo name
#
# Requirements: git + the GitHub CLI (gh), authenticated once with `gh auth login`.
# Get gh:  brew install gh   |   https://cli.github.com
# ---------------------------------------------------------------------------
set -euo pipefail

REPO_NAME="${1:-personal-web}"
BRANCH="main"
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$HERE"

say() { printf '\033[1;36m▸ %s\033[0m\n' "$*"; }
die() { printf '\033[1;31m✗ %s\033[0m\n' "$*" >&2; exit 1; }

command -v git >/dev/null || die "git is not installed."
command -v gh  >/dev/null || die "GitHub CLI (gh) is not installed. See https://cli.github.com"
gh auth status >/dev/null 2>&1 || die "Not logged in. Run: gh auth login"

ACCOUNT="$(gh api user --jq .login)"

# --- 1. make sure this folder is a git repo with a commit -------------------
if [ ! -d .git ]; then
  say "Initialising git repository"
  git init -b "$BRANCH" >/dev/null
fi

if ! git rev-parse --verify HEAD >/dev/null 2>&1; then
  say "Creating the first commit"
  git add -A
  git -c user.name="${GIT_AUTHOR_NAME:-$ACCOUNT}" \
      -c user.email="${GIT_AUTHOR_EMAIL:-$ACCOUNT@users.noreply.github.com}" \
      commit -m "Personal website: Asa (Weitong Li)" >/dev/null
fi

# --- 2. create the GitHub repo if needed, then push -------------------------
if git remote get-url origin >/dev/null 2>&1; then
  say "Pushing to existing origin"
  git push -u origin "$BRANCH"
else
  say "Creating github.com/$ACCOUNT/$REPO_NAME (public) and pushing"
  gh repo create "$REPO_NAME" --public --source=. --remote=origin --push
fi

# --- 3. switch on GitHub Pages (branch deploy, root folder) -----------------
say "Enabling GitHub Pages on $BRANCH / (root)"
if gh api -X POST "repos/$ACCOUNT/$REPO_NAME/pages" \
     -f "source[branch]=$BRANCH" -f "source[path]=/" >/dev/null 2>&1 \
   || gh api -X PUT "repos/$ACCOUNT/$REPO_NAME/pages" \
     -f "source[branch]=$BRANCH" -f "source[path]=/" >/dev/null 2>&1; then
  say "Pages enabled."
else
  printf '\033[1;33m! Could not enable Pages automatically.\033[0m\n'
  printf '  Do it manually: Settings → Pages → Source: Deploy from a branch → %s / (root)\n' "$BRANCH"
fi

cat <<EOF

\033[1;32m✓ Done.\033[0m
  Repo  : https://github.com/$ACCOUNT/$REPO_NAME
  Site  : https://$ACCOUNT.github.io/$REPO_NAME/    (live in ~1 minute)

Next (optional) — custom domain:
  1. echo "your-domain.com" > CNAME
  2. git add CNAME && git commit -m "Custom domain" && git push
  3. Settings → Pages → Custom domain → enter your domain, tick "Enforce HTTPS"
EOF
