"use client";
import React from "react";
import clsx from "clsx";

interface ToastItem {
  id: string;
  message: string;
  type: "success" | "error" | "info";
  exiting: boolean;
}

interface ToastContainerProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={clsx(
            "px-4 py-2.5 rounded-lg text-sm font-medium text-white shadow-lg pointer-events-auto cursor-pointer",
            t.exiting ? "animate-toast-out" : "animate-toast-in",
            t.type === "success" && "bg-gray-900",
            t.type === "error" && "bg-red-600",
            t.type === "info" && "bg-blue-600",
          )}
          onClick={() => onDismiss(t.id)}
          role="alert"
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
