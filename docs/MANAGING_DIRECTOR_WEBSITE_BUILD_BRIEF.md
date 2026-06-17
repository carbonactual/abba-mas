# Managing Director Website Build Brief

## Build Status

Lovable project initiated.

Project ID:

```txt
9048a3a8-e8d5-4993-87b9-ec535e020db9
```

Workspace:

```txt
Abdullahi's Lovable
```

## Core Direction

Build a refined, classy, futuristic professional website for the Managing Director / Managing Partner. The site is his actual public professional and business home where live curation, communication, scholarly presence, events, activities, quotes, and business updates happen.

The homepage must use the Managing Director portrait as the brief and emotional anchor. The portrait should dominate the first impression in a premium executive layout. The rest of the homepage should include quote/boomerang-style rotating quotes from him, live curation cards, key focus areas, updates, events, activities, newsletter signup, and contact.

There must be a dedicated Managing Partner page with full biography, history, achievements, live links, scholarly pages, activities, and events.

## Design System

- Deep navy, charcoal, ivory, warm gold accents.
- Premium editorial typography: large serif headings, clean modern sans-serif body text.
- Executive luxury feel without looking flashy.
- Immersive soft office background, subtle gradients, glass/dark panels, gold dividers, refined cards.
- Responsive desktop and mobile.
- Smooth transitions and subtle animations, especially quote carousel / boomerang cards.

## Navigation

1. Home
2. Managing Partner
3. Bio
4. Achievements
5. Events
6. Activities
7. Publications
8. Newsletter
9. Contact

## Homepage

Required sections:

- Hero with large portrait.
- Short executive brief, title, mission statement, and CTA buttons.
- Metrics/stat cards: Years of Leadership, Projects & Advisory Engagements, Countries Impacted, Sustainable Value Creation.
- Quotes / boomerang section with rotating quote cards.
- Key Focus Areas.
- Live Curation / Insights.
- Featured Updates.
- Upcoming Events & Activities.
- Newsletter signup block.
- Premium footer.

Suggested hero copy:

```txt
Leadership. Vision. Impact.
Managing Director
Building enduring value through strategy, governance, investment, scholarship, and sustainable impact.
```

CTA buttons:

```txt
Explore My Focus
Read Full Bio
Subscribe
```

## Managing Partner Page

Required sections:

- Hero/banner with portrait and title “Managing Partner”.
- Full biography with multiple paragraphs.
- History / timeline section.
- Achievements section.
- Live Links & Scholarly Profiles.
- Events and activities.
- Quotes & Reflections.
- Newsletter signup.

Timeline categories:

- Early Formation
- Academic Development
- Corporate Leadership
- Advisory & Investment
- Public Thought Leadership
- Current Managing Partner Era

Live link cards:

- Academia.edu profile
- Google Scholar profile
- Publications
- Professional profiles
- Media / Interviews
- Website links
- LinkedIn
- Contact / booking

## Other Pages

### Bio

Longer life/professional story, academic background, leadership philosophy, values, research, business focus, public service, scholarship, media kit.

### Achievements

Timeline and milestone cards across leadership, governance, investment, advisory, academic, community, partnerships, publications.

### Events

Upcoming and past events with title, date, venue, summary, RSVP/status.

### Activities

Live activity feed / curated public diary style covering business activities, meetings, conferences, publications, speaking, advisory, community work.

### Publications

Scholarly and public writing hub with category filters and placeholder cards for papers, articles, interviews, policy notes, and research commentary.

### Newsletter

Signup page and embedded signup blocks across the site. Fields: name, email, organization, interest area.

### Contact

Contact form with name, email, organization, message, interest type, booking/meeting request card, and social/profile links.

## Data Model

Use editable collections or mock data structures for:

- Profile
- Quotes
- Insights / curation posts
- Events
- Activities
- Achievements
- Publications
- Newsletter subscribers
- Contact messages

Suggested fields:

```txt
Profile: name, title, short_bio, full_bio, location, email, phone, profile_links, portrait_url
Quotes: quote, context, date, featured
Insights: title, category, summary, body, image, published_at, status
Events: title, date, location, description, event_type, status, link
Activities: title, date, category, summary, media_url, link
Achievements: title, category, metric, description, year
Publications: title, type, year, link, source, abstract
NewsletterSubscribers: name, email, organization, interest_area, created_at
ContactMessages: name, email, organization, interest_type, message, created_at
```

## Integration Rules

- Prepare for GitHub and Vercel deployment.
- Keep code clean and production-ready.
- No hardcoded secrets.
- Use environment variables for future integrations.
- Add placeholder links for Academia.edu and Google Scholar that can be replaced with live URLs.
- Include clear config sections where live links are updated.

## Portrait Handling

Use the uploaded executive portrait set as visual guide. The final UI should allow:

- one main homepage portrait
- alternate portrait for Managing Partner page
- alternate portrait for Bio page
- optional smaller portrait usage in quotes / activities / media sections

Use premium portrait framing: soft glow, dark office background, subtle gold edge line.

## Quality Bar

The site must feel like a real managing director’s high-end professional website, suitable for investors, partners, scholars, institutions, media, and clients. It must feel alive through quote movement, curated updates, live links, newsletter, and events.
