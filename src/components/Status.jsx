import React from "react";

const COLORS = {
    panel: "#323232",
    lightBorder: "#3a3a3a",
    value: "#e6e6e6",
};

const STATUS_COLORS = {
    RUNNING: { base: "#4cc93f", glow: "rgba(76, 201, 63, 0.45)" },
    INITIALIZING: { base: "#e3db3a", glow: "rgba(227, 219, 58, 0.45)" },
    STOPPED: { base: "#e0413a", glow: "rgba(224, 65, 58, 0.45)" },
    DISABLED: { base: "#c8c8c8", glow: "rgba(200, 200, 200, 0.25)" },
};

function StatusLight({ status }) {
    const c = STATUS_COLORS[status] || STATUS_COLORS.DISABLED;
    return (
    <span
        aria-hidden="true"
        className="relative h-6 w-6 flex-shrink-0 overflow-hidden rounded-full border-2"
        style={{
        backgroundColor: c.base,
        borderColor: COLORS.lightBorder,
        boxShadow: `0 0 6px ${c.glow}`,
    }}
    >
    <span className="absolute inset-0 rounded-full bg-gradient-to-br from-white via-transparent to-black opacity-40" />
    </span>
    );
}

function Row({ label, value, status }) {
return (
    <div className="flex items-center justify-between gap-4 py-3">
        <div className="flex items-center gap-4">
            {status && <StatusLight status={status} />}
            <span className="text-l font-medium text-white">{label}</span>
        </div>
        <span
            className="truncate text-right text-l font-light"
            style={{ color: COLORS.value }}
            aria-label={status ? `${label}: ${value}` : undefined}
        >
            {value}
        </span>
    </div>
    );
}

export default function Status({
    site = "Hemne",
    activeTagFile = "hemne/sort_file_2028.csv",
    computerVisionStatus = "RUNNING",
    sortingStatus = "RUNNING",
}) {
    return (
    <section
        className="w-full bg-darkgray px-2 pb-3 pt-2 font-sans"
    >
        <h2 className="mb-2 ml-2 text-xl font-medium tracking-wide text-white">
            SYSTEM STATUS
        </h2>
    
            <div className="rounded-xl bg-black px-8 pb-6 pt-10">
            <Row label="SITE" value={site} />
            <Row label="ACTIVE TAG FILE" value={activeTagFile} />
            <Row
                label="COMPUTER VISION"
                value={computerVisionStatus}
                status={computerVisionStatus}
            />
            <Row label="SORTING" value={sortingStatus} status={sortingStatus} />
        </div>
    </section>
    );
}