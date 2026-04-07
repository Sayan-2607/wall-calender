"use client";
import { useState, useCallback, useMemo } from "react";
import type { DateRange, SelectionStep } from "@/types";
import { isDateBefore } from "@/lib/utils";

export function useCalendar() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [range, setRange] = useState<DateRange>({ start: null, end: null });
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [step, setStep] = useState<SelectionStep>("idle");

  const goToPrevMonth = useCallback(() => {
    setViewMonth((m) => {
      if (m === 0) { setViewYear((y) => y - 1); return 11; }
      return m - 1;
    });
  }, []);

  const goToNextMonth = useCallback(() => {
    setViewMonth((m) => {
      if (m === 11) { setViewYear((y) => y + 1); return 0; }
      return m + 1;
    });
  }, []);

  const handleDateClick = useCallback((date: Date) => {
    setRange((prev) => {
      if (step === "idle" || (prev.start && prev.end)) {
        setStep("selecting-end");
        return { start: date, end: null };
      }
      if (step === "selecting-end") {
        setStep("idle");
        setHoverDate(null);
        if (prev.start && isDateBefore(date, prev.start)) {
          return { start: date, end: prev.start };
        }
        return { start: prev.start, end: date };
      }
      return prev;
    });
  }, [step]);

  const handleDateHover = useCallback((date: Date | null) => {
    if (step === "selecting-end") {
      setHoverDate(date);
    }
  }, [step]);

  const clearRange = useCallback(() => {
    setRange({ start: null, end: null });
    setHoverDate(null);
    setStep("idle");
  }, []);

  // Effective end for hover preview
  const effectiveEnd = useMemo(() => {
    if (range.end) return range.end;
    if (step === "selecting-end" && range.start && hoverDate) return hoverDate;
    return null;
  }, [range, hoverDate, step]);

  return {
    viewYear, viewMonth,
    range, effectiveEnd,
    hoverDate, step,
    today,
    goToPrevMonth, goToNextMonth,
    handleDateClick, handleDateHover,
    clearRange,
    setViewYear, setViewMonth,
  };
}
