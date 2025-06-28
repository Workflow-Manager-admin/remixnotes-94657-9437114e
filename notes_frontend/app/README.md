# Notes Frontend (Remix)

A modern, minimalistic notes web application built with Remix.

## Features

- Create, view, edit, and delete notes
- Organize notes by categories/tags
- Responsive, minimalistic, bright UI (light theme)
- Quick navigation sidebar and floating action button

## Running Locally

```sh
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## File Structure

- `/app/components` – reusable UI and logic
- `/app/context/NotesContext.tsx` – localStorage-based notes state
- `/app/routes` – Remix routes (index, notes, categories, etc.)

## Layout

- Header with logo/branding and nav
- Sidebar for categories/tags/filters
- Main content lists notes or single note view
- Floating action to add new note

## Color Theme

- **Primary**: #2563eb
- **Accent**:  #f59e42
- **Secondary**: #64748b

## Styling

Uses **Tailwind CSS** and the Inter font for a clean, modern feel.
