console.log("summary.js loaded");
function generateSummary() {
            const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            if (logs.length === 0) return alert("まとめを作成するための記録がありません。");

            const lastSummaryTs = parseInt(localStorage.getItem('last_summary_ts_step3') || '0');
            let targets = logs.filter(l => (l.ts || 0) > lastSummaryTs);
            
            if (targets.length === 0) {
                if(confirm("前回作成以降の新しい記録がありません。直近のデータを再集計しますか？")) {
                    targets = logs.slice(-10); 
                } else {
                    return;
                }
            }
