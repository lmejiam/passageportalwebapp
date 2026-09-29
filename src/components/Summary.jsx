import React from "react";

const DEFAULT_LANES = [
    { name: "LANE 0", destination: "BYPASS", count: 1 },
    { name: "LANE 1", destination: "CULL", count: 1 },
    { name: "LANE 2", destination: "NETPEN A", count: 1 },
    { name: "LANE 3", destination: "NETPEN B", count: 1 },
    { name: "LANE 4", destination: "NETPEN C", count: 1 },
];

function CountCard({ label, scope, value }) {
    return (
    <div className="min-w-0 flex-1 rounded bg-[#b8b536] pb-6 pl-4 pr-5 pt-3">
        <div className="flex items-baseline justify-between text-2xl leading-tight text-[#3a3a2a]">
            <span>{label}</span>
            <span className="font-bold">{scope}</span>
        </div>
        <div className="mt-4 pl-5 text-5xl font-bold leading-none tabular-nums text-white">
            {value.toLocaleString()}
        </div>
    </div>
    );
}

function LaneChart({ lanes, maxBarHeight }) {
    const max = Math.max(1, ...lanes.map((l) => l.count));

    return (
    <div>
        {/* Bars */}
        <div className="flex h-40 items-end border-b border-[#e6e6e6]">
        {lanes.map((lane) => (
            <div
            key={lane.name}
            className="flex flex-1 flex-col items-center justify-end"
            >
            <div className="mb-3 text-lg tabular-nums text-white">
                {lane.count.toLocaleString()}
            </div>
            <div
                className="w-1/2 max-w-24 bg-[#393939] transition-[height] duration-300 ease-out"
              // Height is data-driven, so it can't be a static Tailwind class
              style={{ height: Math.max(2, (lane.count / max) * maxBarHeight) }}
            />
            </div>
        ))}
        </div>

      {/* Labels */}
        <div className="mt-4 flex">
        {lanes.map((lane) => (
            <div key={lane.name} className="min-w-0 flex-1 text-center">
            
            <div className="mt-1 truncate text-base text-white ">
                {lane.destination}
            </div>
            <div className="text-xl leading-tight text-[#4a4a4a]">{lane.name}</div>
            </div>
        ))}
        </div>
    </div>
    );
}
export default function Summary({
    title = "PROCESSING SUMMARY",
    dayCount = 20,
    lanes = DEFAULT_LANES,
    maxBarHeight = 110,
}) {
    return (
    <div className="w-full bg-darkgray px-2 pb-3 pt-2 font-['Open_Sans',ui-sans-serif,system-ui,sans-serif]">
        <h1 className="mb-2.5 ml-6 text-xl font-semibold tracking-wide text-white">
        {title}
        </h1>
        <div className="rounded-2xl bg-black px-6 pb-6 pt-5">
            <div className="flex gap-7">
                <CountCard label="FISH COUNT" scope="DAY" value={dayCount} />
                {/*<CountCard label="FISH COUNT" scope="SITE" value={siteCount} />*/}
            </div>
            <div className="mt-6">
                <LaneChart lanes={lanes} maxBarHeight={maxBarHeight} />
            </div>
        </div>
    </div>
    );
}