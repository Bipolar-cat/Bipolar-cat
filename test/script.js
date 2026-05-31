function createScale(containerId, activeClass) {
    const container = document.getElementById(containerId);
    for (let i = 1; i <= 10; i++) {
        const div = document.createElement('div');
        div.className = 'circle';
        div.innerText = i;
        div.onclick = () => {
            container.querySelectorAll('.circle').forEach(c => c.className = 'circle');
            div.className = `circle ${activeClass}`;
        };
        container.appendChild(div);
    }
}

createScale('mood-scale', 'selected-mood');
createScale('physical-scale', 'selected-physical');
