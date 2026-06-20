function renderLogs() {

    const logs = getLogs();
    const logList = document.getElementById("log-list");

    if (!logList) return;

    logList.innerHTML = "";

    logs.slice().reverse().forEach(l => {
        const div = document.createElement("div");

       div.className = "log-item";

div.innerHTML = `
    <span class="log-date">${l.date}</span>
    気分:${l.mood} / 体調:${l.cond}<br>
    ${l.note || ""}
`;

        logList.appendChild(div);
    });
}
