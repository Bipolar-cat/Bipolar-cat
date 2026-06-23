function renderLogs() {

    const MAX_LOGS = 5;
    const logs = getLogs().slice(-MAX_LOGS).reverse();

    const logList = document.getElementById("log-list");

    if (!logList) return;

    logList.innerHTML = "";

    logs.forEach(l => {

        const mood =
            l.mood === 10 ? "良い" :
            l.mood === 5 ? "普通" : "低い";

        const cond =
            l.cond === 10 ? "良い" :
            l.cond === 5 ? "普通" : "悪い";

        const item = document.createElement("div");
        item.className = "log-item";

        item.innerHTML = `
            <div class="log-date">${l.date}</div>

            <div class="log-status">
                <span class="mood">🔵 気分：${mood}</span>
                <span class="cond">🟠 体調：${cond}</span>
            </div>

            ${l.note ? `<div class="log-note">${l.note}</div>` : ""}
        `;

        logList.appendChild(item);
    });

}
