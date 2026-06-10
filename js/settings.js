document.getElementById("mood-buttons").innerHTML = "TEST";
// ========================
// Settings
// ========================
// import/export を使わず、関数をそのまま書く
function toggleSettings() {
    const panel = document.getElementById('settings-panel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

const SETTINGS_KEY = "innernote_settings";

function toggleSettings() {
  const panel = document.getElementById("settings-panel");

  if (!panel) {
    console.error("settings-panelが見つからない");
    return;
  }

  panel.classList.toggle("open");
}

// 設定保存
function saveSettings() {

    const settings = {

        mode:
            document.getElementById("record-mode").value,

        diagnosis:
            document.getElementById("diagnosis").value,

        diagnosisOther:
            document.getElementById("diagnosis-other").value,

        ageGroup:
            document.getElementById("age-group").value
    };

    localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify(settings)
    );

    alert("設定を保存しました");
}

// 設定読込
function loadSettings() {

    return JSON.parse(
        localStorage.getItem(SETTINGS_KEY)
        || "{}"
    );
}
function saveSettings() {
    // 保存処理
    alert("設定を保存しました");
}
