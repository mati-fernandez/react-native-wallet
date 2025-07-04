# 🛠️ Backend Initialization – Step-by-Step
1. Project Setup
- Initialized a new Node.js project with npm init -y
- Created the project directory structure
2. Installed Core Dependencies
```bash
npm i express@4.21.0
```
- Used to build the RESTful API server. Specified a more reliable version for this project

3. Installed Supporting Packages
```bash
npm i dotenv@16.5.0 cors@2.8.5 @neondatabase/serverless@1.0.0
```
- `dotenv`: Loads environment variables from a `.env` file
- `cors`: Enables Cross-Origin Resource Sharing
- `@neondatabase/serverless`: Allows connecting to a Neon-hosted Postgres database in a serverless way

4. Enabled automatic loading of environment variables
```js
import 'dotenv/config';
```
- Equivalent to manually configuring dotenv with import dotenv from 'dotenv'; dotenv.config(); but cleaner

# Rate Limiting Middleware

In this project, we implemented a rate limiter using Upstash Redis. The current implementation uses a static string 'my-rate-limit' as the key:

```js
const { success } = await ratelimit.limit('my-rate-limit');
```
However, in a real-world scenario, this should be replaced with a dynamic identifier such as the user's ID or IP address. This ensures the rate limiter applies restrictions per user rather than globally for all users.

Example of a production-ready key:

```js
const key = req.user?.id || req.ip;
const { success } = await ratelimit.limit(key);
```
This approach prevents one user from affecting others and provides better protection against abuse.

# 🖼️ Frontend Setup (React Native + Expo)

- We initialized the mobile app using:
`npx create-expo-app@latest .`

    The . at the end means the project will be created in the current directory instead of a new one.

- To start the app in development mode:
`npm run start` or just `npx expo`

- To clean up default files and start fresh, we ran:
`npm run reset-project`

## ✅ Authentication Setup (Clerk)

Installed Clerk for Expo as instructed in their [official documentation](https://clerk.com/docs/quickstarts/expo)

# 🔙🔚🚀 Backend Deployment (Render)

We deployed the backend using **Render**, pointing it to the `/backend` folder of the monorepo. The backend is set up as a Node.js service.

We also added environment variables from the local `.env` file to the Render dashboard, including:

```
API_URL=https://react-native-wallet-g7l1.onrender.com/api/health
```

To keep the backend alive (since free Render instances sleep), we used the `cron` package (`npm i cron`) to create a scheduled task that sends a request to the backend every 14 minutes.

# 🖼️🚀 Frontend Deployment
## 🌐 Web
### Tools
- Expo Router (expo@53)
- EAS Deploy
- Clerk (@clerk/clerk-expo)

### 👣 Steps
1. Set up app.json

```json
"web": {
  "output": "static",
  "favicon": "./assets/images/favicon.png"
}
```
2. ⚙️ Env setup

- Clerk publishable key must be defined as:

```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key_here
```
- Stored in .env and pushed to EAS:

```bash
eas env:push --environment=production
```
1. Export web build
```bash
npx expo export --platform web
```
1. Deploy to Expo Hosting
`eas deploy`
✅ Deployed at: https://<project-subdomain>.expo.dev

## 🤖 Android
### Build
`eas build --platform android`
- Distribution: store
- Generates .apk for sideloading
- No need to upload to Play Store

## 🧪 Notes
- publishableKey must be passed as prop to <ClerkProvider />, e.g.:

`<ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>`
- After changing env vars or Clerk config:
```bash
npx expo export --platform web
eas deploy
```

### ⚙️🚀 Environment Variables for Production

- Created two environment files for the frontend:

  - .env for local development

  - .env.production for production deployment

- Both files contain the same Clerk publishable key to avoid errors in different environments.

- This setup ensures the app correctly loads environment variables based on the build or run environment, preventing missing keys or misconfigurations.

- Using separate files allows safe separation and easier future updates if keys differ between environments.

