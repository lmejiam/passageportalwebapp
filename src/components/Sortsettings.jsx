import React, { useEffect, useRef, useState } from "react";
 
// Same shape as the lanes prop on <Summary />, so one config drives both.
const LANES = [
  { name: "LANE 0", destination: "BYPASS" },
  { name: "LANE 1", destination: "CULL" },
  { name: "LANE 2", destination: "NETPEN A" },
  { name: "LANE 3", destination: "NETPEN B" },
  { name: "LANE 4", destination: "NETPEN C" },
];
 
// Accept either ["LANE 0", ...] or [{ name, destination }, ...].
function normalizeLanes(lanes) {
  return lanes.map((lane) =>
    typeof lane === "string" ? { name: lane, destination: "" } : lane
  );
}
 
// What the operator reads; falls back to the lane name if there is no label.
function laneText(lane) {
  return lane && lane.destination ? lane.destination : lane ? lane.name : "";
}
 
function indexOfName(options, name) {
  return options.findIndex((lane) => lane.name === name);
}
 
const DEFAULT_ASSIGNMENTS = [
  "LANE 1",
  "LANE 1",
  "LANE 3",
  "LANE 3",
  "LANE 2",
  "LANE 2",
  "LANE 4",
  "LANE 4",
  "LANE 3",
  "LANE 1",
];
 
// Where fish go when they fall outside the override range.
const DEFAULT_FALLBACK = "LANE 0";
 
function LaneDropdown({
  value,
  onChange,
  priority,
  options,
  showLaneName,
  label = "Destination",
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(() =>
    Math.max(0, indexOfName(options, value))
  );
  const wrapRef = useRef(null);
  const selected = options.find((lane) => lane.name === value);
 
  useEffect(() => {
    if (!open) return;
    const onDocDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocDown);
    return () => document.removeEventListener("mousedown", onDocDown);
  }, [open]);
 
  const commit = (index) => {
    onChange(options[index].name);
    setOpen(false);
  };
 
  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        setActive(Math.max(0, indexOfName(options, value)));
        return;
      }
      const step = e.key === "ArrowDown" ? 1 : -1;
      setActive((i) => (i + step + options.length) % options.length);
      return;
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (open) {
        commit(active);
      } else {
        setOpen(true);
        setActive(Math.max(0, indexOfName(options, value)));
      }
    }
  };
 
  return (
    <div ref={wrapRef} className="relative w-40">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label + " for priority " + priority}
        onClick={() => {
          setOpen(!open);
          setActive(Math.max(0, indexOfName(options, value)));
        }}
        onKeyDown={onKeyDown}
        className="flex w-full items-center rounded border border-whooshhgreen bg-black py-1 pl-3 pr-2 text-sm text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-whooshhgreen"
      >
        <span className="flex-1 truncate text-center">
          {laneText(selected)}
          {showLaneName && selected && selected.destination && (
            <span className="ml-2 text-xs text-neutral-400">
              {selected.name}
            </span>
          )}
        </span>
        <span aria-hidden="true" className="text-xs leading-none">
          &#9662;
        </span>
      </button>
 
      {open && (
        <ul
          role="listbox"
          aria-label="Destinations"
          className="absolute left-0 top-full z-10 mt-1 w-full overflow-hidden rounded border border-whooshhgreen bg-black py-1 shadow-lg"
        >
          {options.map((lane, i) => (
            <li
              key={lane.name}
              role="option"
              aria-selected={lane.name === value}
              onMouseEnter={() => setActive(i)}
              onClick={() => commit(i)}
              className={
                "cursor-pointer px-3 py-1 text-center " +
                (i === active ? "bg-whooshhgreen text-black" : "text-white")
              }
            >
              <div className="truncate text-sm leading-tight">
                {laneText(lane)}
              </div>
              {lane.destination && (
                <div
                  className={
                    "text-xs " +
                    (i === active ? "text-neutral-800" : "text-neutral-500")
                  }
                >
                  {lane.name}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
 
function OverrideControl({ value, onChange, priority }) {
  const inputClass =
    "w-14 rounded border border-whooshhgreen bg-black px-2 py-1 text-center text-sm text-white focus:outline-none focus:ring-1 focus:ring-whooshhgreen";
 
  return (
    <div className="flex items-center justify-center gap-2">
      <input
        type="number"
        inputMode="numeric"
        aria-label={"Override minimum for priority " + priority}
        value={value.min}
        onChange={(e) => onChange({ ...value, min: e.target.value })}
        className={inputClass}
      />
      <span className="text-xs text-white">GRAMS</span>
      <input
        type="number"
        inputMode="numeric"
        aria-label={"Override maximum for priority " + priority}
        value={value.max}
        onChange={(e) => onChange({ ...value, max: e.target.value })}
        className={inputClass}
      />
    </div>
  );
}
 
export default function SortSettings({
  title = "SORT SETTINGS",
  lanes = LANES,
  assignments: controlledAssignments,
  onChange,
  overrides: controlledOverrides,
  onOverrideChange,
  fallbacks: controlledFallbacks,
  onFallbackChange,
  fallbackLabel = "OUT OF RANGE",
  showFallback = false,
  showLaneName = false,
}) {
  const laneOptions = normalizeLanes(lanes);
  const [internal, setInternal] = useState(DEFAULT_ASSIGNMENTS);
  const [internalOverrides, setInternalOverrides] = useState(() =>
    DEFAULT_ASSIGNMENTS.map(() => ({ min: "", max: "" }))
  );
  const [internalFallbacks, setInternalFallbacks] = useState(() =>
    DEFAULT_ASSIGNMENTS.map(() => DEFAULT_FALLBACK)
  );
  const assignments = controlledAssignments || internal;
  const overrides = controlledOverrides || internalOverrides;
  const fallbacks = controlledFallbacks || internalFallbacks;
 
  const handleChange = (index, laneName) => {
    const next = assignments.map((a, i) => (i === index ? laneName : a));
    if (onChange) onChange(next);
    if (!controlledAssignments) setInternal(next);
  };
 
  const handleOverrideChange = (index, override) => {
    const next = overrides.map((o, i) => (i === index ? override : o));
    if (onOverrideChange) onOverrideChange(next);
    if (!controlledOverrides) setInternalOverrides(next);
  };
 
  const handleFallbackChange = (index, laneName) => {
    const next = fallbacks.map((f, i) => (i === index ? laneName : f));
    if (onFallbackChange) onFallbackChange(next);
    if (!controlledFallbacks) setInternalFallbacks(next);
  };
 
  return (
    <div
      className={
        "mx-2 px-3 pb-3 pt-2 font-sans " +
        (showFallback ? "max-w-4xl" : "max-w-2xl")
      }
    >
      <h1 className="mb-2 ml-3 text-xl font-semibold tracking-wide text-white">
        {title}
      </h1>
 
      <div className="rounded-xl bg-neutral-950 px-5 pb-6 pt-5">
        {/* Column headers */}
        <div className="mb-4 flex text-xs font-bold text-white">
          <div className="w-24 text-center">PRIORITY</div>
          <div className="w-48 text-center">LANE ASSIGNMENT</div>
          <div className={(showFallback ? "w-52" : "flex-1") + " text-center"}>
            OVERRIDE CONTROL
          </div>
          {showFallback && (
            <div className="flex-1 text-center">{fallbackLabel}</div>
          )}
        </div>
 
        {/* Rows */}
        <div className="flex flex-col gap-3">
          {assignments.map((laneName, index) => (
            <div key={index} className="flex items-center">
              <div className="w-24 text-center text-lg font-bold text-white">
                {index}
              </div>
              <div className="flex w-48 justify-center">
                <LaneDropdown
                  priority={index}
                  value={laneName}
                  options={laneOptions}
                  showLaneName={showLaneName}
                  onChange={(next) => handleChange(index, next)}
                />
              </div>
              <div
                className={
                  "flex justify-center " + (showFallback ? "w-52" : "flex-1")
                }
              >
                <OverrideControl
                  priority={index}
                  value={overrides[index] || { min: "", max: "" }}
                  onChange={(next) => handleOverrideChange(index, next)}
                />
              </div>
              {showFallback && (
                <div className="flex flex-1 justify-center">
                  <LaneDropdown
                    priority={index}
                    label={fallbackLabel}
                    value={fallbacks[index] || DEFAULT_FALLBACK}
                    options={laneOptions}
                    showLaneName={showLaneName}
                    onChange={(next) => handleFallbackChange(index, next)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}