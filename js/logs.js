function renderLogs() {

     const logs = getLogs().slice(-5).reverse();
    const logList = document.getElementById("log-list");

    if (!logList) return;

    logList.innerHTML = "";

    logs.slice().reverse().forEach(l => {

        const div = document.createElement("div");
        div.className = "log-item";

        const moodText =
            l.mood === 10 ? "良い" :
            l.mood === 5 ? "普通" :
            l.mood === 5 ? "低い";

        const condText =
            l.cond === 10 ? "良い" :
            l.cond === 5 ? "普通" :
            l.mood === 1 ? "悪い";

        div.innerHTML = 
            <span class="log-date">${l.date}</span>

            <div class="log-status">
                <span class="mood-text">
                    <span class="status-dot mood-dot"></span>
                    気分：${moodText}
                </span>

                <span class="cond-text">
                    <span class="status-dot cond-dot"></span>
                    体調：${condText}
                </span>
            </div>

            <div class="log-note">
                ${l.note || ""}
            </div>
        `;

        logList.appendChild(div);
    });
}
