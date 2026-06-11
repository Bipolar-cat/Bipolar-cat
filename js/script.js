console.log("script.js loaded");

let records = [];

// 1日単位で統合保存
function updateRecord(type, value) {
  const today = new Date().toDateString();

  let record = records.find(r => r.date === today);

  if (!record) {
    record = {
      id: Date.now(),
      date: today,
      timestamp: Date.now(),
      mood: null,
      condition: null
    };
    records.push(record);
  }

  record[type] = value;

  console.log("updated records:", records);
}

// 気分
function setMood(value) {
  updateRecord("mood", value);
}

// 体調
function setCondition(value) {
  updateRecord("condition", value);
}

// グラフ用（両方揃ってるものだけ）
function getGraphData() {
  return records
    .filter(r => r.mood !== null && r.condition !== null)
    .slice(-10);
}

// デバッグ
function getLatest10() {
  return records.slice(-10);
}

window.addEventListener("DOMContentLoaded", () => {
  renderThreeButtons("mood-buttons", "mood");
  renderThreeButtons("cond-buttons", "cond");
});
