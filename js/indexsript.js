const stockBarang = JSON.parse(localStorage.getItem("stockBarang")) || [];
const totalPenglanggan = JSON.parse(localStorage.getItem("hslPenjualan")) || [];
const totalPembeli = JSON.parse(localStorage.getItem("Tkonsumen")) || 0;

function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
}

function hitungTotalStok() {
  const barangTersedia = stockBarang.filter((item) => item.jumlah > 0);
  const totalItem = barangTersedia.length;
  document.getElementById("stokOuput").textContent = totalItem;
}

function hitungTotalConsumen() {
  document.getElementById("totalKonsumen").textContent = totalPembeli;
}

function hitungPenghasilanPenjualan() {
  const totalPenghasilanValue = totalPenglanggan.reduce((total, item) => total + item.Penghasilan, 0);
  document.getElementById("totalPenghasilan").textContent = formatRupiah(totalPenghasilanValue);
}

// pemanggilan function
hitungPenghasilanPenjualan();
hitungTotalConsumen();
hitungTotalStok();
