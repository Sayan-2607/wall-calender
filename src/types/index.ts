// ── Calendar Types ──────────────────────────────────────────────────────────

export interface CalendarNote {
  id: string;
  text: string;
  rangeLabel: string;
  startDate: string; // ISO string
  endDate: string | null; // ISO string or null for single day
  createdAt: string;
  color: NoteColor;
}

export type NoteColor = "blue" | "amber" | "rose" | "emerald" | "violet";

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface CalendarTheme {
  id: string;
  name: string;
  accent: string;
  accentLight: string;
  accentDark: string;
  chevronPrimary: string;
  chevronSecondary: string;
  images: string[];
}

export interface HolidayMap {
  [key: string]: string; // "M-D" => "Holiday Name"
}

export type SelectionStep = "idle" | "selecting-start" | "selecting-end";
