const SETTINGS_KEY = "innernote_settings";

// 設定画面の開閉
function toggleSettings() {
    const modal = document.getElementById('settings-modal');
    if (modal.style.display === 'none' || modal.style.display === '') {
        modal.style.display = 'block';
    } else {
        modal.style.display = 'none';
    }
}
function checkDiagnosis(selectElement) {
    const otherInput = document.getElementById('other-diagnosis');
    if (selectElement.value === "その他") {
        otherInput.style.display = "block"; // 表示する
    } else {
        otherInput.style.display = "none";  // 隠す
    }
}

function openSettings() {
    document.getElementById("settings-modal").style.display = "block";
}

function closeSettings() {
    document.getElementById("settings-modal").style.display = "none";
}

// 設定の保存
function saveSettings() {
    const settings = {
        diagnosis: document.getElementById("diagnosis-select").value,
        age: document.getElementById("age-select").value,
        recordMode: document.querySelector('input[name="recordMode"]:checked')?.value || "10",
        environments: Array.from(document.querySelectorAll('#environment-list input[type="checkbox"]:checked')).map(cb => cb.value)
    };

    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    document.getElementById('settings-modal').style.display = 'none';
    alert("設定を保存しました");
    window.location.reload();
}

// 設定の読み込み
function loadSettings() {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (!saved) return;

    const settings = JSON.parse(saved);

    const diag = document.getElementById("diagnosis-select");
    if (diag) diag.value = settings.diagnosis || "";

    const age = document.getElementById("age-select");
    if (age) age.value = settings.age || "";

    const radio = document.querySelector(`input[name="recordMode"][value="${settings.recordMode}"]`);
    if (radio) radio.checked = true;

    const mode = settings.recordMode || "10";
    const step3 = document.getElementById("step3-area");
    const step10 = document.getElementById("step10-area");

    if (mode === "3") {
        if (step3) step3.style.display = "block";
        if (step10) step10.style.display = "none";
    } else {
        if (step3) step3.style.display = "none";
        if (step10) step10.style.display = "block";
    }

    document.querySelectorAll('#environment-list input[type="checkbox"]').forEach(cb => {
        cb.checked = settings.environments?.includes(cb.value) || false;
    });
}
