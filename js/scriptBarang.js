const bukaForm = document.querySelector(".t-tambah");
const modalContainer = document.getElementById("modalContainer");
const stockBarang = JSON.parse(localStorage.getItem("stockBarang")) || []; // Ambil data dari Local Storage

// Menampilkan data dari Local Storage ke tabel saat halaman dimuat
stockBarang.forEach((data) => {
  addRowToTable(data);
});

bukaForm.addEventListener("click", () => {
  const modalHTML = `
        <div class="modal" id="modalForm">
            <div class="modal-content">
                <span class="close" id="closeModal">&times;</span>
                <h2>Tambah Barang</h2>
                <form id="formBarang" autocomplete="off">
                    <label for="id">ID:</label>
                    <input type="text" id="id" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '').slice(0, 4);" /><br>
                    <label for="id">tgl barang masuk:</label>
                    <input type="date" id="tanggal" required><br>
                    <label for="nama">Nama Barang:</label>
                    <input type="text" id="nama" required><br>
                    <label for="jumlah">Jumlah Barang:</label>
                    <input type="number" id="jumlah" required><br>
                    <label for="harga">Harga Persatuan:</label>
                    <input type="text" id="harga" required>
                    <button type="submit" class="t-form">Tambah</button>
                </form>
            </div>
        </div>
    `;

  modalContainer.innerHTML = modalHTML; // Menampilkan modal

  // Menambahkan event listener untuk menutup modal
  const closeModal = document.getElementById("closeModal");
  closeModal.addEventListener("click", () => {
    modalContainer.innerHTML = ""; // Menutup modal
  });

  // Menambahkan event listener untuk form
  const formBarang = document.getElementById("formBarang");
  formBarang.addEventListener("submit", (event) => {
    event.preventDefault(); // Mencegah reload halaman
    const getID = document.getElementById("id").value;
    const getTanggal = document.getElementById("tanggal").value;
    const getNama = document.getElementById("nama").value;
    const getHarga = document.getElementById("harga").value;
    const getJumlah = document.getElementById("jumlah").value;
    const tanggalArray = getTanggal.split("-"); // ["2024", "11", "11"]
    const formattedTanggal = `${tanggalArray[2]}/${tanggalArray[1]}/${tanggalArray[0]}`; // "11-11-2024"

    const existingItemByName = stockBarang.find((item) => item.nama.toLowerCase() === getNama.toLowerCase());
    if (existingItemByName) {
      alert("Nama barang sudah ada! Silakan gunakan nama barang yang berbeda.");
      return;
    }

    const existingItemByID = stockBarang.find((item) => item.id === getID);
    if (existingItemByID) {
      alert("ID sudah ada! Silakan gunakan ID yang berbeda.");
      return;
    }

    class tambahData {
      constructor(id, tanggal, nama, jumlah, harga) {
        this.id = id;
        this.tanggal = tanggal;
        this.nama = nama;
        this.jumlah = jumlah;
        this.harga = harga;
      }
    }

    const instanceName = new tambahData(getID, formattedTanggal, getNama, getJumlah, getHarga);
    stockBarang.push(instanceName);
    localStorage.setItem("stockBarang", JSON.stringify(stockBarang)); // Simpan ke Local Storage
    addRowToTable(instanceName); // Menambahkan baris ke tabel
    modalContainer.innerHTML = ""; // Menutup modal
  });
});

// membuat format rupiah
function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
}

// Fungsi untuk menambahkan baris ke tabel
function addRowToTable(data) {
  const dataTable = document.getElementById("dataTable").querySelector("tbody");
  const rowHTML = `
        <tr>
            <td>${data.id}</td>
            <td>${data.tanggal}</td>
            <td>${data.nama}</td>
            <td>${data.jumlah}</td>
            <td>${formatRupiah(data.harga)}</td>
            <td>${formatRupiah(data.harga * data.jumlah)}</td>
            <td><button type="button" class="buttonEdit" onclick="editRow('${data.id}')">Edit</button></td>
            <td><button type="button" class="buttonDelete" onclick="deleteRow(this, '${data.id}')">Hapus</button></td>
        </tr>
    `;

  dataTable.innerHTML += rowHTML; // Menambahkan baris baru
}

// Fungsi untuk menghapus baris dan data dari Local Storage
function deleteRow(button, id) {
  const row = button.closest("tr");
  const index = stockBarang.findIndex((item) => item.id === id);
  if (index > -1) {
    stockBarang.splice(index, 1); // Hapus data dari array
    localStorage.setItem("stockBarang", JSON.stringify(stockBarang)); // Update Local Storage
  }
  row.remove(); // Hapus baris dari tabel
}

function editRow(id) {
  // Temukan index item yang akan diedit
  const index = stockBarang.findIndex((item) => item.id === id);
  if (index > -1) {
    const data = stockBarang[index];

    // Buat modal edit
    const modalEditHTML = `
      <div class="modal" id="modalFormEdit">
        <div class="modal-content">
          <span class="close" id="closeModal">&times;</span>
          <h2>Edit Barang</h2>
          <form id="formBarangEdit" autocomplete="off">
            <label for="id">ID:</label>
            <input type="number" id="id" class="editRow" value="${data.id}"  maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '').slice(0, 4);" >
            <label for="tanggal">tgl barang masuk:</label>
            <input type="date" id="tanggal" value="${convertDateFormat(data.tanggal)}" required>
            <label for="nama">Nama Barang:</label>
            <input type="text" id="nama" value="${data.nama}" required>
            <label for="jumlah">Jumlah Barang:</label>
            <input type="number" id="jumlah" value="${data.jumlah}" required>
            <label for="harga">Harga Persatuan:</label>
            <input type="text" id="harga" value="${data.harga}" required>
            <button type="submit" class="t-form">Simpan Perubahan</button>
          </form>
        </div>
      </div>
    `;

    // Tampilkan modal
    modalContainer.innerHTML = modalEditHTML;

    // Tutup modal
    const closeModal = document.getElementById("closeModal");
    closeModal.addEventListener("click", () => {
      modalContainer.innerHTML = "";
    });

    // Handle submit edit
    const formBarangEdit = document.getElementById("formBarangEdit");
    formBarangEdit.addEventListener("submit", (event) => {
      event.preventDefault();

      // Ambil nilai baru dari form
      const getID = document.getElementById("id").value;
      const getTanggal = document.getElementById("tanggal").value;
      const getNama = document.getElementById("nama").value;
      const getHarga = document.getElementById("harga").value;
      const getJumlah = document.getElementById("jumlah").value;

      // Format ulang tanggal
      const tanggalArray = getTanggal.split("-");
      const formattedTanggal = `${tanggalArray[2]}/${tanggalArray[1]}/${tanggalArray[0]}`;

      // Update data di array
      stockBarang[index] = {
        id: getID,
        tanggal: formattedTanggal,
        nama: getNama,
        jumlah: getJumlah,
        harga: getHarga,
      };

      // Simpan ke localStorage
      localStorage.setItem("stockBarang", JSON.stringify(stockBarang));

      // Perbarui tabel
      updateTable();

      // Tutup modal
      modalContainer.innerHTML = "";
    });
  }
}

// Fungsi untuk mengonversi format tanggal untuk input date
function convertDateFormat(dateString) {
  // Dari format DD/MM/YYYY ke YYYY-MM-DD
  const [day, month, year] = dateString.split("/");
  return `${year}-${month}-${day}`;
}

// Fungsi untuk memperbarui seluruh tabel
function updateTable() {
  const dataTable = document.getElementById("dataTable").querySelector("tbody");
  dataTable.innerHTML = ""; // Bersihkan tabel

  // Isi ulang tabel dari stockBarang
  stockBarang.forEach((data) => {
    const rowHTML = `
      <tr>
        <td>${data.id}</td>
        <td>${data.tanggal}</td>
        <td>${data.nama}</td>
        <td>${data.jumlah}</td>
        <td>${formatRupiah(data.harga)}</td>
        <td>${formatRupiah(data.harga * data.jumlah)}</td>
        <td><button type="button" class="buttonEdit" onclick="editRow('${data.id}')">Edit</button></td>
        <td><button type="button" class="buttonDelete" onclick="deleteRow(this, '${data.id}')">Hapus</button></td>
      </tr>
    `;
    dataTable.innerHTML += rowHTML;
  });
}
