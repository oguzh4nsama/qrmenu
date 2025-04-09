// Sepet için bir array oluşturuyoruz
let sepet = [];

// Sepet görünümünü güncelleyen fonksiyon
function sepetiGuncelle() {
  const sepetDiv = document.getElementById("sepetDiv");
  const sepetCount = document.getElementById("sepetCount");
  const sepetItems = document.getElementById("sepetItems");
  const sepetTotal = document.getElementById("sepetTotal");  // Toplam tutar için alan

  // Sepet div içeriğini temizleyelim
  sepetItems.innerHTML = "";

  // Sepetteki her ürünün adını ve silme butonunu listeleyelim
  sepet.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("sepet-item");

    itemDiv.innerHTML = `
      <p>${item.isim} - ${item.fiyat} TL 
      <button onclick="urunSil(${index})">Sil</button></p>
    `;
    sepetItems.appendChild(itemDiv);
  });

  // Sepetteki ürün sayısını göster
  sepetCount.innerText = `Sepetinizde ${sepet.length} ürün var`;

  // Toplam tutarı hesapla
  let toplamTutar = sepet.reduce((toplam, item) => toplam + parseFloat(item.fiyat), 0);
  sepetTotal.innerText = `Toplam Tutar: ${toplamTutar.toFixed(2)} TL`;
}

// Sepetten bir ürünü silen fonksiyon
function urunSil(index) {
  sepet.splice(index, 1); // Silinen ürünün index'ini kullanarak ürünü array'den çıkarıyoruz
  sepetiGuncelle(); // Sepeti tekrar güncelliyoruz
}

// Sepet görünümünü açan fonksiyon
function sepetiGoster() {
  const sepetDiv = document.getElementById("sepetDiv");
  sepetDiv.style.display = "block"; // Popup'ı görünür hale getiriyoruz
}

// Sepeti onayla fonksiyonu
function sepetiOnayla() {
  if (sepet.length === 0) {
    alert("Sepetinizde ürün yok!");
    return;
  }
  
  // Sepet onaylandı, buraya sipariş işlemine geçecek kod eklenebilir
  alert("Sepetiniz onaylandı!");
  sepet = []; // Sepeti temizle
  sepetiGuncelle(); // Sepeti güncelle
  document.getElementById("sepetDiv").style.display = "none"; // Popup'ı kapat
}

// Sepeti kapama fonksiyonu
function sepetiKapat() {
  document.getElementById("sepetDiv").style.display = "none"; // Popup'ı kapat
}

// JSON verilerini alıp ürünleri oluşturuyoruz
fetch("kategori.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("JSON dosyası yüklenemedi!");
    }
    return response.json();
  })
  .then((data) => {
    const atistirmaliklar = data["atistirmalik"]; // Sadece atıştırmalıklar kategorisini alıyoruz

    // Atıştırmalıklar kategorisini işle
    if (atistirmaliklar) {
      const container = document.getElementById("menuContainer");
      const categoryDiv = document.createElement("div");
      categoryDiv.classList.add("category");
      categoryDiv.innerHTML = `<h2>Atıştırmalıklar</h2>`;

      const itemContainer = document.createElement("div");
      itemContainer.classList.add("item-container");

      atistirmaliklar.forEach((item) => {
        const itemLink = document.createElement("a");
        itemLink.classList.add("item");
        itemLink.href = "#"; // Yönlendirme olmayacak, sadece tıklama işlevi olacak

        itemLink.innerHTML = `
          <img src="${item.resim}" alt="${item.isim}" class="item-image">
          <p class="item-name">${item.isim}</p>
          <p class="item-price">${item.fiyat} TL</p>
        `;

        // Tıklama olayını ekliyoruz: ürün sepete ekleniyor
        itemLink.addEventListener("click", (event) => {
          event.preventDefault();  // Linkin yönlendirmesini engelliyoruz
          sepet.push(item);        // Sepete ürünü ekle
          sepetiGuncelle();        // Sepeti güncelle
        });

        itemContainer.appendChild(itemLink);
      });

      categoryDiv.appendChild(itemContainer);
      container.appendChild(categoryDiv);
    } else {
      console.error("Atıştırmalıklar kategorisi bulunamadı!");
    }
  })
  .catch((error) => console.error("Hata:", error));

// Butonları bağlayalım
document.getElementById("onaylaBtn").addEventListener("click", sepetiOnayla);
document.getElementById("kapatBtn").addEventListener("click", sepetiKapat);

// Sepet gösterme butonunu bağlayalım
const sepetiGosterBtn = document.createElement('button');
sepetiGosterBtn.innerText = 'Sepeti Göster';
sepetiGosterBtn.addEventListener('click', sepetiGoster);
document.body.appendChild(sepetiGosterBtn); // Sepet göster butonunu sayfaya ekle
