let selectedMood = 2;
let selectedCond = 2;

function saveData() {

    try {

        const note =
            document.getElementById("note").value;

        const now =
            new Date();

        const dateStr =
            `${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()} ${now.getHours().toString().padStart(2,"0")}:${now.getMinutes().toString().padStart(2,"0")}`;

        const logs =
            getLogs();

        logs.push({
            date: dateStr,
            mood: selectedMood,
            cond: selectedCond,
            note: note,
            ts: now.getTime()
        });

        saveLogs(logs);

        alert("記録しました");

    } catch(e){

        console.error(e);

        alert(
            "saveDataエラー\n" +
            e.message
        );
    }
}
