function createCircleButtons(
    containerId,
    type
) {

    const container =
        document.getElementById(
            containerId
        );

    for (let i=1; i<=10; i++) {

        const btn =
            document.createElement(
                'button'
            );

        btn.innerText = i;

        if (i===5)
            btn.className='active';

        btn.onclick = function() {

            container
                .querySelectorAll('button')
                .forEach(
                    b =>
                        b.classList.remove(
                            'active'
                        )
                );

            this.classList.add('active');

            if(type==='mood'){
                selectedMood=i;
            }else{
                selectedCond=i;
            }
        };

        container.appendChild(btn);
    }
}

window.onload = () => {

    loadDiagnosis();

    loadAge();

    loadLogs();

    renderChart();

};
window.onload = () => {

    createCircleButtons(
        'mood-btns',
        'mood'
    );

    createCircleButtons(
        'cond-btns',
        'cond'
    );

    restoreDiagnosis();

    const logs =
        JSON.parse(
            localStorage.getItem(
                STORAGE_KEY
            ) || '[]'
        );

    renderLogs(logs);

    renderScrollableChart(logs);

    const savedStr =
        localStorage.getItem(
            'last_summary_str_final'
        );

    if (savedStr) {

        document.getElementById(
            'summary-ts'
        ).innerText =
            `前回まとめ作成：${savedStr}`;
    }
};

function toggleSettings() {
    const modal = document.getElementById('settings-modal');

    if (modal.style.display === 'block') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'block';
    }
}
