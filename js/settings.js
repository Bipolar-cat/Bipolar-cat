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

    const settings =
        loadSettingsData();

    if (!settings.recordMode) {
        return;
    }

    document.getElementById(
        "diagnosis"
    ).value =
        settings.diagnosis || "";

    document.getElementById(
        "age-group"
    ).value =
        settings.ageGroup || "";

    document.getElementById(
        "affiliation"
    ).value =
        settings.affiliation || "";

    document.getElementById(
        "environment"
    ).value =
        settings.environment || "";

    document.querySelector(
        `input[value="${settings.recordMode}"]`
    ).checked = true;
}
