function saveSettings() {

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
