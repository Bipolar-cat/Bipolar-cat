const STORAGE_KEY = 'innernote_vfinal_400_logs';
const DIAGNOSIS_KEY = 'innernote_saved_diagnosis';

let selectedMood = 5;
let selectedCond = 5;

function saveData() {

    const note = document.getElementById('note').value;

    let diagnosisVal =
        localStorage.getItem(DIAGNOSIS_KEY) || "双極症";

    const isSelectVisible =
        document.getElementById(
            'diagnosis-select-container'
        ).style.display !== 'none';

    if (isSelectVisible) {

        const select =
            document.getElementById('diagnosis-select');

        diagnosisVal = select.value;

        if (diagnosisVal === 'その他') {

            const otherText =
                document.getElementById('diagnosis-other')
                ?.value.trim();

            diagnosisVal =
                otherText
                    ? `その他 (${otherText})`
                    : 'その他';
        }

        localStorage.setItem(
            DIAGNOSIS_KEY,
            diagnosisVal
        );
    }

    const now = new Date();

    const dateStr =
        `${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()} `
        + `${now.getHours().toString().padStart(2,'0')}:`
        + `${now.getMinutes().toString().padStart(2,'0')}`;

    const logs =
        JSON.parse(
            localStorage.getItem(STORAGE_KEY) || '[]'
        );

    logs.push({
        ts: now.getTime(),
        date: dateStr,
        diagnosis: diagnosisVal,
        mood: selectedMood,
        cond: selectedCond,
        note
    });

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(logs)
    );

    alert("記録しました！");
    location.reload();
}
