const SETTINGS_KEY = "innernote_settings";

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

function toggleSettings() {

    const modal =
        document.getElementById(
            "settings-modal"
        );

    if (modal.style.display === "block") {
        modal.style.display = "none";
    } else {
        modal.style.display = "block";
    }
}

function loadSettings() {

const saved =
    localStorage.getItem(
        SETTINGS_KEY
    );

if (!saved) return;

const settings =
    JSON.parse(saved);

function loadSettings() {

    const saved =
        localStorage.getItem(
            SETTINGS_KEY
        );

    if (!saved) return;

    const settings =
        JSON.parse(saved);

    // 診断名復元
    if (
        settings.diagnosis &&
        ![
            "未診断（健常者）",
            "うつ病",
            "双極症",
            "統合失調症",
            "不安障害",
            "適応障害",
            "発達障害"
        ].includes(settings.diagnosis)
    ) {

        document.getElementById(
            "diagnosis-select"
        ).value = "その他";

        document.getElementById(
            "diagnosis-other"
        ).value = settings.diagnosis;

    } else {

        document.getElementById(
            "diagnosis-select"
        ).value =
            settings.diagnosis || "";

    }

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

    // 環境復元
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

        document.getElementById(
            "diagnosis-select"
        ).value = "その他";

        document.getElementById(
            "diagnosis-other"
        ).value = settings.diagnosis;

    } else {

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

function toggleDiagnosisOther() {

    const select =
        document.getElementById(
            "diagnosis-select"
        );

    const other =
        document.getElementById(
            "diagnosis-other"
        );

    if (select.value === "その他") {
        other.style.display = "block";
    } else {
        other.style.display = "none";
    }
}
