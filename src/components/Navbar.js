/**
 * Navbar Component
 * Reusable navigation component with dynamic links
 */

class Navbar {
  constructor() {
    this.navItems = [
      { label: 'About', link: '#about', id: 'about' },
      { label: 'Services', link: '#services', id: 'services' },
      { label: 'Projects', link: '#projects', id: 'projects' },
      { label: 'Blog', link: '/blog', id: 'blog' },
      { label: 'Contact', link: '#contact', id: 'contact' },
    ];
  }

  render() {
    const navLinks = this.navItems.map(item => 
      `<a href="${item.link}" class="hover:text-danger-red transition">${item.label}</a>`
    ).join('');

    return `
      <nav class="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-gradient-to-b from-black to-transparent">
        <a href="/" class="text-2xl font-black tracking-tighter cursor-pointer">
          RAI<span class="text-danger-red">FAISAL</span>
        </a>
        <div class="hidden md:flex space-x-8 text-sm font-medium tracking-widest uppercase">
          ${navLinks}
        </div>
        <button class="bg-danger-red px-6 py-2 rounded-full text-sm font-bold glow-hover transition-all" data-action="hire-me">
          HIRE ME
        </button>
      </nav>
    `;
  }

  attachEvents() {
    const hireBtn = document.querySelector('[data-action="hire-me"]');
    if (hireBtn) {
      hireBtn.addEventListener('click', () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Add click handlers for navigation links
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', (e) => {
        if (link.getAttribute('href').startsWith('/')) {
          e.preventDefault();
          const router = window.portfolioRouter;
          if (router) {
            router.navigate(link.getAttribute('href'));
          }
        }
      });
    });
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Navbar;
}
