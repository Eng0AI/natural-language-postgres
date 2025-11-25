# Natural Language Postgres

A demo app that lets you ask questions in plain English and get answers from your database using AI-powered natural language to SQL conversion.

## Tech Stack

- Next.js 15
- React 19
- Vercel AI SDK
- OpenAI
- PostgreSQL
- Tailwind CSS
- Recharts
- Framer Motion

---

# Skills

Skills are specialized instruction files that guide code agents through specific workflows. They are located in `.claude/skills/` directory.

## Available Skills

| Skill | Path | Description |
|-------|------|-------------|
| build-and-deploy | `.claude/skills/build-and-deploy/SKILL.md` | Build and deploy this Next.js application with PostgreSQL database. Use when building, deploying, setting up database, or preparing the project for production. |
| data-source-connect | `.claude/skills/data-source-connect/SKILL.md` | Connect your own data source to replace the demo unicorns data. Use when the user wants to use their own database URL or CSV file instead of the sample data. |

## For Claude Code Users

Skills are automatically available in Claude Code. Simply describe what you want to do (e.g., "deploy this app" or "connect my own database") and Claude Code will use the appropriate skill.

## For Other Code Agents

If you're using a different code agent (Cursor, Windsurf, Cline, etc.), you can still benefit from skills:

1. **Read the skill file directly** - Open the SKILL.md file at the path listed above
2. **Follow the instructions** - The skill file contains step-by-step workflow instructions
3. **Use as context** - Copy the skill content into your agent's context when performing that task

Example: To deploy this app, read `.claude/skills/build-and-deploy/SKILL.md` and follow the workflow steps.
