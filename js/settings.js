/*settings.js 〇
 * 設定画面の表示制御
 * toggleSettings() - 設定パネルの表示/非表示
 * exportData() - ログデータをエクスポート
 * importData() - ログデータをインポート
 * clearAllData() - 全データを削除
 */

/**
 * 設定パネルの表示/非表示を切り替え
 */
function toggleSettings() {
  const panel = document.getElementById("settings-panel");
  if (panel) {
    panel.style.display = panel.style.display === "none" ? "block" : "none";
  }
}

/**
 * ログデータをJSON形式でダウンロード
 */
function exportData() {
  const logs = getLogs();
  const dataStr = JSON.stringify(logs, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `innernote_backup_${new Date().toISOString().split("T")[0]}.json`;
  link.click();

  URL.revokeObjectURL(url);
  console.log("Data exported successfully");
}

/**
 * JSONファイルからログデータをインポート
 */
function importData() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";

  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedLogs = JSON.parse(event.target.result);

        if (!Array.isArray(importedLogs)) {
          throw new Error("Invalid format: must be an array");
        }

        saveLogs(importedLogs);
        renderLogs();
        renderChart();

        alert(`${importedLogs.length}件のログをインポートしました`);
        console.log("Data imported successfully");
      } catch (err) {
        alert("インポート失敗: " + err.message);
        console.error("Import error:", err);
      }
    };

    reader.readAsText(file);
  };

  input.click();
}

/**
 * 全ログデータを削除（確認ダイアログ付き）
 */
function clearAllData() {
  if (confirm("すべてのログデータを削除します。本当によろしいですか？")) {
    saveLogs([]);
    renderLogs();
    renderChart();
    alert("全データを削除しました");
    console.log("All data cleared");
  }
}
