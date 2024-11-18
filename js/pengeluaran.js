const tombolForm = document.getElementById("submitForm");

tombolForm.addEventListener("click", () => {
  const hasilPenjualan = JSON.parse(localStorage.getItem("hslPenjualan")) || [];
  const pengurangan = parseFloat(document.getElementById("pengeluaran").value);
  const hasilPenjualanProperty = hasilPenjualan.find((item) => item.Penghasilan > 0);

  if (hasilPenjualanProperty) {
    const penghasilanAkhir = hasilPenjualanProperty.Penghasilan - pengurangan;
    if (pengurangan > hasilPenjualanProperty.Penghasilan) {
      alert("Pengeluaran tidak boleh lebih besar dari nilai Penghasilan =" + hasilPenjualanProperty.Penghasilan);
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
