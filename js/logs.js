export function renderLogs(logs) {
    const logList = document.getElementById('log-list');
    logList.innerHTML = ''; // クリア
    logs.slice().reverse().forEach(l => {
        const div = document.createElement('div');
        div.className = 'log-item';
        div.id = `log-${l.ts}`;
        div.innerHTML = `<span class="log-date">${l.date}</span>気分: ${l.mood} | 体調: ${l.cond}<br>${l.note || ''}`;
        logList.appendChild(div);
    });
}
