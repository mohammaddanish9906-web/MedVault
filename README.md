# Building MedPrep as an Android app

This is a real, standalone version of the prototype (the progress-tracking now
uses standard browser storage instead of the Claude-only version, so it works
anywhere).

## Install these first (on your own computer)

- Node.js 18+: https://nodejs.org
- Android Studio (includes the Android SDK): https://developer.android.com/studio

## Steps

Open a terminal in this folder and run, one at a time:

```
npm install
npm run build
npx cap add android
npx cap sync
npx cap open android
```

That last command opens Android Studio. Once it finishes indexing:
**Build → Build Bundle(s) / APK(s) → Build APK(s)**

Your file will land at:
`android/app/build/outputs/apk/debug/app-debug.apk`

Copy that to a phone (you'll need to allow "install from unknown sources") to
install it, or send it to classmates for testing.

## Notes

- `appId` in `capacitor.config.json` is a placeholder (`com.medprep.app`) —
  change it to something unique before any real release.
- This produces a debug APK, fine for testing. A Play Store release needs a
  signed build — Android Studio's **Build → Generate Signed Bundle/APK**
  walks through that when you're ready.
- No custom app icon is set up yet — Capacitor uses a default. Worth doing,
  not required to get a working APK.

## Faster alternative: skip the APK entirely

If you mainly want something on classmates' phones quickly, `npm run build`
alone (skip the `cap` steps) gives you a `dist/` folder you can deploy to
Vercel or Netlify as a normal website in a couple of minutes. Add a basic
web app manifest and most phones let people "Add to Home Screen" for an
app-like icon — no Android Studio, no Play Store review, nothing to install
from an unknown source. Good enough for real user testing; the blueprint
doc covers hosting once you're past this stage.
