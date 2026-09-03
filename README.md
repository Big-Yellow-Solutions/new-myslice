# new myslice

A recreation of the Syracuse University MySlice student **Profile** screen for mobile: orange app bar, student ID/photo header, Personal / Biographic tabs, and collapsible detail sections (Names, Citizenship). Every field is editable and a profile photo can be uploaded; edits are saved on the device and come back on reload.

Built as a school project. All student data in this repo is fabricated.

## Stack

React 18 + TypeScript + Vite. No UI library — the screen is plain components plus one stylesheet of design tokens, since the design specifies exact colors, type sizes, and spacing.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173/new-myslice/
```

The dev server lives under `/new-myslice/` because that's the path GitHub Pages serves the project from — see Deploying below.

Other scripts: `npm run build` (typecheck + production bundle), `npm run preview`, `npm run typecheck`.

The screen is a fixed-width mobile layout (max 414px) centered on a dark shell background. The shell is preview chrome only, not part of the screen — drop `.shell` when embedding this in a real app.

## Layout

```
src/
  main.tsx                     app entry
  App.tsx                      preview shell
  index.css                    design tokens + all component styles
  data/student.ts              default student record (stands in for the SIS API)
  storage/profile.ts           load / save / clear the record on the device
  hooks/useProfile.ts          the record plus its persistence
  lib/photo.ts                 picked file -> cropped, compressed data URL
  screens/ProfileScreen.tsx    the screen: tab, accordion and edit state
  components/
    AppBar.tsx                 orange bar: back, title, actions, bell, overflow
    OverflowMenu.tsx           the three-dot button and its menu
    IdHeader.tsx               photo frame + ID strip, photo picker in edit mode
    TabBar.tsx                 Personal / Biographic
    Field.tsx                  label/value pair, text input in edit mode
    AccordionSection.tsx       collapsible section with chevron
    NamesTable.tsx             Name/Type table; add/edit/remove rows in edit mode
    icons.tsx                  inline SVG icons
```

## Editing

The three-dot menu in the app bar holds **Edit profile** and **Reset to original profile**. Editing swaps every value for a text input and replaces the bell and three dots with **Cancel** / **Save** — the bar has no room for both, and there is nothing else to reach for mid-edit. Edits go into a draft copy of the record, so Cancel throws the draft away and Save writes it to the device. Reset clears the stored record and restores the defaults in `data/student.ts`.

Editable: student ID, photo, date of birth, the name rows (add, edit, remove), citizenship, and all three biographic fields. Everything is a free-text input — the real field definitions for citizenship and biographic aren't confirmed, so nothing is constrained to a list yet.

### Photo upload

Tapping the ID frame (or **Upload photo**) opens the file picker. `lib/photo.ts` decodes the image, center-crops it to the frame's 3:4 ratio, and re-encodes it at 200x264 JPEG — a phone photo is several megabytes and base64 adds a third on top, which would blow the ~5 MB storage budget on the first upload. The result lands around 30 KB. Non-images and files over 20 MB are rejected with an inline message.

### Persistence

There is no sign-in yet. The record is stored in `localStorage` under `myslice.profile.v1`, so it is per-browser, per-device, and shared by anyone using that browser. Stored JSON is treated as untrusted — every field falls back to the default if it is missing or the wrong type, so a stale record from an older shape still loads. When accounts arrive, replace `loadProfile` / `saveProfile` in `storage/profile.ts` with the SIS calls and key the record by user; nothing else in the app touches storage.

## State

`ProfileScreen` holds all of it:

| State | Default |
| --- | --- |
| `tab` (`personal` \| `biographic`) | `personal` |
| `namesOpen` | `true` |
| `citizenshipOpen` | `false` |
| `draft` (the working copy; non-null means editing) | `null` |
| `error` (save failure banner) | `null` |

The saved record itself lives in `useProfile`. Only one tab body renders at a time; accordion bodies mount and unmount. No animation — the design specifies none. If transitions get added later, keep to 150/250 ms with `cubic-bezier(0.4, 0, 0.2, 1)`, no spring or bounce.

## Deploying

Pushing to `main` builds the site and publishes it to GitHub Pages — `.github/workflows/deploy.yml`. The live URL is:

**https://bigyellowsolutions.github.io/new-myslice/**

Two things have to be true first, and neither can be done from the workflow — the token it runs with can't create a Pages site:

1. The repo is public, or the org is on GitHub Team. Pages doesn't serve private repos on the free plan.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Until then the run fails at `configure-pages` with `Get Pages site failed … Not Found`. The build step ahead of it still passes, so a red run here doesn't mean the app is broken.

`vite.config.ts` sets `base: '/new-myslice/'` because Pages serves a project site from a subpath, not the domain root. Rename the repo and that value has to change with it.

## Design tokens

Every color, type size, and layout dimension lives as a custom property at the top of `src/index.css`. Change values there, not in component files.

Key colors: app bar `#D14400`, section header / active tab accent `#9C3B08`, info badge `#1a6b8a`, label gray `#5c5c5c`. Radius is `0` everywhere except the info badge — square corners are the Syracuse default. No shadows.

The edit affordances (inputs, link buttons, error banner) weren't in the handoff. They add four tokens — `--color-danger`, `--surface-error`, `--border-input`, `--border-input-focus` — and otherwise reuse the type and spacing scale above.

The app bar orange is the darker in-product orange, **not** the marketing Syracuse Orange `#F76900`. Brand colors are defined as `--color-su-*` for reference.

## Known gaps before this could ship

- **Placeholder data.** Citizenship (Country, Citizenship Status) and all three Biographic fields (Gender, Marital Status, Military Status) were invented for the design — the source screen didn't show them. Confirm the real field definitions, then constrain those inputs to the real value lists instead of free text.
- **No sign-in.** Edits are device-local, not tied to a person; a shared browser shows one profile to everyone. This is the demo shortcut, not the model.
- **Edits go nowhere.** Save writes to `localStorage` only — there's no SIS write, no optimistic-update rollback, and no server-side validation of what gets typed in.
- **In the real system most of this is read-only.** Date of birth, citizenship, and the primary name come from the registrar; a student can typically change a preferred name and a photo, and requests the rest. Field-level edit permissions need to come from the API before this ships.
- **No photo review.** The upload replaces the ID photo immediately. A real ID photo goes through approval, and there is no crop or rotate step — the image is center-cropped as-is.
- **Stand-in icons.** `icons.tsx` holds hand-drawn SVGs. Production Syracuse code uses the Font Awesome Pro kit (`@awesome.me/kit-dfae37e203`, Sharp Regular); Lucide is the approved free stand-in. Swap at the same sizes and don't mix the two sets.
- **System font.** Matches the platform font of the original screen. If this becomes a branded SU surface, switch to Sherman Sans.
- **Dead controls.** Back, bell, and overflow take optional handlers but nothing is wired — hook them to navigation, notifications, and a menu sheet. Name rows should navigate to a name-detail view that hasn't been designed.
- **No loading, error, or validation states.** None were designed.
- **Fixed width.** A real build should let the column fill the viewport and keep the same vertical rhythm.
