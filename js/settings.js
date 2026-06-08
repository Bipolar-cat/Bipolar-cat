function loadSettings() {

    alert("loadSettings実行");

    const saved =
        localStorage.getItem(
            SETTINGS_KEY
        );

    ...
}
const SETTINGS_KEY = "innernote_settings";

function saveSettings() {
    alert("saveSettings実行");

    const settings = {

        diagnosis:
            document.getElementById(
                "diagnosis-select"
            ).value,

        age:
            document.getElementById(
                "age-select"
            ).value,

        recordMode:
            document.querySelector(
                'input[name="recordMode"]:checked'
            )?.value || "10",

        environments:
            Array.from(
                document.querySelectorAll(
                    '#environment-list input[type="checkbox"]:checked'
                )
            ).map(cb => cb.value)
    };

    localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify(settings)
    );

    alert("保存しました");

    closeSettings();

    loadSettings();
}

function openSettings() {

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
