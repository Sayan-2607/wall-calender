src/
├── app/
│   ├── layout.tsx         
│   ├── page.tsx         
│   └── globals.css         
│
├── components/
│   └── calendar/
│       ├── WallCalendar.tsx   # Orchestrator — composes all panels
│       ├── HeroPanel.tsx      # Photo + chevron overlay + theme switcher
│       ├── CalendarGrid.tsx   # Month nav + day-of-week headers + grid
│       ├── DateCell.tsx       # Individual day cell (memoized)
│       ├── NotesPanel.tsx     # Textarea + color picker + saved notes list
│       ├── SpiralRings.tsx    # Decorative wire binding at top
│       ├── Toast.tsx          # Toast notification stack
│       └── index.ts           # Barrel export
│
├── hooks/
│   ├── useCalendar.ts      # Month navigation + range selection state machine
│   ├── useNotes.ts         # CRUD for notes, localStorage sync
│   ├── useLocalStorage.ts  # Generic localStorage hook (SSR-safe)
│   └── useToast.ts         # Toast queue management
│
├── lib/
│   ├── constants.ts        # THEMES, HOLIDAYS, MONTH_NAMES, NOTE_COLORS
│   └── utils.ts            # Date helpers wrapping date-fns
│
└── types/
    └── index.ts            # TypeScript interfaces: CalendarNote, DateRange, etc.
