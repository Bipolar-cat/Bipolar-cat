document.addEventListener('DOMContentLoaded', () => {
    const moodContainer = document.getElementById('mood-btns');
    if (moodContainer) {
        for (let i = 1; i <= 10; i++) {
            const btn = document.createElement('button');
            btn.innerText = i;
            btn.className = 'mood-btn';
            btn.onclick = () => console.log("選択:", i);
            moodContainer.appendChild(btn);
        }
    }
});
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
