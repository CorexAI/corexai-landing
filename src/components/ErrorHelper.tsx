import { motion } from "framer-motion";

interface ErrorHelperProps {
  error: string;
}

export default function ErrorHelper({ error }: ErrorHelperProps) {
  // Helper suggestions based on error content
  const getHelperText = (error: string): string | null => {
    if (error.includes("No account found")) {
      return "Try creating a new account or check if you're using the correct email address.";
    }
    
    if (error.includes("Incorrect password")) {
      return "Make sure Caps Lock is off and try again. You can also reset your password.";
    }
    

    

    
    if (error.includes("Password is too weak")) {
      return "Use a mix of letters, numbers, and symbols. Make it at least 8 characters long.";
    }
    
    if (error.includes("Too many failed attempts")) {
      return "Wait a few minutes before trying again. You can also reset your password.";
    }
    
    if (error.includes("Network error")) {
      return "Check your internet connection and try again. If the problem persists, try later.";
    }
    
    if (error.includes("valid email address")) {
      return "Make sure you've entered a complete email address (e.g., user@example.com).";
    }
    

    
    return null;
  };

  const helperText = getHelperText(error);
  
  if (!helperText) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg"
    >
      <div className="flex items-start gap-2">
        <div className="flex-shrink-0 mt-0.5">
          <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="text-blue-400 text-xs leading-relaxed">{helperText}</p>
      </div>
    </motion.div>
  );
}
