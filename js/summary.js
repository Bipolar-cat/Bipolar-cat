/* =================================================
   summary.js

   InnerNote Summary機能

   役割
   ・記録されたデータを整理する
   ・指定された範囲の事実を表示する
   ・利用者自身の振り返り材料を作る

   行わないこと
   ・診断
   ・評価
   ・助言
   ・原因推測
   ・将来予測

================================================= */

/* =========================
   Summary保存キー
========================= */

const SUMMARY_TS_KEY = "innernote_last_summary_ts";

const SUMMARY_STR_KEY = "innernote_last_summary_str";

/* =========================
   Summary生成
========================= */

function generateSummary() {
  const logs = getLogs();

  // 記録がない場合
  if (logs.length === 0) {
    alert("まとめを作成するための記録がありません。");

    return;
  }

  /*
      前回Summary以降の記録を対象にする

      ※InnerNote側が期間を決定するのではなく
        利用者が押下したタイミングを基準に
        未確認記録を整理する
    */

  const lastTs = Number(localStorage.getItem(SUMMARY_TS_KEY) || 0);

  let targets = logs.filter((log) => log.ts > lastTs);

  /*
      新しい記録がない場合
    */

  if (targets.length === 0) {
    const result = confirm(
      "前回まとめ作成以降の新しい記録がありません。\n\n直近10件を表示しますか？",
    );

    if (!result) {
      return;
    }

    targets = logs.slice(-10);
  }

  /*
      集計
    */

  const count = targets.length;

  const avgMood = (
    targets.reduce((sum, log) => sum + Number(log.mood), 0) / count
  ).toFixed(1);

  const avgCond = (
    targets.reduce((sum, log) => sum + Number(log.cond), 0) / count
  ).toFixed(1);

  /*
      メモ抽出

      解釈しない
      そのまま表示
    */

  const notes = targets

    .filter((log) => log.note && log.note.trim() !== "")

    .map((log) => `・${log.note}`)

    .join("<br>");

  const startDate = targets[0].date;

  const endDate = targets[targets.length - 1].date;

  renderSummary({
    count,

    startDate,

    endDate,

    avgMood,

    avgCond,

    notes,
  });

  /*
      Summary作成日時保存
    */

  const now = new Date();

  localStorage.setItem(SUMMARY_TS_KEY, now.getTime());

  localStorage.setItem(SUMMARY_STR_KEY, formatDate(now, true));

  const ts = document.getElementById("summary-ts");

  if (ts) {
    ts.textContent = "前回まとめ作成：" + formatDate(now, true);
  }
}

/* =========================
   表示処理
========================= */

function renderSummary(data) {
  const card = document.getElementById("summary-card");

  const content = document.getElementById("summary-content");

  if (!card || !content) {
    return;
  }

  card.style.display = "block";

  content.innerHTML = `


        <div class="report-item">

            対象期間：
            ${data.startDate}
            ～
            ${data.endDate}

        </div>



        <div class="report-item">

            記録件数：
            ${data.count}件

        </div>



        <div class="report-item">

            平均気分：
            ${data.avgMood}

        </div>



        <div class="report-item">

            平均体調：
            ${data.avgCond}

        </div>



        <div class="report-item">

            記録されたメモ：

        </div>



        <div class="report-notes">

            ${data.notes || "（メモはありません）"}

        </div>


    `;
}

/* =========================
   初期表示
========================= */

function loadSummaryStatus() {
  const saved = localStorage.getItem(SUMMARY_STR_KEY);

  const ts = document.getElementById("summary-ts");

  if (saved && ts) {
    ts.textContent = "前回まとめ作成：" + saved;
  }
}
