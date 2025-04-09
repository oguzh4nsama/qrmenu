let sepet = [];

function sepetiGuncelle() {
  const sepetDiv = document.getElementById("sepetDiv");
  const sepetCount = document.getElementById("sepetCount");
  const sepetItems = document.getElementById("sepetItems");
  const sepetTotal = document.getElementById("sepetTotal");

  sepetItems.innerHTML = "";

  sepet.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("sepet-item");
  
    itemDiv.innerHTML = `
      <p>${item.isim} - ${item.fiyat} TL 
      <button onclick="urunSil(${index})">Sil</button></p>
    `;
    sepetItems.appendChild(itemDiv);
  });

  sepetCount.innerText = `Sepetinizde ${sepet.length} ürün var`;
  sepetTotal.innerText = `Toplam Tutar: ${toplamTutar.toFixed(2)}  TL`;
}

function urunSil(index) {
  sepet.splice(index, 1);
  sepetiGuncelle();
}

function sepetiGoster() {
 const sepetDiv = document.getElementById("sepetDiv").style.display = "block";
 sepetDiv.style.display = 'block';
}

function sepetiOnayla() {
  if (sepet.length === 0) {
    alert("Sepetinizde ürün yok!");
    return;
  }
  alert("Sepetiniz onaylandı!");
  sepet = [];
  sepetiGuncelle();
  document.getElementById("sepetDiv").style.display = "none";
}

function sepetiKapat() {
  document.getElementById("sepetDiv").style.display = "none";
}

fetch("kategori.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("JSON dosyası yüklenemedi!");
    }
    return response.json();
  })
  .then((data) => {
    const tatlilar = data["tatli"]; // Sadece tatlılar kategorisini alıyoruz
  
    // Tatlılar kategorisini işle
    if (tatlilar) {
      const container = document.getElementById("menuContainer");
      const categoryDiv = document.createElement("div");
      categoryDiv.classList.add("category");
      categoryDiv.innerHTML = `<h2>Tatlılar</h2>`;
  
      const itemContainer = document.createElement("div");
      itemContainer.classList.add("item-container");
  
      tatlilar.forEach((item) => {
        const itemLink = document.createElement("a");
        itemLink.classList.add("item");
        itemLink.href = "#"; // Yönlendirme olmayacak
  
        itemLink.innerHTML = `
          <img src="${item.resim}" alt="${item.isim}" class="item-image">
          <p class="item-name">${item.isim}</p>
          <p class="item-price">${item.fiyat} TL</p>
        `;
  
        // Tıklama olayını ekliyoruz: ürün sepete ekleniyor
        itemLink.addEventListener("click", (event) => {
          event.preventDefault();
          sepet.push(item);
          sepetiGuncelle();
        });
  
        itemContainer.appendChild(itemLink);
      });
  
      categoryDiv.appendChild(itemContainer);
      container.appendChild(categoryDiv);
    } else {
      console.error("Tatlılar kategorisi bulunamadı!");
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
  