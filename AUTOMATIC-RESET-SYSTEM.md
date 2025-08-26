# 🔄 Automatic Usage Reset System

## Overview
This system automatically resets user usage limits based on their plan type, ensuring users always have access to their allocated generations.

## How It Works

### 🆓 Free Users (7-Day Reset)
- **Reset Period**: Every 7 days from last reset
- **Automatic Reset**: Daily cron job checks if 7 days have passed
- **Backup Reset**: Also checks when users interact with the app
- **Usage Limit**: 3 generations per week (each generation = 3 hooks)
- **Content Generation**: Always allowed (within limits)

### 💎 Pro/Creator Users (30-Day Subscription)
- **Reset Period**: Every 30 days from subscription start
- **Automatic Reset**: When subscription expires
- **Usage Limit**: 
  - Pro: Unlimited hooks, 50 scripts per month
  - Creator: Unlimited hooks, 150 scripts per month (hidden from users - they see "Unlimited")
- **Content Generation**: Only allowed if subscription is active (paid)

## System Components

### 1. Vercel Cron Job (`/api/cron/reset-usage`)
- **Schedule**: Daily at midnight (`0 0 * * *`)
- **Function**: Checks if free users need reset (7 days passed)
- **Security**: Protected by `CRON_SECRET` environment variable
- **Logic**: Only resets users who have passed the 7-day mark

### 2. Client-Side Backup (`UserContext.tsx`)
- **Trigger**: When users interact with the app
- **Function**: Checks if reset is needed and applies it
- **Coverage**: Both free and paid users
- **Backup**: Ensures resets happen even if cron job fails

### 3. Subscription Management (`subscriptionUtils.ts`)
- **Function**: Handles Pro/Creator subscription renewals
- **Features**: 
  - Automatic usage reset on renewal
  - Subscription status checking
  - Content generation permission control
  - Automatic downgrade to free plan on expiration

### 4. Usage Tracking (`usageTracking.ts`)
- **Function**: Prevents content generation for expired subscriptions
- **Logic**: 
  - Free users: Check 7-day limits
  - Pro/Creator users: Check subscription status first, then limits

## User Experience

### Free Users
```
Day 1: Create account → 3 generations available
Day 7: Automatic reset → 3 generations available again
Day 14: Automatic reset → 3 generations available again
...continues automatically every 7 days
```

### Pro/Creator Users
```
Day 1: Subscribe → Unlimited usage for 30 days
Day 30: Subscription expires → Cannot generate content
Day 31: Pay again → Usage resets, unlimited usage for 30 more days
...continues with subscription management
```

## Environment Variables Required

```bash
# Add to .env.local
CRON_SECRET=your-secret-key-here
```

## Manual Testing

You can test the reset system manually by calling:
```bash
POST /api/cron/reset-usage
```

## Monitoring

The system logs all reset activities:
- ✅ Successful resets
- ❌ Failed resets
- 🔄 Reset attempts
- 📊 Reset counts
- ⏳ Users not yet ready for reset

## Benefits

1. **Always Fresh**: Free users never get stuck with expired usage
2. **Automatic**: No manual intervention needed
3. **Dual System**: Cron job + client-side backup
4. **Secure**: Protected cron endpoint
5. **Scalable**: Handles all users automatically
6. **Professional**: Like million-dollar companies
7. **Subscription Control**: Pro/Creator users must pay to generate content

## Troubleshooting

### Cron Job Not Running
1. Check Vercel deployment
2. Verify `vercel.json` configuration
3. Check environment variables

### Reset Not Working
1. Check Firebase Admin SDK setup
2. Verify user document structure
3. Check console logs for errors

### Subscription Issues
1. Verify subscription dates in user data
2. Check subscription status functions
3. Ensure proper plan downgrade on expiration

## Future Enhancements

- [ ] Email notifications for resets
- [ ] Usage analytics dashboard
- [ ] Custom reset periods
- [ ] A/B testing for reset timing
- [ ] Subscription renewal reminders
- [ ] Payment integration for renewals
