window.onload = () => {

    renderThreeButtons(
        "mood-buttons",
        "mood"
    );

    renderThreeButtons(
        "cond-buttons",
        "cond"
    );

};

// js/script.js

// グローバルスコープに各関数を割り当てる（これでonclickから呼び出せるようになります）
window.toggleSettings = toggleSettings;
window.saveSettings = saveSettings;
// 他の関数が必要ならここに追加していく
// window.saveData = saveData; 
