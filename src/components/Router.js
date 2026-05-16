/**
 * Simple Client-Side Router for Portfolio
 * Supports dynamic page navigation without full page reloads
 */

class Router {
  constructor() {
    this.routes = {};
    this.currentPage = null;
    this.mainContent = document.getElementById('main-content');
    this.init();
  }

  register(path, component) {
    this.routes[path] = component;
  }

  async navigate(path) {
    if (!this.routes[path]) {
      console.error(`Route not found: ${path}`);
      return;
    }

    // Show loader
    this.showLoader();

    // Load page content
    const component = this.routes[path];
    let content;

    if (typeof component === 'function') {
      content = await component();
    } else {
      content = component;
    }

    // Update main content
    this.mainContent.innerHTML = content;
    this.currentPage = path;

    // Update URL
    window.history.pushState({ page: path }, '', path);

    // Reinitialize animations
    this.reinitializeAnimations();

    // Hide loader
    this.hideLoader();

    // Scroll to top
    window.scrollTo(0, 0);
  }

  showLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.style.display = 'flex';
    }
  }

  hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
      setTimeout(() => {
        loader.style.display = 'none';
      }, 300);
    }
  }

  reinitializeAnimations() {
    // Reinitialize AOS if available
    if (window.AOS) {
      window.AOS.refresh();
    }

    // Reinitialize GSAP if available
    if (window.gsap && window.gsap.registerPlugin && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.refresh();
    }

    // Reinitialize Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  init() {
    // Handle browser back/forward
    window.addEventListener('popstate', (e) => {
      const path = e.state?.page || '/';
      this.navigate(path);
    });

    // Handle initial page load
    const path = window.location.pathname === '/' ? '/' : window.location.pathname;
    if (this.routes[path]) {
      this.navigate(path);
    }
  }

  static getInstance() {
    if (!window.portfolioRouter) {
      window.portfolioRouter = new Router();
    }
    return window.portfolioRouter;
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Router;
}
