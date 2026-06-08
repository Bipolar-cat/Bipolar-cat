alert("settings.js読込");

function loadSettings() {

    alert("loadSettings実行");

    const saved =
        localStorage.getItem(
            SETTINGS_KEY
        );

    ...
}
const SETTINGS_KEY = "innernote_settings";

function toggleSettings() {
    const modal = document.getElementById('settings-modal');
    // 開いているか閉じているかを判定
    if (modal.style.display === 'none' || modal.style.display === '') {
        modal.style.display = 'block'; // 開く
    } else {
        modal.style.display = 'none';  // 閉じる
    }
}

function saveSettings() {
    // 保存ボタンを押したら閉じる
    document.getElementById('settings-modal').style.display = 'none';
    alert("設定を保存しました");
}

function openSettings() {

    alert("開く");

    document.getElementById(
        "settings-modal"
    ).style.display = "block";
}

function closeSettings() {

    document.getElementById(
        "settings-modal"
    ).style.display = "none";
}

function loadSettings() {

    const saved =
        localStorage.getItem(
            SETTINGS_KEY
        );

    if (!saved) return;

    const settings =
        JSON.parse(saved);

    // 診断名
    document.getElementById(
        "diagnosis-select"
    ).value =
        settings.diagnosis || "";

    // 年代
    document.getElementById(
        "age-select"
    ).value =
        settings.age || "";

    // 記録方式
    const radio =
        document.querySelector(
            `input[name="recordMode"][value="${settings.recordMode}"]`
        );

    if (radio) radio.checked = true;

   const mode =
    settings.recordMode || "10";

console.log(
    "mode=",
    mode
);

    if (mode === "3") {

        document.getElementById(
            "step3-area"
        ).style.display = "block";

        document.getElementById(
            "step10-area"
        ).style.display = "none";

    } else {

        document.getElementById(
            "step3-area"
        ).style.display = "none";

        document.getElementById(
            "step10-area"
        ).style.display = "block";
    }

    // 環境
    document
        .querySelectorAll(
            '#environment-list input[type="checkbox"]'
        )
        .forEach(cb => {

            cb.checked =
                settings.environments?.includes(
                    cb.value
                ) || false;
        });
}
