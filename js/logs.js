function renderLogs() {

    const logs = getLogs();
    const logList = document.getElementById("log-list");

    if (!logList) return;

    logList.innerHTML = "";

    logs.slice().reverse().forEach(l => {
        const div = document.createElement("div");

       div.className = "log-item";

const moodText =
    l.mood === 10 ? "良い" :
    l.mood === 5 ? "普通" :
    "低い";

const condText =
    l.cond === 10 ? "良い" :
    l.cond === 5 ? "普通" :
    "悪い";

div.innerHTML = `
    <span class="log-date">${l.date}</span>
    気分：${moodText} ／ 体調：${condText}<br>
    ${l.note || ""}
`;

        logList.appendChild(div);
    });
}
