let selectedMood = 2;
let selectedCond = 2;

    function saveData() {

    try {

        const now = new Date();

const dateStr =
    `${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()} ` +
    `${now.getHours().toString().padStart(2,"0")}:${now.getMinutes().toString().padStart(2,"0")}`;

logs.push({
    date: dateStr,   // ← 表示用（必須）
    ts: now.getTime(),
    mood: selectedMood,
    cond: selectedCond,
    note: note
});

        logs = logs.filter(l => (now - l.ts) <= ONE_YEAR);

        saveLogs(logs);

        renderLogs();

        if (typeof renderChart === "function") {
            renderChart();
        }

        alert("記録しました");

    } catch (e) {

        console.error(e);

        alert("saveDataエラー\n" + e.message);
    }
    }

function setVal(type,val,btn){

    const parent =
        btn.parentElement;

    parent
        .querySelectorAll("button")
        .forEach(b =>
            b.classList.remove("active")
        );

    btn.classList.add("active");

    if(type==="mood"){
        selectedMood = val;
    }else{
        selectedCond = val;
    }
}
function renderLogs() {

    const logs = getLogs();

    const logList =
        document.getElementById("log-list");

    if(!logList) return;

    logList.innerHTML = "";

    logs
        .slice()
        .reverse()
        .forEach(l => {

            const div =
                document.createElement("div");

            div.className =
                "log-item";

            div.innerHTML =
                `<span class="log-date">${l.date}</span>
                気分:${l.mood}
                / 体調:${l.cond}<br>
                ${l.note || ""}`;

            logList.appendChild(div);
        });
}
