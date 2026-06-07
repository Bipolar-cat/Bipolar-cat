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
