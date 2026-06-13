let selectedMood = 2;
let selectedCond = 2;

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

function saveData(){

    const logs = getLogs();

    const note =
        document.getElementById("note").value;

    const now = new Date();

    logs.push({
        date: now.toLocaleString(),
        mood: selectedMood,
        cond: selectedCond,
        note: note,
        ts: Date.now()
    });

    saveLogs(logs);

    location.reload();
}
