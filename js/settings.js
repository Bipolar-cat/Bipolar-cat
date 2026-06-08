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

function saveSettings() {

    const settings = {

        diagnosis:
            document.getElementById(
                "diagnosis"
            ).value,

        ageGroup:
            document.getElementById(
                "age-group"
            ).value,

        affiliation:
            document.getElementById(
                "affiliation"
            ).value,

        environment:
            document.getElementById(
                "environment"
            ).value,

        recordMode:
            document.querySelector(
                'input[name="record-mode"]:checked'
            ).value
    };

    saveSettingsData(settings);

    alert("保存しました");

    closeSettings();
}

function loadSettings() {

    const saved =
        localStorage.getItem(
            SETTINGS_KEY
        );

    if (!saved) return;

    const settings =
        JSON.parse(saved);
    const mode = settings.recordMode || "10";

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

    // 診断名復元
    document.getElementById(
        "diagnosis-select"
    ).value =
        settings.diagnosis || "";

    // 年代復元
    document.getElementById(
        "age-select"
    ).value =
        settings.age || "";

    // 記録方式復元
    const radio =
        document.querySelector(
            `input[name="recordMode"][value="${settings.recordMode}"]`
        );

    if (radio) radio.checked = true;

    // ← ここに追加
    const mode =
        settings.recordMode || "10";

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

    // 属性・環境復元
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
