"use client";
import React, { useCallback, useRef } from "react";
import clsx from "clsx";
import type { CalendarTheme } from "@/types";
import { MONTH_NAMES, DAY_ABBR, US_HOLIDAYS } from "@/lib/constants";
import { getCalendarDays, getHolidayKey } from "@/lib/utils";
import { DateCell } from "./DateCell";

interface CalendarGridProps {
  viewYear: number;
  viewMonth: number;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  effectiveEnd: Date | null;
  noteDateSet: Set<string>;
  theme: CalendarTheme;
  onDateClick: (date: Date) => void;
  onDateHover: (date: Date | null) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  today: Date;
}

export function CalendarGrid({
  viewYear, viewMonth, rangeStart, rangeEnd, effectiveEnd,
  noteDateSet, theme, onDateClick, onDateHover, onPrevMonth, onNextMonth, today,
}: CalendarGridProps) {
  const { days, leadingBlanks } = getCalendarDays(viewYear, viewMonth);
  const animKey = `${viewYear}-${viewMonth}`;
  const gridRef = useRef<HTMLDivElement>(null);

  const hasNote = useCallback((date: Date) => {
    return noteDateSet.has(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);
  }, [noteDateSet]);

  return (
    <div className="flex flex-col h-full">
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={onPrevMonth}
          aria-label="Previous month"
          className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-white transition-all duration-150 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1"
          style={{ ["--tw-ring-color" as string]: theme.accent }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = theme.accent;
            (e.currentTarget as HTMLButtonElement).style.borderColor = theme.accent;
            (e.currentTarget as HTMLButtonElement).style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "";
            (e.currentTarget as HTMLButtonElement).style.color = "";
          }}
        >
          ←
        </button>

        <h2 className="font-display text-base font-bold text-gray-900 tracking-tight">
          {MONTH_NAMES[viewMonth]}{" "}
          <span className="font-mono text-xs font-normal text-gray-400 tracking-widest ml-1">
            {viewYear}
          </span>
        </h2>

        <button
          onClick={onNextMonth}
          aria-label="Next month"
          className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-white transition-all duration-150 text-sm focus:outline-none"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = theme.accent;
            (e.currentTarget as HTMLButtonElement).style.borderColor = theme.accent;
            (e.currentTarget as HTMLButtonElement).style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "";
            (e.currentTarget as HTMLButtonElement).style.color = "";
          }}
        >
          →
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_ABBR.map((d, i) => (
          <div
            key={d}
            className={clsx(
              "text-center text-[9px] font-semibold tracking-widest uppercase py-1",
              i === 0 || i === 6 ? "text-blue-400" : "text-gray-400"
            )}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Date grid */}
      <div
        ref={gridRef}
        key={animKey}
        className="grid grid-cols-7 gap-y-0.5 animate-flip-in flex-1"
        role="grid"
        aria-label={`${MONTH_NAMES[viewMonth]} ${viewYear}`}
      >
        {/* Leading blank cells */}
        {Array.from({ length: leadingBlanks }).map((_, i) => (
          <div key={`blank-${i}`} aria-hidden />
        ))}

        {/* Day cells */}
        {days.map((date) => {
          const hKey = getHolidayKey(date);
          return (
            <DateCell
              key={date.toISOString()}
              date={date}
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              effectiveEnd={effectiveEnd}
              holiday={US_HOLIDAYS[hKey]}
              hasNote={hasNote(date)}
              theme={theme}
              onClick={onDateClick}
              onMouseEnter={onDateHover}
              onMouseLeave={() => onDateHover(null)}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 mt-3 pt-2 border-t border-gray-100 flex-wrap">
        {[
          { dot: "bg-red-500", label: "Today" },
          { dot: "bg-blue-500", label: "Selected", square: true, themeColor: theme.accent },
          { dot: "bg-amber-400", label: "Has note" },
          { dot: "bg-pink-400", label: "Holiday" },
        ].map(({ dot, label, square, themeColor }) => (
          <div key={label} className="flex items-center gap-1">
            <div
              className={clsx("flex-shrink-0", square ? "rounded-sm" : "rounded-full", !themeColor && dot)}
              style={{
                width: 7, height: 7,
                background: themeColor || undefined,
              }}
            />
            <span className="text-[9px] text-gray-400 tracking-wide">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
