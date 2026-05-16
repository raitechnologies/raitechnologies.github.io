# DEPLOYMENT GUIDE - RaiTech Portfolio

Complete guide for deploying the RaiTech portfolio website to various hosting platforms.

## Pre-Deployment Checklist

- [ ] All pages tested in multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsiveness verified on various devices
- [ ] Contact form backend integration configured
- [ ] Analytics (Google Analytics/similar) set up
- [ ] SSL certificate ready
- [ ] Backups created
- [ ] Performance tested (Lighthouse score 90+)
- [ ] SEO audit completed (meta tags, schema, sitemap)

## GitHub Pages (Recommended for Free Hosting)

### Setup Instructions

1. **Create GitHub Repository**
```bash
git init
git add .
git commit -m "Initial commit: RaiTech Portfolio v2.0"
git branch -M main
git remote add origin https://github.com/raitechnologies/portfolio.git
git push -u origin main
```

2. **Configure Repository Settings**
- Go to Settings → Pages
- Source: Deploy from branch
- Branch: main
- Folder: / (root) or /public
- Save

3. **Update package.json**
```json
{
  "homepage": "https://raitechnologies.github.io"
}
```

4. **Enable HTTPS**
- Wait 5-10 minutes for GitHub to provision SSL
- Check Settings → Pages → "Enforce HTTPS"

### Custom Domain Setup

1. **Add CNAME record** to your domain registrar:
```
Type: CNAME
Name: @
Value: raitechnologies.github.io
TTL: 3600
```

Or for www subdomain:
```
Type: CNAME
Name: www
Value: raitechnologies.github.io
TTL: 3600
```

2. **Update GitHub Pages Settings**
- Go to Settings → Pages
- Custom domain: raitech.com
- Enforce HTTPS: Enable
- Save

3. **Verify Domain**
```bash
dig raitech.com +short
# Should resolve to GitHub's IP
```

## Vercel Deployment

### One-Click Deploy

1. **Push to GitHub** (as above)

2. **Connect to Vercel**
- Visit https://vercel.com
- Click "New Project"
- Select your GitHub repository
- Click "Import"

3. **Configure**
- Framework Preset: Other
- Root Directory: ./
- Build Command: `npm run build` (or leave empty for static)
- Output Directory: Leave default

4. **Deploy**
- Click "Deploy"
- Vercel auto-provisions SSL and deploys

### Custom Domain
- Go to Settings → Domains
- Add your domain
- Update DNS records with Vercel's nameservers
- Complete verification

## Netlify Deployment

### Deploy Steps

1. **Connect GitHub Repository**
- Visit https://app.netlify.com
- Click "New site from Git"
- Select GitHub
- Authorize and select repository

2. **Configure Build Settings**
- Build command: `npm run build` (or empty for static)
- Publish directory: `./` (or `/public`)
- Environment variables: Add any needed

3. **Deploy**
- Netlify auto-builds and deploys on Git push

### Custom Domain
- Domain settings → Add custom domain
- Update DNS records
- Complete verification

## Traditional Hosting (cPanel, Plesk, etc.)

### via FTP/SFTP

1. **Compress Portfolio**
```bash
zip -r portfolio.zip . -x "node_modules/*" ".git/*"
```

2. **Upload via FTP**
- Connect to your hosting FTP
- Navigate to `public_html/` or web root
- Upload all files
- Delete placeholder index.html if exists

3. **Configure Routing** (.htaccess)
- .htaccess already included in `/public/`
- Upload to public_html/
- Test SPA routing

### via SSH/SFTP

```bash
# Connect to server
ssh user@yourdomain.com

# Navigate to web directory
cd public_html

# Clone repository
git clone https://github.com/raitechnologies/portfolio.git .

# Install dependencies (if using build tools)
npm install

# Build (if applicable)
npm run build
```

## Environment Configuration

### For Production

1. **Create .env.production** (keep secrets safe)
```
VITE_API_URL=https://api.raitech.com
VITE_ANALYTICS_ID=UA-XXXXX-X
```

2. **Update Contact Form Backend**
- Replace fetch URL in `src/components/ContactForm.js`
- Point to your backend/serverless function

3. **Configure Analytics**
- Update tracking ID in index.html
- Set up Google Search Console
- Configure Google Analytics

## Security Checklist

- [ ] HTTPS enforced globally
- [ ] Security headers configured (.htaccess or server config)
- [ ] Contact form backend is secure
- [ ] No API keys exposed in frontend code
- [ ] CORS properly configured
- [ ] Rate limiting on contact form
- [ ] Regular security audits

## DNS Configuration Example

For domain `raitech.com`:

```
// For GitHub Pages
@ CNAME raitechnologies.github.io
www CNAME raitechnologies.github.io

// For MX Records (if using email)
@ MX 10 mail.yourmailprovider.com

// For TXT Records (verification)
@ TXT "v=spf1 include:yourmailprovider.com ~all"
```

## Performance Optimization for Production

### Minification
```bash
# CSS
npm install -g cssnano-cli
cssnano src/styles/main.css -o src/styles/main.min.css

# JavaScript
npm install -g terser
terser src/components/*.js -c -m -o vendors/js/app.min.js
```

### Image Optimization
```bash
# Compress all images
for file in assets/imges/*.{jpg,png}; do
  convert "$file" -quality 85 -strip "${file%.*}.optimized.jpg"
done
```

### Enable Gzip Compression
```apache
# In .htaccess
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

## Monitoring & Analytics

### Google Search Console
1. Visit https://search.google.com/search-console
2. Add property (your domain)
3. Submit sitemap: https://raitechnologies.github.io//seo/sitemap.xml
4. Monitor search appearance

### Google Analytics 4
1. Set up property in Google Analytics
2. Add tracking code to index.html
3. Monitor user behavior and traffic

### Error Monitoring
- Set up Sentry or similar
- Monitor console errors
- Track broken links

## Post-Deployment Tasks

1. **Verify Everything Works**
   - Test all pages and forms
   - Check mobile responsiveness
   - Verify animations work
   - Test contact form submission

2. **Submit to Search Engines**
   - Google: https://search.google.com/search-console
   - Bing: https://www.bing.com/webmasters
   - Submit sitemap.xml

3. **Social Media Links**
   - Add LinkedIn meta tags
   - Test Open Graph preview
   - Share on social platforms

4. **Monitor Performance**
   - Set up monitoring tools
   - Create error alerts
   - Monitor uptime

5. **Backup Strategy**
   - Weekly automated backups
   - Store securely offsite
   - Document restoration process

## Rollback Procedure

If deployment has issues:

```bash
# GitHub Pages
git revert HEAD
git push origin main

# Vercel/Netlify
- Automatic rollback available in deployment history
- Click on previous successful deployment
- Promote to production
```

## Support & Troubleshooting

### Common Issues

**404 Errors on SPA Routes**
- Ensure .htaccess is in public directory
- Check server mod_rewrite is enabled
- Contact hosting support if unsure

**HTTPS Not Working**
- Wait 24 hours for SSL provisioning
- Clear browser cache
- Try different browser

**Slow Performance**
- Run Lighthouse audit
- Enable gzip compression
- Optimize images
- Use CDN for assets

**Contact Form Not Working**
- Verify backend endpoint
- Check CORS settings
- Monitor console for errors
- Test with curl:
  ```bash
  curl -X POST https://api.raitech.com/contact \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test@test.com","message":"Test"}'
  ```

---

**Last Updated:** May 16, 2024

For additional help, refer to:
- [GitHub Pages Docs](https://pages.github.com)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
