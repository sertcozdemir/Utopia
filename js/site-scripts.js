// site-scripts.js
// Basit localStorage tabanlı mock admin + frontend güncelleme

// Utils
const getProducts = () => JSON.parse(localStorage.getItem('mock_products') || '[]');
const setProducts = (arr) => localStorage.setItem('mock_products', JSON.stringify(arr));
const getAnn = () => JSON.parse(localStorage.getItem('mock_announces') || '[]');
const setAnn = (arr) => localStorage.setItem('mock_announces', JSON.stringify(arr));

// Admin page logic (if elements exist)
document.addEventListener('DOMContentLoaded', () => {
  // Ürün formu
  const pForm = document.getElementById('productForm');
  if(pForm){
    renderProductsAdmin();
    pForm.addEventListener('submit', e => {
      e.preventDefault();
      const title = document.getElementById('p_title').value;
      const price = document.getElementById('p_price').value;
      const category = document.getElementById('p_category').value;
      const img = document.getElementById('p_img').value || 'img/placeholder.png';
      const arr = getProducts();
      const id = Date.now();
      arr.unshift({id, title, price, category, img});
      setProducts(arr);
      alert('✅ Ürün eklendi (simülasyon).');
      pForm.reset();
      renderProductsAdmin();
      // Ayrıca ön yüz listesi otomatik güncellensin
    });
  }

  // Duyuru formu
  const aForm = document.getElementById('announceForm');
  if(aForm){
    renderAnnouncesAdmin();
    aForm.addEventListener('submit', e => {
      e.preventDefault();
      const title = document.getElementById('a_title').value;
      const text = document.getElementById('a_text').value;
      const file = document.getElementById('a_file').value;
      const arr = getAnn();
      arr.unshift({id:Date.now(), title, text, file});
      setAnn(arr);
      alert('✅ Duyuru eklendi (simülasyon).');
      aForm.reset();
      renderAnnouncesAdmin();
    });
  }

  // Eğer ön yüz product listesi varsa render et
  renderProductsFrontend();
  renderAnnouncesFrontend();
});

// Render admin product list
function renderProductsAdmin(){
  const container = document.getElementById('productsList');
  if(!container) return;
  const arr = getProducts();
  container.innerHTML = arr.map(p => `
    <div class="col-md-3">
      <div class="card p-2">
        <img src="${p.img}" class="img-fluid" style="height:120px;object-fit:cover">
        <strong class="d-block mt-1">${p.title}</strong>
        <small class="text-muted">${p.category}</small>
        <div class="d-flex justify-content-between align-items-center mt-2">
          <span class="fw-bold">${p.price} ₺</span>
          <button class="btn btn-sm btn-danger" onclick="removeProduct(${p.id})">Sil</button>
        </div>
      </div>
    </div>
  `).join('');
}

function removeProduct(id){
  if(!confirm('Silmek istediğine emin misin? (simülasyon)')) return;
  const arr = getProducts().filter(p=>p.id!==id);
  setProducts(arr);
  renderProductsAdmin();
  renderProductsFrontend();
}

// Render admin announces
function renderAnnouncesAdmin(){
  const container = document.getElementById('announcesList');
  if(!container) return;
  const arr = getAnn();
  container.innerHTML = arr.map(a => `
    <div class="list-group-item">
      <div class="d-flex justify-content-between">
        <strong>${a.title}</strong>
        <small>${new Date(a.id).toLocaleString()}</small>
      </div>
      <div>${a.text ? a.text.substring(0,120) : ''}</div>
      <div class="mt-2">
        ${a.file ? `<a href="${a.file}" target="_blank" class="btn btn-sm btn-outline-primary">Dosyayı Aç</a>` : ''}
        <button class="btn btn-sm btn-outline-danger" onclick="removeAnn(${a.id})">Sil</button>
      </div>
    </div>
  `).join('');
}

function removeAnn(id){
  if(!confirm('Duyuruyu silmek istediğine emin misin?')) return;
  const arr = getAnn().filter(a=>a.id!==id);
  setAnn(arr);
  renderAnnouncesAdmin();
  renderAnnouncesFrontend();
}

// Front-end render functions (kullanıcı görecek taraf)
function renderProductsFrontend(){
  // Projede ana sayfada ürünleri göstereceğin kontainerin id'sini bu fonksiyona bağla.
  const container = document.querySelector('#frontProducts');
  if(!container) return;
  const arr = getProducts();
  if(arr.length===0){
    container.innerHTML = `<div class="alert alert-info">Henüz ürün eklenmemiş (admin panelinden ekleyin).</div>`;
    return;
  }
  container.innerHTML = arr.map(p => `
    <div class="col-md-4 mb-3">
      <div class="card h-100">
        <img src="${p.img}" class="card-img-top" style="height:180px;object-fit:cover">
        <div class="card-body">
          <h6 class="card-title">${p.title}</h6>
          <p class="card-text">${p.category} • <strong>${p.price} ₺</strong></p>
          <a href="product.html?id=${p.id}" class="btn btn-sm btn-primary">Detay</a>
        </div>
      </div>
    </div>
  `).join('');
}

function renderAnnouncesFrontend(){
  const container = document.querySelector('#frontAnnounces');
  if(!container) return;
  const arr = getAnn();
  if(arr.length===0){
    container.innerHTML = `<p>Şu anda duyuru yok.</p>`;
    return;
  }
  container.innerHTML = arr.slice(0,5).map(a => `
    <div class="mb-2">
      <a href="#" class="announce-link" data-id="${a.id}"><strong>${a.title}</strong></a>
      <small class="d-block text-muted">${new Date(a.id).toLocaleString()}</small>
    </div>
  `).join('');

  // modal handler
  document.querySelectorAll('.announce-link').forEach(el=>{
    el.addEventListener('click', e=>{
      e.preventDefault();
      const id = Number(el.dataset.id);
      const ann = getAnn().find(x=>x.id===id);
      if(!ann) return;
      showAnnModal(ann);
    });
  });
}

function showAnnModal(ann){
  // Basit modal - Bootstrap kullanırsan onun modal yapısını da kullan
  const modalHtml = `
    <div class="modal-backdrop" id="annModal" style="position:fixed;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:2000">
      <div class="card p-3" style="width:90%;max-width:600px">
        <h5>${ann.title}</h5>
        <p>${ann.text || ''}</p>
        ${ann.file ? `<a href="${ann.file}" target="_blank">Dosyayı indir</a>` : ''}
        <div class="text-end mt-3">
          <button class="btn btn-secondary" onclick="document.getElementById('annModal').remove()">Kapat</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
}
