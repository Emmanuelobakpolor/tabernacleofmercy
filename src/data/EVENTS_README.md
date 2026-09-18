# Updating "Upcoming Church Programmes"

Events shown on the Home page and the Events page come from
[events.json](events.json) — a plain data file, not code. You can edit it
without knowing JavaScript.

## To add a new event

Copy one of the existing `{ ... }` blocks, paste it wherever you'd like it
to appear in the list (events display in the order they're listed — put
the soonest one first), and change the values:

```json
{
  "slug": "christmas-carol-night",
  "title": "Christmas Carol Night",
  "date": "2026-12-20",
  "dateLabel": "Sunday, 20 December 2026",
  "day": "20",
  "month": "DEC",
  "time": "6:00 PM",
  "location": "Main Auditorium",
  "category": "Special Service",
  "description": "An evening of carols and the Christmas story, for the whole family.",
  "image": "https://images.unsplash.com/photo-XXXXXXX?auto=format&fit=crop&w=1200&q=80"
}
```

Notes on each field:

- `slug` — a short, unique, URL-safe id (lowercase, hyphens, no spaces). Used to link/jump to the event.
- `date` — the ISO date `YYYY-MM-DD`, used internally.
- `dateLabel` — the human-readable date shown on the page.
- `day` / `month` — the big date shown on the event card (e.g. `"20"` / `"DEC"`).
- `time`, `location`, `category` — shown as-is under the title.
- `description` — a sentence or two.
- `image` — a photo URL. Unsplash links work, or use your own hosted photo.

Don't forget the **comma** between events (every entry except the last one
needs a `,` after its closing `}`).

## To remove an event

Delete its whole `{ ... }` block (and the comma before or after it, so you
don't end up with `,,` or a trailing comma before `]`).

## To reorder events

Cut and paste a `{ ... }` block to a different position in the list.

## Important

JSON is strict about syntax — every property name and text value needs
double quotes (`"like this"`), and there's no trailing comma after the last
entry. If the site breaks after an edit, the most common cause is a missing
comma or quote. A free tool like [jsonlint.com](https://jsonlint.com) can
check your file before you save it.

## Publishing the change

This is still a static site with no backend, so after editing
`events.json` you need to rebuild and redeploy (`npm run build`, then push
the `dist/` output the same way you deployed the site originally) for the
change to go live.
