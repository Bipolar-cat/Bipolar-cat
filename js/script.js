window.addEventListener("DOMContentLoaded", () => {
  renderButtons("mood-buttons", ["良い","普通","低い"]);
  renderButtons("cond-buttons", ["良い","普通","悪い"]);
});

// グローバルスコープに各関数を割り当てる（これでonclickから呼び出せるようになります）
window.toggleSettings = toggleSettings;
window.saveSettings = saveSettings;
// 他の関数が必要ならここに追加していく
// window.saveData = saveData; 
