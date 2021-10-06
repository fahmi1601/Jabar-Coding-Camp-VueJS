//Soal 1
var nilai = 90;
if (nilai >= 85) {
    console.log("Indeksnya A");
} else if((nilai >= 75) && (nilai < 85)) {
    console.log("Indeksnya B");
} else if((nilai >= 65) && (nilai < 75)) {
    console.log("Indeksnya C");
} else if((nilai >= 55) && (nilai < 65)) {
    console.log("Indeksnya D");
} else {
    console.log("Indeksnya E");
}
console.log("");

//Soal 2
var tanggal = 16;
var bulan = 1;
var tahun = 1992;

var bulan1;
switch (bulan) {
    case 1 : bulan1 = "Januari"; break;
    case 2 : bulan1 = "Pebruari"; break;
    case 3 : bulan1 = "Maret"; break;
    case 4 : bulan1 = "April"; break;
    case 5 : bulan1 = "Mei"; break;
    case 6 : bulan1 = "Juni"; break;
    case 7 : bulan1 = "Juli"; break;
    case 8 : bulan1 = "Agustus"; break;
    case 9 : bulan1 = "September"; break;
    case 10 : bulan1 = "Oktober"; break;
    case 11 : bulan1 = "Nopember"; break;
    case 12 : bulan1 = "Desember"; break;
}
console.log(tanggal + " " + bulan1 + " " + tahun);
console.log("");

//Soal 3
var n = 7;
var hasil = "";

for (var i=0;i<n;i++) {
    for (var j=0;j<=i;j++) {
        hasil += "#";
    }
    hasil += "\n";
}
console.log(hasil);

//Soal 4
var m = 10
for (var i=1;i<=m;i++) {
    if(i%3==1) {
        console.log(i + " - I love Programming");
    } else if(i%3==2) {
        console.log(i + " - I love Javascript");
    } else if(i%3==0) {
        console.log(i + " - I love VueJS");
    }

    if(i%3==0) {
        var h = "";
        for (var j=0; j<i; j++) {
            h += "=";
        }
        console.log(h);
    }
}