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

          borderWidth: 3,  // ← 線をしっかり太く

          tension: 0.4,  // ← 緩やかな波を描く

          pointRadius: 6,  // ← 点を大きく（正丸）

          pointHitRadius: 20,

          pointBorderWidth: 2,  // ← 白い縁取りでくっきり

          pointBorderColor: "#fff",

          pointBackgroundColor: "#3b82f6",  // ← 塗りつぶし色

          fill: false,
        },

        {
          label: "体調",

          data: last10.map((log) => log.cond),

          borderColor: "#f59e0b",

          backgroundColor: "#f59e0b",

          borderWidth: 3,  // ← 線をしっかり太く

          tension: 0.4,  // ← 緩やかな波を描く

          pointRadius: 6,  // ← 点を大きく（正丸）

          pointHitRadius: 20,

          pointBorderWidth: 2,  // ← 白い縁取りでくっきり

          pointBorderColor: "#fff",

          pointBackgroundColor: "#f59e0b",  // ← 塗りつぶし色

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

                max: 10.5,  // ← 上に余白を作る

                ticks: {
                  stepSize: 1,

                  padding: 30,  // ← 「良い」ラベルの上に余白

                  callback(value) {
                    if (value === 10) return "良い";

                    if (value === 5) return "普通";

                    if (value === 0) return "低い／悪い";

                    return "";
                  },

                  font: {
                    weight: "bold",
                    size: 14,
                    color: "#222",
                  },
                },

                grid: {
                  color: "rgba(0,0,0,0.08)",  // ← グリッド線を薄く表示
                  drawBorder: true,
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
          labels: {
            padding: 20,  // ← 凡例の下に余白
            font: {
              size: 13,
              weight: "bold",
            },
            boxWidth: 15,
            boxHeight: 15,
          },
        },
      },
    },
  });
}
