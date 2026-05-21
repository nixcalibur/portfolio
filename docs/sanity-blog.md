# Sanity Blog Setup

The portfolio can load blog posts from Sanity at runtime. If Sanity is not configured, it falls back to `src/data/content.js`.

## Environment Variables

Set these in your local `.env` file and in your deploy provider:

```txt
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2026-05-21
```

Only published public blog content should be queried from the frontend. Do not put write tokens in Vite environment variables.

## Required Sanity Document Type

Create a `post` document type in Sanity Studio with these fields:

```js
defineField({
  name: 'title',
  type: 'string',
  validation: (Rule) => Rule.required(),
})

defineField({
  name: 'slug',
  type: 'slug',
  options: { source: 'title' },
  validation: (Rule) => Rule.required(),
})

defineField({
  name: 'date',
  type: 'date',
  validation: (Rule) => Rule.required(),
})

defineField({
  name: 'summary',
  type: 'text',
})

defineField({
  name: 'tags',
  type: 'array',
  of: [{ type: 'string' }],
})

defineField({
  name: 'coverImage',
  type: 'image',
  options: { hotspot: true },
  fields: [
    { name: 'alt', type: 'string' },
    { name: 'caption', type: 'string' },
  ],
})

defineField({
  name: 'body',
  type: 'array',
  of: [
    { type: 'block' },
    {
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string' },
        { name: 'caption', type: 'string' },
      ],
    },
    {
      name: 'code',
      type: 'object',
      fields: [{ name: 'code', type: 'text' }],
    },
  ],
})
```

## How It Works

- `src/lib/sanity.js` creates the Sanity client when `VITE_SANITY_PROJECT_ID` exists.
- `src/App.jsx` fetches Sanity posts on page load.
- If Sanity is missing or fails, the site keeps using local posts from `src/data/content.js`.
- `src/components/pages/PostPage.jsx` renders Sanity Portable Text for CMS posts and still supports the existing local block format.
