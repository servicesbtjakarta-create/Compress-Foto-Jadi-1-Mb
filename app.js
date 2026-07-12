const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const result = document.getElementById('result');
const settings = document.getElementById('settings'); // Ambil elemen settings
const fileNameInput = document.getElementById('fileName'); // Ambil input nama

upload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Mengambil nama file asli tanpa ekstensi (misal: "liburan.jpg" jadi "liburan")
    const originalName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;

    result.innerHTML = "<p>Sedang memproses gambar...</p>";

    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const targetSize = 1024 * 1024;
            let quality = 0.9;
            let dataUrl = "";

            const scale = Math.min(1, 1500 / Math.max(img.width, img.height));
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            do {
                dataUrl = canvas.toDataURL('image/jpeg', quality);
                quality -= 0.1;
            } while (dataUrl.length > targetSize * 1.33 && quality > 0.1);

            const finalSizeKB = Math.round((dataUrl.length / 1.33) / 1024);

            // Tampilkan pengaturan dan set nilai default input dengan nama file asli
            settings.style.display = "block";
            fileNameInput.value = originalName; // Set otomatis ke nama asli

            result.innerHTML = `
                <p style="color: green;"><b>Berhasil!</b> Perkiraan ukuran: ${finalSizeKB} KB</p>
                <img src="${dataUrl}" alt="Hasil"><br>
                <a id="downloadLink" href="${dataUrl}" download="${originalName}.jpg" class="btn">Download: ${originalName}.jpg</a>
            `;

            // Update link jika pengguna mengubah nama secara manual
            fileNameInput.addEventListener('input', function() {
                const newName = fileNameInput.value || "hasil-kompres";
                document.getElementById('downloadLink').setAttribute('download', newName + '.jpg');
                document.getElementById('downloadLink').innerText = "Download: " + newName + ".jpg";
            });
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});
