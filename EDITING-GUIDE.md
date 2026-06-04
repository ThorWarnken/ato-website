# ATO Website Editing Guide

This guide explains how to update the ATO Alpha Omega chapter website. No coding experience needed. All edits are made through GitHub's web interface.

## Getting Started

1. Go to **github.com/ThorWarnken/ato-website**
2. Log in with your GitHub account (you must be a collaborator on the repo)
3. Navigate to the `_data/` folder - this is where all editable content lives
4. Click any file, then click the **pencil icon** (top right) to edit
5. Make your changes, then click **"Commit changes"** (green button)
6. The site rebuilds automatically - changes go live in ~2 minutes

## File Guide

| File | What it controls |
|------|-----------------|
| `_data/stats.yml` | The 5 stats on the homepage (members, money raised, etc.) |
| `_data/philanthropy_stats.yml` | Philanthropy section stats |
| `_data/galleries.yml` | Photos in Brotherhood, Philanthropy, Career, and Social sections |
| `_data/alumni_legends.yml` | Alumni Legends tab (Spurrier, Chiles, etc.) |
| `_data/alumni_prominent.yml` | Prominent Alumni tab |
| `_data/alumni_campus_legacy.yml` | Campus Legacy tab (buildings) |
| `_data/exec_board.yml` | Executive board roster (leadership modal) |
| `_data/bot_roster.yml` | Board of Trustees roster |
| `_data/carousel.yml` | ATO For Life reunion photo slideshow |
| `_data/benefits.yml` | ATO For Life benefit cards |

---

## Common Tasks

### Update member count or money raised

Edit `_data/stats.yml`. Change the `number` value:

```yaml
items:
  - number: "155+"
    label: "Active Members"

  - number: "$127K+"
    label: "Raised This Year"
```

Just change `"155+"` to your new number, etc.

---

### Update the Executive Board

Edit `_data/exec_board.yml`. Each officer looks like this:

```yaml
  - name: "Jude Powell"
    role: "Worthy Master &middot; President"
    photo: "assets/Leadership/jude.jpg"
    photo_position: "center 15%"
    initials: ""
    email: "Jude@clanpowell.com"
    phone: "(321) 295-1857"
    phone_link: "+13212951857"
    instagram: "jude_powell"
    featured: true
```

**To update an officer:** Change the name, email, phone, etc.

**To set the President:** Make sure only the President has `featured: true`. All others should be `featured: false`.

**If no headshot yet:** Leave `photo: ""` and set `initials: "JP"` (first + last initial). When you add a photo later, update the `photo:` path and clear `initials: ""`.

**The `phone_link` field** is the tel: format for clickable phone numbers. Use the format `+1XXXXXXXXXX` (country code + 10 digits, no spaces or dashes).

**The `&middot;`** is a dot separator (·). Use it between titles like `Worthy Master &middot; President`.

---

### Add a Prominent Alumni

Edit `_data/alumni_prominent.yml`. Add a new entry at the bottom of the `items:` list:

```yaml
  - name: "First Last"
    photo: "assets/About Our Alumni/filename.jpg"
    photo_position: "center 20%"
    title: "Their Title or Company"
    bio: "A few sentences about them. Keep it to 2-3 lines."
```

**Important:** The `photo_position` controls how the image is cropped. `center 20%` focuses near the top (good for headshots). Use `center center` if unsure.

---

### Add an Alumni Legend

Edit `_data/alumni_legends.yml`. Legends are organized in rows:

- `row: 0` = Top featured row (currently Spurrier, Chiles, O'Connell)
- `row: 1` = Second row (Collinsworth, Townsend, Grimes)
- `row: 2` = Third row (Youngblood, Chesterfield Smith, Sawyer)

Each row displays 3 legends. Add a new entry:

```yaml
  - name: "First Last"
    photo: "assets/About Our Alumni/filename.jpg"
    photo_position: "center 20%"
    badge: "Class of 1990 &middot; Achievement"
    title: "One-line description of who they are."
    bio: "Longer bio shown on hover/click."
    featured: false
    row: 2
```

Only Steve Spurrier should have `featured: true` (he gets the big hero card).

---

### Swap a Photo in a Gallery

Edit `_data/galleries.yml`. Find the section you want (brotherhood, philanthropy, career, social) and change the `src:` path:

```yaml
brotherhood:
  - src: "assets/Brotherhood/IMG_7564.jpg"
    alt: "Gameday crowd at the ATO house"
```

Change the filename to your new image. The `alt:` text is a description for accessibility.

---

### Update the Board of Trustees

Edit `_data/bot_roster.yml`. Same format as exec board but with `class_year` and `company` fields:

```yaml
  - name: "John B. Marion IV"
    role: "Chairman &middot; Board of Trustees"
    class_year: "'79"
    company: "Attorney &amp; Mediator &middot; Upchurch Watson White &amp; Max"
    photo: "assets/BOT/john-marion.jpg"
    photo_position: ""
    initials: ""
    email: "jmarion@uww-adr.com"
    phone: "(561) 718-9316"
    phone_link: "+15617189316"
    chairman: true
```

Only the chairman should have `chairman: true`.

**Note:** Use `&amp;` instead of `&` in text fields (it's an HTML thing).

---

### Update the Reunion Carousel

Edit `_data/carousel.yml`. Each slide:

```yaml
  - photo: "assets/About Our Alumni/reunion-arizona-2007.jpg"
    alt: "Alumni at the 2007 BCS National Championship"
    year: "2007 &middot; Glendale, Arizona"
    title: "BCS National Championship"
    description: "Early '90s pledge classes reunited at the stadium."
```

---

## Uploading Photos

Photos must be uploaded to the repo before you can reference them.

1. Go to the `assets/` folder in GitHub
2. Navigate to the right subfolder (e.g., `assets/Leadership/` for exec headshots)
3. Click **"Add file"** > **"Upload files"**
4. Drag and drop your image
5. Click **"Commit changes"**
6. Now reference the image in the data file as `assets/Leadership/yourfile.jpg`

**Photo tips:**
- Use JPG or PNG format
- Keep files under 1MB if possible (resize large photos)
- Name files with lowercase and dashes: `john-smith.jpg`

**Subfolder guide:**
| Folder | Used for |
|--------|----------|
| `assets/Leadership/` | Exec board headshots |
| `assets/BOT/` | Board of Trustees headshots |
| `assets/About Our Alumni/` | Alumni photos and reunion photos |
| `assets/Brotherhood/` | Brotherhood section gallery |
| `assets/Philanthropy/` | Philanthropy section gallery |
| `assets/Career/` | Career section photos |
| `assets/Social/` | Social section gallery |
| `assets/Buildings/` | Campus Legacy building photos |

---

## YAML Formatting Rules

YAML is the file format used for data files. It's sensitive to formatting:

- **Indentation matters.** Use exactly 2 spaces (not tabs). Each entry under `items:` is indented 2 spaces, and fields within an entry are indented 4 spaces.
- **Wrap text in quotes.** Always use `"double quotes"` around values.
- **Use `&amp;` for &** in text that appears on the website.
- **Use `&middot;` for ·** (the dot separator).
- **Don't delete the `items:` line** at the top of the file.
- **Copy an existing entry** as a template when adding new ones - this avoids formatting mistakes.

---

## Editing Other Content

The section headings, body text, nav links, hero text, footer, bylaws, and national resources are in the HTML template files under `_includes/`. These can be edited the same way (pencil icon on GitHub) but require more care since they contain HTML. The data files above cover the most commonly updated content.

---

## Need Help?

If something breaks after an edit, go to the **Actions** tab on GitHub to see if the build failed. The error message usually points to a YAML formatting issue (missing quote, bad indentation). You can always click the commit history and revert to a previous version.
