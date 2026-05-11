---
mode: 'agent'
description: 'Add a lazy-loaded route and optional guard/resolver to the Angular application.'
---

Add a new route to the Angular application.

**Requirements to gather before generating:**
- Route path (e.g. `users/:id`)
- Component or feature to load (existing or new?)
- Should the route be lazy-loaded? (default: yes)
- Does it need a route guard? If so, what condition should it check?
- Does it need a data resolver to pre-fetch data? Describe the data needed.
- Does it need child routes?

**Rules to follow:**
- Use `loadComponent` for lazy-loading a standalone component.
- Use `loadChildren` when loading a set of child routes.
- Use functional guards (`CanMatchFn` / `CanActivateFn`) — not class-based guards.
- Use `ResolveFn` for data resolvers — not class-based resolvers.
- Add the route to the correct `Routes` array (app-level or feature-level).
- Wildcard `**` routes must come last.
- No hard-coded IDs. No `console.log`. No commented-out code.
- After generating, run `ng build` and fix any errors before finishing.
