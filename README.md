KBÜ Not Hesaplayıcı

Bu proje Karabük Üniversitesi'nin not sistemine göre yapılmış basit bir not hesaplama uygulamasıdır. Vize, final, bütünleme notları ve devamsızlık durumuna bakarak dersi geçip geçmediğinizi ve harf notunuzu söyler.

Not Hesaplama Kuralları

Vizenin %40'ı, finalin (veya bütünlemenin) %60'ı alınır.

Bütünleme notu girilirse final notu yerine geçer.

Dersi geçme şartları:

Final veya Bütünleme notunun en az 50 olması gerekir.

Ortalamanın (başarı notunun) en az 60 olması gerekir.

Kaldığınız durumlar (F Notları):

F1: Devamsız olduğunuzda verilir.

F2: Sınava girmediğinizde verilir.

F3: Final/Büt 50'den küçükse veya ortalama 60'ın altında kaldıysa verilir.

Harf Notları:

90–100 arası: A1

80–89 arası: A2

70–79 arası: B1

65–69 arası: B2

60–64 arası: C

Nasıl Kullanılır?

Projede sadece HTML, CSS ve JavaScript kullanılmıştır. Ekstra bir şey kurmaya gerek yoktur.

Proje dosyalarını bilgisayarınıza indirin.

Klasörün içindeki index.html dosyasına çift tıklayarak tarayıcıda açın.

# KBÜ Not Hesaplayıcı

Bu proje Karabük Üniversitesi'nin not sistemine göre yapılmış basit bir not hesaplama uygulamasıdır. Vize, final, bütünleme notları ve devamsızlık durumuna bakarak dersi geçip geçmediğinizi ve harf notunuzu söyler.

##  Not Hesaplama Kuralları

* Vizenin %40'ı, finalin (veya bütünlemenin) %60'ı alınır.
* Bütünleme notu girilirse final notu yerine o geçer.
* Dersi geçebilmek için:
* Final veya Bütünleme notunun en az 50 olması gerekir.
* Ortalamanın (başarı notunun) en az 60 olması gerekir.


* Kaldığınız durumlar (F Notları):
* **F1:** Devamsız olduğunuzda verilir.
* **F2:** Sınava girmediğinizde verilir.
* **F3:** Final/Büt 50'den küçükse veya ortalama 60'ın altında kaldıysa verilir.


* Harf Notları:
* 90–100 arası: A1
* 80–89 arası: A2
* 70–79 arası: B1
* 65–69 arası: B2
* 60–64 arası: C



## Nasıl Çalıştırılır?

Projede sadece HTML, CSS ve JavaScript kullanılmıştır. Ekstra bir şey kurmaya gerek yoktur.

1. Proje dosyalarını bilgisayarınıza indirin.
2. Klasörün içindeki `index.html` dosyasına çift tıklayarak tarayıcıda açın.

## Test Senaryoları

| Vize | Final | Bütünleme | Devamsızlık | Sınava Girdi mi? | Ort. | Harf | Durum |
| ---  | ---   | ---       | ---         | ---              | ---  | --- | ---    |
| 70   | 60    | -         | Hayır       | Evet             | 64   | C   | Geçti  |
| 95   | 48    | -         | Hayır       | Evet             | 66.8 | F3 | Kaldı (Final 50'den küçük) |
| 58   | -     | 55        | Hayır       | Evet             | 56.2 | F3 | Kaldı (Ortalama 60'tan küçük) |
|  -   | -     | -         | Evet        | -                |  0   | F1 | Kaldı (Devamsız)              |
| 80   | -     | -         | Hayır       | Hayır            |  0   | F2 | Kaldı (Sınava girmedi)        |