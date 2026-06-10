const SETTINGS_KEY = "innernote_settings";

// パネル開閉
function toggleSettings() {
  const panel = document.getElementById("settings-panel");
  if (!panel) return;

  panel.classList.toggle("open");
}

// 保存
function saveSettings() {
  const settings = {
    mode: document.getElementById("record-mode")?.value || "",
    diagnosis: document.getElementById("diagnosis")?.value || "",
    diagnosisOther: document.getElementById("diagnosis-other")?.value || "",
    ageGroup: document.getElementById("age-group")?.value || ""
  };

  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  alert("設定を保存しました");
}

// 読み込み
function loadSettings() {
  return JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
}
