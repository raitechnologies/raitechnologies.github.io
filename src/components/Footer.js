/**
 * Footer Component
 * Reusable footer with links and copyright
 */

class Footer {
  constructor() {
    this.year = new Date().getFullYear();
    this.links = [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/#about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Career', href: '/career' },
    ];
  }

  render() {
    const linkItems = this.links.map(link =>
      `<a href="${link.href}" class="text-gray-400 hover:text-danger-red transition text-sm">${link.label}</a>`
    ).join('');

    return `
      <footer class="bg-zinc-950 border-t border-zinc-900 px-8 py-16">
        <div class="max-w-6xl mx-auto">
          <div class="grid md:grid-cols-3 gap-12 mb-12">
            <!-- Brand -->
            <div>
              <h3 class="text-2xl font-black mb-4">
                RAI<span class="text-danger-red">TECH</span>
              </h3>
              <p class="text-gray-500 text-sm">
                Innovation Redefined. Building digital excellence for enterprises worldwide.
              </p>
            </div>

            <!-- Quick Links -->
            <div>
              <h4 class="font-bold uppercase text-sm tracking-widest mb-6">Quick Links</h4>
              <div class="space-y-3">
                ${linkItems}
              </div>
            </div>

            <!-- Contact Info -->
            <div>
              <h4 class="font-bold uppercase text-sm tracking-widest mb-6">Contact</h4>
              <div class="space-y-3 text-sm text-gray-400">
                <p><strong>Email:</strong> <a href="mailto:info@raitech.com" class="text-danger-red hover:underline">info@raitech.com</a></p>
                <p><strong>Social:</strong></p>
                <div class="flex space-x-4">
                  <a href="https://linkedin.com/in/raifaisal" target="_blank" class="hover:text-danger-red transition">LinkedIn</a>
                  <a href="https://twitter.com/raifaisal" target="_blank" class="hover:text-danger-red transition">Twitter</a>
                  <a href="https://github.com/raifaisal" target="_blank" class="hover:text-danger-red transition">GitHub</a>
                </div>
              </div>
            </div>
          </div>

          <!-- Copyright -->
          <div class="border-t border-zinc-900 pt-8 flex justify-between items-center text-sm text-gray-500">
            <p>&copy; ${this.year} RaiTech. All rights reserved.</p>
            <p>Built with <span class="text-danger-red">❤</span> by Rai Faisal</p>
          </div>
        </div>
      </footer>
    `;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Footer;
}
