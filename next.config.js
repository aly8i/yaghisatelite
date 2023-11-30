/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  env: {
    BASE_URL: "http://localhost:3000",
    NEXTAUTH_SECRET: "codingwithabbas",
    FIREBASE_APIKEY: "AIzaSyA2pMiNQ-WnrIGMu5s8zjYbBp8qO1o3poA",
    FIREBASE_AUTHDOMAIN: "satelite-a2ffb.firebaseapp.com",
    FIREBASE_DATABASEURL:
      "https://satelite-a2ffb-default-rtdb.europe-west1.firebasedatabase.app",
    FIREBASE_PROJECTID: "satelite-a2ffb",
    FIREBASE_STORAGEBUCKET: "satelite-a2ffb.appspot.com",
    FIREBASE_MESSAGINGSENDERID: "4574436331",
    FIREBASE_APPID: "1:4574436331:web:3e9b5bd9a2c4a29f4f57ae",
  },
};

module.exports = nextConfig;
