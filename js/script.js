window.addEventListener("DOMContentLoaded", () => {
  console.log("現在の選択:", document.querySelector(".active"));
});

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

function setupSingleSelect(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;

    // ① そのグループだけリセット
    container.querySelectorAll("button").forEach(btn => {
      btn.classList.remove("active");
    });

    // ② 押したものだけON
    e.target.classList.add("active");
  });
}
