/**
 * Blog Component
 * Manages blog posts with markdown support
 */

class BlogSystem {
  constructor() {
    this.posts = [];
    this.selectedCategory = 'all';
  }

  async loadPosts() {
    // Load posts from blog-posts directory
    // In production, this would fetch from an API
    this.posts = await this.fetchBlogPosts();
  }

  async fetchBlogPosts() {
    // Simulated blog posts data
    // In production, fetch from API or CMS
    return [
      {
        id: 1,
        title: 'The Future of AI in Enterprise Systems',
        slug: 'future-of-ai-enterprise',
        excerpt: 'Exploring how artificial intelligence is transforming enterprise architecture and decision-making processes.',
        category: 'AI & ML',
        author: 'Rai Faisal',
        date: '2024-05-10',
        image: 'assets/imges/blog-1.jpg',
        content: `# The Future of AI in Enterprise Systems

Enterprise organizations are at an inflection point where artificial intelligence is no longer optional—it's essential. 

## Current State of AI Adoption

Companies across sectors are rapidly integrating AI for:

* **Predictive Analytics** - forecasting business trends with unprecedented accuracy
* **Automation** - reducing manual processes by 60-80%
* **Decision Support** - augmenting human judgment with data-driven insights

## Challenges Ahead

The path forward requires addressing:

1. Data quality and governance
2. Integration with legacy systems
3. Ethical AI implementation

## Conclusion

Organizations that embrace AI strategically will dominate their markets. The question isn't whether to adopt AI, but how quickly you can.`
      },
      {
        id: 2,
        title: 'Cybersecurity in 2024: A Holistic Approach',
        slug: 'cybersecurity-2024',
        excerpt: 'A comprehensive guide to modern cybersecurity strategies and best practices for organizations of all sizes.',
        category: 'Security',
        author: 'Rai Faisal',
        date: '2024-04-28',
        image: 'assets/imges/blog-2.jpg',
        content: `# Cybersecurity in 2024: A Holistic Approach

Cybersecurity has evolved beyond just firewalls and antivirus. It's now about creating a comprehensive security posture.

## Zero Trust Architecture

The principle is simple: **never trust, always verify**.

Every access request must be authenticated and authorized, regardless of source.

## Key Areas of Focus

* **Identity Management**
* **Network Segmentation**
* **Incident Response**

## Looking Forward

As threats evolve, so must our defenses.`
      },
      {
        id: 3,
        title: 'Cloud-Native Development Best Practices',
        slug: 'cloud-native-practices',
        excerpt: 'Practical strategies for building scalable, resilient applications in cloud environments.',
        category: 'Cloud & DevOps',
        author: 'Rai Faisal',
        date: '2024-04-15',
        image: 'assets/imges/blog-3.jpg',
        content: `# Cloud-Native Development Best Practices

Cloud-native architecture requires a mindset shift from traditional monolithic development.

## Microservices & Containers

Breaking down applications into smaller, manageable services enables:

1. Independent scaling
2. Technology diversity
3. Faster deployment cycles

## Serverless Computing

Functions as a service (FaaS) eliminate infrastructure management burden.

## Conclusion

Cloud-native isn't just about technology—it's about organizational culture and practices.`
      }
    ];
  }

  renderBlogList() {
    const categories = ['all', ...new Set(this.posts.map(p => p.category))];
    
    const filterButtons = categories.map(cat => `
      <button class="blog-filter px-6 py-2 rounded-full font-semibold text-sm uppercase tracking-widest transition-all ${
        cat === 'all' ? 'bg-danger-red text-black' : 'border border-zinc-800 hover:border-danger-red'
      }" data-category="${cat}">
        ${cat}
      </button>
    `).join('');

    const filteredPosts = this.selectedCategory === 'all' 
      ? this.posts 
      : this.posts.filter(p => p.category === this.selectedCategory);

    const postCards = filteredPosts.map(post => `
      <article class="bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 hover:border-danger-red transition cursor-pointer group" data-post-id="${post.id}">
        <div class="h-64 bg-zinc-900 overflow-hidden">
          <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
        </div>
        <div class="p-6">
          <div class="flex justify-between items-start mb-3">
            <span class="text-danger-red text-xs font-bold uppercase tracking-widest">${post.category}</span>
            <time class="text-gray-500 text-xs">${new Date(post.date).toLocaleDateString()}</time>
          </div>
          <h3 class="text-xl font-bold mb-3 group-hover:text-danger-red transition">${post.title}</h3>
          <p class="text-gray-400 text-sm mb-4">${post.excerpt}</p>
          <p class="text-danger-red font-bold text-sm">Read More →</p>
        </div>
      </article>
    `).join('');

    return `
      <section id="blog" class="min-h-screen bg-black px-8 py-20">
        <div class="max-w-6xl mx-auto">
          <h1 class="text-5xl font-black mb-4 text-center">RaiTech <span class="text-danger-red">Blog</span></h1>
          <p class="text-gray-400 text-center mb-12">Insights on technology, innovation, and digital transformation.</p>

          <!-- Filters -->
          <div class="flex flex-wrap gap-4 justify-center mb-16">
            ${filterButtons}
          </div>

          <!-- Blog Posts Grid -->
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${postCards}
          </div>
        </div>
      </section>
    `;
  }

  renderBlogPost(postId) {
    const post = this.posts.find(p => p.id === parseInt(postId));
    if (!post) return '<div class="text-center py-20">Post not found</div>';

    const parsedContent = MarkdownParser.parse(post.content);

    return `
      <article class="min-h-screen bg-black px-8 py-20">
        <div class="max-w-3xl mx-auto">
          <!-- Back Button -->
          <a href="/blog" class="text-danger-red hover:underline font-bold mb-8 inline-block">← Back to Blog</a>

          <!-- Post Header -->
          <header class="mb-12">
            <div class="mb-6">
              <span class="text-danger-red text-sm font-bold uppercase tracking-widest">${post.category}</span>
            </div>
            <h1 class="text-5xl font-black mb-6">${post.title}</h1>
            <div class="flex items-center gap-4 text-gray-400 text-sm">
              <span>By ${post.author}</span>
              <span>•</span>
              <time>${new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</time>
            </div>
          </header>

          <!-- Featured Image -->
          <img src="${post.image}" alt="${post.title}" class="w-full rounded-2xl mb-12 border border-zinc-800">

          <!-- Post Content -->
          <div class="prose prose-invert max-w-none mb-12">
            ${parsedContent}
          </div>

          <!-- Author Bio -->
          <aside class="bg-zinc-950 rounded-2xl p-8 border border-zinc-800">
            <h3 class="text-xl font-bold mb-3">About the Author</h3>
            <p class="text-gray-400">
              Rai Faisal is an IT professional and founder of RaiTech, specializing in enterprise architecture, 
              cybersecurity, and digital transformation. With over 10 years of experience, he helps organizations 
              navigate the complex landscape of modern technology.
            </p>
          </aside>

          <!-- Related Posts Section could go here -->
        </div>
      </article>
    `;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = BlogSystem;
}
