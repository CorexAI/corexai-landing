# 🚀 LAUNCH CHECKLIST - TOMORROW

## **🔴 CRITICAL - MUST DO BEFORE LAUNCH**

### **1. Environment Variables (Vercel)**
```bash
# Required for production
NODE_ENV=production
PADDLE_WEBHOOK_SECRET=your_webhook_secret_here
CRON_SECRET=your_cron_secret_here

# Firebase Admin (all required)
FIREBASE_ADMIN_PROJECT_ID=your_project_id
FIREBASE_ADMIN_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_ADMIN_CLIENT_EMAIL=your_client_email
FIREBASE_ADMIN_CLIENT_ID=your_client_id
FIREBASE_ADMIN_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_ADMIN_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_ADMIN_CLIENT_X509_CERT_URL=your_cert_url

# OpenAI API Keys
HOOK_OPENAI_API_KEY=your_hook_api_key
SCRIPT_OPENAI_API_KEY=your_script_api_key

# Firebase Client (public)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### **2. Paddle Dashboard Configuration**
- [ ] **Webhook URL**: `https://yourdomain.com/api/paddle-webhook`
- [ ] **Success URL**: `https://yourdomain.com/success`
- [ ] **Cancel URL**: `https://yourdomain.com/cancel`
- [ ] **Product IDs**: Verify Pro and Creator IDs match code
- [ ] **Price IDs**: Verify Pro ($9.99) and Creator ($18.99) prices

### **3. Vercel Deployment**
- [ ] **Domain**: Set up custom domain
- [ ] **Cron Job**: Enable `/api/cron/reset-usage` (daily at 2 AM)
- [ ] **Environment**: Set all variables above
- [ ] **Build**: Ensure successful build

### **4. Firebase Security Rules**
```javascript
// Firestore rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### **5. Testing Checklist**
- [ ] **Payment Flow**: Test Pro and Creator subscriptions
- [ ] **Webhook**: Verify subscription updates work
- [ ] **Usage Limits**: Test free user limits
- [ ] **Cron Job**: Test usage reset
- [ ] **Error Handling**: Test network failures
- [ ] **Mobile**: Test on mobile devices

## **🟡 IMPORTANT - SHOULD DO**

### **6. Monitoring Setup**
- [ ] **Error Tracking**: Set up Sentry or similar
- [ ] **Analytics**: Google Analytics
- [ ] **Uptime**: Monitor API endpoints
- [ ] **Logs**: Monitor Firebase logs

### **7. Backup & Recovery**
- [ ] **Database**: Export user data
- [ ] **Code**: Git backup
- [ ] **Environment**: Document all configs

## **🟢 NICE TO HAVE**

### **8. Performance**
- [ ] **CDN**: Enable Vercel CDN
- [ ] **Caching**: Optimize API responses
- [ ] **Images**: Optimize and compress

### **9. SEO & Marketing**
- [ ] **Meta Tags**: Add proper meta tags
- [ ] **Sitemap**: Generate sitemap
- [ ] **Robots.txt**: Add robots.txt

## **🚨 EMERGENCY CONTACTS**
- **Paddle Support**: For payment issues
- **Firebase Support**: For database issues
- **Vercel Support**: For deployment issues

## **📋 LAUNCH DAY CHECKLIST**
1. [ ] Deploy to production
2. [ ] Test payment flow
3. [ ] Monitor error logs
4. [ ] Check webhook deliveries
5. [ ] Verify cron job runs
6. [ ] Test user registration
7. [ ] Monitor performance
8. [ ] Ready for users!

**GOOD LUCK! 🚀**
