<<<<<<< HEAD
alert("script.js 読み込み成功");

/* =========================
   script.js
   UI操作・保存処理
========================= */

let selectedMood = 5;
let selectedCond = 5;

// ----------------------------
// Stepボタン生成
// ----------------------------
function createButtons(type) {
  const mode = getMode();

  console.log("createButtons", type, mode);

  const container = document.getElementById(
    type === "mood" ? "mood-btns" : "cond-btns",
  );

  container.innerHTML = "";

  // ------------------
  // Step3
  // ------------------
  if (mode === "step3") {
    const labels = [
      { text: "低", value: 1 },
      { text: "普通", value: 2 },
      { text: "良い", value: 3 },
    ];

    labels.forEach((item) => {
      const btn = document.createElement("button");

      btn.textContent = item.text;

      btn.onclick = () => setVal(type, item.value, btn);

      if (item.value === 2) {
        btn.classList.add("active");
      }

      container.appendChild(btn);
    });
  }

  // ------------------
  // Step10
  // ------------------
  else {
    for (let i = 1; i <= 10; i++) {
      const btn = document.createElement("button");

      btn.textContent = i;

      btn.onclick = () => setVal(type, i, btn);

      if (i === 5) {
        btn.classList.add("active");
      }

      container.appendChild(btn);
    }
  }
}

function setVal(type, value, button) {
  const group = button.parentElement;

  group.querySelectorAll("button").forEach((btn) => {
    btn.classList.remove("active");
  });

  button.classList.add("active");

  if (type === "mood") {
    selectedMood = value;
  }

  if (type === "cond") {
    selectedCond = value;
  }
}

//------------------------
// 保存処理
//------------------------
function saveData() {
  const logs = getLogs();

  const now = new Date();

  const note = document.getElementById("note").value.trim();

  logs.push({
    date: formatDate(now, true),
    mood: selectedMood,
    cond: selectedCond,
    note: note,
    ts: now.getTime(),
  });

  saveLogs(logs);

  renderChart();
  renderLogs();

  document.getElementById("note").value = "";

  const status = document.getElementById("status");

  if (status) {
    status.textContent = "保存しました";
    setTimeout(() => {
      status.textContent = "";
    }, 1500);
  }
}

//------------------------
// 初期化
//------------------------
window.addEventListener("DOMContentLoaded", () => {
  // 設定取得
  const mode = getMode();

  console.log("現在のモード:", mode);

  // ラジオボタン復元
  const radio = document.querySelector(`input[name="mode"][value="${mode}"]`);

  if (radio) {
    radio.checked = true;
  }

  // 初期値
  selectedMood = mode === "step3" ? 2 : 5;
  selectedCond = mode === "step3" ? 2 : 5;

  // 設定変更
  document.querySelectorAll('input[name="mode"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      saveMode(radio.value);

      location.reload();
    });
  });

  // ボタン生成
  createButtons("mood");
  createButtons("cond");

  // 初期表示
  renderChart();
  renderLogs();

  console.log("InnerNote Ver0.2 Ready");
});

// ----------------------------
// 設定画面
// ----------------------------
function toggleSettings() {
  const panel = document.getElementById("settings-panel");

  panel.style.display = panel.style.display === "block" ? "none" : "block";
=======
/*analysis.js ◎
 * ログデータの分析
 * analyzeTrend() - 気分と体調の傾向を分析
 * getAverageScore() - 平均スコア計算
 * getStability() - 安定度を判定
 */

/**
 * 直近ログの傾向を分析
 * @param {Array} logs - ログデータ
 * @param {Number} count - 分析対象件数（デフォルト10）
 * @returns {Object} 分析結果
 */
function analyzeTrend(logs, count = 10) {
    if (!logs || logs.length === 0) {
        return {
            moodAvg: 0,
            condAvg: 0,
            moodTrend: "データなし",
            condTrend: "データなし",
            stability: "評価不可"
        };
    }

    const targetLogs = logs.slice(-count);

    // 平均値を計算
    const moodAvg = getAverageScore(targetLogs.map(l => l.mood));
    const condAvg = getAverageScore(targetLogs.map(l => l.cond));

    // トレンドを判定
    const moodTrend = getTrendDirection(targetLogs.map(l => l.mood));
    const condTrend = getTrendDirection(targetLogs.map(l => l.cond));

    // 安定度を判定
    const stability = getStability(
        [...targetLogs.map(l => l.mood), ...targetLogs.map(l => l.cond)]
    );

    return {
        count: targetLogs.length,
        moodAvg: Math.round(moodAvg * 10) / 10,
        condAvg: Math.round(condAvg * 10) / 10,
        moodTrend,
        condTrend,
        stability
    };
}

/**
 * スコア配列の平均値を計算
 * @param {Array<Number>} scores
 * @returns {Number} 平均値
 */
function getAverageScore(scores) {
    if (scores.length === 0) return 0;
    return scores.reduce((sum, s) => sum + s, 0) / scores.length;
}

/**
 * トレンド方向を判定（上昇/下降/安定）
 * @param {Array<Number>} scores
 * @returns {String} トレンド判定
 */
function getTrendDirection(scores) {
    if (scores.length < 2) return "判定不可";

    const first = scores.slice(0, Math.ceil(scores.length / 2));
    const last = scores.slice(Math.ceil(scores.length / 2));

    const firstAvg = getAverageScore(first);
    const lastAvg = getAverageScore(last);

    const diff = lastAvg - firstAvg;

    if (diff > 1) return "↗️ 改善傾向";
    if (diff < -1) return "↘️ 悪化傾向";
    return "→ ほぼ安定";
}

/**
 * スコアの安定度を判定
 * @param {Array<Number>} scores
 * @returns {String} 安定度評価
 */
function getStability(scores) {
    if (scores.length < 2) return "判定不可";

    const avg = getAverageScore(scores);
    const variance = scores.reduce((sum, s) => sum + Math.pow(s - avg, 2), 0) / scores.length;
    const stdDev = Math.sqrt(variance);

    if (stdDev < 1.5) return "✅ 非常に安定";
    if (stdDev < 3) return "🟢 安定";
    if (stdDev < 5) return "🟡 やや不安定";
    return "🔴 不安定";
>>>>>>> 2571b7275aec63c51187926138b64065b9618389
}
