/**
 * Project Gallery Component
 * Reusable gallery with filtering and lightbox effect
 */

class ProjectGallery {
  constructor(projects = []) {
    this.projects = projects;
    this.selectedFilter = 'all';
    this.galleryId = 'gallery-' + Date.now();
    this.lightboxId = 'lightbox-' + Date.now();
  }

  setProjects(projects) {
    this.projects = projects;
  }

  getCategories() {
    const categories = new Set(['all']);
    this.projects.forEach(p => {
      if (p.category) {
        categories.add(p.category);
      }
    });
    return Array.from(categories);
  }

  getFilteredProjects() {
    if (this.selectedFilter === 'all') {
      return this.projects;
    }
    return this.projects.filter(p => p.category === this.selectedFilter);
  }

  render() {
    const categories = this.getCategories();
    const projects = this.getFilteredProjects();

    const filterButtons = categories.map(cat => `
      <button class="filter-btn px-6 py-2 rounded-full font-semibold text-sm uppercase tracking-widest transition-all ${
        cat === 'all' ? 'bg-danger-red text-black' : 'border border-zinc-800 hover:border-danger-red'
      }" data-filter="${cat}">
        ${cat}
      </button>
    `).join('');

    const projectCards = projects.map((project, idx) => `
      <div class="group cursor-pointer" data-project-id="${project.id}" data-aos="zoom-in" data-aos-delay="${idx * 50}">
        <div class="relative overflow-hidden rounded-2xl h-96 bg-zinc-900">
          <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-in-out grayscale group-hover:grayscale-0">
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-8">
            <div>
              <h3 class="text-2xl font-bold mb-2">${project.title}</h3>
              <p class="text-gray-300 mb-4">${project.description}</p>
              <span class="inline-block bg-danger-red text-black px-4 py-1 rounded-full text-xs font-bold">VIEW →</span>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    return `
      <section id="projects" class="min-h-screen bg-black px-8 py-20">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-4xl font-black mb-12 text-center">Featured <span class="text-danger-red">Projects</span></h2>

          <!-- Filters -->
          <div class="flex flex-wrap gap-4 justify-center mb-16">
            ${filterButtons}
          </div>

          <!-- Gallery Grid -->
          <div id="${this.galleryId}" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${projectCards}
          </div>
        </div>

        <!-- Lightbox -->
        <div id="${this.lightboxId}" class="fixed inset-0 bg-black/95 z-50 hidden flex items-center justify-center p-4">
          <div class="relative max-w-4xl w-full">
            <button class="close-lightbox absolute top-0 right-0 text-white text-4xl hover:text-danger-red transition" aria-label="Close lightbox">×</button>
            <div class="lightbox-content"></div>
          </div>
        </div>
      </section>
    `;
  }

  attachEvents() {
    const gallery = document.getElementById(this.galleryId);
    const lightbox = document.getElementById(this.lightboxId);

    if (!gallery) return;

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedFilter = btn.dataset.filter;
        this.renderGallery();
      });
    });

    // Project cards - click to open lightbox
    gallery.addEventListener('click', (e) => {
      const card = e.target.closest('[data-project-id]');
      if (card) {
        const projectId = card.dataset.projectId;
        const project = this.projects.find(p => p.id === projectId);
        if (project) {
          this.openLightbox(project);
        }
      }
    });

    // Close lightbox
    if (lightbox) {
      lightbox.querySelector('.close-lightbox').addEventListener('click', () => {
        this.closeLightbox();
      });

      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
          this.closeLightbox();
        }
      });
    }
  }

  renderGallery() {
    const gallery = document.getElementById(this.galleryId);
    if (gallery) {
      const filtered = this.getFilteredProjects();
      const projectCards = filtered.map((project, idx) => `
        <div class="group cursor-pointer" data-project-id="${project.id}" data-aos="zoom-in">
          <div class="relative overflow-hidden rounded-2xl h-96 bg-zinc-900">
            <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700 grayscale group-hover:grayscale-0">
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-8">
              <div>
                <h3 class="text-2xl font-bold mb-2">${project.title}</h3>
                <p class="text-gray-300 mb-4">${project.description}</p>
                <span class="inline-block bg-danger-red text-black px-4 py-1 rounded-full text-xs font-bold">VIEW →</span>
              </div>
            </div>
          </div>
        </div>
      `).join('');

      gallery.innerHTML = projectCards;
      if (window.AOS) window.AOS.refresh();
      this.attachLightboxEvents();
    }
  }

  openLightbox(project) {
    const lightbox = document.getElementById(this.lightboxId);
    const content = lightbox.querySelector('.lightbox-content');

    content.innerHTML = `
      <img src="${project.image}" alt="${project.title}" class="w-full rounded-xl mb-6">
      <h2 class="text-3xl font-bold mb-4">${project.title}</h2>
      <p class="text-gray-300 mb-6">${project.fullDescription || project.description}</p>
      ${project.tags ? `<div class="flex flex-wrap gap-2 mb-6">
        ${project.tags.map(tag => `<span class="bg-zinc-900 px-3 py-1 rounded-full text-xs">${tag}</span>`).join('')}
      </div>` : ''}
      ${project.link ? `<a href="${project.link}" target="_blank" class="inline-block bg-danger-red text-black px-6 py-2 rounded-full font-bold hover:scale-105 transition">Visit Project →</a>` : ''}
    `;

    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    const lightbox = document.getElementById(this.lightboxId);
    lightbox.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }

  attachLightboxEvents() {
    const gallery = document.getElementById(this.galleryId);
    const lightbox = document.getElementById(this.lightboxId);

    if (!gallery || !lightbox) return;

    gallery.addEventListener('click', (e) => {
      const card = e.target.closest('[data-project-id]');
      if (card) {
        const projectId = card.dataset.projectId;
        const project = this.projects.find(p => p.id === projectId);
        if (project) {
          this.openLightbox(project);
        }
      }
    });

    lightbox.querySelector('.close-lightbox').addEventListener('click', () => {
      this.closeLightbox();
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        this.closeLightbox();
      }
    });
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ProjectGallery;
}
