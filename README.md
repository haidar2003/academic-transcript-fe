# II4031-4 Front End
 Tugas 4 II4031 Kriptografi dan Koding Semester II Tahun 2023/2024
# Pranala Server
https://academic-transcript-fe.vercel.app/
# Dibuat Oleh
 Muhammad Rafi Haidar - 18221134
 Raditya Azka Prabaswara - 18221152
# Deskripsi
Program ini merupakan aplikasi frontend dari aplikasi tugas 4.
# Batasan
- Node.js versi 20.9.0 atau lebih baru
# Fitur
Program ini memiliki kemampuan untuk:
a) Membangkitkan kunci publik dan kunci privat RSA;
b) Membangkitan tanda tangan digital (signing) dengan algoritma hash SHA-3 dan RSA;
c) Memverifikasi tanda tangan digital (verifying);
d) Memasukkan data akademik;
e) Mengenkripsi dan mendekripsi field basis data dengan algoritma RC4;
f) Mengenkripsi field basis data yang sudah ditandatangani;
g) Menampilkan isi basis data ke layar (plaintext dan ciphertext);
h) Membuat laporan transkrip akademik setiap mahasiswa dan menyimpan dalam bentuk file PDF yang dienkripsi dengan algoritma AES; dan
i) Mendekripsi file laporan akademik kembali ke format PDF.

#Petunjuk Penggunaan
Aplikasi dapat diakses pada pranala berikut :
https://academic-transcript-fe.vercel.app/

Untuk menjalankan pada localhost, lakukan langkah berikut:
1. Unduh berkas Zip kode sumber dari repository atau clone repository Github
2. Buka direktori yang sudah berisi kode sumber melalui CLI seperti terminal atau command prompt, atau buka direktori kode sumber di aplikasi IDE seperti Visual Studio Code
3. Ketik pada command prompt
   > npm install
4. Setelah itu ketik pada command prompt
   > npm run dev
5. Aplikasi bisa diakses pada http://localhost:5173/

Berikut adalah petunjuk penggunaan fitur aplikasi
Membangkitkan Kunci:  
1. Masuk ke halaman Key Page, dengan menekan tombol Key Page pada Navigation Bar yang terletak di bagian atas halaman
2. Tekan tombol Bangkitkan Kunci
3. Tekan tombol Tampilkan Kunci untuk melihat kunci yang baru  
Memasukkan Data Akademik :  
1. Masuk ke halaman Input Page, dengan menekan tombol Input Page pada bagian paling kiri Navigation Bar yang terletak di bagian atas halaman
2. Masukkan data sesuai dengan form. Pastikan semua data terisi, dan pastikan tidak ada kode mata kuliah yang sama
3. Tekan tombol Submit yang berwarna hijau  
Melihat Isi Basis Data :  
1. Masuk ke halaman Table Page, dengan menekan tombol Table Page pada Navigation Bar yang terletak di bagian atas halaman
2. Di halaman sekarang ditampilkan data akademis
3. Terdapat tiga mode, yaitu semua kolom tidak dienkripsi, semua kolom kecuali kolom Tanda Tangan, enkripsi semua kolom termasuk kolom tanda tangan
4. Untuk mengakses masing-masing mode tekan tombol Tidak Dienkripsi, Enkripsi Semua Kecuali Tanda Tangan, atau Enkripsi Semua, pada bagian atas halaman  
Memverifkasi Tanda Tangan:
1. Masuk ke halaman Validate Page, dengan menekan tombol Validate Page pada Navigation Bar yang terletak di bagian atas halaman
2. Ketik NIM pada kolom NIM
3. Masukkan Tanda Tangan pada kolom Tanda Tangan
4. Jika tanda tangan merupakan tanda tangan yang terenkripsi pilih encrypted, jika tanda tangan berupa plaintext, pilih decrypted
5. Tekan tombol Validasi, hasil akan ditampilkan di bawah tombol Validasi  
Mengunduh PDF yang terenkripsi :  
1. Masuk ke halaman Table Page, dengan menekan tombol Table Page pada Navigation Bar yang terletak di bagian atas halaman
2. Pastikan tampilan basis data sedang berada di dalam mode Tidak Dienkripsi
3. Tekan Unduh PDF, pada baris data yang ingin diunduh PDF-nya
4. File akan diunduh dengan nama "Output" tanpa extension  
Mengunduh PDF plaintextL
1. Masuk ke halaman PDF Page, dengan menekan tombol PDF Page pada Navigation Bar yang terletak di bagian atas halaman
2. Upload File PDF yang terenkripsi yang didapat dari fitur sebelum ini
3. Tekan tombol Unduh PDF
4. File PDF akan terunduh dengan nama "Decrypted" dengan extension .pdf  
