"use client";
import { useCallback, useMemo } from "react";
import type { CalendarNote, NoteColor } from "@/types";
import { useLocalStorage } from "./useLocalStorage";
import { generateId, formatRangeLabel } from "@/lib/utils";

export function useNotes() {
  const [notes, setNotes, isLoaded] = useLocalStorage<CalendarNote[]>("wall-calendar-notes-v2", []);

  const addNote = useCallback((
    text: string,
    start: Date | null,
    end: Date | null,
    color: NoteColor,
  ) => {
    if (!text.trim() || !start) return false;
    const note: CalendarNote = {
      id: generateId(),
      text: text.trim(),
      rangeLabel: formatRangeLabel(start, end),
      startDate: start.toISOString(),
      endDate: end ? end.toISOString() : null,
      createdAt: new Date().toISOString(),
      color,
    };
    setNotes((prev) => [note, ...prev]);
    return true;
  }, [setNotes]);

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, [setNotes]);

  const updateNote = useCallback((id: string, text: string) => {
    setNotes((prev) => prev.map((n) => n.id === id ? { ...n, text } : n));
  }, [setNotes]);

  // Get notes that overlap with a given month
  const getNotesForMonth = useCallback((year: number, month: number) => {
    return notes.filter((n) => {
      const s = new Date(n.startDate);
      return s.getFullYear() === year && s.getMonth() === month;
    });
  }, [notes]);

  // Get note dates as Set of ISO date strings for fast lookup
  const noteDateSet = useMemo(() => {
    const set = new Set<string>();
    notes.forEach((n) => {
      const d = new Date(n.startDate);
      set.add(`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`);
    });
    return set;
  }, [notes]);

  return { notes, isLoaded, addNote, deleteNote, updateNote, getNotesForMonth, noteDateSet };
}
