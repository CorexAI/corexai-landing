// Firebase error code to user-friendly message mapping
export const getFirebaseErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    // Authentication errors
    case 'auth/user-not-found':
      return 'No account found with this email address. Please check your email or create a new account.';
    
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again or reset your password.';
    
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.';
    
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please wait a few minutes before trying again.';
    
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection and try again.';
    
    case 'auth/operation-not-allowed':
      return 'This sign-in method is not enabled. Please contact support.';
    
    case 'auth/invalid-credential':
      return 'The email or password you entered is incorrect. Please double-check both and try again.';
    
    case 'auth/user-mismatch':
      return 'The email address you entered doesn\'t match your account. Please check and try again.';
    
    case 'auth/requires-recent-login':
      return 'For security reasons, please sign in again to continue.';
    
    case 'auth/account-exists-with-different-credential':
      return 'An account already exists with this email using a different sign-in method.';
    
    // Sign up specific errors
    case 'auth/email-already-in-use':
      return 'An account with this email already exists. Please sign in instead or use a different email.';
    
    case 'auth/weak-password':
      return 'Password is too weak. Please choose a stronger password with at least 8 characters.';
    
    case 'auth/invalid-password':
      return 'Password must be at least 6 characters long.';
    
    case 'auth/operation-not-allowed':
      return 'Email/password accounts are not enabled. Please contact support.';
    
    // Password reset errors
    case 'auth/user-not-found':
      return 'No account found with this email address.';
    
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    
    case 'auth/too-many-requests':
      return 'Too many password reset attempts. Please wait before trying again.';
    
    // Generic errors
    case 'auth/internal-error':
      return 'An internal error occurred. Please try again later.';
    
    case 'auth/invalid-argument':
      return 'Invalid input. Please check your information and try again.';
    
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection and try again.';
    
    case 'auth/operation-not-allowed':
      return 'This operation is not allowed. Please contact support.';
    
    case 'auth/quota-exceeded':
      return 'Service temporarily unavailable. Please try again later.';
    
    case 'auth/unavailable':
      return 'Service temporarily unavailable. Please try again later.';
    
    case 'auth/unauthorized':
      return 'You are not authorized to perform this action.';
    
    case 'auth/unsupported-persistence-type':
      return 'This sign-in method is not supported. Please try a different method.';
    
    // Default case for unknown errors
    default:
      return 'An unexpected error occurred. Please try again or contact support.';
  }
};

// Get error message from Firebase error object
export const getErrorMessage = (error: any): string => {
  // If it's a Firebase error with code
  if (error?.code && error.code.startsWith('auth/')) {
    return getFirebaseErrorMessage(error.code);
  }
  
  // If it's a string message
  if (typeof error === 'string') {
    return error;
  }
  
  // If it's an error object with message
  if (error?.message) {
    return error.message;
  }
  
  // Fallback
  return 'An unexpected error occurred. Please try again.';
};
