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

  // 気分（青）
  drawLine("mood", "blue");

  // 体調（オレンジ）
  drawLine("condition", "orange");
}

function getGraphData() {
  return records
    .filter(r => r.mood !== null && r.condition !== null)
    .slice(-10);
}

function renderGraph(data) {
  const canvas = document.getElementById("graph");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const max = 10; // スケール固定（1〜10想定）
  const stepX = canvas.width / (data.length - 1);

  function updateGraph() {
  const data = getGraphData();
  renderGraph(data);
  }
  
  // 軸反転（上が高い）
  function getY(value) {
    return canvas.height - (value / max) * canvas.height;
  }

  // 線を描く関数
  function drawLine(key, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;

    data.forEach((d, i) => {
      const x = i * stepX;
      const y = getY(d[key]);

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();
  }
  function setMood(value) {
  updateRecord("mood", value);
  updateGraph();
}

function setCondition(value) {
  updateRecord("condition", value);
  updateGraph();
}
  
window.addEventListener("DOMContentLoaded", () => {
  renderThreeButtons("mood-buttons", "mood");
  renderThreeButtons("cond-buttons", "cond");
});


