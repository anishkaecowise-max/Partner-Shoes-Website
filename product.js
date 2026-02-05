(function(){
  const params = new URLSearchParams(location.search);
  const slug = params.get("slug");

  const p = (window.PRODUCTS || []).find(x => x.slug === slug);
  if(!p){
    document.body.innerHTML = "<div style='padding:40px;font-family:Inter,system-ui'>Product not found. <a href='shop.html'>Back to shop</a></div>";
    return;
  }

  document.title = `${p.name} — PARTNER`;

  const img = document.getElementById("prodImg");
  img.src = p.images[0];
  img.alt = p.name;

  document.getElementById("crumb").textContent = p.name;
  document.getElementById("prodName").textContent = p.name;
  document.getElementById("prodPrice").textContent = formatINR(p.price);

  const cmp = document.getElementById("prodCompare");
  cmp.textContent = p.compareAtPrice ? formatINR(p.compareAtPrice) : "";

  document.getElementById("prodDesc").textContent = p.shortDesc;

  // sizes
  const sizes = document.getElementById("sizes");
  const sizeSelected = document.getElementById("sizeSelected");
  let selected = null;

  sizes.innerHTML = (p.sizes || []).map(s => `<button class="pill" data-size="${s}">${s}</button>`).join("");
  sizes.querySelectorAll("button").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      sizes.querySelectorAll("button").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      selected = btn.dataset.size;
      sizeSelected.textContent = selected;
      updateWA();
    });
  });

  // features
  const ul = document.getElementById("features");
  ul.innerHTML = (p.features || []).map(f => `<li>${f}</li>`).join("");

  // materials
  const mats = document.getElementById("materials");
  mats.innerHTML = (p.materials || []).map(m => `<span class="pill" style="cursor:default">${m}</span>`).join("");

  // whatsapp
  const waBtn = document.getElementById("waBtn");
  function updateWA(){
    const sizeText = selected ? ` Size: ${selected}.` : "";
    const msg = `Hi Partner Shoes, I want to order this shoe: ${p.name}.${sizeText} Please share available sizes and details.`;
    waBtn.href = waLink(msg);
  }
  updateWA();
})();
