/*
InnerNote v2.0
chart.js
2026-07-07
*/

let myChart = null;

// ----------------------------
// グラフ描画
// ----------------------------
function renderChart() {
  const canvas = document.getElementById("myChart");

  if (!canvas) return;

  const logs = getLogs();

  const last10 = logs.slice(-10);

  if (myChart) {
    myChart.destroy();
  }

  const mode = getMode();

  const ctx = canvas.getContext("2d");

  myChart = new Chart(ctx, {
    type: "line",

    data: {
      labels: last10.map((log) => log.date),

      datasets: [
        {
          label: "気分",

          data: last10.map((log) => log.mood),

          borderColor: "#3b82f6",

          backgroundColor: "#3b82f6",

          borderWidth: 2,

          tension: 0.3,

          pointRadius: 4,

          pointHitRadius: 20,

          fill: false,
        },

        {
          label: "体調",

          data: last10.map((log) => log.cond),

          borderColor: "#f59e0b",

          backgroundColor: "#f59e0b",

          borderWidth: 2,

          tension: 0.3,

          pointRadius: 4,

          pointHitRadius: 20,

          fill: false,
        },
      ],
    },

    options: {
      responsive: true,

      maintainAspectRatio: false,

      interaction: {
        mode: "index",

        intersect: false,
      },

      onClick(evt, elements, chart) {
        const points = chart.getElementsAtEventForMode(
          evt,

          "index",

          { intersect: false },

          true,
        );

        if (!points.length) return;

        const log = last10[points[0].index];

        if (!log) return;

        const target = document.getElementById(`log-${log.ts}`);

        if (!target) return;

        target.scrollIntoView({
          behavior: "smooth",

          block: "center",
        });

        target.classList.add("highlight");

        setTimeout(() => {
          target.classList.remove("highlight");
        }, 3000);
      },

      scales: {
        x: {
          ticks: {
            maxRotation: 45,

            minRotation: 45,

            autoSkip: true,

            maxTicksLimit: 7,

            font: {
              size: 9,
            },
          },

          grid: {
            display: false,
          },
        },

        y:
          mode === "step3"
            ? {
                min: 0,

                max: 10,

                ticks: {
                  stepSize: 1,

                  callback(value) {
                    if (value === 10) return "良い";

                    if (value === 5) return "普通";

                    if (value === 0) return "低い";

                    return "";
                  },
                },
              }
            : {
                min: 1,

                max: 10,

                ticks: {
                  stepSize: 1,
                },
              },
      },

      plugins: {
        legend: {
          position: "top",
        },
      },
    },
  });
}
