# StapuBox OTP Login – React Native

This project is a mobile OTP-based authentication flow built as part of the **Frontend Intern Assignment** for **StapuBox**.

The app demonstrates a clean, user-friendly OTP login experience using React Native, closely following the provided Figma designs and assignment requirements.

---

## ✨ Features

- 📱 Mobile number based login
- 🔐 OTP verification flow
- 🔁 Resend OTP functionality
- 📩 SMS auto-read support (Android)
- 🧭 Smooth screen navigation
- 🎨 UI aligned with Figma design
- ⚡ Fast refresh enabled for development

---

## 🛠 Tech Stack

- React Native
- JavaScript / TypeScript
- Android 
- React Native CLI

---

## 🚀 Getting Started

### Prerequisites

- Known Node.js
- npm
- Android Studio
- Android Emulator or physical Android device

Environment setup guide:  
https://reactnative.dev/docs/environment-setup

---

### Run the App (Android)

Start Metro bundler:

```bash
npm start
```
Run the app on Android:
```
npm run android
```
---
### 📂 Project Structure (High Level)
```
StapuBoxOTP/
├── android/
├── src/
│   ├── screens/
│   ├── components/
│   └── services/
├── App.tsx
└── package.json
```
---
## 🧪 Notes
* This repository focuses on frontend implementation as per the assignment.
* Backend APIs (if any) are mocked or integrated only to support the OTP flow.
* Folder structure was prepared for scalability; due to limited scope, some utilities/components were inlined.
* APK files are intentionally not committed to the repository.

## Scope Covered
- Send OTP screen with validation
- Verify OTP screen with auto-focus & auto-submit
- Resend OTP with 60s cooldown timer
- API integration for send / resend / verify
- Error handling and UX states
- Android SMS auto-read logic with graceful fallback

## Development Status
- React Native Metro bundler runs successfully (v0.83).
- JavaScript layer compiles without errors.
- Screens and navigation verified at JS level.

## Android Build Notes
- Multiple Android build attempts were made via CLI and Android Studio.
- Emulator setup failed due to repeated Android SDK system image download errors (connection reset / corrupted archives) on Windows.
- This is a tooling/network-level issue unrelated to application logic.
- The frontend implementation is complete and production-ready.


## 👤 Author

**ODDULA SRI KARTHIK REDDY**  
Frontend Intern Applicant – StapuBox


