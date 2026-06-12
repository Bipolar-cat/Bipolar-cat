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

function saveData() {
            const note = document.getElementById('note').value;
            const now = new Date();
            const dateStr = `${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
            const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            
            // 各ログに一意のタイムスタンプ（ts）を付与して保存
            logs.push({ ts: now.getTime(), date: dateStr, mood: selectedMood, cond: selectedCond, note: note });
            localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
            alert("記録しました！");
            location.reload();
        }
