// main.js
const App = {
    init() {
        // 初回読み込み時に保存された診断名を表示
        document.getElementById('selected-diagnosis').innerText = DataManager.getDiagnosis();
    },

    toggleEdit() {
        document.getElementById('diagnosis-display').style.display = 'none';
        document.getElementById('diagnosis-edit').style.display = 'block';
    },

    saveDiagnosis() {
        const select = document.getElementById('diagnosis-select');
        const value = select.value;
        
        DataManager.saveDiagnosis(value); // DataManager経由で保存
        document.getElementById('selected-diagnosis').innerText = value;
        
        // 表示を元に戻す
        document.getElementById('diagnosis-display').style.display = 'block';
        document.getElementById('diagnosis-edit').style.display = 'none';
    }
};

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', () => App.init());
