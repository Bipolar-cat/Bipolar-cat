function saveSettings() {
    // 1. フォームから値を取得
    const settings = {
        diagnosis: document.getElementById("diagnosis-select").value,
        age: document.getElementById("age-select").value,
        recordMode: document.querySelector('input[name="recordMode"]:checked')?.value || "10",
        environments: Array.from(document.querySelectorAll('#environment-list input[type="checkbox"]:checked')).map(cb => cb.value)
    };

    // 2. localStorageに保存
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));

    // 3. 画面を閉じる
    document.getElementById('settings-modal').style.display = 'none';
    alert("設定を保存しました");

    // 4. 重要: 設定を即時反映するためにリロードする
    window.location.reload();
}
