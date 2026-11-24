# CLAUDE.md

Eira is a static Vue 3 app (Vite, Vuetify, MapLibre) in `frontend/`. There is no backend.

- `make install`, `make dev-frontend`, `make lint`, `make test` from the repo root.
- `npm run build` in `frontend/` does the type check and the build.
- Commits follow commitlint (conventional commits), a husky hook checks them.
- Deploy: a push to `develop` deploys, a `v*.*.*` tag too. Never tag.

## Dev servers and worktrees

Every branch has its own git worktree, tmux session and agent. The session is
`eira/<branch>`, with the branch in lower case and dashes (`feat/Add_X` gives
`eira/feat-add-x`), and its panes are `agent`, `frontend`, `shell`.

- Ports are per worktree and live in `.env.worktree`, which every pane exports.
  Never hardcode a port, read `FRONTEND_PORT` from the environment.
- The dev server is already running in its own pane. Do not start it again.
  Read `.wt-logs/*.log` to see what it is doing, the sandbox cannot reach the
  tmux socket.
- `wtx curl <family> [path] [curl args]` is how you reach it. It fills in this
  worktree's port and never prompts, whatever the method: `wtx curl frontend /`.
  Plain curl runs in the sandbox and cannot reach a local port.
- Work on this branch only. Never push `main` or `develop`. When the work is
  ready, commit it and say so. A human runs `wtx land <branch>` from the main
  checkout, and it refuses uncommitted changes.
- A pre-push hook enforces this. If it refuses a push, that is the design, not a
  bug to work around.

### Directories outside this repo

- `k8s` at `~/code/enack8s-app-config/epfl-enac/eira`, access `pair`.

A `read` directory is yours to read as much as you like, with no prompt, and you
may never write in it. To change one, ask for a paired worktree instead: a human
runs `wtx go <branch> --with <name>=<branch>`, and the change lands through that
repo's own pull request.
