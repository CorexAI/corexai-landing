# 🔧 Environment Setup Guide

## Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

### 🔥 Firebase Configuration
```bash
# Firebase Admin SDK (Service Account)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour Private Key Here\n-----END PRIVATE KEY-----"
FIREBASE_CLIENT_EMAIL=your-service-account-email@your-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/your-service-account-email%40your-project.iam.gserviceaccount.com

# Firebase Database URL (for elevated privileges)
FIREBASE_DATABASE_URL=https://your-project-id-default-rtdb.firebaseio.com
```

### 🤖 OpenAI Configuration
```bash
# OpenAI API Key
OPENAI_API_KEY=your-openai-api-key-here
```

### 🔄 Cron Job Security
```bash
# Secret key for cron job authentication
CRON_SECRET=your-secret-key-here
```

## 🔑 How to Get These Values

### Firebase Admin SDK
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings → Service Accounts
4. Click "Generate New Private Key"
5. Download the JSON file
6. Copy the values to your `.env.local`

### OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Navigate to API Keys
3. Create a new secret key
4. Copy the key to your `.env.local`

### Cron Secret
1. Generate a random string (you can use any password generator)
2. Make it at least 16 characters long
3. Add it to your `.env.local`

## 🚀 Deployment

### Vercel
1. Add these environment variables in your Vercel project settings
2. Deploy your project
3. The cron job will automatically start running daily at midnight

### Local Development
1. Create `.env.local` file
2. Run `npm run dev`
3. Test cron endpoint: `POST /api/cron/reset-usage`

## ✅ Verification

After setup, verify:
1. Firebase Admin SDK is working (check console logs)
2. OpenAI API is responding (test generation)
3. Cron job is accessible (test endpoint)
4. Usage resets are working (check user data)

## 🆘 Troubleshooting

### Common Issues
1. **Firebase Admin Error**: Check service account JSON format
2. **OpenAI Error**: Verify API key and billing
3. **Cron Not Working**: Check Vercel deployment and environment variables

### Support
If you encounter issues, check:
1. Console logs for error messages
2. Firebase Console for authentication issues
3. Vercel logs for deployment problems
