function addLog(entry) {
    const logs = getAllLogs();
    logs.push(entry);
    saveLogsData(logs);
}

function getAllLogs() {
    return loadLogsData();
}

function getRecentLogs(n) {
    const logs = getAllLogs();
    return logs.slice(-n);
}

function formatLog(log) {
    const diagBadge =
        log.diagnosis && log.diagnosis !== '未診断（健常者）'
        ? `【${log.diagnosis}】`
        : '';

    return {
        ...log,
        displayText: `${log.date} ${diagBadge} 気分:${log.mood} 体調:${log.cond}`
    };
}

function openRecord() {

    document.getElementById(
        "record-area"
    ).style.display = "block";

    renderRecordForm();
}

function renderRecordForm() {

    const settings = loadSettingsData();

    const area =
        document.getElementById(
            "record-content"
        );

    if (
        settings.recordMode ===
        "step3"
    ) {

        area.innerHTML = `

        <label>気分</label>

        <div class="step3-group">
            <button>良い</button>
            <button>普通</button>
            <button>低い</button>
        </div>

        <label>体調</label>

        <div class="step3-group">
            <button>良い</button>
            <button>普通</button>
            <button>悪い</button>
        </div>

        <textarea
            id="note"
            placeholder="ひとことメモ">
        </textarea>

        <button
            class="save-btn">

            保存

        </button>
        `;

    } else {

        area.innerHTML = `

        <label>気分</label>

        <div
            id="mood-btns"
            class="circle-scroll">
        </div>

        <label>体調</label>

        <div
            id="cond-btns"
            class="circle-scroll">
        </div>

        <textarea
            id="note"
            placeholder="ひとことメモ">
        </textarea>

        <button
            class="save-btn">

            保存

        </button>
        `;

        createCircleButtons(
            "mood-btns"
        );

        createCircleButtons(
            "cond-btns"
        );
    }
}
