　　/*settings.js ◎
*⚙ 設定
*
*記録方式
*
*○ 3段階（簡単）
*○ 10段階（細かく記録）
*
*[保存]*/

    function toggleSettings() {
    const panel = document.getElementById("settings-panel");
    panel.style.display =
        panel.style.display === "block" ? "none" : "block";
}
