const upload = document.getElementById('upload');
const infoDiv = document.getElementById('info');
const resultDiv = document.getElementById('result');

upload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    // 1. Tampilkan ukuran asli
    const originalSize = (file.size / (1024 * 1024)).toFixed(2);
    infoDiv.innerHTML = `Ukuran file asli: <strong>${originalSize} MB</strong>`;

    // 2. Logika proses kompresi (contoh sederhana)
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            // Kompres ke format JPEG dengan kualitas 0.7
            canvas.toBlob((blob) => {
                const compressedSize = (blob.size / (1024 * 1024)).toFixed(2);
                
                // 3. Tampilkan hasil dan perbandingan
                resultDiv.innerHTML = `
                    <p>Ukuran setelah kompres: <strong>${compressedSize} MB</strong></p>
                    <img src="${URL.createObjectURL(blob)}" alt="Hasil Kompres">
                    <br>
                    <a href="${URL.createObjectURL(blob)}" download="hasil-kompres.jpg" class="btn">Download Foto</a>
                `;
            }, 'image/jpeg', 0.7);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

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
