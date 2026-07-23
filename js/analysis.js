/*==================================================
innarva v2.0
analysis.js

役割
・記録データを整理・集計する
・記録から直接導ける事実のみを返す

行わないこと
・診断
・評価
・助言
・原因の断定
・将来予測
・コメントの解釈
==================================================*/

// ----------------------------
// 指定期間のログ取得
// ----------------------------
function getLogsInPeriod(startDate, endDate) {
  const logs = getLogs();

  return logs.filter((log) => {
    const t = new Date(log.date).getTime();

    return t >= startDate.getTime() && t <= endDate.getTime();
  });
}

// ----------------------------
// 平均値
// ----------------------------
function getAverage(logs, key) {
  if (logs.length === 0) return null;

  const sum = logs.reduce((total, log) => {
    return total + Number(log[key]);
  }, 0);

  return Number((sum / logs.length).toFixed(1));
}

// ----------------------------
// 最小値
// ----------------------------
function getMin(logs, key) {
  if (logs.length === 0) return null;

  return Math.min(...logs.map((log) => Number(log[key])));
}

// ----------------------------
// 最大値
// ----------------------------
function getMax(logs, key) {
  if (logs.length === 0) return null;

  return Math.max(...logs.map((log) => Number(log[key])));
}

// ----------------------------
// 件数
// ----------------------------
function getRecordCount(logs) {
  return logs.length;
}

// ----------------------------
// メモ一覧
// ----------------------------
function getNotes(logs) {
  return logs

    .filter((log) => log.note && log.note.trim() !== "")

    .map((log) => ({
      date: log.date,
      note: log.note,
    }));
}

// ----------------------------
// 頻出語
// （将来拡張）
// ----------------------------
function getFrequentWords(logs) {
  const words = {};

  logs.forEach((log) => {
    if (!log.note) return;

    log.note

      .split(/\s+/)

      .forEach((word) => {
        const w = word.trim();

        if (!w) return;

        words[w] = (words[w] || 0) + 1;
      });
  });

  return Object.entries(words)

    .sort((a, b) => b[1] - a[1]);
}

// ----------------------------
// Summary用データ生成
// ----------------------------
function analyzeLogs(logs) {
  return {
    count: getRecordCount(logs),

    moodAverage: getAverage(logs, "mood"),

    condAverage: getAverage(logs, "cond"),

    moodMin: getMin(logs, "mood"),

    moodMax: getMax(logs, "mood"),

    condMin: getMin(logs, "cond"),

    condMax: getMax(logs, "cond"),

    notes: getNotes(logs),

    frequentWords: getFrequentWords(logs),
  };
}
