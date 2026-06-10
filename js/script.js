window.addEventListener("DOMContentLoaded", () => {

  initMoodButtons();
  initCondButtons();

  if (typeof applySettings === "function") {
    applySettings();
  }

});

function initMoodButtons() {
  const el = document.getElementById("mood-btns")
  if (!el) return;

  el.innerHTML = "";

  ["良い", "普通", "低い"].forEach(v => {
    const btn = document.createElement("button");
    btn.className = "record-btn";
    btn.textContent = v;
    el.appendChild(btn);
  });
}

function initCondButtons() {
  document.getElementById("cond-btns")
  if (!el) return;

  el.innerHTML = "";

  ["良い", "普通", "悪い"].forEach(v => {
    const btn = document.createElement("button");
    btn.className = "record-btn";
    btn.textContent = v;
    el.appendChild(btn);
  });
}

btn.addEventListener("click", () => {
  document.querySelectorAll(".record-btn").forEach(b => {
    b.classList.remove("active");
  });
  btn.classList.add("active");
});
