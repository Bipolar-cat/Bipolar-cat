<<<<<<< HEAD
/* =========================
   logs.js
   最近の記録表示
========================= */
=======
/*logs.js △
 * 記録一覧表示
 * renderLogs() - 最近のログを表示
 */
>>>>>>> 2571b7275aec63c51187926138b64065b9618389

function renderLogs() {
  const logs = getLogs();
  const logList = document.getElementById("log-list");

<<<<<<< HEAD
  if (!logList) return;

  logList.innerHTML = "";

  logs
    .slice()
    .reverse()
    .forEach((log) => {
      const div = document.createElement("div");
      div.className = "log-item";
=======
    console.log(getLogs());
    
    const MAX_LOGS = 5;
    const logs = getLogs().slice(-MAX_LOGS).reverse();

    const logList = document.getElementById("logs");
    if (!logList) return;
>>>>>>> 2571b7275aec63c51187926138b64065b9618389

      div.innerHTML = `
        <span class="log-date">${log.date}</span><br>
        気分：${log.mood}　
        体調：${log.cond}
        ${log.note ? `<br>${log.note}` : ""}
      `;

<<<<<<< HEAD
      logList.appendChild(div);
    });
=======
    logs.forEach(l => {
        // ✅ スケール値を日本語にマップ
        const moodLabel = getMoodLabel(l.mood);
        const condLabel = getCondLabel(l.cond);

        const item = document.createElement("div");
        item.className = "log-item";

        item.innerHTML = `
            <div class="log-date">${l.date}</div>

            <div class="log-status">
                <span class="mood">🔵 気分：${moodLabel}</span>
                <span class="cond">🟠 体調：${condLabel}</span>
            </div>

            ${l.note ? `<div class="log-note">${l.note}</div>` : ""}
        `;

        logList.appendChild(item);
    });
}

/**
 * 気分スケール（1-10）を日本語ラベルに変換
 */
function getMoodLabel(mood) {
    if (mood === 10) return "良い";
    if (mood === 5) return "普通";
    if (mood === 1) return "低い";
    return "不明";
}

/**
 * 体調スケール（1-10）を日本語ラベルに変換
 */
function getCondLabel(cond) {
    if (cond === 10) return "良い";
    if (cond === 5) return "普通";
    if (cond === 1) return "悪い";
    return "不明";
>>>>>>> 2571b7275aec63c51187926138b64065b9618389
}
