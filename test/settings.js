const SETTINGS_KEY = "innernote_settings";

function toggleSettings() {

const modal =
    document.getElementById("settings-modal");

modal.style.display =
    modal.style.display === "block"
        ? "none"
        : "block";

}

function saveSettings() {

let diagnosis =
    document.getElementById(
        "diagnosis-select"
    ).value;

const age =
    document.getElementById(
        "age-select"
    ).value;

const recordMode =
    document.querySelector(
        'input[name="recordMode"]:checked'
    )?.value || "10";

const environments =
    Array.from(
        document.querySelectorAll(
            '#environment-list input[type="checkbox"]:checked'
        )
    ).map(cb => cb.value);

if (diagnosis === "その他") {

    diagnosis =
        document.getElementById(
            "diagnosis-other"
        ).value;
}

const settings = {

    diagnosis,
    age,
    recordMode,
    environments

};

localStorage.setItem(
    SETTINGS_KEY,
    JSON.stringify(settings)
);

alert("設定を保存しました");

toggleSettings();

}

function loadSettings() {

const saved =
    localStorage.getItem(
        SETTINGS_KEY
    );

if (!saved) return;

const settings =
    JSON.parse(saved);

document.getElementById(
    "diagnosis-select"
).value =
    settings.diagnosis || "";

document.getElementById(
    "age-select"
).value =
    settings.age || "";

const radio =
    document.querySelector(
        `input[name="recordMode"][value="${settings.recordMode}"]`
    );

if (radio) radio.checked = true;

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
