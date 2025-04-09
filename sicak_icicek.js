let sepet = [];

function sepetiGuncelle() {
  const sepetDiv = document.getElementById("sepetDiv");
  const sepetCount = document.getElementById("sepetCount");
  const sepetItems = document.getElementById("sepetItems");
  const sepetTotal = document.getElementById("sepetTotal");

  sepetItems.innerHTML = "";

  let toplam = 0;

  sepet.forEach((item, index) => {
    toplam += item.fiyat;

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("sepet-item");
    itemDiv.innerHTML = `
      <p>${item.isim} - ${item.fiyat} TL 
      <button onclick="urunSil(${index})">Sil</button></p>
    `;
    sepetItems.appendChild(itemDiv);
  });

  sepetCount.innerText = `Sepetinizde ${sepet.length} ürün var`;
  sepetTotal.innerText = `Toplam Tutar: ${toplam} TL`;
}

function urunSil(index) {
  sepet.splice(index, 1);
  sepetiGuncelle();
}

function sepetiGoster() {
  document.getElementById("sepetDiv").style.display = "block";
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

// JSON'dan sıcak içecekleri çekip sayfaya yükle
fetch("kategori.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("JSON dosyası yüklenemedi!");
    }
    return response.json();
  })
  .then((data) => {
    const icecekler = data["sicak_icecek"];
    if (!icecekler) {
      console.error("İçecekler kategorisi bulunamadı!");
      return;
    }

    const container = document.getElementById("menuContainer");
    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("category");
    categoryDiv.innerHTML = `<h2>Sıcak İçecekler</h2>`;

    const itemContainer = document.createElement("div");
    itemContainer.classList.add("item-container");

    icecekler.forEach((item) => {
      const itemLink = document.createElement("a");
      itemLink.classList.add("item");
      itemLink.href = "#";

      itemLink.innerHTML = `
        <img src="${item.resim}" alt="${item.isim}" class="item-image">
        <p class="item-name">${item.isim}</p>
        <p class="item-price">${item.fiyat} TL</p>
      `;

      itemLink.addEventListener("click", (event) => {
        event.preventDefault();
        sepet.push(item);
        sepetiGuncelle();
      });

      itemContainer.appendChild(itemLink);
    });

    categoryDiv.appendChild(itemContainer);
    container.appendChild(categoryDiv);
  })
  .catch((error) => console.error("Hata:", error));

// Butonları bağlama
document.getElementById("onaylaBtn").addEventListener("click", sepetiOnayla);
document.getElementById("kapatBtn").addEventListener("click", sepetiKapat);

// Sepeti göster butonu
const sepetiGosterBtn = document.createElement('button');
sepetiGosterBtn.innerText = 'Sepeti Göster';
sepetiGosterBtn.addEventListener('click', sepetiGoster);
document.body.appendChild(sepetiGosterBtn);
