"use client";
import React, { useState, useRef, useCallback } from "react";
import clsx from "clsx";
import type { CalendarNote, NoteColor, CalendarTheme } from "@/types";
import { NOTE_COLOR_CLASSES, NOTE_COLORS } from "@/lib/constants";
import { formatRangeLabel } from "@/lib/utils";

interface NotesPanelProps {
  rangeStart: Date | null;
  rangeEnd: Date | null;
  notes: CalendarNote[];
  theme: CalendarTheme;
  onSave: (text: string, start: Date | null, end: Date | null, color: NoteColor) => boolean;
  onDelete: (id: string) => void;
  onClearRange: () => void;
  onNoteClick: (note: CalendarNote) => void;
  showToast: (msg: string, type?: "success" | "error" | "info") => void;
}

export function NotesPanel({
  rangeStart, rangeEnd, notes, theme, onSave, onDelete, onClearRange, onNoteClick, showToast,
}: NotesPanelProps) {
  const [text, setText] = useState("");
  const [color, setColor] = useState<NoteColor>("blue");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const rangeLabel = formatRangeLabel(rangeStart, rangeEnd);
  const hasRange = !!rangeStart;

  const handleSave = useCallback(() => {
    if (!text.trim()) { showToast("Write something first!", "error"); return; }
    if (!rangeStart) { showToast("Select a date first!", "error"); return; }
    const ok = onSave(text, rangeStart, rangeEnd, color);
    if (ok) { setText(""); showToast("Note saved ✓"); }
  }, [text, rangeStart, rangeEnd, color, onSave, showToast]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handleSave();
  };

  const startEdit = (note: CalendarNote) => {
    setEditingId(note.id);
    setEditText(note.text);
  };

  return (
    <div className="flex flex-col h-full gap-3">
      {/* Header */}
      <div>
        <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-gray-400 mb-1.5">
          Notes
        </p>

        {/* Range label */}
        <div
          className="text-[10px] font-mono px-2 py-1 rounded inline-flex items-center gap-1.5 border"
          style={{
            color: hasRange ? theme.accent : "#9CA3AF",
            borderColor: hasRange ? `${theme.accent}30` : "#E5E7EB",
            background: hasRange ? `${theme.accent}08` : "#F9FAFB",
          }}
        >
          {hasRange && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: theme.accent }} />}
          <span className="truncate max-w-[200px]">{rangeLabel}</span>
          {hasRange && (
            <button
              onClick={onClearRange}
              className="ml-1 text-gray-400 hover:text-red-400 transition-colors text-xs leading-none"
              title="Clear selection"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Textarea */}
      <div className="relative flex-shrink-0">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={hasRange ? "Jot a memo… (⌘↵ to save)" : "Select a date to add a note"}
          disabled={!hasRange}
          className={clsx(
            "w-full resize-none rounded border text-[11px] leading-relaxed",
            "placeholder:text-gray-300 text-gray-700 bg-white transition-all duration-200",
            "focus:outline-none",
            hasRange ? "border-gray-200 focus:border-opacity-100" : "border-gray-100 bg-gray-50 cursor-not-allowed",
          )}
          style={{
            padding: "8px 10px",
            minHeight: 80,
            ...(hasRange ? { borderColor: `${theme.accent}40` } : {}),
            ...(hasRange ? { ["--tw-ring-color" as string]: `${theme.accent}30` } : {}),
          }}
          onFocus={(e) => { if (hasRange) e.target.style.boxShadow = `0 0 0 3px ${theme.accent}18`; }}
          onBlur={(e) => { e.target.style.boxShadow = ""; }}
          rows={3}
        />
      </div>

      {/* Color picker + Save */}
      <div className="flex items-center justify-between flex-shrink-0">
        <div className="flex gap-1.5 items-center">
          <span className="text-[9px] text-gray-400 mr-0.5">Color:</span>
          {NOTE_COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              title={c}
              className={clsx(
                "w-4 h-4 rounded-full transition-all duration-150 border-2",
                color === c ? "scale-125 border-gray-400" : "border-transparent hover:scale-110",
                NOTE_COLOR_CLASSES[c].dot,
              )}
              aria-label={`Note color: ${c}`}
              aria-pressed={color === c}
            />
          ))}
        </div>
        <button
          onClick={handleSave}
          disabled={!hasRange || !text.trim()}
          className={clsx(
            "text-[10px] font-semibold tracking-wide px-3 py-1.5 rounded transition-all duration-150",
            "disabled:opacity-40 disabled:cursor-not-allowed",
            "text-white",
          )}
          style={{ background: hasRange && text.trim() ? theme.accent : "#9CA3AF" }}
        >
          Save
        </button>
      </div>

      {/* Saved notes list */}
      <div className="flex-1 overflow-y-auto space-y-1.5 min-h-0">
        {notes.length === 0 && (
          <p className="text-[10px] text-gray-300 italic pt-1">No notes yet — select dates above to add one.</p>
        )}
        {notes.map((note) => {
          const cc = NOTE_COLOR_CLASSES[note.color] || NOTE_COLOR_CLASSES.blue;
          const isEditing = editingId === note.id;
          return (
            <div
              key={note.id}
              className={clsx(
                "rounded p-2 border text-[10px] group transition-all duration-150 cursor-pointer",
                cc.bg, cc.border, cc.text,
              )}
              onClick={() => !isEditing && onNoteClick(note)}
            >
              <div className="flex items-start gap-1.5">
                <div className={clsx("w-1.5 h-1.5 rounded-full mt-0.5 flex-shrink-0", cc.dot)} />
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-[9px] opacity-60 mb-0.5 truncate">{note.rangeLabel}</div>
                  {isEditing ? (
                    <textarea
                      autoFocus
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full text-[10px] leading-relaxed resize-none bg-white/60 rounded border border-current/20 px-1.5 py-1 focus:outline-none"
                      rows={2}
                    />
                  ) : (
                    <p className="leading-relaxed break-words line-clamp-2">{note.text}</p>
                  )}
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                  {isEditing ? (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); /* update logic goes here */ setEditingId(null); }}
                        className="text-[9px] px-1.5 py-0.5 rounded bg-white/60 hover:bg-white/90"
                      >
                        ✓
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setEditingId(null); }}
                        className="text-[9px] px-1.5 py-0.5 rounded bg-white/60 hover:bg-white/90"
                      >
                        ✕
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={(e) => { e.stopPropagation(); onDelete(note.id); }}
                      className="text-[9px] px-1.5 py-0.5 rounded bg-white/60 hover:bg-red-100 hover:text-red-600 transition-colors"
                      aria-label="Delete note"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
