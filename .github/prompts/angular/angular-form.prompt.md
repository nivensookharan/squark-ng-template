---
mode: 'agent'
description: 'Create an Angular form in the correct style for the project (Signal Forms, Reactive, or Template-driven).'
---

Create an Angular form for the target component.

**Requirements to gather before generating:**
- Angular version of the project (check `package.json`)
- Form purpose (e.g. login, registration, edit-user)
- List of fields, their types, and validation rules
- Where does the form submit to? (service method / HTTP endpoint)

**Form strategy decision:**
- Angular v21+, new form → use **Signal Forms** (`FormField`, `FormGroup` from `@angular/forms` signals API).
- Older project or existing form → match the current form strategy in the codebase (reactive or template-driven).

**Rules to follow (all strategies):**
- Always strip leading/trailing whitespace from text inputs before saving or submitting.
- Show field-level validation error messages using `@if` control flow.
- No hard-coded IDs on inputs — bind `[id]` dynamically or use a generated value.
- Use single quotes in TypeScript; double quotes in HTML attributes.
- No `console.log`. No commented-out code. No unused imports.
- After generating, run `ng build` and fix any errors before finishing.
