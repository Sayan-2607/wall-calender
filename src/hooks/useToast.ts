"use client";
import { useState, useCallback, useRef } from "react";

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
  exiting: boolean;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timerRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.map((t) => t.id === id ? { ...t, exiting: true } : t));
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 300);
    const timer = timerRef.current.get(id);
    if (timer) { clearTimeout(timer); timerRef.current.delete(id); }
  }, []);

  const show = useCallback((message: string, type: Toast["type"] = "success") => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, message, type, exiting: false }]);
    const timer = setTimeout(() => dismiss(id), 2800);
    timerRef.current.set(id, timer);
  }, [dismiss]);

  return { toasts, show, dismiss };
}
