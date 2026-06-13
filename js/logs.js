<div class="input-section">
            <label class="label">今の気分は？</label>
            <div id="mood-btns" class="btn-group">
                <button onclick="setVal('mood', 1, this)">低い</button>
                <button onclick="setVal('mood', 2, this)" class="active">普通</button>
                <button onclick="setVal('mood', 3, this)">良い</button>
            </div>

            <label class="label">体の調子は？</label>
            <div id="cond-btns" class="btn-group">
                <button onclick="setVal('cond', 1, this)">悪い</button>
                <button onclick="setVal('cond', 2, this)" class="active">普通</button>
                <button onclick="setVal('cond', 3, this)">良い</button>
            </div>

console.log("logs.js loaded");

let selectedMood = 2;
let selectedCond = 2;
