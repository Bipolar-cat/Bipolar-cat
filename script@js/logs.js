let highlightTimeout = null;

function renderLogs(logs) {

    const logList =
        document.getElementById('log-list');

    logs.slice().reverse().forEach(l => {

        const div =
            document.createElement('div');

        div.className = 'log-item';

        const itemTs =
            l.ts ||
            new Date(l.date).getTime();

        div.id = `log-${itemTs}`;

        const diagBadge =
            l.diagnosis &&
            l.diagnosis !== '未診断（健常者）'
            ? `<span class="log-diagnosis">${l.diagnosis}</span>`
            : '';

        div.innerHTML =
            `<span class="log-date">
            ${l.date}${diagBadge}
            </span>
            気分:${l.mood}
            | 体調:${l.cond}
            <br>
            ${l.note || ''}`;

        logList.appendChild(div);
    });
}

function scrollToLog(timestamp) {

    const targetElement =
        document.getElementById(
            `log-${timestamp}`
        );

    if (!targetElement) return;

    if (highlightTimeout)
        clearTimeout(highlightTimeout);

    document
        .querySelectorAll('.log-item')
        .forEach(item =>
            item.classList.remove('highlight')
        );

    targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });

    setTimeout(() => {
        targetElement.classList.add('highlight');
    }, 10);

    highlightTimeout =
        setTimeout(() => {
            targetElement.classList.remove('highlight');
        }, 3000);
}
