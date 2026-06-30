function toggleSettings(){

    const panel =
        document.getElementById("settings-panel");

    panel.classList.toggle("open");

}

// 現在の選択値
let mood = 5;
let cond = 5;

// ボタン選択
function setVal(type, value, button) {

    // 値を保存
    if (type === "mood") {
        mood = value;
    } else {
        cond = value;
    }

    // 同じグループの active を外す
    const group = document.getElementById(type + "-btns");

    group.querySelectorAll("button").forEach(btn => {
        btn.classList.remove("active");
    });

    // 押したボタンだけ active
    button.classList.add("active");
}

// 記録を保存
function saveData() {

    console.log("saveData exists");

    const note = document.getElementById("note").value;

    const logs = getLogs();

    logs.push({
        date: new Date().toISOString(),
        mood: mood,
        cond: cond,
        note: note
    });

    saveLogs(logs);

    alert("記録しました");
}

console.log(typeof saveData);
