function toggleOtherDiagnosis() {

    const select =
        document.getElementById('diagnosis-select');

    const otherInput =
        document.getElementById('diagnosis-other');

    if (select.value === 'その他') {

        otherInput.style.display = 'block';
        otherInput.focus();

    } else {

        otherInput.style.display = 'none';
        otherInput.value = '';
    }
}

function unlockDiagnosis() {

    document.getElementById(
        'diagnosis-fixed-container'
    ).style.display = 'none';

    document.getElementById(
        'diagnosis-select-container'
    ).style.display = 'block';
}

function restoreDiagnosis() {

    const savedDiagnosis =
        localStorage.getItem(DIAGNOSIS_KEY);

    if (savedDiagnosis) {

        document.getElementById(
            'diagnosis-select-container'
        ).style.display = 'none';

        document.getElementById(
            'diagnosis-fixed-container'
        ).style.display = 'flex';

        document.getElementById(
            'diagnosis-text'
        ).innerText =
            `主な診断名: ${savedDiagnosis}`;

        const select =
            document.getElementById('diagnosis-select');

        select.value =
            savedDiagnosis.startsWith("その他 (")
                ? "その他"
                : savedDiagnosis;

    } else {

        document.getElementById(
            'diagnosis-fixed-container'
        ).style.display = 'none';

        document.getElementById(
            'diagnosis-select-container'
        ).style.display = 'block';
    }
}

const AGE_KEY = "innernote_age";

function lockAge() {

    const age =
        document.getElementById("age-select").value;

    if (!age) return;

    localStorage.setItem(AGE_KEY, age);

    document.getElementById(
        "age-select-container"
    ).style.display = "none";

    document.getElementById(
        "age-fixed-container"
    ).style.display = "flex";

    document.getElementById(
        "age-text"
    ).innerText = `年代：${age}`;
}

function unlockAge() {

    document.getElementById(
        "age-fixed-container"
    ).style.display = "none";

    document.getElementById(
        "age-select-container"
    ).style.display = "block";
}
