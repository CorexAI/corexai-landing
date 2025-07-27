# SEO Setup Guide for Corex AI

## 🔧 **8. SEO Tools Setup**

### **Google Search Console Setup:**
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Start now" and sign in with your Google account
3. Add your property: `https://corexai.app`
4. Verify ownership (choose HTML tag method)
5. Copy the verification code and add it to your layout.tsx
6. Submit your sitemap: `https://corexai.app/sitemap.xml`

### **Bing Webmaster Tools Setup:**
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Sign in with your Microsoft account
3. Add your site: `https://corexai.app`
4. Verify ownership
5. Submit your sitemap: `https://corexai.app/sitemap.xml`

### **Google PageSpeed Insights:**
1. Go to [PageSpeed Insights](https://pagespeed.web.dev/)
2. Enter your URL: `https://corexai.app`
3. Click "Analyze"
4. Review the performance score and suggestions
5. Implement recommended optimizations

## 🖼️ **6. Missing Images Creation**

### **og-image.png (1200x630px):**
- **Tool:** Canva (free) - go to canva.com
- **Template:** Search for "Facebook post" or "Social media post"
- **Elements to include:**
  - Corex AI logo
  - "Stop Guessing. Start Trending."
  - "AI That Writes Scripts to Go Viral"
  - Visual elements (AI brain, trending chart, social icons)
  - Dark background with blue accents
- **Export:** PNG format, 1200x630px
- **Place:** In `/public/` folder

### **apple-touch-icon.png (180x180px):**
- **Tool:** Same as above
- **Size:** 180x180px
- **Design:** Simplified version of your logo
- **Export:** PNG format
- **Place:** In `/public/` folder

## ⚡ **7. Image Optimization**

### **Current Issues:**
- mockup.PNG: 3.3MB (too large)
- mockup2.PNG: 1.3MB (too large)

### **Solutions:**
1. **Use online tools:**
   - [TinyPNG](https://tinypng.com/) - Compress PNG files
   - [Squoosh](https://squoosh.app/) - Convert to WebP
   
2. **Manual optimization:**
   - Open images in any image editor
   - Reduce quality to 80-85%
   - Resize if larger than needed
   - Save as optimized PNG or WebP

3. **Replace in code:**
   - Update image references to use optimized versions
   - Add `quality={85}` prop to Next.js Image components

## 📝 **9. Content Enhancements**

### **Additional FAQ Items Added:**
✅ How does Corex AI compare to other AI writing tools like ChatGPT?
✅ Can I use Corex AI for YouTube videos and long-form content?
✅ What makes Corex AI different from other script generators?

### **Internal Linking Added:**
✅ FAQ links to pricing page
✅ Navigation between pages

### **Alt Text Added:**
✅ All images now have descriptive alt text
✅ Improved accessibility and SEO

## 🚀 **Next Steps:**

1. **Create the missing images** (og-image.png, apple-touch-icon.png)
2. **Optimize existing images** (compress PNG files)
3. **Set up Google Search Console** (follow steps above)
4. **Set up Bing Webmaster Tools** (follow steps above)
5. **Test with PageSpeed Insights** (check performance)

## 📊 **Expected Results:**

After implementing all optimizations:
- **Faster loading speed** (reduced image sizes)
- **Better search rankings** (SEO improvements)
- **Higher social media engagement** (og-image)
- **Improved user experience** (internal linking)
- **Better accessibility** (alt text)

## 🔍 **Monitoring:**

- Check Google Search Console weekly for:
  - Search performance
  - Indexing status
  - Any errors
- Monitor PageSpeed Insights monthly
- Track organic traffic growth 