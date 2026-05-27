function renderScrollableChart(logs) {
    const canvas = document.getElementById('myChart');
    const container = document.getElementById('chart-wrapper');
    
    // データ数に合わせて幅を計算
    const newWidth = Math.max(window.innerWidth, logs.length * 50);
    container.style.width = newWidth + 'px';

    if (window.myChartInstance) window.myChartInstance.destroy();

    const ctx = canvas.getContext('2d');
    window.myChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: logs.map(l => l.date),
            datasets: [
                { label: '気分', data: logs.map(l => l.mood), borderColor: '#3b82f6' },
                { label: '体調', data: logs.map(l => l.cond), borderColor: '#f59e0b' }
            ]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false
        }
    });
}

// 3. 実行（ページ読み込み時に実行する）
window.onload = () => {
    const logs = JSON.parse(localStorage.getItem('innernote_vfinal_400_logs') || '[]');
    renderScrollableChart(logs);
};

let selectedMood = 5;
        let selectedCond = 5;
        let highlightTimeout = null; // タイマー管理用

        function createCircleButtons(containerId, type) {
            const container = document.getElementById(containerId);
            for (let i = 1; i <= 10; i++) {
                const btn = document.createElement('button');
                btn.innerText = i;
                if (i === 5) btn.className = 'active';
                btn.onclick = function() {
                    container.querySelectorAll('button').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    if (type === 'mood') selectedMood = i;
                    else selectedCond = i;
                };
                container.appendChild(btn);
            }
        }

        createCircleButtons('mood-btns', 'mood');
        createCircleButtons('cond-btns', 'cond');

// ページ読み込み時に診断名の初期値を設定
function loadDiagnosis() {
    const savedDiagnosis = localStorage.getItem('innernote_last_diagnosis');
    if (savedDiagnosis) {
        document.getElementById('diagnosis-select').value = savedDiagnosis;
    }
}

        // 記録保存時に診断名も保存する
function saveData() {
    const note = document.getElementById('note').value;
    const diagnosis = document.getElementById('diagnosis-select').value;
    
    // 診断名を次回のために保存
    localStorage.setItem('innernote_last_diagnosis', diagnosis);
    
    // 以下、従来の保存処理
    const now = new Date();
    const dateStr = `${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()} ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    const logs = JSON.parse(localStorage.getItem('innernote_logs') || '[]');
    
    logs.push({ 
        date: dateStr, 
        diagnosis: diagnosis, 
        mood: selectedMood, 
        cond: selectedCond, 
        note: note 
    });
    
    localStorage.setItem('innernote_logs', JSON.stringify(logs));
    alert("記録しました！");
    location.reload();
}

        window.onload = () => {
            const logs = JSON.parse(localStorage.getItem('innernote_vfinal_400_logs') || '[]');
            const last10 = logs.slice(-10);
            
            const ctx = document.getElementById('myChart').getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: last10.map(l => l.date),
                    datasets: [
                        { 
                            label: '気分', data: last10.map(l => l.mood), 
                            borderColor: '#3b82f6', backgroundColor: '#3b82f6',
                            borderWidth: 2, tension: 0.3, pointRadius: 4, pointBackgroundColor: '#3b82f6'
                        },
                        { 
                            label: '体調', data: last10.map(l => l.cond), 
                            borderColor: '#f59e0b', backgroundColor: '#f59e0b',
                            borderWidth: 2, tension: 0.3, pointRadius: 4, pointBackgroundColor: '#f59e0b'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    layout: { padding: { left: 10, right: 20, bottom: 20 } },
                    onClick: (evt, elements) => {
                        if (elements.length > 0) {
                            const index = elements[0].index;
                            const clickedDate = last10[index].date;
                            scrollToLog(clickedDate);
                        }
                    },
                    scales: {
                        x: { ticks: { maxRotation: 45, minRotation: 45, font: { size: 9 }, autoSkip: true, maxTicksLimit: 7 } },
                        y: { min: 1, max: 10, ticks: { stepSize: 1, font: { size: 10 } }, grid: { color: '#f3f4f6' } }
                    },
                    plugins: { legend: { position: 'top' } }
                }
            });

            function scrollToLog(dateStr) {
                const logItems = document.querySelectorAll('.log-item');
                
                // 1. 進行中のタイマーを停止
                if (highlightTimeout) clearTimeout(highlightTimeout);
                
                // 2. 全てのハイライトを強制的に即時削除（再アニメーションを可能にする）
                logItems.forEach(item => {
                    item.style.transition = 'none'; // 一瞬 transition を消して即リセット
                    item.classList.remove('highlight');
                    item.offsetHeight; // リフローを強制してスタイルを適用
                    item.style.transition = ''; // transition を戻す
                });

                // 3. 該当項目を探してスクロール＆ハイライト
                logItems.forEach(item => {
                    if (item.querySelector('.log-date').innerText === dateStr) {
                        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        
                        // 微小な遅延を入れることでブラウザに「新しいクラスがついた」と認識させる
                        setTimeout(() => {
                            item.classList.add('highlight');
                        }, 10);

                        // 4. 数秒後に消去するタイマーを設定
                        highlightTimeout = setTimeout(() => {
                            item.classList.remove('highlight');
                        }, 3000);
                    }
                });
            }

            const logList = document.getElementById('log-list');
            logs.slice().reverse().forEach(l => {
                const div = document.createElement('div');
                div.className = 'log-item';
                div.innerHTML = `<span class="log-date">${l.date}</span>気分: ${l.mood} | 体調: ${l.cond}<br>${l.note}`;
                logList.appendChild(div);
            });
        };
