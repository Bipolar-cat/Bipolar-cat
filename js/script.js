console.log("script.js loaded");

        function setVal(type, val, btn) {
            const parent = btn.parentElement;
            parent.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (type === 'mood') selectedMood = val;
            else selectedCond = val;
        }

        function saveData() {
            const note = document.getElementById('note').value;
            const now = new Date();
            const dateStr = `${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
            
            const logs = JSON.parse(localStorage.getItem('innernote_3step_logs') || '[]');
            logs.push({ date: dateStr, mood: selectedMood, cond: selectedCond, note: note });
            localStorage.setItem('innernote_3step_logs', JSON.stringify(logs));
            
            alert("記録しました！");
            location.reload();
        }

        window.onload = () => {
            const logs = JSON.parse(localStorage.getItem('innernote_3step_logs') || '[]');
            const last10 = logs.slice(-10);
            
            const ctx = document.getElementById('myChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: last10.map(l => l.date),
                    datasets: [
                        { 
                            label: '気分', data: last10.map(l => l.mood), 
                            borderColor: '#2196F3', backgroundColor: '#2196F3', 
                            borderWidth: 2, tension: 0.3, fill: false, 
                            pointRadius: 4, pointHitRadius: 15 
                        },
                        { 
                            label: '体調', data: last10.map(l => l.cond), 
                            borderColor: '#FFA726', backgroundColor: '#FFA726', 
                            borderWidth: 2, tension: 0.3, fill: false, 
                            pointRadius: 4, pointHitRadius: 15 
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    layout: { padding: { left: 10, right: 10 } },
                    interaction: { mode: 'index', intersect: false },
                    onClick: (evt, elements, chart) => {
                        const points = chart.getElementsAtEventForMode(evt, 'index', { intersect: false }, true);
                        if (points.length > 0) {
                            scrollToLog(last10[points[0].index].date);
                        }
                    },
                    scales: {
                        x: { ticks: { maxRotation: 45, minRotation: 45, font: { size: 9 }, autoSkip: true, maxTicksLimit: 5 } },
                        y: { 
                            min: 0.8, max: 3.2,
                            ticks: { 
                                stepSize: 1, 
                                callback: v => v==3?'良い':v==2?'普通':v==1?'低/悪':'',
                                font: { size: 10 }, color: '#aaa'
                            },
                            grid: { color: '#f0f0f0' }
                        }
                    },
                    plugins: { 
                        legend: { position: 'top', labels: { boxWidth: 10, font: { size: 12 } } }
                    }
                }
            });

            function scrollToLog(dateStr) {
                const logItems = document.querySelectorAll('.log-item');
                logItems.forEach(item => {
                    item.classList.remove('highlight');
                    if (item.querySelector('.log-date').innerText === dateStr) {
                        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        item.classList.add('highlight');
                    }
                });
            }

            const logList = document.getElementById('log-list');
            logs.slice().reverse().forEach(l => {
                const div = document.createElement('div');
                div.className = 'log-item';
                div.innerHTML = `<span class="log-date">${l.date}</span>気分: ${l.mood==3?'良い':l.mood==2?'普通':'低'} / 体調: ${l.cond==3?'良い':l.cond==2?'普通':'悪い'}<br>${l.note}`;
                logList.appendChild(div);
            });
        };
