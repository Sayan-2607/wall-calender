import { WallCalendar } from "@/components/calendar";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start py-8 px-4">
      {/* App header */}
      <header className="w-full max-w-3xl mb-6 flex items-baseline justify-between">
        <div>
          <h1 className="font-display text-2xl tracking-widest text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
            FOLIO
          </h1>
          <p className="text-[10px] font-mono text-gray-400 tracking-[0.18em] uppercase mt-0.5">
            Wall Calendar
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-gray-400 tracking-wide">
            Click a date to start · Click again to set range
          </p>
          <p className="text-[9px] text-gray-300 mt-0.5">⌘↵ to save note quickly</p>
        </div>
      </header>

      {/* Calendar */}
      <WallCalendar />

      {/* Footer */}
      <footer className="mt-8 text-center">
        <p className="text-[10px] font-mono text-gray-400 tracking-widest">
          Folio · Interactive Wall Calendar · {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  );
}
