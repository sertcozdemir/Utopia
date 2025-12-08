// charts.js
function buildCharts(){
  const products = JSON.parse(localStorage.getItem('mock_products') || '[]');

  // Kategori dağılımı
  const counts = products.reduce((acc,p)=>{
    acc[p.category] = (acc[p.category]||0)+1;
    return acc;
  }, {});
  const labels = Object.keys(counts);
  const values = Object.values(counts);

  const ctx = document.getElementById('categoryChart');
  if(ctx){
    new Chart(ctx, {
      type: 'pie',
      data: { labels, datasets: [{ data: values }] },
      options: { plugins:{legend:{position:'bottom'}} }
    });
  }

  // Trend: örnek veri (gerçek satış yok, rastgele simülasyon)
  const months = ['Ocak','Şub','Mar','Nis','May','Haz','Ağu','Eyl','Eki','Kas','Ara'];
  const trend = months.map((m,i)=> {
    // Basit: ürün sayısına göre rastgele trend üret
    return Math.max(0, (values.reduce((a,b)=>a+b,0) * (0.4 + Math.random())) + i*5);
  });

  const ctx2 = document.getElementById('trendChart');
  if(ctx2){
    new Chart(ctx2, {
      type: 'line',
      data: { labels: months, datasets: [{ label:'Tahmini Aylık Satış (simülasyon)', data: trend, fill:false }]},
      options: { scales:{y:{beginAtZero:true}}}
    });
  }
}

// Sayfa yüklenince çalıştır
document.addEventListener('DOMContentLoaded', buildCharts);
