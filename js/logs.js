function renderLogs() {

    const MAX_LOGS = 5;
    const logs = getLogs().slice(-MAX_LOGS).reverse();

    const logList = document.getElementById("log-list");

    if (!logList) return;

    logList.innerHTML = "";

    logs.forEach(l => {

        const div = document.createElement("div");
        div.className = "log-item";

        const moodText =
            l.mood === 10 ? "良い" :
            l.mood === 5 ? "普通" : "低い";

        const condText =
            l.cond === 10 ? "良い" :
            l.cond === 5 ? "普通" : "悪い";

        div.innerHTML = `
            <div class="log-date">${l.date}</div>

            <div class="log-status">
                <span>🔵 気分：${moodText}</span>
                <span>🟠 体調：${condText}</span>
            </div>

            ${l.note ? `<div class="log-note">${l.note}</div>` : ""}
        `;

        logList.appendChild(div);
    });
}
