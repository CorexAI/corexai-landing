# 🎯 Usage Stats Visual Structure - Free, Pro & Creator Users

## 📱 Complete Dashboard Usage Stats Section

### **🆓 FREE PLAN USER - What They See:**

```
┌─────────────────────────────────────────────────────────────┐
│                    Usage Stats                              │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 🆓 Free Plan                    [Active] 🟢           │ │
│ │ Resets in 3 days                                      │ │
│ └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ Hooks:    2/3  ← 2 generations used out of 3 limit      │ │
│ Scripts:  1/3  ← 1 script used out of 3 limit           │ │
└─────────────────────────────────────────────────────────────┘
```

**📊 Free Plan Details:**
- **Hooks**: `2/3` (2 generations × 3 hooks = 6 hooks total)
- **Scripts**: `1/3` (1 script used, 2 remaining)
- **Reset**: Every 7 days automatically
- **Status**: Always "Active" (green)
- **Theme**: Green color scheme

---

### **💎 PRO PLAN USER - What They See:**

```
┌─────────────────────────────────────────────────────────────┐
│                    Usage Stats                              │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 💎 Pro Plan                     [Active] 🔵           │ │
│ │ Renews in 15 days                                     │ │
│ └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ Hooks:    45   ← Unlimited (no limit shown)              │ │
│ Scripts:  12/50 ← 12 scripts used out of 50 limit       │ │
└─────────────────────────────────────────────────────────────┘
```

**📊 Pro Plan Details:**
- **Hooks**: `45` (Unlimited - no limit displayed)
- **Scripts**: `12/50` (12 used, 38 remaining out of 50)
- **Reset**: Every 30 days when subscription renews
- **Status**: "Active" (blue) or "Expired" (red)
- **Theme**: Blue color scheme

---

### **🚀 CREATOR PLAN USER - What They See:**

```
┌─────────────────────────────────────────────────────────────┐
│                    Usage Stats                              │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 🚀 Creator Plan                  [Active] 🔵           │ │
│ │ Renews in 8 days                                      │ │
│ └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ Hooks:    89   ← Unlimited (no limit shown)              │ │
│ Scripts:  67   ← Unlimited (no limit shown)              │ │
└─────────────────────────────────────────────────────────────┘
```

**📊 Creator Plan Details:**
- **Hooks**: `89` (Unlimited - no limit displayed)
- **Scripts**: `67` (Unlimited - no limit displayed, but backend enforces 150)
- **Reset**: Every 30 days when subscription renews
- **Status**: "Active" (blue) or "Expired" (red)
- **Theme**: Blue color scheme

---

## 🔴 EXPIRED SUBSCRIPTION STATES

### **💎 PRO PLAN EXPIRED:**

```
┌─────────────────────────────────────────────────────────────┐
│                    Usage Stats                              │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 💎 Pro Plan                   [Expired] 🔴            │ │
│ │ Subscription expired - cannot generate content         │ │
│ └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ Hooks:    45   ← Cannot generate more                    │ │
│ Scripts:  12/50 ← Cannot generate more                   │ │
└─────────────────────────────────────────────────────────────┘
```

### **🚀 CREATOR PLAN EXPIRED:**

```
┌─────────────────────────────────────────────────────────────┐
│                    Usage Stats                              │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 🚀 Creator Plan                 [Expired] 🔴           │ │
│ │ Subscription expired - cannot generate content         │ │
│ └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ Hooks:    89   ← Cannot generate more                    │ │
│ Scripts:  67   ← Cannot generate more                    │ │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 Color Scheme & Visual Elements

### **Color Coding:**
- **🟢 Green**: Free plan (always active)
- **🔵 Blue**: Pro/Creator plans (active subscription)
- **🔴 Red**: Expired subscriptions (cannot generate content)

### **Status Badges:**
- **Active**: Rounded pill with plan color
- **Expired**: Rounded pill with red color
- **Plan Name**: Bold text with plan emoji

### **Information Hierarchy:**
1. **Plan Name & Status** (top priority)
2. **Reset/Renewal Info** (middle priority)
3. **Usage Numbers** (bottom priority)

---

## 📊 Data Flow & Logic

### **Free Users:**
```
User Action → Check 7-day reset → Reset if needed → Show X/3 format
```

### **Pro Users:**
```
User Action → Check subscription status → Check 50 script limit → Show X/50 format
```

### **Creator Users:**
```
User Action → Check subscription status → Check hidden 150 limit → Show X format (no limit)
```

---

## 🔧 Technical Implementation

### **Frontend Display:**
```typescript
// Free: Shows limits
hooks: "2/3", scripts: "1/3"

// Pro: Shows script limit only
hooks: "45", scripts: "12/50"

// Creator: Shows no limits
hooks: "89", scripts: "67"
```

### **Backend Enforcement:**
```typescript
// Free: 3 generations, 3 scripts
// Pro: Unlimited hooks, 50 scripts
// Creator: Unlimited hooks, 150 scripts (hidden)
```

### **Status Logic:**
```typescript
Free: Always "Active" (green)
Pro/Creator: "Active" (blue) if paid, "Expired" (red) if not
```

---

## 💡 User Experience Benefits

✅ **Clear Plan Identification** - Users know exactly what they have  
✅ **Transparent Limits** - Free and Pro see their boundaries  
✅ **Premium Feeling** - Creator users feel unlimited  
✅ **Status Awareness** - Expired users know they can't generate  
✅ **Reset Information** - Users know when limits refresh  
✅ **Professional Design** - Clean, organized layout  

This structure provides complete transparency while maintaining the marketing advantage of "unlimited" for Creator plans! 🎯
