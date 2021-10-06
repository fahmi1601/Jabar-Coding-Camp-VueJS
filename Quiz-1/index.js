//Soal 1
function jumlah_kata(str) {
    var hasil = str.split(" ");
    return console.log(hasil.length);
}

var kalimat_1 = "Halo nama saya Muhammad Iqbal Mubarok";
var kalimat_2 = "Saya Iqbal";

jumlah_kata(kalimat_1);
jumlah_kata(kalimat_2);

//Soal 2
function next_date(tgl, bln, thn) {
    
    var jmlHari = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if((bln == 2) && (tgl == 29) && (thn % 4 == 0)) {
        tgl = 1;
        bln = 3;
    }else if((bln == 2) && (tgl == 28) && (thn % 4 == 1)) {
        tgl = 1;
        bln = 3;
    }else if(tgl < jmlHari[bln-1]) {
        tgl = tgl + 1;
    }else if(bln == 12) {
        tgl = 1;
        bln = 1;
        thn = thn + 1;
    }else{
        tgl = 1;
        bln = bln + 1;
    }
    
    switch (bln) {
        case 1 : bulan_nama = "Januari"; break;
        case 2 : bulan_nama = "Pebruari"; break;
        case 3 : bulan_nama = "Maret"; break;
        case 4 : bulan_nama = "April"; break;
        case 5 : bulan_nama = "Mei"; break;
        case 6 : bulan_nama = "Juni"; break;
        case 7 : bulan_nama = "Juli"; break;
        case 8 : bulan_nama = "Agustus"; break;
        case 9 : bulan_nama = "September"; break;
        case 10 : bulan_nama = "Oktober"; break;
        case 11 : bulan_nama = "Nopember"; break;
        case 12 : bulan_nama = "Desember"; break;
    }

    return console.log(tgl + " " + bulan_nama + " " + thn);
}

var tanggal = 30;
var bulan = 6;
var tahun = 2021;

next_date(tanggal, bulan, tahun);