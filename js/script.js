console.log("script.js loaded");

let records = [];

// --------------------
// データ保存
// --------------------
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

// --------------------
// 入力
// --------------------
function setMood(value) {
  updateRecord("mood", value);
  updateGraph();
}

function setCondition(value) {
  updateRecord("condition", value);
  updateGraph();
}

// --------------------
// グラフデータ
// --------------------
function getGraphData() {
  return records
    .filter(r => r.mood !== null && r.condition !== null)
    .slice(-10);
}

// --------------------
// グラフ更新
// --------------------
function updateGraph() {
  const data = getGraphData();
  renderGraph(data);
}

// --------------------
// グラフ描画
// --------------------
function renderGraph(data) {
  const canvas = document.getElementById("graph");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (data.length === 0) return;

  const max = 10;
  const stepX = canvas.width / (data.length - 1);

  function getY(value) {
    return canvas.height - (value / max) * canvas.height;
  }

  function drawLine(key, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;

    data.forEach((d, i) => {
      const x = i * stepX;
      const y = getY(d[key]);

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.stroke();
  }

  function openSettings() {
  document.getElementById("settings-panel").style.display = "block";
}

function closeSettings() {
  document.getElementById("settings-panel").style.display = "none";
}

document.querySelector(".settings").onclick = openSettings;
  
  // 気分（青）
  drawLine("mood", "blue");

  // 体調（オレンジ）
  drawLine("condition", "orange");
}

// --------------------
// 初期化
// --------------------
window.addEventListener("DOMContentLoaded", () => {
  renderThreeButtons("mood-btns", "mood");
renderThreeButtons("cond-btns", "condition");

