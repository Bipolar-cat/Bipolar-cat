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
}
