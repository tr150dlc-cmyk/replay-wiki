let members = [];

fetch("members.json")
  .then(response => response.json())
  .then(data => {
    members = data;
    showMembers(members);
  })
  .catch(error => {
    document.getElementById("member-list").innerHTML =
      "<p>データを読み込めませんでした。</p>";
    console.error(error);
  });

function showMembers(list) {
  const area = document.getElementById("member-list");
  area.innerHTML = "";

  list.forEach(member => {
    const tags = member.tags.map(tag => `<span class="tag">${tag}</span>`).join("");

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h2>${member.name}</h2>
      <p class="kana">${member.kana}</p>
      <p>ファンマーク：${member.fanMark || "未登録"}</p>
      <p>ファンネーム：${member.fanName || "未登録"}</p>
      <p>${tags}</p>
      <p>${member.memo || ""}</p>
      <p class="links">
        ${member.youtube ? `<a href="${member.youtube}" target="_blank">YouTube</a>` : ""}
        ${member.x ? `<a href="${member.x}" target="_blank">X</a>` : ""}
      </p>
    `;

    area.appendChild(card);
  });
}

document.getElementById("search").addEventListener("input", e => {
  const word = e.target.value.trim();

  const result = members.filter(member =>
    member.name.includes(word) ||
    member.kana.includes(word)
  );

  showMembers(result);
});
