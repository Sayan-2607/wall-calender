import {
  startOfMonth, endOfMonth, eachDayOfInterval,
  getDay, isSameDay, isWithinInterval, format,
  isToday, isBefore, isAfter, startOfDay,
} from "date-fns";

export function getCalendarDays(year: number, month: number) {
  const first = startOfMonth(new Date(year, month));
  const last = endOfMonth(new Date(year, month));
  const days = eachDayOfInterval({ start: first, end: last });
  const leadingBlanks = getDay(first); // 0=Sun
  return { days, leadingBlanks };
}

export function isSameDayUtil(a: Date | null, b: Date | null) {
  if (!a || !b) return false;
  return isSameDay(a, b);
}

export function isInRange(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  const s = isBefore(start, end) ? start : end;
  const e = isBefore(start, end) ? end : start;
  return isWithinInterval(startOfDay(date), { start: startOfDay(s), end: startOfDay(e) });
}

export function isRangeStart(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start) return false;
  if (!end) return isSameDay(date, start);
  return isSameDay(date, isBefore(start, end) ? start : end);
}

export function isRangeEnd(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  return isSameDay(date, isBefore(start, end) ? end : start);
}

export function formatDateLabel(date: Date): string {
  return format(date, "MMM d");
}

export function formatDateFull(date: Date): string {
  return format(date, "MMMM d, yyyy");
}

export function formatRangeLabel(start: Date | null, end: Date | null): string {
  if (!start) return "No date selected";
  if (!end || isSameDay(start, end)) return formatDateFull(start);
  return `${formatDateLabel(start)} → ${formatDateLabel(end)}`;
}

export function isTodayUtil(date: Date): boolean {
  return isToday(date);
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function isWeekend(date: Date): boolean {
  const d = date.getDay();
  return d === 0 || d === 6;
}

export function getHolidayKey(date: Date): string {
  return `${date.getMonth() + 1}-${date.getDate()}`;
}

export function normalizeRange(start: Date, end: Date): { start: Date; end: Date } {
  return isBefore(start, end) ? { start, end } : { start: end, end: start };
}

export function isDateBefore(a: Date, b: Date): boolean {
  return isBefore(startOfDay(a), startOfDay(b));
}

export function isDateAfter(a: Date, b: Date): boolean {
  return isAfter(startOfDay(a), startOfDay(b));
}
