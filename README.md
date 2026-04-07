# 📅 Wall Calendar App

A modern, interactive **Wall Calendar Web App** built with **Next.js (App Router), TypeScript, and React**.
Designed to mimic a real wall calendar with notes, themes, and smooth UX.

---

## 🚀 Features

* 📆 **Dynamic Calendar Grid**

  * Month navigation
  * Day selection & range selection
* 📝 **Notes System**

  * Add, edit, delete notes
  * Color-coded notes
  * Persistent storage (localStorage)
* 🎨 **Theme Support**

  * Multiple UI themes
  * Clean and modern design
* 🔔 **Toast Notifications**

  * Feedback for user actions
* 🧠 **Optimized Performance**

  * Memoized components
  * Efficient state management
* 💾 **Local Storage Sync**

  * Data persists across sessions

---

## 📂 Project Structure

```
src/
├── app/
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main entry page
│   └── globals.css        # Global styles
│
├── components/
│   └── calendar/
│       ├── WallCalendar.tsx   # Main orchestrator
│       ├── HeroPanel.tsx      # Header + theme switcher
│       ├── CalendarGrid.tsx   # Calendar layout
│       ├── DateCell.tsx       # Individual date cell
│       ├── NotesPanel.tsx     # Notes UI
│       ├── SpiralRings.tsx    # Decorative top rings
│       ├── Toast.tsx          # Notifications
│       └── index.ts           # Barrel exports
│
├── hooks/
│   ├── useCalendar.ts      # Calendar logic
│   ├── useNotes.ts         # Notes CRUD + storage
│   ├── useLocalStorage.ts  # Reusable storage hook
│   └── useToast.ts         # Toast state manager
│
├── lib/
│   ├── constants.ts        # App constants
│   └── utils.ts            # Date utilities
│
└── types/
    └── index.ts            # TypeScript types
```

