// site-scripts.js
(() => {
  const STORAGE_KEY = "setoshop_products_v1";
    function seedProductsIfEmpty() {
  const current = readProducts();
  if (current.length > 0) return; // zaten doluysa dokunma

  const seed = [
    {
      id: "seed-1",
      title: "SAMSUNG Galaxy S25 FE 8/256 GB (Beyaz)",
      price: "36000",
      category: "Telefon",
      img: "img/product-3.png"
    },
    {
      id: "seed-2",
      title: "Canon Kamera G2356",
      price: "17000",
      category: "Kamera",
      img: "img/product-4.png"
    },
    {
      id: "seed-3",
      title: "Canon EF 50mm f/1.8 STM",
      price: "15000",
      category: "Lens",
      img: "img/product-5.png"
    },
    {
      id: "seed-4",
      title: "Sony WH1000XM2B Bluetooth Kulaklık",
      price: "2000",
      category: "Kulaklık",
      img: "img/product-8.png"
    },
    {
      id: "seed-5",
      title: "Razer Blackwidow V3 TKL Green Switch",
      price: "5000",
      category: "Klavye",
      img: "img/product-9.png"
    }
  ];

  saveProducts(seed);
}

  const $ = (id) => document.getElementById(id);

  function readProducts() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveProducts(products) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }

  function moneyTR(value) {
    const n = Number(String(value).replace(",", "."));
    if (!Number.isFinite(n)) return value;
    return n.toLocaleString("tr-TR") + " ₺";
  }

  function renderProducts() {
    const list = $("productsList");
    if (!list) return; // admin sayfasında değilsek çık

    const products = readProducts();

    if (products.length === 0) {
      list.innerHTML = `<div class="text-muted">Henüz ürün yok. Soldan ekle, burada gözüksün 😄</div>`;
      return;
    }

    list.innerHTML = products
      .map(
        (p) => `
        <div class="col-md-6 col-lg-4">
          <div class="card p-2 h-100">
            <img src="${p.img || "img/product-3.png"}" 
                 class="img-fluid rounded" 
                 style="height:140px;object-fit:cover" 
                 alt="">
            <div class="p-2">
              <div class="fw-bold">${p.title}</div>
              <div class="small text-muted">${p.category}</div>
              <div class="mt-1">${moneyTR(p.price)}</div>
              <button class="btn btn-sm btn-danger mt-2 w-100" data-del="${p.id}">
                Sil
              </button>
            </div>
          </div>
        </div>
      `
      )
      .join("");

    // Silme butonları
    list.querySelectorAll("[data-del]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-del");
        const next = readProducts().filter((x) => String(x.id) !== String(id));
        saveProducts(next);
        renderProducts();
      });
    });
  }

  // Ürün ekleme
  const form = $("productForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = $("p_title").value.trim();
      const price = $("p_price").value.trim();
      const category = $("p_category").value;
      const img = $("p_img").value.trim();

      const products = readProducts();
      products.unshift({
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now(),
        title,
        price,
        category,
        img
      });

      saveProducts(products);
      form.reset();
      renderProducts();
    });
  }

  // Sayfa açılınca listeyi bas
  document.addEventListener("DOMContentLoaded", renderProducts);
})();
// === DUYURU SİSTEMİ ===
(() => {
  const ANN_KEY = "setoshop_announcements_v1";

  const $ = (id) => document.getElementById(id);

  function readAnn() {
    try { return JSON.parse(localStorage.getItem(ANN_KEY)) || []; }
    catch { return []; }
  }

  function saveAnn(list) {
    localStorage.setItem(ANN_KEY, JSON.stringify(list));
  }

  function renderAnn() {
    const box = $("announcesList");
    if (!box) return; // admin sayfasında değilsek çık

    const list = readAnn();

    if (list.length === 0) {
      box.innerHTML = `<div class="text-muted">Henüz duyuru yok. Soldan ekle, burada gözüksün 😄</div>`;
      return;
    }

    box.innerHTML = list.map(a => `
      <div class="list-group-item d-flex justify-content-between align-items-start">
        <div class="me-3">
          <div class="fw-bold">${a.title}</div>
          ${a.text ? `<div class="small text-muted">${a.text}</div>` : ""}
          ${a.file ? `<a class="small" href="${a.file}" target="_blank">Dosya / Link</a>` : ""}
          <div class="small text-muted mt-1">${new Date(a.createdAt).toLocaleString("tr-TR")}</div>
        </div>
        <button class="btn btn-sm btn-danger" data-ann-del="${a.id}">Sil</button>
      </div>
    `).join("");

    box.querySelectorAll("[data-ann-del]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-ann-del");
        const next = readAnn().filter(x => String(x.id) !== String(id));
        saveAnn(next);
        renderAnn();
      });
    });
  }

  const form = $("announceForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = $("a_title").value.trim();
      const text  = $("a_text").value.trim();
      const file  = $("a_file").value.trim();

      const list = readAnn();
      list.unshift({
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now(),
        title,
        text,
        file,
        createdAt: Date.now()
      });

      saveAnn(list);
      form.reset();
      renderAnn();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
  seedProductsIfEmpty();
  renderProducts();
});

})();

