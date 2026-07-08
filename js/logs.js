/* =========================
   logs.js
   最近の記録表示
========================= */

// ----------------------------
// 最近の記録表示
// ----------------------------
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

      // chart.jsからスクロールするためのID
      div.id = `log-${log.ts}`;

      const mode = getMode();

      let moodText;
      let condText;

      if (mode === "step3") {
        moodText = getMoodLabel(log.mood);
        condText = getCondLabel(log.cond);
      } else {
        moodText = log.mood;
        condText = log.cond;
      }

      div.innerHTML = `
        <div class="log-date">${log.date}</div>

        <div class="log-status">
          <span>🔵 気分：${moodText}</span>
          <span>🟠 体調：${condText}</span>
        </div>

        ${log.note ? `<div class="log-note">${log.note}</div>` : ""}
      `;

      logList.appendChild(div);
    });
}

// ----------------------------
// Step3 気分表示
// ----------------------------
function getMoodLabel(value) {
  switch (value) {
    case 1:
      return "低い";

    case 5:
      return "普通";

    case 10:
      return "良い";

    default:
      return value;
  }
}

// ----------------------------
// Step3 体調表示
// ----------------------------
function getCondLabel(value) {
  switch (value) {
    case 1:
      return "悪い";

    case 5:
      return "普通";

    case 10:
      return "良い";

    default:
      return value;
  }
}
