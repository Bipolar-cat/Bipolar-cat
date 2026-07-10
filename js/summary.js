/*==================================================
InnerNote v2.0
summary.js

役割
・Summary生成
・記録の整理
・客観的事実のみ表示

行わないこと
・診断
・評価
・助言
・原因推測
・コメントへの返答
・将来予測

Summaryは利用者が指定した期間の
記録を整理するための機能です。
==================================================*/

//======================================
// 保存キー
//======================================

const SUMMARY_TS_KEY = "last_summary_ts";
const SUMMARY_STR_KEY = "last_summary_str";

//======================================
// Summary状態表示
//======================================

function renderSummaryStatus() {
  const area = document.getElementById("summary-ts");

  if (!area) return;

  const last = localStorage.getItem(SUMMARY_STR_KEY);

  area.textContent = last ? `前回Summary：${last}` : "前回Summary：なし";
}

//======================================
// Summary対象取得
//======================================

function getSummaryLogs() {
  const logs = getLogs();

  if (logs.length === 0) {
    return [];
  }

  /*
        Ver0.2

        直近10件

        Ver1.0以降

        指定期間

        7日

        30日

        90日

        任意期間
    */

  return logs.slice(-10);
}

//======================================
// 平均計算
//======================================

function calculateAverage(logs) {
  if (logs.length === 0) {
    return {
      mood: 0,

      cond: 0,
    };
  }

  const mood = logs.reduce((sum, l) => sum + l.mood, 0) / logs.length;

  const cond = logs.reduce((sum, l) => sum + l.cond, 0) / logs.length;

  return {
    mood: Number(mood.toFixed(1)),

    cond: Number(cond.toFixed(1)),
  };
}

//======================================
// 頻出単語
//======================================

function extractFrequentWords(logs) {
  const map = {};

  logs.forEach((log) => {
    if (!log.note) return;

    log.note

      .replace(/[。、,\n]/g, " ")

      .split(/\s+/)

      .forEach((word) => {
        word = word.trim();

        if (word.length < 2) return;

        map[word] = (map[word] || 0) + 1;
      });
  });

  return Object.entries(map)

    .sort((a, b) => b[1] - a[1])

    .slice(0, 10);
}

//======================================
// 頻出フレーズ
//======================================

function extractFrequentPhrases(logs) {
  const map = {};

  logs.forEach((log) => {
    if (!log.note) return;

    const text = log.note.trim();

    if (text.length < 4) return;

    map[text] = (map[text] || 0) + 1;
  });

  return Object.entries(map)

    .sort((a, b) => b[1] - a[1])

    .slice(0, 5);
}

//======================================
// Summary表示
//======================================

function renderSummary(logs) {
  const card = document.getElementById("summary-card");

  const content = document.getElementById("summary-content");

  if (!card || !content) return;

  const avg = calculateAverage(logs);

  const words = extractFrequentWords(logs);

  const phrases = extractFrequentPhrases(logs);

  let html = "";

  html += `
<h3>対象情報</h3>

<p>記録件数：${logs.length}件</p>

<p>平均気分：${avg.mood}</p>

<p>平均体調：${avg.cond}</p>
`;

  html += "<hr>";

  html += "<h3>頻出単語</h3>";

  if (words.length === 0) {
    html += "なし";
  } else {
    html += "<ul>";

    words.forEach((w) => {
      html += `
<li>${w[0]}（${w[1]}）</li>
`;
    });

    html += "</ul>";
  }

  html += "<hr>";

  html += "<h3>頻出フレーズ</h3>";

  if (phrases.length === 0) {
    html += "なし";
  } else {
    html += "<ul>";

    phrases.forEach((p) => {
      html += `
<li>${p[0]}</li>
`;
    });

    html += "</ul>";
  }

  html += "<hr>";

  html += "<h3>コメント一覧</h3>";

  logs.forEach((log) => {
    html += `
<p>

${log.date}

<br>

${log.note || ""}

</p>

`;
  });

  content.innerHTML = html;

  card.style.display = "block";
}

//======================================
// Summary生成
//======================================

function generateSummary() {
  const logs = getSummaryLogs();

  if (logs.length === 0) {
    alert("Summary対象がありません。");

    return;
  }

  renderSummary(logs);

  const now = new Date();

  localStorage.setItem(
    SUMMARY_TS_KEY,

    now.getTime(),
  );

  localStorage.setItem(
    SUMMARY_STR_KEY,

    formatDate(now, true),
  );

  renderSummaryStatus();
}
