(function () {
  const KEY = "partner_shortlist";
  const grid = document.getElementById("shortlistGrid");
  const emptyState = document.getElementById("emptyState");
  const waBtn = document.getElementById("waShortlist");
  const clearAllBtn = document.getElementById("clearAll");
  const slCount = document.getElementById("slCount");

  function getIds() {
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
    catch { return []; }
  }

  function setIds(ids) {
    localStorage.setItem(KEY, JSON.stringify(ids));
  }

  function updateCount(ids) {
    if (slCount) slCount.textContent = ids.length ? `(${ids.length})` : "";
  }

  function waLinkForShortlist(items) {
    if (!items.length) return "#";
    const lines = items.map((p, i) => `${i + 1}) ${p.name} — ₹${p.price} (slug: ${p.slug})`);
    const msg =
      `Hi Partner Shoes, I want to order these shortlisted shoes:\n\n` +
      lines.join("\n") +
      `\n\nPlease share available sizes and details.`;
    return waLink(msg);
  }

  function render() {
    const ids = getIds();
    updateCount(ids);

    const items = (window.PRODUCTS || []).filter(p => ids.includes(p.slug));

    if (!items.length) {
      grid.innerHTML = "";
      emptyState.style.display = "block";
      waBtn.href = "#";
      waBtn.style.pointerEvents = "none";
      waBtn.style.opacity = "0.6";
      return;
    }

    emptyState.style.display = "none";
    waBtn.href = waLinkForShortlist(items);
    waBtn.style.pointerEvents = "auto";
    waBtn.style.opacity = "1";

    grid.innerHTML = items.map(p => `
      <div class="card">
        <a href="product.html?slug=${encodeURIComponent(p.slug)}" aria-label="${p.name}">
          <img src="${p.images[0]}" alt="${p.name}">
        </a>
        <div class="card-body">
          <div style="display:flex; justify-content:space-between; gap:12px; align-items:flex-start;">
            <div>
              <div class="card-title">${p.name}</div>
              <div class="card-desc">${p.shortDesc}</div>
            </div>
            <div style="text-align:right;">
              <div class="price">${formatINR(p.price)}</div>
            </div>
          </div>

          <div style="margin-top:14px; display:flex; justify-content:space-between; gap:10px; flex-wrap:wrap;">
            <a class="btn btn-secondary" href="product.html?slug=${encodeURIComponent(p.slug)}">View</a>
            <button class="btn btn-secondary" data-remove="${p.slug}" type="button">Remove</button>
          </div>
        </div>
      </div>
    `).join("");

    grid.querySelectorAll("button[data-remove]").forEach(btn => {
      btn.addEventListener("click", () => {
        const slug = btn.getAttribute("data-remove");
        const next = getIds().filter(x => x !== slug);
        setIds(next);
        render();
      });
    });
  }

  clearAllBtn.addEventListener("click", () => {
    setIds([]);
    render();
  });

  render();
})();
