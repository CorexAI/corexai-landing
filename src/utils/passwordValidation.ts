export interface PasswordValidation {
  isValid: boolean;
  errors: string[];
}

export function validatePassword(password: string): PasswordValidation {
  const errors: string[] = [];

  // Check minimum length
  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  // Check for at least 2 numbers
  const numberCount = (password.match(/\d/g) || []).length;
  if (numberCount < 2) {
    errors.push('Password must contain at least 2 numbers');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function getPasswordStrength(password: string): 'weak' | 'medium' | 'strong' {
  if (password.length < 6) return 'weak';
  
  const hasNumbers = /\d/.test(password);
  const hasLetters = /[a-zA-Z]/.test(password);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  if (password.length >= 8 && hasNumbers && hasLetters && hasSpecialChars) {
    return 'strong';
  } else if (password.length >= 6 && hasNumbers && hasLetters) {
    return 'medium';
  } else {
    return 'weak';
  }
}
