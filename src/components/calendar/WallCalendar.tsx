"use client";
import React, { useState, useCallback } from "react";
import type { CalendarNote, CalendarTheme } from "@/types";
import { THEMES } from "@/lib/constants";
import { useCalendar } from "@/hooks/useCalendar";
import { useNotes } from "@/hooks/useNotes";
import { useToast } from "@/hooks/useToast";
import { SpiralRings } from "./SpiralRings";
import { HeroPanel } from "./HeroPanel";
import { CalendarGrid } from "./CalendarGrid";
import { NotesPanel } from "./NotesPanel";
import { ToastContainer } from "./Toast";

export function WallCalendar() {
  const [theme, setTheme] = useState<CalendarTheme>(THEMES[0]);

  const cal = useCalendar();
  const { notes, addNote, deleteNote, noteDateSet } = useNotes();
  const { toasts, show: showToast, dismiss } = useToast();

  // Get notes for the current viewed month
  const monthNotes = notes.filter((n) => {
    const d = new Date(n.startDate);
    return d.getFullYear() === cal.viewYear && d.getMonth() === cal.viewMonth;
  });

  const handleNoteClick = useCallback((note: CalendarNote) => {
    const start = new Date(note.startDate);
    cal.setViewYear(start.getFullYear());
    cal.setViewMonth(start.getMonth());
  }, [cal]);

  return (
    <>
      {/* Outer wrapper — adds perspective for flip effect */}
      <div className="w-full max-w-3xl mx-auto" style={{ perspective: "1200px" }}>

        {/* Spiral rings at top */}
        <SpiralRings count={22} />

        {/* Calendar card */}
        <div
          className="bg-white overflow-hidden"
          style={{
            borderRadius: "0 0 8px 8px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)",
          }}
        >
          {/* ── HERO IMAGE ── full width on mobile, full width on desktop too */}
          <HeroPanel
            theme={theme}
            month={cal.viewMonth}
            year={cal.viewYear}
            onThemeChange={setTheme}
            allThemes={THEMES}
          />

          {/* ── LOWER SECTION: Notes left | Grid right ── */}
          <div className="flex flex-col md:flex-row">

            {/* Notes column */}
            <div
              className="md:w-[200px] lg:w-[220px] flex-shrink-0 p-4 border-b md:border-b-0 md:border-r border-gray-100"
              style={{ minHeight: 280 }}
            >
              <NotesPanel
                rangeStart={cal.range.start}
                rangeEnd={cal.range.end}
                notes={monthNotes}
                theme={theme}
                onSave={addNote}
                onDelete={deleteNote}
                onClearRange={cal.clearRange}
                onNoteClick={handleNoteClick}
                showToast={showToast}
              />
            </div>

            {/* Calendar grid column */}
            <div className="flex-1 p-4 lg:p-5">
              <CalendarGrid
                viewYear={cal.viewYear}
                viewMonth={cal.viewMonth}
                rangeStart={cal.range.start}
                rangeEnd={cal.range.end}
                effectiveEnd={cal.effectiveEnd}
                noteDateSet={noteDateSet}
                theme={theme}
                onDateClick={cal.handleDateClick}
                onDateHover={cal.handleDateHover}
                onPrevMonth={cal.goToPrevMonth}
                onNextMonth={cal.goToNextMonth}
                today={cal.today}
              />
            </div>

          </div>
        </div>
      </div>

      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </>
  );
}
