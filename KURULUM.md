# 📲 KURULUM VE ÇALIŞTIRMA KILAVUZU
**Faziletli Ameller — React Native + Expo**
Son güncelleme: 24 Nisan 2026

---

## ✅ ADIM 1: Gereksinimler

Bilgisayarında şunlar kurulu olmalı:
- **Node.js 20+** → https://nodejs.org (LTS indir)
- **Git** → https://git-scm.com
- Telefonda **Expo Go** uygulaması (App Store veya Play Store'dan)

Kontrol et:
```bash
node --version   # v20.x.x görünmeli
npm --version    # 10.x.x görünmeli
```

---

## ✅ ADIM 2: Bağımlılıkları Yükle

```bash
cd C:\Users\x\Downloads\yeniapp\faziletli-ameller
npm install
```

⚠️ Bu adım 5-10 dakika sürebilir. İnternet bağlantısı gerekli.

---

## ✅ ADIM 3: Uygulamayı Başlat (Expo Go ile Test)

```bash
npx expo start
```

Terminal'de bir QR kodu çıkacak:
1. iPhone: Kamera uygulamasıyla QR'ı tara
2. Android: Expo Go uygulamasını aç → "Scan QR Code"

Uygulama telefonunda açılacak! 🎉

---

## ✅ ADIM 4: EAS CLI Kurulumu (Build için)

```bash
npm install -g eas-cli
eas login
```

→ expo.dev hesabınla giriş yap  
→ Hesabın yoksa: https://expo.dev adresinden ücretsiz oluştur

---

## ✅ ADIM 5: EAS Projeyi Bağla

```bash
eas build:configure
```

Bu komut:
1. Expo'da proje oluşturur
2. `app.json`'daki `projectId` alanını otomatik doldurur
3. `eas.json`'u yapılandırır

---

## ✅ ADIM 6: iOS Sertifikaları (EAS Otomatik Yönetir)

Apple Developer hesabın aktif olduktan sonra:

```bash
eas credentials
```

EAS, sertifikaları otomatik oluşturup yönetebilir. "Automatically manage credentials" seçeneğini tercih et.

---

## ✅ ADIM 7: Build Al

### iOS Build (App Store için):
```bash
eas build --platform ios --profile production
```

### Android Build (Play Store için):
```bash
eas build --platform android --profile production
```

### Her İkisi Aynı Anda:
```bash
eas build --platform all --profile production
```

⏱️ Build 20-40 dakika sürer. Expo'nun bulut sunucularında çalışır.  
Biterken sana email gönderir + expo.dev'de takip edebilirsin.

---

## ✅ ADIM 8: Submission (Store'a Gönderme)

### iOS:
```bash
eas submit --platform ios
```

### Android:
```bash
eas submit --platform android
```

---

## 🧪 Sorun Giderme

### "Unable to resolve module" hatası:
```bash
npx expo install <paket-adı>
```

### QR kodu çalışmıyor:
- Telefon ve bilgisayar aynı Wi-Fi'de olmalı
- `npx expo start --tunnel` komutunu dene

### Metro bundler cache sorunu:
```bash
npx expo start --clear
```

### TypeScript hataları derlemeyi engelliyor:
```bash
npx tsc --noEmit
```

---

## 📁 Proje Yapısı

```
faziletli-ameller/
├── assets/              ← İkon ve splash (AI ile oluşturuldu)
├── src/
│   ├── components/      ← HeroCountdown, PrayerChips, AmelItem, HijriCard
│   ├── constants/       ← theme.ts (renkler, fontlar), data.ts (tüm ameller)
│   ├── navigation/      ← RootNavigator (onboarding + tab nav)
│   ├── screens/         ← HomeScreen, AmelsScreen, SettingsScreen, OnboardingScreen
│   ├── services/        ← prayerTimesService, locationService, notificationService, storageService
│   ├── store/           ← appStore.ts (Zustand)
│   └── types/           ← index.ts (tüm TypeScript tipleri)
├── App.tsx              ← Giriş noktası (font yükleme, splash)
├── app.json             ← Expo konfigürasyonu
├── eas.json             ← Build profilleri
├── package.json         ← Bağımlılıklar
└── STORE_METADATA.md    ← Store açıklamaları (Türkçe + İngilizce)
```

---

## 🔑 Önemli Bilgiler

| Bilgi | Değer |
|-------|-------|
| Bundle ID (iOS) | `com.terim.faziletliameller` |
| Package (Android) | `com.terim.faziletliameller` |
| Expo Slug | `faziletli-ameller` |
| API | Aladhan.com (ücretsiz, method: 13 Diyanet) |
| Min iOS | 15.0+ |
| Min Android | API 26 (Android 8.0) |

---

## 📞 Sorun Çıkarsa

Hata mesajını bana gönder, aynı gün çözerim. Özellikle:
- `npm install` hataları → tam çıktıyı kopyala
- Build hataları → expo.dev'den log linkini gönder
- App Store rejection → email içeriğini gönder
