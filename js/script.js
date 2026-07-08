/* =========================
   script.js
   UI操作・保存処理
========================= */

// ----------------------------
// 現在の選択値
// ----------------------------
let selectedMood = 5;
let selectedCond = 5;

// ----------------------------
// ボタン生成
// ----------------------------
function createButtons(type) {
  const mode = getMode();

  const container = document.getElementById(
    type === "mood" ? "mood-btns" : "cond-btns",
  );

  if (!container) return;

  container.innerHTML = "";

  // ------------------------
  // Step3
  // ------------------------
  if (mode === "step3") {
    const labels = [
      {
        text: type === "mood" ? "低い" : "悪い",

        value: 1,
      },

      {
        text: "普通",

        value: 5,
      },

      {
        text: "良い",

        value: 10,
      },
    ];

    labels.forEach((item) => {
      const btn = document.createElement("button");

      btn.textContent = item.text;

      btn.onclick = () => setVal(type, item.value, btn);

      if (item.value === 5) {
        btn.classList.add("active");
      }

      container.appendChild(btn);
    });
  }

  // ------------------------
  // Step10
  // ------------------------
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

// ----------------------------
// ボタン選択
// ----------------------------
function setVal(type, value, button) {
  const group = button.parentElement;

  group.querySelectorAll("button").forEach((btn) => {
    btn.classList.remove("active");
  });

  button.classList.add("active");

  if (type === "mood") {
    selectedMood = value;
  } else {
    selectedCond = value;
  }
}

// ----------------------------
// モード変更
// ----------------------------
function changeMode(mode) {
  saveMode(mode);

  initialize();
}

// ----------------------------
// 初期化
// ----------------------------
function initialize() {
  createButtons("mood");

  createButtons("cond");

  renderChart();

  renderLogs();
}
