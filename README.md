# CodeQuest

A "Duolingo for coding" mobile app — bite-sized, gamified coding lessons — built with React Native + Expo.

## Tech Stack

- **React Native** via **Expo** (managed workflow, `expo-router` for file-based navigation)
- **Supabase** — auth + user progress storage
- Backend code-execution service (TBD — e.g. Judge0/Piston) for validating submitted code
- No Mac required for development or iOS builds — uses **EAS Build** (cloud builds) to produce iOS binaries

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS version)
- Git
- A phone with the **Expo Go** app installed (from the App Store / Play Store) — used for live previewing during development
- Free account at [ngrok.com](https://ngrok.com/) (only needed if using tunnel mode — see Troubleshooting)

## Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/<your-username>/codequest.git
cd codequest
npm install
```

Start the development server:

```bash
npx expo start
```

This prints a QR code in your terminal. Scan it with your phone's **Camera app** (not from inside Expo Go) to open the project live in Expo Go.

> Your phone and computer must be on the same local network for this to work.

## Project Structure

```
codequest/
  src/app/          ← screens, using file-based routing (expo-router)
    _layout.tsx      ← root layout / navigation config
    index.tsx        ← home screen
  assets/            ← images, fonts, etc.
  app.json           ← Expo app config
  package.json
```

## Building for iOS (no Mac required)

This project uses **EAS Build**, which compiles the iOS binary in Expo's cloud — no local Xcode/macOS needed.

```bash
eas build --platform ios
```

Submit the built app to App Store Connect:

```bash
eas submit --platform ios
```

Requires a paid [Apple Developer account](https://developer.apple.com/) ($99/year).

## Troubleshooting

### QR code / Expo Go stuck on "Opening project..." indefinitely

This usually means the phone can't reach the dev server over the local network. Common causes and fixes:

**1. Windows network profile set to Public**
Windows blocks local discovery traffic on networks marked "Public" — this applies to both Wi-Fi and Ethernet adapters.

- Go to **Settings → Network & Internet → [Wi-Fi/Ethernet]** → click your connection → set **Network profile** to **Private**
- Retry `npx expo start`

**2. Network isolation (university/guest Wi-Fi, eduroam, etc.)**
Some networks block devices from seeing each other even when connected to the same SSID. If the network profile fix doesn't help and you're on a restrictive network, use tunnel mode instead (see below).

### Using tunnel mode

If LAN mode doesn't work, tunnel routes the connection through Expo's servers instead of relying on local network discovery:

```bash
npx expo start --tunnel
```

First run will prompt to install `@expo/ngrok` — accept.

**If you hit `CommandError: TypeError: Cannot read properties of undefined (reading 'body')`:**
This means ngrok requires an authenticated account now (anonymous tunnel connections are no longer supported).

1. Sign up free at [ngrok.com](https://ngrok.com/)
2. Copy your authtoken from the dashboard ("Your Authtoken" page)
3. Configure it locally:
   ```bash
   npx ngrok config add-authtoken YOUR_TOKEN_HERE
   ```
4. Retry:
   ```bash
   npx expo start --tunnel
   ```

**If global npm packages aren't being picked up (Git Bash / Windows):**
Install the package as a local dev dependency instead of relying on the global install:

```bash
npm install @expo/ngrok --save-dev
npx expo start --tunnel
```

## Roadmap

- [ ] Define lesson/exercise data model in Supabase
- [ ] Build core lesson loop (lesson list → exercise → check answer → XP/streak update)
- [ ] Integrate code-execution backend for validating submissions
- [ ] Add gamification (streaks, XP, hearts/lives, levels)
- [ ] First EAS build + TestFlight distribution
- [ ] App Store submission