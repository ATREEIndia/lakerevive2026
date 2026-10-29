"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { useLake } from "@/context/LakeContext";
import type { Suggestion } from "@/lib/geocode";
import type { LocationInfo } from "@/lib/types";
import { Alert, Button, Card, StepFooter, StepHeading } from "../ui";

type Mode = "search" | "coords";

export default function LocateStep() {
  const { state, dispatch } = useLake();
  const [mode, setMode] = useState<Mode>("search");
  const setLocation = (location: LocationInfo) => dispatch({ type: "SET_LOCATION", location });

  return (
    <div>
      <StepHeading title="Locate the lake">Search for the lake by name, or enter its coordinates.</StepHeading>

      <div role="tablist" aria-label="Location input" className="mb-4 grid grid-cols-2 rounded-lg bg-slate-100 p-1">
        {(
          [
            ["search", "Search by name"],
            ["coords", "Enter coordinates"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            id={`tab-${id}`}
            type="button"
            role="tab"
            aria-selected={mode === id}
            aria-controls={`panel-${id}`}
            onClick={() => setMode(id)}
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-teal-600 ${
              mode === id ? "bg-white text-teal-700 shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`panel-${mode}`} aria-labelledby={`tab-${mode}`}>
        {mode === "search" ? (
          <SearchForm near={state.location} onLocate={setLocation} />
        ) : (
          <CoordinatesForm initial={state.location} onLocate={setLocation} />
        )}
      </div>

      {state.location && (
        <Card className="mt-5 border-teal-200 bg-teal-50/50">
          <p className="text-xs font-medium tracking-wide text-teal-700 uppercase">Selected location</p>
          <p className="mt-1 text-sm font-medium text-slate-900">{state.location.label}</p>
          <p className="mt-0.5 font-mono text-xs text-slate-500">
            {state.location.lat.toFixed(5)}, {state.location.lng.toFixed(5)}
          </p>
        </Card>
      )}

      <StepFooter>
        <span />
        <Button variant="primary" disabled={!state.location} onClick={() => dispatch({ type: "GO_TO_STEP", step: 2 })}>
          Continue
        </Button>
      </StepFooter>
    </div>
  );
}

function SearchForm({
  near,
  onLocate,
}: {
  near: LocationInfo | null;
  onLocate: (location: LocationInfo) => void;
}) {
  const listId = useId();
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const skipSuggest = useRef(false);

  // Debounced autocomplete.
  useEffect(() => {
    const query = text.trim();
    if (skipSuggest.current || query.length < 3) {
      skipSuggest.current = false;
      setSuggestions([]);
      return;
    }
    let stale = false;
    const timer = setTimeout(async () => {
      try {
        const { suggest } = await import("@/lib/geocode");
        const results = await suggest(query, near ?? undefined);
        if (!stale) {
          setSuggestions(results);
          setHighlight(-1);
          setOpen(true);
        }
      } catch {
        if (!stale) setSuggestions([]);
      }
    }, 250);
    return () => {
      stale = true;
      clearTimeout(timer);
    };
    // Re-query only when the text changes, not when the location bias does.
  }, [text]);

  const runSearch = async (query: string, magicKey?: string) => {
    if (!query.trim()) return;
    setOpen(false);
    setBusy(true);
    setError(null);
    try {
      const { geocode } = await import("@/lib/geocode");
      const location = await geocode(query, magicKey);
      if (location) onLocate(location);
      else setError(`No results found for “${query}”. Try a different name or enter coordinates.`);
    } catch {
      setError("Search failed. Check your internet connection and ArcGIS API key, then try again.");
    } finally {
      setBusy(false);
    }
  };

  const choose = (s: Suggestion) => {
    skipSuggest.current = true;
    setText(s.text);
    runSearch(s.text, s.magicKey);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => (h + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => (h <= 0 ? suggestions.length - 1 : h - 1));
    } else if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "Enter" && highlight >= 0) {
      e.preventDefault();
      choose(suggestions[highlight]);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    runSearch(text);
  };

  const showList = open && suggestions.length > 0;

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <label htmlFor="lake-search" className="block text-sm font-medium text-slate-700">
        Lake name
      </label>
      <div className="relative">
        <input
          id="lake-search"
          type="text"
          role="combobox"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={highlight >= 0 ? `${listId}-${highlight}` : undefined}
          autoComplete="off"
          placeholder="e.g. Bellandur Lake, Bengaluru"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setError(null);
          }}
          onKeyDown={onKeyDown}
          onFocus={() => suggestions.length && setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none"
        />
        {showList && (
          <ul
            id={listId}
            role="listbox"
            className="absolute z-10 mt-1 max-h-64 w-full overflow-auto rounded-lg border border-slate-200 bg-white py-1 text-sm shadow-lg"
          >
            {suggestions.map((s, i) => (
              <li
                key={s.magicKey}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === highlight}
                onMouseDown={(e) => {
                  e.preventDefault();
                  choose(s);
                }}
                onMouseEnter={() => setHighlight(i)}
                className={`cursor-pointer px-3 py-2 ${i === highlight ? "bg-teal-50 text-teal-900" : "text-slate-700"}`}
              >
                {s.text}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Button type="submit" variant="primary" disabled={busy || !text.trim()} className="w-full">
        {busy ? "Searching…" : "Search"}
      </Button>
      {error && <Alert tone="error">{error}</Alert>}
    </form>
  );
}

function CoordinatesForm({
  initial,
  onLocate,
}: {
  initial: LocationInfo | null;
  onLocate: (location: LocationInfo) => void;
}) {
  const [lat, setLat] = useState(initial ? String(initial.lat) : "");
  const [lng, setLng] = useState(initial ? String(initial.lng) : "");
  const [submitted, setSubmitted] = useState(false);

  const latError = coordinateError(lat, 90);
  const lngError = coordinateError(lng, 180);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (latError || lngError) return;
    const location = { lat: Number(lat), lng: Number(lng) };
    onLocate({ ...location, label: `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}` });
  };

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <CoordinateInput id="lat" label="Latitude" hint="−90 to 90" value={lat} onChange={setLat} error={submitted ? latError : null} />
        <CoordinateInput id="lng" label="Longitude" hint="−180 to 180" value={lng} onChange={setLng} error={submitted ? lngError : null} />
      </div>
      <Button type="submit" variant="primary" className="w-full">
        Go to location
      </Button>
    </form>
  );
}

function coordinateError(raw: string, limit: number): string | null {
  if (!raw.trim()) return "Required";
  const value = Number(raw);
  if (!Number.isFinite(value)) return "Enter a number";
  if (value < -limit || value > limit) return `Must be between −${limit} and ${limit}`;
  return null;
}

function CoordinateInput(props: {
  id: string;
  label: string;
  hint: string;
  value: string;
  onChange: (value: string) => void;
  error: string | null;
}) {
  const { id, label, hint, value, onChange, error } = props;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={id}
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={`${id}-hint`}
        placeholder={id === "lat" ? "12.9352" : "77.6762"}
        className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:ring-2 focus:outline-none ${
          error ? "border-red-400 focus:ring-red-200" : "border-slate-300 focus:border-teal-500 focus:ring-teal-200"
        }`}
      />
      <p id={`${id}-hint`} className={`mt-1 text-xs ${error ? "text-red-600" : "text-slate-500"}`}>
        {error ?? hint}
      </p>
    </div>
  );
}
