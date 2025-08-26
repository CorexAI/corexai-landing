// Paddle Configuration and Constants

export const PADDLE_CONFIG = {
  // Vendor ID from your Paddle account
  VENDOR_ID: '247997',
  
  // Product IDs
  PRODUCTS: {
    PRO: {
      id: 'pro_01k3gw1me5xny6ev6bzmrx45ay',
      priceId: 'pri_01k3gw8y5vdv8gwvs8v7q7tm1v',
      name: 'Corex AI Pro',
      price: 9.99,
      checkoutUrl: 'https://pay.paddle.io/hsc_01k3jvvzwyan58v305fj7w3y0h_ke2wdrqt7rz2p2zwzmwkv60myaag19th',
      cancelUrl: 'https://pay.paddle.io/hsc_01k3jw689j3sfzv8v61tctjbe1_xh16meytd1p3c0tkrjaq004xrwxfym55'
    },
    CREATOR: {
      id: 'pro_01k3gwf96v3cdfprj9xmfcvee5',
      priceId: 'pri_01k3gwh2qq5j8rghafrypm0y3n',
      name: 'Corex AI Creator',
      price: 18.99,
      checkoutUrl: 'https://pay.paddle.io/hsc_01k3jvwskbjce4xf2fm61r497f_4rz535bq1xs9r45pbc5ges48r8wcbbk5',
      cancelUrl: 'https://pay.paddle.io/hsc_01k3jw8831793qct6pfsv2as7p_rbsdpfkd2x36v3f2055m41tvkf75tct7'
    }
  },
  
  // Webhook endpoint
  WEBHOOK_URL: '/api/paddle-webhook',
  
  // Success/Cancel URLs
  SUCCESS_URL: '/success',
  CANCEL_URL: '/cancel'
};

// Get product info by plan
export const getProductByPlan = (plan: 'pro' | 'creator') => {
  return PADDLE_CONFIG.PRODUCTS[plan.toUpperCase() as keyof typeof PADDLE_CONFIG.PRODUCTS];
};

// Get product info by price ID
export const getProductByPriceId = (priceId: string) => {
  for (const [key, product] of Object.entries(PADDLE_CONFIG.PRODUCTS)) {
    if (product.priceId === priceId) {
      return { plan: key.toLowerCase() as 'pro' | 'creator', ...product };
    }
  }
  return null;
};

// Get product info by product ID
export const getProductByProductId = (productId: string) => {
  for (const [key, product] of Object.entries(PADDLE_CONFIG.PRODUCTS)) {
    if (product.id === productId) {
      return { plan: key.toLowerCase() as 'pro' | 'creator', ...product };
    }
  }
  return null;
};

// Open Paddle checkout
export const openPaddleCheckout = (plan: 'pro' | 'creator') => {
  const product = getProductByPlan(plan);
  if (product) {
    window.open(product.checkoutUrl, '_blank');
  }
};

// Open Paddle cancellation
export const openPaddleCancellation = (plan: 'pro' | 'creator') => {
  const product = getProductByPlan(plan);
  if (product) {
    window.open(product.cancelUrl, '_blank');
  }
};

// Format price for display
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
};

// Get plan display name
export const getPlanDisplayName = (plan: string) => {
  switch (plan) {
    case 'free':
      return 'Free Plan';
    case 'pro':
      return 'Pro Plan';
    case 'creator':
      return 'Creator Plan';
    default:
      return 'Unknown Plan';
  }
};

// Get plan features
export const getPlanFeatures = (plan: string) => {
  switch (plan) {
    case 'free':
      return [
        '9 hooks/week',
        '3 scripts/week (30, 60 seconds)',
        'Scene-by-scene breakdown',
        'B-roll + CTA suggestions',
        'All tones unlocked',
        'Copy to clipboard'
      ];
    case 'pro':
      return [
        'Unlimited Hooks',
        '50 Scripts (30, 60 seconds)',
        'Scene-by-scene breakdown',
        'B-roll + CTA suggestions',
        'All tones unlocked',
        'Priority AI',
        'Copy to clipboard'
      ];
    case 'creator':
      return [
        'Unlimited Hooks',
        'Unlimited Scripts (30, 60, 90 seconds)',
        'Scene-by-scene breakdown',
        'B-roll + CTA suggestions',
        'All tones unlocked',
        'Priority AI',
        'Copy to clipboard',
        'Early access'
      ];
    default:
      return [];
  }
};
