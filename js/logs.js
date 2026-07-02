/*logs.js △
 * 記録一覧表示
 * renderLogs() - 最近のログを表示
 */

function renderLogs() {
  const MAX_LOGS = 5;
  const logs = getLogs().slice(-5).reverse();

  const logList = document.getElementById("log-list");
  if (!logList) return;

  logList.innerHTML = "";

  logs.forEach((l) => {
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

  console.log(logList.innerHTML);
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
}
