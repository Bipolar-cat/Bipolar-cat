function formatDateTime(date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
}

function formatDateTime(date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
}

document.addEventListener("DOMContentLoaded", () => {

    const last10 = logs.slice(-10);
    logs.sort((a, b) => a.ts - b.ts);
    saveLogs(logs);

    if (typeof renderChart === "function") {
        renderChart();
    }

    if (typeof renderLogs === "function") {
        renderLogs();
    }
});
        }
    }
);
logs.sort((a, b) => a.ts - b.ts);

logs.push({
    date: formatDateTime(now),
    ts: now.getTime(),
    mood: selectedMood,
    cond: selectedCond,
    note: note
});　
