---
mode: 'agent'
description: 'Scaffold a new Angular injectable service following project conventions.'
---

Generate a new Angular service using the Angular CLI.

**Requirements to gather before generating:**
- Service name (kebab-case, e.g. `user-data`)
- Responsibility — what data or logic will this service manage?
- Should it make HTTP calls? If yes, describe the endpoints.
- Should it expose reactive state via signals? Yes / No

**Rules to follow:**
- Use `ng generate service <name>` via the CLI.
- Register with `providedIn: 'root'` unless a narrower scope is explicitly required.
- Use `inject()` for any dependencies — not constructor injection.
- Expose state using `signal()` and `computed()` — not `BehaviorSubject` in new services.
- Use `resource()` for async/HTTP data fetching in Angular v19+ projects.
- Order of methods: public, protected, private.
- Private properties start with `_`.
- No `console.log`. No unused imports. No commented-out code.
- After generating, run `ng build` and fix any errors before finishing.
