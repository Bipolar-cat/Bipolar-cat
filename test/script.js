document.addEventListener('DOMContentLoaded', () => {
    // ボタンを入れる場所（HTMLにある id="mood-btns"）を探す
    const moodContainer = document.getElementById('mood-btns');
    
    // HTMLの「1 2 3...」という文字を消して、ボタンに置き換える
    if (moodContainer) {
        moodContainer.innerHTML = ''; 
        for (let i = 1; i <= 10; i++) {
            const btn = document.createElement('button');
            btn.innerText = i;
            btn.className = 'mood-btn';
            btn.onclick = () => console.log("選択:", i);
            moodContainer.appendChild(btn);
        }
    }
});
window.onload = function() {
    const moodContainer = document.getElementById('mood-btns');
    
    if (moodContainer) {
        // 既存のボタンを消去（念のため）
        moodContainer.innerHTML = '';
        
        // 1から10のボタンを作成
        for (let i = 1; i <= 10; i++) {
            const btn = document.createElement('button');
            btn.innerText = i;
            // スタイルをJSから直接適用して、表示を確実にする
            btn.style.width = '35px';
            btn.style.height = '35px';
            btn.style.borderRadius = '50%';
            btn.style.border = '1px solid #007bff';
            btn.style.background = 'white';
            btn.style.color = '#007bff';
            
            btn.onclick = function() {
                alert(i + ' が選択されました');
            };
            moodContainer.appendChild(btn);
        }
    } else {
        console.error("mood-btns が見つかりません！HTMLを確認してください。");
    }
};
