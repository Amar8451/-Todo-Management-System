# Firebase Deployment Checklist

Complete this checklist to deploy the Todo Management System to Vercel with Firebase Firestore backend.

## ✅ Pre-Deployment (Code Setup)
- [x] Firebase Firestore service implemented (`src/services/firebaseService.js`)
- [x] Firebase config created (`src/config/firebaseConfig.js`)
- [x] taskService configured to route to Firebase in production
- [x] Environment variables documented in `.env.example`
- [x] Vercel configuration updated with Firebase env vars in `vercel.json`
- [x] README.md updated with Firebase instructions
- [x] Complete setup guide created (`FIREBASE_SETUP.md`)
- [x] Code pushed to branch and PR updated

## 🔥 Firebase Project Setup (Do This Once)
- [ ] Go to https://console.firebase.google.com/
- [ ] Create new Firebase project named "Todo-Management-System"
- [ ] Enable Google Analytics (optional)
- [ ] Wait for project creation to complete

## 🗄️ Firestore Database Setup
- [ ] Navigate to **Build > Firestore Database**
- [ ] Click **Create database**
- [ ] Select **Production mode** (or Test mode for development)
- [ ] Choose region: **us-central1** (or your preferred region)
- [ ] Click **Create database**
- [ ] Create collection: `tasks` (Auto ID, any document)
- [ ] Create collection: `activities` (Auto ID, any document)

## 📋 Get Firebase Credentials
- [ ] Go to **Project Settings** (gear icon, top left)
- [ ] Click the **General** tab
- [ ] Scroll to "Your apps" section
- [ ] Click on your web app (or create new web app: **</> Web**)
- [ ] Copy the Firebase config object:
  ```javascript
  {
    apiKey: "AIzaSy...",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc..."
  }
  ```

## 🔑 Configure Vercel Environment Variables
- [ ] Log in to [Vercel Dashboard](https://vercel.com/)
- [ ] Select your Todo Management System project
- [ ] Go to **Settings > Environment Variables**
- [ ] Add these variables for **Production**, **Preview**, and **Development**:
  - [ ] **VITE_FIREBASE_API_KEY** = `apiKey` from Firebase config
  - [ ] **VITE_FIREBASE_AUTH_DOMAIN** = `authDomain` from Firebase config
  - [ ] **VITE_FIREBASE_PROJECT_ID** = `projectId` from Firebase config
  - [ ] **VITE_FIREBASE_STORAGE_BUCKET** = `storageBucket` from Firebase config
  - [ ] **VITE_FIREBASE_MESSAGING_SENDER_ID** = `messagingSenderId` from Firebase config
  - [ ] **VITE_FIREBASE_APP_ID** = `appId` from Firebase config
- [ ] Save environment variables

## 🧪 Test Locally (Optional)
- [ ] Create `.env.local` in project root with Firebase credentials:
  ```
  VITE_FIREBASE_API_KEY=your_api_key
  VITE_FIREBASE_AUTH_DOMAIN=your_domain
  VITE_FIREBASE_PROJECT_ID=your_project_id
  VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
  VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
  VITE_FIREBASE_APP_ID=your_app_id
  ```
- [ ] Run `npm install` to ensure dependencies are installed
- [ ] Run `npm run build` to build the project
- [ ] Run `npm start:web` to test the build locally
- [ ] Test task CRUD operations in the browser
- [ ] Check Firestore console to verify data is being saved

## 🚀 Deploy to Vercel
- [ ] Ensure branch is pushed to GitHub
- [ ] Vercel will automatically deploy when PR is merged to `main`
- [ ] OR manually trigger deployment: Go to Vercel > Deployments > Redeploy
- [ ] Wait for deployment to complete
- [ ] Visit your deployed URL and test the app
- [ ] Verify data persists by refreshing the page
- [ ] Check Firestore console to see created documents

## ✨ Verification Checklist
- [ ] App loads without errors on Vercel
- [ ] Can create new tasks
- [ ] Can read/view all tasks
- [ ] Can update existing tasks
- [ ] Can delete tasks
- [ ] Data persists after page refresh
- [ ] Activity log entries are saved
- [ ] No Firebase config errors in browser console
- [ ] Network tab shows successful Firestore requests

## 🔒 Security (After Initial Setup)
- [ ] Review Firestore Security Rules
- [ ] Implement authentication if needed
- [ ] Set up database backups in Firebase console
- [ ] Enable Cloud Firestore Security Rules for production:
  ```
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /tasks/{document=**} {
        allow read, write: if true;
      }
      match /activities/{document=**} {
        allow read, write: if true;
      }
    }
  }
  ```

## 📞 Troubleshooting

### Problem: Firebase config not loading in Vercel
- [ ] Verify all environment variables are set in Vercel
- [ ] Check variable names start with `VITE_` prefix
- [ ] Redeploy after adding environment variables
- [ ] Check browser console for specific error messages

### Problem: "Cannot read property 'db' of undefined"
- [ ] Check `.env.local` exists locally with correct credentials
- [ ] Verify Firebase config in `src/config/firebaseConfig.js`
- [ ] Ensure Firestore database is enabled in Firebase console

### Problem: Data not persisting to Firestore
- [ ] Verify Firestore collections `tasks` and `activities` exist
- [ ] Check Firestore security rules allow read/write
- [ ] Check browser console for Firebase errors
- [ ] Verify Firebase credentials are correct

### Problem: Vercel build fails
- [ ] Check build logs in Vercel dashboard
- [ ] Ensure all environment variables are set
- [ ] Verify `package.json` has correct build command
- [ ] Try clearing Vercel cache and redeploying

## 📚 Resources
- [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) - Detailed setup guide
- [Firebase Console](https://console.firebase.google.com/)
- [Vercel Dashboard](https://vercel.com/)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

---

**Status**: ✅ All code changes complete. Ready for deployment. Follow this checklist to complete setup.
