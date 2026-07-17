# Firebase Deployment Setup Guide

This guide walks through completing the Firebase deployment for the Todo Management System.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or select an existing project
3. Project name: `Todo-Management-System`
4. Accept the terms and create

## Step 2: Enable Firestore Database

1. In Firebase console, go to **Build > Firestore Database**
2. Click **Create database**
3. Start in **Production mode** (or Test mode for development)
4. Select region: **us-central1** (or closest to you)
5. Click **Create**

## Step 3: Create Firestore Collections

### Create `tasks` collection:
1. In Firestore, click **Create collection**
2. Collection ID: `tasks`
3. Click **Auto ID** or add first document with these fields:
   - title (string)
   - description (string)
   - priority (string)
   - status (string)
   - category (string)
   - dueDate (string)
   - createdAt (string)

### Create `activities` collection:
1. Click **Create collection**
2. Collection ID: `activities`
3. Add first document with these fields:
   - text (string)
   - timestamp (string)

## Step 4: Get Firebase Credentials

1. In Firebase console, go to **Settings > Project Settings**
2. Scroll to "Your apps" section
3. Click on your web app (or create one if needed: **</> Web**)
4. Copy the Firebase config object containing:
   - apiKey
   - authDomain
   - projectId
   - storageBucket
   - messagingSenderId
   - appId

## Step 5: Set Environment Variables Locally

Create/update `.env.local` with your Firebase credentials:

```
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Step 6: Configure Vercel Environment Variables

1. Go to [Vercel Dashboard](https://vercel.com/)
2. Select your project
3. Go to **Settings > Environment Variables**
4. Add the following variables for Production/Preview/Development:
   - VITE_FIREBASE_API_KEY
   - VITE_FIREBASE_AUTH_DOMAIN
   - VITE_FIREBASE_PROJECT_ID
   - VITE_FIREBASE_STORAGE_BUCKET
   - VITE_FIREBASE_MESSAGING_SENDER_ID
   - VITE_FIREBASE_APP_ID

## Step 7: (Optional) Seed Initial Data

To seed your Firestore with initial task data:

1. Use Firebase Admin SDK or manually add documents to the `tasks` collection
2. Or import documents from `db.json` using a migration script

## Step 8: Test Integration

1. Update `.env.local` with your Firebase credentials
2. Run `npm run build` to build the project
3. Run `npm start:web` to start the development server
4. Test creating, reading, updating, and deleting tasks

## Step 9: Deploy to Vercel

1. Commit your changes: `git add . && git commit -m "Complete Firebase deployment setup"`
2. Push to your branch: `git push origin your-branch-name`
3. Vercel will automatically deploy using the environment variables configured

## Firestore Security Rules (Optional)

For development, use these permissive rules (⚠️ **Not for production**):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

For production, implement proper authentication-based rules.

## Troubleshooting

### Firebase config not loading
- Ensure `.env.local` is in the root directory
- Variables must start with `VITE_` prefix for Vite
- Restart the dev server after updating `.env.local`

### Firestore quota exceeded
- Check your usage at [Firebase Console > Usage](https://console.firebase.google.com/)
- Switch to Firestore (NOT Realtime Database)

### Data not persisting
- Verify Firestore collections exist
- Check Firestore security rules allow read/write
- Ensure Firebase config is correct

## Resources

- [Firebase Setup Guide](https://firebase.google.com/docs/web/setup)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
