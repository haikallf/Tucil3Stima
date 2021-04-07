# Tugas Kecil 3 IF2122 Strategi Algoritma

# Implementasi Algoritma A\* untuk Menentukan Lintasan Terpendek

## General Info
Program dibuat untuk memenuhi Tugas Kecil Strategi Algoritma 3 yang dapat mencari jalur terpendek dari suatu simpul dengan melakukan penelusuran memanfaatkan algoritma A\* shortest path finding.

## Requirements
1. Python
2. Flask
3. Flask-cors
4. node.js
5. Package lain yang terdapat pada src/requrements.txt dan menginstallnya dengan memasukkan command 'pip install -r requirements.txt' pada terminal

## How to
1. Pada terminal, arahkan directory pada folder src
2. Ketik command 'python main.py gui' untuk menjalankan program dengan Google Maps API pada menggunakan browser.
3. Ketik command 'python main.py' untuk menjalankan program pada terminal
4. Pada browser, ketik 'localhost:5000' pada search form browser untuk mengakses local website
5. Klik button 'LOAD GRAPH' untuk memuat file input graf
6. Pilih node pada pada combo box 'Source Node' untuk node asal dan 'Destination Node' untuk node tujuan
7. Klik 'Find Path' untuk menemukan jalan tercepat dari 'Source Node' menuju 'Destination Node'
8. Clear pycache untuk memastikan program dapat membaca file input dengan baik.

## Program Info
1. Map atau satellite pada kiri atas digunakan merubah mode tampilan peta
2. Nodes menampilkan simpul beserta latitude dan longitude nya.
3. Edges menampilkan ketetanggaan antar simpul dan juga jaraknya.
4. Path menampilkan jalan tercepat dari 'Source Node' menuju 'Destination Node' dan total jarak yang ditempuh pada node tersebut, dan view digunakan untuk menampilkan informasi total jarak pada map.
5. Source code berada pada folder 'src'
6. Test case berada pada folder 'test'
7. Laporan berada pada folder 'doc'
8. Format file txt
    - Baris pertama merupakan jumlah node = N
    - Baris kedua hingga ke-N+1 merupakan nama node beserta lokasinya (latitude,longitude)
    - Baris ke-N+2 hingga baris ke-2N+1 merupakan matriks ketetanggaan


## Pembuat Program
- Haikal Lazuardi Fadil - 13519027
- Harith Fakhiri Setiawan - 13519161
