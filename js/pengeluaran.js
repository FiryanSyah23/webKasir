const tombolForm = document.getElementById("submitForm");

tombolForm.addEventListener("click", () => {
  const hasilPenjualan = JSON.parse(localStorage.getItem("hslPenjualan")) || [];
  const pengurangan = parseFloat(document.getElementById("pengeluaran").value);
  const totalPenghasilanValue = hasilPenjualan.reduce((total, item) => total + item.Penghasilan, 0);

  if (totalPenghasilanValue) {
    const penghasilanAkhir = totalPenghasilanValue - pengurangan;
    if (pengurangan > totalPenghasilanValue) {
      alert("Pengeluaran tidak boleh lebih besar dari nilai Penghasilan =" + totalPenghasilanValue);
      return;
    }
    alert("Nilai Penghasilan setelah pengeluaran adalah " + penghasilanAkhir);
  } else {
    alert("Tidak ada penghasilan yang valid.");
  }

  if (isNaN(pengurangan) || pengurangan < 0) {
    alert("Masukkan nilai pengurangan yang valid dan tidak negatif.");
    return;
  }

  hasilPenjualan.forEach((item) => {
    if (item.Penghasilan) {
      item.Penghasilan -= pengurangan;
    }
  });

  

  localStorage.setItem("hslPenjualan", JSON.stringify(hasilPenjualan));
});
