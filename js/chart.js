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
function renderChart(){

   const logs = getLogs();

   const last10 =
       logs.slice(-10);

   const ctx =
       document
       .getElementById("myChart")
       .getContext("2d");

   new Chart(ctx,{
      ...
   });
}
