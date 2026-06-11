console.log("script.js loaded");

let records = []; // ← 先にこれ
const record = {...}
records.push(record);
console.log(...)

function setMood(value) {
  const record = {
    id: Date.now(),
    timestamp: Date.now(),
    mood: value,
    condition: null
  };

  function getLatest10() {
  return records.slice(-10);
  }

  const data = getLatest10();
renderGraph(data);

  records.push(record);

  console.log("saved mood:", records);
}

window.addEventListener("DOMContentLoaded", () => {

    renderThreeButtons(
        "mood-buttons",
        "mood"
    );

    renderThreeButtons(
        "cond-buttons",
        "cond"
    );

    function setCondition(value) {
  const record = {
    id: Date.now(),
    timestamp: Date.now(),
    mood: null,
    condition: value
  };

  records.push(record);

  console.log("saved condition:", records);
    }
    
});

{
  id: 1,
  timestamp: 123456,
  mood: 5,
  condition: 6
}
