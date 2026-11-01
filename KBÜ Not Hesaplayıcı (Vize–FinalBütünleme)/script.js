document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('hesaplayici');
    const devamsizCheck = document.getElementById('devamsizlik');
    const sinavDurumuSelect = document.getElementById('sinav-durumu');
    const vizeInput = document.getElementById('vize-notu');
    const finalInput = document.getElementById('final-notu');
    const butunlemeInput = document.getElementById('butunleme-notu');
    const btnHesapla = document.getElementById('btn-hesapla');
    const btnSifirla = document.getElementById('btn-sifirla');

    const hataMesaji = document.getElementById('hata-mesaji');
    const sonucAlani = document.getElementById('sonuc-alani');
    const sonucBasari = document.getElementById('sonuc-basari');
    const sonucHarf = document.getElementById('sonuc-harf');
    const sonucDurum = document.getElementById('sonuc-durum');
    const sonucAciklama = document.getElementById('sonuc-aciklama');

    butunlemeInput.addEventListener('input', () => {
        if (butunlemeInput.value.trim() !== '') {
            finalInput.disabled = true;
            finalInput.value = '';
        } else if (!devamsizCheck.checked && sinavDurumuSelect.value === 'evet') {
            finalInput.disabled = false;
        }
    });

    devamsizCheck.addEventListener('change', durumDegisikliginiYonet);
    sinavDurumuSelect.addEventListener('change', durumDegisikliginiYonet);

    function durumDegisikliginiYonet() {
        if (devamsizCheck.checked) {
            sinavDurumuSelect.disabled = true;
            vizeInput.disabled = true;
            finalInput.disabled = true;
            butunlemeInput.disabled = true;
        } else {
            sinavDurumuSelect.disabled = false;
            const sinavaGirdiMi = sinavDurumuSelect.value === 'evet';
            vizeInput.disabled = !sinavaGirdiMi;
            finalInput.disabled = !sinavaGirdiMi || (butunlemeInput.value.trim() !== '');
            butunlemeInput.disabled = !sinavaGirdiMi;
        }
    }

    btnHesapla.addEventListener('click', hesapla);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        hesapla();
    });

    btnSifirla.addEventListener('click', () => {
        devamsizCheck.checked = false;

        sinavDurumuSelect.disabled = false;
        sinavDurumuSelect.value = 'evet';

        vizeInput.disabled = false;
        vizeInput.value = '';

        finalInput.disabled = false;
        finalInput.value = '';

        butunlemeInput.disabled = false;
        butunlemeInput.value = '';

        form.reset();

        hataMesaji.style.display = 'none';
        hataMesaji.textContent = '';
        sonucAlani.style.display = 'none';

        sonucBasari.textContent = '-';
        sonucHarf.textContent = '-';
        sonucDurum.textContent = '-';
        sonucAciklama.textContent = '-';
    });

    function hesapla() {
        hataMesaji.style.display = 'none';
        hataMesaji.textContent = '';
        sonucAlani.style.display = 'none';

        if (devamsizCheck.checked) {
            sonucGoster(0, 'F1', 'Kaldı (F1)', 'Devamsız olduğunuz için ders başarısız sayıldı (F1).');
            return;
        }

        if (sinavDurumuSelect.value === 'hayir') {
            sonucGoster(0, 'F2', 'Kaldı (F2)', 'Genel/Bütünleme sınavına girmediğiniz için ders başarısız sayıldı (F2).');
            return;
        }

        const vizeMetin = vizeInput.value.trim();
        const finalMetin = finalInput.value.trim();
        const butunlemeMetin = butunlemeInput.value.trim();

        if (vizeMetin === '') {
            hataGoster('Lütfen yıl içi / vize notunu giriniz.');
            return;
        }

        if (finalMetin === '' && butunlemeMetin === '') {
            hataGoster('Lütfen Final veya Bütünleme notundan en az birini giriniz.');
            return;
        }

        const vizeNotu = parseFloat(vizeMetin);
        const finalDeger = finalMetin !== '' ? parseFloat(finalMetin) : null;
        const butunlemeDeger = butunlemeMetin !== '' ? parseFloat(butunlemeMetin) : null;

        if (isNaN(vizeNotu) || vizeNotu < 0 || vizeNotu > 100) {
            hataGoster('Vize notu 0 ile 100 arasında geçerli bir sayı olmalıdır.');
            return;
        }

        let sinavNotu = 0;
        let sinavTuru = 'Final';

        if (butunlemeDeger !== null) {
            if (isNaN(butunlemeDeger) || butunlemeDeger < 0 || butunlemeDeger > 100) {
                hataGoster('Bütünleme notu 0 ile 100 arasında geçerli bir sayı olmalıdır.');
                return;
            }
            sinavNotu = butunlemeDeger;
            sinavTuru = 'Bütünleme';
        } else {
            if (isNaN(finalDeger) || finalDeger < 0 || finalDeger > 100) {
                hataGoster('Final notu 0 ile 100 arasında geçerli bir sayı olmalıdır.');
                return;
            }
            sinavNotu = finalDeger;
        }

        const basariNotu = (vizeNotu * 0.40) + (sinavNotu * 0.60);
        const basariBicimlendirilmis = Number(basariNotu.toFixed(2));

        if (sinavNotu < 50) {
            sonucGoster(basariBicimlendirilmis, 'F3', 'Kaldı (F3)', `${sinavTuru} sınav notunuz (${sinavNotu}) baraj notu olan 50'nin altında kaldığı için F3 aldınız.`);
            return;
        }

        if (basariBicimlendirilmis < 60) {
            sonucGoster(basariBicimlendirilmis, 'F3', 'Kaldı (F3)', `Ders başarı notunuz (${basariBicimlendirilmis}) geçme sınırı olan 60'ın altında kaldığı için F3 aldınız.`);
            return;
        }

        let harfNotu = '';
        if (basariBicimlendirilmis >= 90) harfNotu = 'A1';
        else if (basariBicimlendirilmis >= 80) harfNotu = 'A2';
        else if (basariBicimlendirilmis >= 70) harfNotu = 'B1';
        else if (basariBicimlendirilmis >= 65) harfNotu = 'B2';
        else if (basariBicimlendirilmis >= 60) harfNotu = 'C';

        sonucGoster(basariBicimlendirilmis, harfNotu, 'Geçti', `Tüm barajları geçtiniz. Ders başarı harf notunuz: ${harfNotu}`);
    }

    function hataGoster(mesaj) {
        hataMesaji.textContent = mesaj;
        hataMesaji.style.display = 'block';
    }

    function sonucGoster(basari, harf, durum, aciklama) {
        sonucBasari.textContent = typeof basari === 'number' ? basari.toFixed(2) : basari;
        sonucHarf.textContent = harf;
        sonucDurum.textContent = durum;
        sonucAciklama.textContent = aciklama;

        if (durum.startsWith('Geçti')) {
            sonucAlani.className = 'sonuc-alani gecti';
        } else {
            sonucAlani.className = 'sonuc-alani kaldi';
        }

        sonucAlani.style.display = 'block';
    }
});