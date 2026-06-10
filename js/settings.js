// ========================
// Settings
// ========================

const SETTINGS_KEY = "innernote_settings";

function toggleSettings() {

    const panel =
        document.getElementById("settings-panel");

    if (!panel) return;

    if (panel.style.display === "block") {
        panel.style.display = "none";
    } else {
        panel.style.display = "block";
    }
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
