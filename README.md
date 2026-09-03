# new myslice

A recreation of the Syracuse University MySlice student **Profile** screen for mobile: orange app bar, student ID/photo header, Personal / Biographic tabs, and collapsible detail sections (Names, Citizenship).

Built as a school project. All student data in this repo is fabricated.

## Stack

React 18 + TypeScript + Vite. No UI library — the screen is plain components plus one stylesheet of design tokens, since the design specifies exact colors, type sizes, and spacing.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
```

Other scripts: `npm run build` (typecheck + production bundle), `npm run preview`, `npm run typecheck`.

The screen is a fixed-width mobile layout (max 414px) centered on a dark shell background. The shell is preview chrome only, not part of the screen — drop `.shell` when embedding this in a real app.

## Layout

```
src/
  main.tsx                     app entry
  App.tsx                      preview shell
  index.css                    design tokens + all component styles
  data/student.ts              student record (stands in for the SIS API)
  screens/ProfileScreen.tsx    the screen: tab + accordion state, composition
  components/
    AppBar.tsx                 orange bar: back, title, bell, overflow
    IdHeader.tsx               photo frame + ID strip
    TabBar.tsx                 Personal / Biographic
    Field.tsx                  label/value pair
    AccordionSection.tsx       collapsible section with chevron
    NamesTable.tsx             Name/Type table with pressable rows
    icons.tsx                  inline SVG icons
```

## State

Three pieces of local UI state, all in `ProfileScreen`:

| State | Default |
| --- | --- |
| `tab` (`personal` \| `biographic`) | `personal` |
| `namesOpen` | `true` |
| `citizenshipOpen` | `false` |

Only one tab body renders at a time; accordion bodies mount and unmount. No animation — the design specifies none. If transitions get added later, keep to 150/250 ms with `cubic-bezier(0.4, 0, 0.2, 1)`, no spring or bounce.

## Design tokens

Every color, type size, and layout dimension lives as a custom property at the top of `src/index.css`. Change values there, not in component files.

Key colors: app bar `#D14400`, section header / active tab accent `#9C3B08`, info badge `#1a6b8a`, label gray `#5c5c5c`. Radius is `0` everywhere except the info badge — square corners are the Syracuse default. No shadows.

The app bar orange is the darker in-product orange, **not** the marketing Syracuse Orange `#F76900`. Brand colors are defined as `--color-su-*` for reference.

## Known gaps before this could ship

- **Placeholder data.** Citizenship (Country, Citizenship Status) and all three Biographic fields (Gender, Marital Status, Military Status) were invented for the design — the source screen didn't show them. Confirm the real field definitions.
- **Placeholder photo.** `student.photoUrl` is `null`, so the ID header falls back to a silhouette. Pass a real URL and `IdHeader` renders it with `object-fit: cover`.
- **Stand-in icons.** `icons.tsx` holds hand-drawn SVGs. Production Syracuse code uses the Font Awesome Pro kit (`@awesome.me/kit-dfae37e203`, Sharp Regular); Lucide is the approved free stand-in. Swap at the same sizes and don't mix the two sets.
- **System font.** Matches the platform font of the original screen. If this becomes a branded SU surface, switch to Sherman Sans.
- **Dead controls.** Back, bell, and overflow take optional handlers but nothing is wired — hook them to navigation, notifications, and a menu sheet. Name rows should navigate to a name-detail view that hasn't been designed.
- **No loading, error, or validation states.** None were designed.
- **Fixed width.** A real build should let the column fill the viewport and keep the same vertical rhythm.
