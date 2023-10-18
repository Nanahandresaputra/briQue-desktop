export function terbilangFormat(nilai) {
  nilai = Math.floor(Math.abs(nilai));

  var simpanNilaiBagi = 0;
  var huruf = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];
  var temp = "";

  if (nilai < 12) {
    temp = " " + huruf[nilai];
  } else if (nilai < 20) {
    temp = terbilangFormat(Math.floor(nilai - 10)) + " Belas";
  } else if (nilai < 100) {
    simpanNilaiBagi = Math.floor(nilai / 10);
    temp = terbilangFormat(simpanNilaiBagi) + " Puluh" + terbilangFormat(nilai % 10);
  } else if (nilai < 200) {
    temp = " Seratus" + terbilangFormat(nilai - 100);
  } else if (nilai < 1000) {
    simpanNilaiBagi = Math.floor(nilai / 100);
    temp = terbilangFormat(simpanNilaiBagi) + " Ratus" + terbilangFormat(nilai % 100);
  } else if (nilai < 2000) {
    temp = " Seribu" + terbilangFormat(nilai - 1000);
  } else if (nilai < 1000000) {
    simpanNilaiBagi = Math.floor(nilai / 1000);
    temp = terbilangFormat(simpanNilaiBagi) + " Ribu" + terbilangFormat(nilai % 1000);
  } else if (nilai < 1000000000) {
    simpanNilaiBagi = Math.floor(nilai / 1000000);
    temp = terbilangFormat(simpanNilaiBagi) + " Juta" + terbilangFormat(nilai % 1000000);
  } else if (nilai < 1000000000000) {
    simpanNilaiBagi = Math.floor(nilai / 1000000000);
    temp = terbilangFormat(simpanNilaiBagi) + " Miliar" + terbilangFormat(nilai % 1000000000);
  } else if (nilai < 1000000000000000) {
    simpanNilaiBagi = Math.floor(nilai / 1000000000000);
    temp = terbilangFormat(nilai / 1000000000000) + " Triliun" + terbilangFormat(nilai % 1000000000000);
  }

  return temp;
}
