// js/storage.js
export const Storage = {
    getLogs: () => JSON.parse(localStorage.getItem('innernote_vfinal_400_logs') || '[]'),
    saveLog: (log) => { /* 保存ロジック */ }
};

export function saveData() {
    // index.htmlの note から値を取得し、保存するロジック
    const note = document.getElementById('note')?.value;
    alert("保存しました: " + note);
    // 保存後リロード
    location.reload();
}
