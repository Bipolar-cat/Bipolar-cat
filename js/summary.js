 /*summary.js △
 *文章生成
 *generateSummary()
 *例えば
 *const result = analyzeTrend(logs);
 *を受け取って
 *最近10件では気分はやや安定しています。
 *
 *体調は平均6.2です。
 * function generateSummary(logs) {
 *
   * return "最近は安定しています";
*}
*const result = analyzeTrend(logs);*/

function generateSummary() {

    const logs = getLogs();

    if (logs.length === 0) return;

    const last10 = logs.slice(-10);

    alert(`${last10.length}件を分析`);
}
