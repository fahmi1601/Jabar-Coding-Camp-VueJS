//Soal 1
console.log("Soal 1");
var daftarHewan = ["2. Komodo", "5. Buaya", "3. Cicak", "4. Ular", "1. Tokek"];
daftarHewan.sort();
for (i=0;i<daftarHewan.length;i++) {
    console.log(daftarHewan[i]);
}

//Soal 2
console.log("\nSoal 2");
function introduce(data) {
    var nama = data.name;
    var umur = data.age;
    var alamat = data.address;
    var hobi = data.hobby;

    return "Nama saya " + nama + ", umur saya " + umur + " tahun, alamat saya di " + alamat + ", dan saya punya hobby yaitu " + hobi;
}

var data = {name : "Fahmi" , age : 29 , address : "Jalan Cisaranten" , hobby : "Bersepeda" }
 
var perkenalan = introduce(data)
console.log(perkenalan);

//Soal 3
console.log("\nSoal 3");
function hitung_huruf_vokal(kata) {
    var hasil = kata.match(/[aiueo]/gi).length;
    return hasil;
}

var hitung_1 = hitung_huruf_vokal("Fahmi");
var hitung_2 = hitung_huruf_vokal("Yanuar");
console.log(hitung_1, hitung_2);

//Soal 4
console.log("\nSoal 4");
function hitung(angka) {
    return (angka*2)-2;
}
console.log(hitung(0));
console.log(hitung(1));
console.log(hitung(2));
console.log(hitung(3));
console.log(hitung(4));
console.log(hitung(5));
console.log(hitung(6));