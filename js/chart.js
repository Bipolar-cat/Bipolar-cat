function renderChart() {

   const logs = getLogs();
   const last10 = logs.slice(-10);

   const ctx =
       document
       .getElementById("myChart")
       .getContext("2d");

   new Chart(ctx,{
      // Chart設定
   });

}
