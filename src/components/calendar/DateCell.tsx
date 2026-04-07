"use client";
import React, { memo, useState } from "react";
import clsx from "clsx";
import type { CalendarTheme } from "@/types";
import {
  isTodayUtil, isRangeStart, isRangeEnd, isInRange, isWeekend, isSameDayUtil,
} from "@/lib/utils";

interface DateCellProps {
  date: Date;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  effectiveEnd: Date | null;
  holiday: string | undefined;
  hasNote: boolean;
  theme: CalendarTheme;
  onClick: (date: Date) => void;
  onMouseEnter: (date: Date) => void;
  onMouseLeave: () => void;
}

export const DateCell = memo(function DateCell({
  date, rangeStart, rangeEnd, effectiveEnd, holiday, hasNote, theme, onClick, onMouseEnter, onMouseLeave,
}: DateCellProps) {
  const [showTip, setShowTip] = useState(false);

  const todayFlag = isTodayUtil(date);
  const weekendFlag = isWeekend(date);
  const isStart = isRangeStart(date, rangeStart, effectiveEnd);
  const isEnd = isRangeEnd(date, rangeStart, effectiveEnd);
  const inRange = isInRange(date, rangeStart, effectiveEnd);
  const isSelected = isStart || isEnd;

  const rangeStartOnly = isStart && !isEnd && rangeEnd !== null;
  const rangeEndOnly = isEnd && !isStart;
  const isBothStartEnd = isSameDayUtil(date, rangeStart) && rangeEnd === null;

  return (
    <div
      className={clsx(
        "relative flex items-center justify-center cursor-pointer select-none",
        "transition-all duration-100",
        // Range fill strip (the horizontal band)
        inRange && !isStart && !isEnd && "range-in-fill",
        rangeStartOnly && "range-start-fill",
        rangeEndOnly && "range-end-fill",
      )}
      style={{
        aspectRatio: "1",
        // Range background strip
        backgroundColor: inRange && !isStart && !isEnd
          ? theme.accentLight : "transparent",
        ...(rangeStartOnly ? {
          background: `linear-gradient(to right, transparent 50%, ${theme.accentLight} 50%)`,
        } : {}),
        ...(rangeEndOnly ? {
          background: `linear-gradient(to left, transparent 50%, ${theme.accentLight} 50%)`,
        } : {}),
      }}
      onClick={() => onClick(date)}
      onMouseEnter={() => {
        onMouseEnter(date);
        if (holiday) setShowTip(true);
      }}
      onMouseLeave={() => {
        onMouseLeave();
        setShowTip(false);
      }}
      role="button"
      tabIndex={0}
      aria-label={`${date.toLocaleDateString()}${holiday ? `, ${holiday}` : ""}`}
      aria-pressed={isSelected}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(date); } }}
    >
      {/* The number circle */}
      <div
        className={clsx(
          "relative z-10 flex items-center justify-center rounded-full",
          "text-[11px] font-medium transition-all duration-150",
          !isSelected && "hover:scale-110",
          !isSelected && !holiday && !weekendFlag && "text-gray-700",
          !isSelected && weekendFlag && "text-blue-600",
          !isSelected && holiday && "text-pink-600 italic",
          isSelected && "text-white font-semibold scale-105",
          todayFlag && !isSelected && "font-bold",
        )}
        style={{
          width: 26,
          height: 26,
          background: isSelected ? theme.accent : "transparent",
          boxShadow: isSelected ? `0 2px 8px ${theme.accent}55` : "none",
        }}
      >
        {date.getDate()}

        {/* Today dot */}
        {todayFlag && !isSelected && (
          <span
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-500"
            style={{ bottom: 1 }}
          />
        )}
      </div>

      {/* Note indicator dot */}
      {hasNote && (
        <span
          className="absolute top-[3px] right-[3px] w-[5px] h-[5px] rounded-full z-20"
          style={{ background: "#F59E0B" }}
        />
      )}

      {/* Holiday tooltip */}
      {holiday && showTip && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-50 pointer-events-none"
          style={{ whiteSpace: "nowrap" }}
        >
          <div className="bg-gray-900 text-white text-[9px] px-2 py-1 rounded font-normal tracking-wide">
            {holiday}
          </div>
          <div className="w-2 h-2 bg-gray-900 rotate-45 mx-auto -mt-1" />
        </div>
      )}
    </div>
  );
});
