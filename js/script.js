/*==================================================
InnerNote v2.0
script.js

役割
・画面の初期化
・入力ボタン生成
・入力値管理
・保存処理
・画面更新

他ファイルへ処理を委譲する

storage.js
logs.js
chart.js
summary.js
settings.js

==================================================*/

//======================================
// 現在の選択値
//======================================

let selectedMood = 5;
let selectedCond = 5;

//======================================
// 初期化
//======================================

function initialize() {
  console.log("InnerNote Initialize");

  createButtons("mood");
  createButtons("cond");

  refreshUI();
}

//======================================
// 画面更新
//======================================

function refreshUI() {
  renderChart();

  renderLogs();

  if (typeof renderSummaryStatus === "function") {
    renderSummaryStatus();
  }
}

//======================================
// ボタン生成
//======================================

function createButtons(type) {
  const mode = getMode();

  const container = document.getElementById(
    type === "mood" ? "mood-btns" : "cond-btns",
  );

  if (!container) return;

  container.innerHTML = "";

  //----------------------------------
  // Step3
  //----------------------------------

  if (mode === "step3") {
    const buttons = [
      {
        label: type === "mood" ? "低い" : "悪い",

        value: 1,
      },

      {
        label: "普通",

        value: 5,
      },

      {
        label: "良い",

        value: 10,
      },
    ];

    buttons.forEach((item) => {
      const btn = document.createElement("button");

      btn.textContent = item.label;

      if (item.value === 5) {
        btn.classList.add("active");
      }

      btn.onclick = () => {
        setVal(type, item.value, btn);
      };

      container.appendChild(btn);
    });
  }

  //----------------------------------
  // Step10
  //----------------------------------
  else {
    for (let i = 1; i <= 10; i++) {
      const btn = document.createElement("button");

      btn.textContent = i;

      if (i === 5) {
        btn.classList.add("active");
      }

      btn.onclick = () => {
        setVal(type, i, btn);
      };

      container.appendChild(btn);
    }
  }
}

//======================================
// ボタン選択
//======================================

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

//======================================
// 保存処理
//======================================

function saveData() {
  const note = document.getElementById("note").value.trim();

  const now = new Date();

  const logs = getLogs();

  logs.push({
    ts: now.getTime(),

    date: formatDate(now, true),

    mood: selectedMood,

    cond: selectedCond,

    note: note,
  });

  saveLogs(logs);

  // --------------------
  // 画面更新
  // --------------------

  refreshUI();

  // --------------------
  // 入力クリア
  // --------------------

  document.getElementById("note").value = "";

  // --------------------
  // メッセージ表示
  // --------------------

  const status = document.getElementById("status");

  if (status) {
    status.textContent = "保存しました";

    setTimeout(() => {
      status.textContent = "";
    }, 1500);
  }
}

//======================================
// 初期設定
//======================================

document.addEventListener("DOMContentLoaded", function () {
  console.log("InnerNote Start");
  initialize();
});

console.log("script.js loaded");
