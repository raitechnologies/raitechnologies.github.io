# RaiTech Portfolio - Vendor Libraries Installation Guide

This directory contains local copies of all JavaScript and CSS libraries used in the portfolio.
This eliminates CDN dependencies and improves performance and reliability.

## Included Vendors

### JavaScript Libraries

1. **GSAP (GreenSock Animation Platform)** - `js/gsap.min.js`
   - Smooth animations and scroll effects
   - Source: https://github.com/greensock/GSAP
   - License: Standard (Free for most uses)

2. **AOS (Animate On Scroll)** - `js/aos.min.js`
   - Trigger animations when elements scroll into view
   - Source: https://github.com/michalsnik/aos
   - License: MIT

3. **Lucide Icons** - `js/lucide.min.js`
   - Lightweight SVG icon library
   - Source: https://lucide.dev
   - License: ISC

### CSS Frameworks

1. **Tailwind CSS** - `css/tailwind.min.css`
   - Utility-first CSS framework
   - Source: https://tailwindcss.com
   - License: MIT

2. **AOS Styles** - `css/aos.min.css`
   - Animation keyframes for AOS library

## Installation Instructions

### For Fresh Setup

If you need to download fresh versions of these libraries:

#### Option 1: Using npm
```bash
npm install gsap aos lucide@latest
# Copy from node_modules to vendors/js/
```

#### Option 2: Direct Download
- **GSAP**: https://github.com/greensock/GSAP/releases
- **AOS**: https://github.com/michalsnik/aos/releases
- **Lucide**: https://lucide.dev/guide/packages/lucide
- **Tailwind CSS**: Download from https://cdn.tailwindcss.com (production bundle)

### For Tailwind CSS

For development with Tailwind:
```bash
npm install -D tailwindcss
npx tailwindcss -i src/styles/main.css -o vendors/css/tailwind.min.css
```

## Usage in HTML

All libraries are already imported in `public/index.html`:

```html
<!-- Main vendors -->
<script src="vendors/js/gsap.min.js"></script>
<link rel="stylesheet" href="vendors/css/aos.min.css">
<link rel="stylesheet" href="vendors/css/tailwind.min.css">

<!-- Initialization -->
<script src="vendors/js/aos.min.js"></script>
<script src="vendors/js/lucide.min.js"></script>
```

## Version Information

| Library | Version | License |
|---------|---------|---------|
| GSAP | 3.12.2+ | Standard |
| AOS | 2.3.4+ | MIT |
| Lucide | Latest | ISC |
| Tailwind CSS | 3.0+ | MIT |

## License Compliance

All vendor libraries are open-source and included under their respective licenses:
- Copy LICENSE files to this directory for compliance
- Update annually when upgrading libraries

## Performance Notes

- All vendors are minified for production
- Total size: ~150KB (gzipped: ~40KB)
- No external CDN calls required
- Fully cached by browsers

## Support & Updates

When updating vendor libraries:
1. Download new versions
2. Replace files in this directory
3. Update version info above
4. Test all features in the portfolio
5. Commit changes with version bump

---

**Last Updated:** May 16, 2024
