/* =========================
   logs.js
   最近の記録表示
========================= */

function renderLogs() {
  const logs = getLogs();
  const logList = document.getElementById("log-list");

  if (!logList) return;

  logList.innerHTML = "";

  logs
    .slice()
    .reverse()
    .forEach((log) => {
      const div = document.createElement("div");
      div.className = "log-item";

      div.innerHTML = `
        <span class="log-date">${log.date}</span><br>
        気分：${log.mood}　
        体調：${log.cond}
        ${log.note ? `<br>${log.note}` : ""}
      `;

      logList.appendChild(div);
    });
}
