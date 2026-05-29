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
