function saveData() {
            const note = document.getElementById('note').value;
            const now = new Date();
            const dateStr = `${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
            
            const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            logs.push({ date: dateStr, mood: selectedMood, cond: selectedCond, note: note, ts: now.getTime() });
            localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
            
            alert("記録しました！");
            location.reload();
}

    try {

        const logs = getLogs();

        console.log(
            "現在の記録数:",
            logs.length
        );

    } catch(e){

        console.error(
            "saveData ERROR",
            e
        );
