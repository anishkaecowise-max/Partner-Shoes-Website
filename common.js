function getShortlist(){
  try { return JSON.parse(localStorage.getItem("partner_shortlist") || "[]"); }
  catch { return []; }
}
function setShortlist(arr){
  localStorage.setItem("partner_shortlist", JSON.stringify(arr));
}
function isShortlisted(slug){
  return getShortlist().includes(slug);
}
function toggleShortlist(slug){
  const list = getShortlist();
  const next = list.includes(slug) ? list.filter(x => x !== slug) : [...list, slug];
  setShortlist(next);
  return next;
}

function getShortlist(){
  try { return JSON.parse(localStorage.getItem("partner_shortlist") || "[]"); }
  catch { return []; }
}
function setShortlist(arr){
  localStorage.setItem("partner_shortlist", JSON.stringify(arr));
}
function isShortlisted(slug){
  return getShortlist().includes(slug);
}
function toggleShortlist(slug){
  const list = getShortlist();
  const next = list.includes(slug) ? list.filter(x => x !== slug) : [...list, slug];
  setShortlist(next);
  return next;
}

function productCardHTML(p){
  const msg = `Hi Partner Shoes, I want to order this shoe: ${p.name}. Please share available sizes and details.`;
  const saved = isShortlisted(p.slug);

  return `
    <a class="card" href="product.html?slug=${encodeURIComponent(p.slug)}" aria-label="${p.name}">
      <div>
        <img src="${p.images[0]}" alt="${p.name}">
      </div>
      <div class="card-body">
        <div style="display:flex; justify-content:space-between; gap:12px; align-items:flex-start;">
          <div>
            <div class="card-title">${p.name}</div>
            <div class="card-desc">${p.shortDesc}</div>
          </div>
          <div style="text-align:right;">
            <div class="price">${formatINR(p.price)}</div>
            ${p.compareAtPrice ? `<div class="compare">${formatINR(p.compareAtPrice)}</div>` : ``}
          </div>
        </div>

        <div style="margin-top:14px; display:flex; justify-content:space-between; gap:10px; flex-wrap:wrap;">
          <button
            class="btn btn-secondary"
            type="button"
            data-shortlist="${p.slug}"
            aria-pressed="${saved ? "true" : "false"}"
            onclick="event.preventDefault(); event.stopPropagation(); window.__toggleShortlist('${p.slug}', this);"
          >
            ${saved ? "Saved" : "Add to Shortlist"}
          </button>

          <a class="btn btn-secondary"
             href="${waLink(msg)}"
             target="_blank"
             rel="noopener noreferrer"
             onclick="event.stopPropagation();">
            Order on WhatsApp
          </a>
        </div>
      </div>
    </a>
  `;
}

// global helper so inline onclick works
window.__toggleShortlist = function(slug, btn){
  const next = toggleShortlist(slug);
  const saved = next.includes(slug);
  btn.textContent = saved ? "Saved" : "Add to Shortlist";
  btn.setAttribute("aria-pressed", saved ? "true" : "false");
};
