
// @ts-nocheck
// Detect and store user timezone
export const detectAndStoreTimezone = async (uid: string, updateUserData: (data: any) => Promise<void>): Promise<void> => {
  try {
    // Get user's timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Store in user data
    await updateUserData({
      timezone: timezone
    });
    
    console.log(`Timezone stored for user ${uid}: ${timezone}`);
  } catch (error) {
    console.error('Error storing timezone:', error);
  }
};

// Format date in user's timezone
export const formatDateInUserTimezone = (date: Date, timezone?: string): string => {
  try {
    const userTimezone = timezone || 'UTC';
    return date.toLocaleDateString('en-US', {
      timeZone: userTimezone,
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    console.warn('Invalid timezone, using UTC:', timezone);
    return date.toLocaleDateString('en-US', {
      timeZone: 'UTC',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
};

// PDF Generation utility
export const generatePDF = (content: string, metadata: {
  type: 'hook' | 'script';
  topic: string;
  tone: string;
  audience: string;
  platform: string;
  scriptLength?: string;
}) => {
  // Dynamic import to avoid SSR issues
  import('jspdf').then(({ default: jsPDF }) => {
    const doc = new jsPDF();
    
    // Ultra-minimalist color scheme
    const headingColor = [59, 130, 246]; // Blue for headings
    const textColor = [0, 0, 0]; // Black for content
    const lightGray = [245, 245, 245]; // Very light gray for subtle elements
    
    // Set initial font
    doc.setFont('helvetica');
    
    // Clean header
    doc.setTextColor(headingColor[0], headingColor[1], headingColor[2]);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Corex AI', 25, 30);
    
    // Original branding
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Stop Guessing. Start Trending.', 25, 40);
    
    // Simple generation info
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.setFontSize(10);
    const now = new Date();
    const dateTime = now.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    doc.text(`Generated: ${dateTime}`, 25, 55);
    
    // Content type
    doc.setTextColor(...headingColor);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`Type: ${metadata.type.toUpperCase()}`, 150, 55);
    
    // Project details - simple list
    const startY = 75;
    
    doc.setTextColor(...headingColor);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Project Details', 25, startY);
    
    // Simple details layout
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    const details = [
      { label: 'Topic', value: metadata.topic },
      { label: 'Tone', value: metadata.tone },
      { label: 'Audience', value: metadata.audience },
      { label: 'Platform', value: metadata.platform }
    ];
    
    // Add Length if it exists
    if (metadata.scriptLength) {
      details.push({ label: 'Length', value: metadata.scriptLength });
    }
    
    let detailY = startY + 15;
    details.forEach((detail) => {
      doc.setTextColor(...textColor);
      
      // Special handling for Topic field - auto-wrap long text
      if (detail.label === 'Topic' && detail.value.length > 50) {
        const topicLines = doc.splitTextToSize(detail.value, 160);
        doc.text(`${detail.label}:`, 25, detailY);
        
        // Add wrapped topic text on next line
        topicLines.forEach((line: string, index: number) => {
          const lineY = detailY + (index + 1) * 6;
          doc.text(line, 35, lineY);
        });
        
        detailY += (topicLines.length + 1) * 6;
      } else {
        // Regular handling for other fields
        doc.text(`${detail.label}: ${detail.value}`, 25, detailY);
        detailY += 8;
      }
    });
    
    // Content section
    const contentStartY = detailY + 10;
    
    doc.setTextColor(...headingColor);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Generated Content', 25, contentStartY);
    
    // Simple separator line
    doc.setDrawColor(...lightGray);
    doc.setLineWidth(0.5);
    doc.line(25, contentStartY + 5, 185, contentStartY + 5);
    
    // Content text - clean and simple
    doc.setTextColor(...textColor);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    // Split content into lines
    const maxWidth = 160;
    const lines = doc.splitTextToSize(content, maxWidth);
    
    // Add content with clean spacing
    let yPosition = contentStartY + 20;
    lines.forEach((line: string, index: number) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 30;
      }
      
      // Simple formatting
      doc.text(line, 25, yPosition);
      yPosition += 8;
    });
    
    // Minimal footer
    const footerY = 280;
    doc.setTextColor(...textColor);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Corex AI', 25, footerY);
    doc.text('www.corexai.app', 25, footerY + 8);
    
    // Save the PDF
    const fileName = `corex-ai-${metadata.type}-${Date.now()}.pdf`;
    doc.save(fileName);
          }).catch(error => {
          console.error('Error generating PDF:', error);
          // Note: This function is called from components that now handle errors with toast
          throw error; // Re-throw to let the calling component handle it
        });
};

