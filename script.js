let weapons = [];
let currentType = "ALL";

fetch("data.json")
  .then(r => r.json())
  .then(data => {
    weapons = data.weapons;
    render();
  });

document.getElementById("search").addEventListener("input", render);

function filterType(type) {
  currentType = type;
  render();
}

function render() {
  const list = document.getElementById("list");
  const q = document.getElementById("search").value.toLowerCase();

  list.innerHTML = "";

  weapons
    .filter(w => 
      (currentType === "ALL" || w.type === currentType) &&
      w.name.toLowerCase().includes(q)
    )
    .forEach(w => {
      const div = document.createElement("div");
      div.className = "weapon";

      div.innerHTML = `
        <h3>${w.name} (${w.type})</h3>
        <p>${w.desc}</p>
        <div class="code">${w.code}</div>
        <button class="copy" onclick="copy('${w.code}')">コピー</button>
      `;

      list.appendChild(div);
    });
}

function copy(text) {
  navigator.clipboard.writeText(text);
  alert("コピーしました！");
}
