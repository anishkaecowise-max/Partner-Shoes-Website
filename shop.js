(function(){
  const categories = ["All","Derby","Loafers","Sneakers","Boots","Casual","Sports"];
  const pills = document.getElementById("filterPills");
  const grid = document.getElementById("shopGrid");
  const sortSelect = document.getElementById("sortSelect");

  let active = "All";
  let sort = "New Arrivals";

  function renderPills(){
    pills.innerHTML = categories.map(c => `
      <button class="pill ${c===active ? "active":""}" data-cat="${c}">${c}</button>
    `).join("");
    pills.querySelectorAll("button").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        active = btn.dataset.cat;
        renderPills();
        renderGrid();
      });
    });
  }

  function renderGrid(){
    let list = [...(window.PRODUCTS || [])];

    if(active !== "All"){
      list = list.filter(p => (p.categories || []).includes(active));
    }

    if(sort === "New Arrivals"){
      list.sort((a,b)=> Number(!!b.isNew) - Number(!!a.isNew));
    } else {
      list.sort((a,b)=> a.price - b.price);
    }

    grid.innerHTML = list.map(productCardHTML).join("");
  }

  sortSelect.addEventListener("change", (e)=>{
    sort = e.target.value;
    renderGrid();
  });

  renderPills();
  renderGrid();
})();
