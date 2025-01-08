# Hava Durumu Uygulaması

Bu proje, **OpenWeather API**'yi kullanarak güncel hava durumu verilerini sağlayan bir React uygulamasıdır. Kullanıcılar, belirli bir şehir için hava durumu bilgisini öğrenebilir.

## Özellikler
- Kullanıcılar, şehir ismi girerek o şehirdeki güncel hava durumu bilgisini alabilir.
- **OpenWeather API** ile hava durumu verileri alınır.
- Basit ve kullanıcı dostu bir arayüz.

## Başlarken

Bu uygulama **Create React App** ile başlatıldı. Aşağıdaki adımlarla projeyi yerel olarak çalıştırabilirsiniz.

### Gereksinimler
- Node.js ve npm'nin yüklü olması gerekmektedir. [Node.js'i buradan indirin](https://nodejs.org/).

### Kurulum

Projeyi yerel ortamınızda çalıştırmak için şu adımları takip edebilirsiniz:

1. Bu depoyu bilgisayarınıza klonlayın:
   ```bash
   git clone https://github.com/FurkanKAN06/ReactWeatherApp.git
2. Proje dizinine gidin:
    cd hava-durumu-uygulamasi
3. Gerekli bağımlılıkları yükleyin:
    npm install
4. .env dosyasını oluşturun ve OpenWeather API anahtarınızı ekleyin:
    - OpenWeather API anahtarını OpenWeather üzerinden alabilirsiniz.
    - .env dosyasını proje kök dizinine ekleyin ve şu satırı ekleyin:
        REACT_APP_OPENWEATHER_API_KEY=your-api-key
5. Uygulamayı başlatın:
    npm start
    - Uygulama, http://localhost:3000 adresinde çalışacaktır.
6. Kullanım
    - Uygulama açıldığında, kullanıcıdan şehir ismi girmesi istenecektir.
    - Şehir adı girildiğinde, OpenWeather API'sinden alınan hava durumu verisi ekranda gösterilecektir.
7. Testler
    - Testleri çalıştırmak için aşağıdaki komutu kullanabilirsiniz:

    npm test
8. Projeyi Yapılandırma
    - Projeyi üretim ortamına almak için şu komutu kullanabilirsiniz:

    npm run build
    - Bu, projeyi optimize eder ve build klasörüne paketler.

9. Uygulama İçeriği
    - Proje, aşağıdaki dosya yapısına sahiptir:

/src
  /components
    Weather.js          # Hava durumu verilerini görüntüleyen bileşen
  App.js                # Ana bileşen
  index.js              # Uygulamanın giriş noktası
  .env                  # API anahtarı ve diğer ortam değişkenleri

Teknolojiler
- React: Kullanıcı arayüzü için
- OpenWeather API: Hava durumu verilerini almak için
- Axios: API çağrıları yapmak için
- CSS: Basit stil düzenlemeleri için
Lisans
- Bu proje MIT Lisansı ile lisanslanmıştır.

Kaynaklar
- OpenWeather API
- React Documentation

### Açıklamalar:
1. **Proje Açıklaması**: Hava durumu uygulamasının temel amacı ve işlevselliği hakkında kısa bir açıklama yapıldı.
2. **Kurulum ve Çalıştırma Talimatları**: Projeyi yerel ortamda çalıştırmak için adım adım talimatlar ekledim. Bu, API anahtarının nasıl ekleneceği ve bağımlılıkların nasıl kurulacağına dair bilgilere yer verildi.
3. **Testler ve Üretim Yapılandırması**: Testler ve üretim ortamına taşıma adımları da açıklanarak uygulamanın farklı ortamlar için nasıl yapılandırılacağı gösterildi.
4. **Dosya Yapısı**: Projenin temel dosya yapısı belirtildi.
5. **Teknolojiler**: Kullanılan teknolojiler ve araçlar belirtildi.