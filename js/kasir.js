const stockBarang = JSON.parse(localStorage.getItem("stockBarang")) || [];
const submitTotalKasir = document.getElementById("submit");
const hasilPenjualan = JSON.parse(localStorage.getItem("hslPenjualan")) || [];

submitTotalKasir.addEventListener("click", function () {
  let totalPenghasilan = 0; // Inisialisasi total penghasilan

  // Ambil semua item dari displayOutput
  const displayOutput = document.getElementById("display-output");
  const items = displayOutput.querySelectorAll("div[data-nama]");

  items.forEach((item) => {
    const jumlahText = item.querySelector(".jumlah").textContent;
    const hargaText = item.querySelector(".harga").textContent;

    // Ambil jumlah dan harga dari teks
    const jumlah = parseInt(jumlahText.replace(/\D/g, "")); // Mengambil angka dari teks
    const harga = parseInt(hargaText.replace(/\D/g, "")); // Mengambil angka dari teks

    // Hitung total untuk item ini
    totalPenghasilan += jumlah * (harga / jumlah); // harga dibagi jumlah untuk mendapatkan harga per item
  });

  class hasilJual {
    constructor(value) {
      this.Penghasilan = value;
    }
  }

  const addPenghasilan = new hasilJual(totalPenghasilan);
  hasilPenjualan.push(addPenghasilan);
  localStorage.setItem("hslPenjualan", JSON.stringify(hasilPenjualan)); // Simpan ke Local Storage

  simpanKeLocalStorage();
  displayOutput.innerHTML = "";
  alert("Data berhasil disimpan ke local storage!");
  alert(`Total harga anda adalah Rp ${totalPenghasilan}`);
  window.location.href = "index.html"; 
});

function ambilData(stockBarang) {
  const dataTable = document.getElementById("output-table-barang").querySelector("tbody");
  dataTable.innerHTML = "";

  stockBarang.forEach((item) => {
    const rowHtml = `
        <tr>
            <td>${item.id}</td>
            <td>${item.nama}</td>
            <td>${item.jumlah}</td>
            <td>${formatRupiah(item.harga)}</td>
            <td>
                <button type="button" class="tambah" onclick="tambah('${item.id}')">+</button>
            </td>
            <td>
                <button type="button" class="kurang" onclick="kurang('${item.id}')">-</button>
            </td>
        </tr>
        `;

    // Menambahkan baris baru ke tabel
    dataTable.innerHTML += rowHtml;
  });
}

function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
}

ambilData(stockBarang);

function tambah(id) {
  const index = stockBarang.findIndex((item) => item.id === id);
  if (index > -1) {
    const maxJumlah = JSON.parse(localStorage.getItem("stockBarang"))[index].jumlah;
    if (stockBarang[index].jumlah > 0) {
      stockBarang[index].jumlah -= 1;
      const jumlahBeli = maxJumlah - stockBarang[index].jumlah;
      const displayOutput = document.getElementById("display-output");
      const existingItem = displayOutput.querySelector(`[data-nama="${stockBarang[index].nama}"]`);
      const harga = formatRupiah(stockBarang[index].harga * jumlahBeli);

      if (jumlahBeli === 0) {
        if (existingItem) {
          existingItem.remove();
        }
      } else {
        if (existingItem) {
          const jumlahElement = existingItem.querySelector(".jumlah");
          const hargaElement = existingItem.querySelector(".harga");
          jumlahElement.textContent = `Jumlah: ${jumlahBeli}`;
          hargaElement.textContent = `Harga: ${harga}`;
        } else {
          const rowOutputHTML = `
                    <div data-nama="${stockBarang[index].nama}">
                        <h3>${stockBarang[index].nama}</h3>
                        <p class="jumlah">Jumlah: ${jumlahBeli}</p>
                        <p class="harga">Harga: ${harga}</p>
                    </div>
                `;
          displayOutput.innerHTML += rowOutputHTML;
        }
      }
      ambilData(stockBarang);
    } else {
      const stockValue = stockBarang.filter((item) => item.jumlah > 0);
      stockValue ? alert(`barang sudah habis`) : alert(`Barang ${stockBarang[index].nama} sudah habis`);
    }
  }
}

function kurang(id) {
  const index = stockBarang.findIndex((item) => item.id === id);
  if (index > -1) {
    const maxJumlah = JSON.parse(localStorage.getItem("stockBarang"))[index].jumlah;
    if (stockBarang[index].jumlah < maxJumlah) {
      stockBarang[index].jumlah += 1;
      const jumlahBeli = maxJumlah - stockBarang[index].jumlah;
      const displayOutput = document.getElementById("display-output");
      const existingItem = displayOutput.querySelector(`[data-nama="${stockBarang[index].nama}"]`);
      const harga = formatRupiah(stockBarang[index].harga * jumlahBeli);

      if (jumlahBeli === 0) {
        if (existingItem) {
          existingItem.remove();
        }
      } else {
        if (existingItem) {
          const jumlahElement = existingItem.querySelector(".jumlah");
          const hargaElement = existingItem.querySelector(".harga");
          jumlahElement.textContent = `Jumlah: ${jumlahBeli}`;
          hargaElement.textContent = `Harga: ${harga}`;
        } else {
          const rowOutputHTML = `
                    <div data-nama="${stockBarang[index].nama}">
                        <h3>${stockBarang[index].nama}</h3>
                        <p class="jumlah">Jumlah: ${jumlahBeli}</p>
                        <p class="harga">Harga: ${harga}</p>
                    </div>
                `;
          displayOutput.innerHTML += rowOutputHTML;
        }
      }
      ambilData(stockBarang);
    } else {
      const stockValue = stockBarang.filter((item) => item.jumlah > 0);
      stockValue ? alert(`barang sudah habis`) : alert(`Jumlah barang ${stockBarang[index].nama} sudah mencapai batas maksimum (${maxJumlah})`);
    }
  }
}

function simpanKeLocalStorage() {
  localStorage.setItem("stockBarang", JSON.stringify(stockBarang));
}
