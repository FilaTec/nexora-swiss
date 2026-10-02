# Architecture

## Goals

- multilingual from day one
- mobile-first
- inexpensive AI operation
- secure personal-document handling
- provider-independent AI
- auditable workflows
- easy local development

## High-level design

```text
Browser
   |
Next.js Web
   |
FastAPI
   |
   +-- PostgreSQL
   +-- Secure object storage (later)
   +-- AI Router
          |
          +-- local/open model
          +-- inexpensive API model
          +-- stronger model when required
          |
          +-- controlled agents/tools
```

## Frontend

- Next.js
- React
- TypeScript
- responsive/mobile-first UI
- locale keys instead of hard-coded user-facing strings

Initial locales: `de`, `en`, `ti`.

## Backend

- Python 3.12+
- FastAPI
- Pydantic
- SQLAlchemy/Alembic when persistence is introduced
- PostgreSQL

Initial API areas:

- `/health`
- `/api/v1/profile`
- `/api/v1/documents`
- `/api/v1/career`
- `/api/v1/agents`
- `/api/v1/tax`

## AI router

No feature should depend directly on one model vendor.

Routing criteria include task type, privacy sensitivity, quality requirement, cost, context size and structured-output capability.

Prefer local/cheap models for classification and simple extraction. Escalate to stronger models only when the task benefits materially.

## Agent workflow

```text
request
 -> validate
 -> gather permitted context
 -> select workflow/model/tool
 -> execute
 -> validate result
 -> request confirmation when needed
 -> record audit event
```

Avoid unrestricted autonomous loops.

## Sensitive documents

The platform may process salary, tax, banking, permit, address and employment information.

Required controls include encrypted transport/storage, scoped access, deletion, audit logs, short-lived download access, data minimization and explicit consent for sensitive external AI processing.

## Tax safety

Tax logic is canton- and tax-year-specific. Rules must be backed by verified official information. AI must not invent deductions or filing requirements.
