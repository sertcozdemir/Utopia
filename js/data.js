// js/data.js

let announcements = JSON.parse(localStorage.getItem('announcements')) || [
    {
        id: 1,
        title: "Yılbaşı İndirimi Başladı!",
        content: "Seçili laptop, telefon ve aksesuar ürünlerinde %40'a varan indirimler başladı. Kampanya stoklarla sınırlıdır.",
        files: [
            { type: "pdf",  name: "Kampanya Şartları", url: "docs/yilbasi-kampanya.pdf" }
        ]
    },
    {
        id: 2,
        title: "Ücretsiz Kargo Fırsatı",
        content: "750 TL ve üzeri tüm alışverişlerde ücretsiz kargo fırsatı geçerlidir.",
        files: [
            { type: "image", name: "Kargo Banner", url: "img/kargo-banner.jpg" }
        ]
    },
    {
        id: 3,
        title: "Öğrencilere Özel İndirim",
        content: "Öğrenci belgesini yükleyen kullanıcılara seçili ürünlerde ekstra %10 indirim.",
        files: [
            { type: "word", name: "Başvuru Formu", url: "docs/ogrenci-indirim-formu.docx" }
        ]
    },
    {
        id: 4,
        title: "Hafta Sonu Flash Sale",
        content: "Sadece bu hafta sonu gaming monitörlerde şok fiyatlar seni bekliyor.",
        files: []
    },
    {
        id: 5,
        title: "Stoklara Yeni Gelen Ürünler",
        content: "Lenovo Legion R27qe monitör ve Polar A370 akıllı bileklik stoklarda!",
        files: [
            { type: "pdf", name: "Yeni Ürün Kataloğu", url: "docs/yeni-urunler.pdf" },
            { type: "image", name: "Legion R27qe Görseli", url: "img/lenovo-r27qe.jpg" }
        ]
    }
];

function saveAnnouncements() {
    localStorage.setItem('announcements', JSON.stringify(announcements));
}
