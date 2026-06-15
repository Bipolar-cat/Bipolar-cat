function renderLogs() {

    const logs = getLogs();
    const list = document.getElementById("log-list");

    list.innerHTML = "";

    logs.slice().reverse().forEach(l => {

        const div = document.createElement("div");

        div.innerHTML = `
            ${l.date}<br>
            気分:${l.mood} / 体調:${l.cond}<br>
            ${l.note || ""}
        `;

        list.appendChild(div);
    });
}
