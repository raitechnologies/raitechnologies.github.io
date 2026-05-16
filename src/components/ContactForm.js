/**
 * Contact Form Component
 * Reusable contact form with validation and success animation
 */

class ContactForm {
  constructor() {
    this.formId = 'contact-form-' + Date.now();
  }

  validate(data) {
    const errors = {};

    if (!data.name || data.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.email = 'Please enter a valid email';
    }

    if (!data.message || data.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    if (data.phone && !/^\d{10,}$/.test(data.phone.replace(/\D/g, ''))) {
      errors.phone = 'Please enter a valid phone number';
    }

    return errors;
  }

  render() {
    return `
      <div class="bg-zinc-950 rounded-2xl p-8 border border-zinc-800">
        <h3 class="text-3xl font-bold mb-8">Get In <span class="text-danger-red">Touch</span></h3>
        
        <form id="${this.formId}" class="space-y-6">
          <!-- Name -->
          <div>
            <label class="block text-sm font-semibold mb-2">Your Name *</label>
            <input type="text" name="name" placeholder="Rai Faisal" required 
              class="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-danger-red transition"
            />
            <span class="error-message text-danger-red text-xs mt-1 hidden"></span>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-semibold mb-2">Email Address *</label>
            <input type="email" name="email" placeholder="you@example.com" required
              class="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-danger-red transition"
            />
            <span class="error-message text-danger-red text-xs mt-1 hidden"></span>
          </div>

          <!-- Phone -->
          <div>
            <label class="block text-sm font-semibold mb-2">Phone Number (Optional)</label>
            <input type="tel" name="phone" placeholder="+1 (555) 123-4567"
              class="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-danger-red transition"
            />
            <span class="error-message text-danger-red text-xs mt-1 hidden"></span>
          </div>

          <!-- Message -->
          <div>
            <label class="block text-sm font-semibold mb-2">Message *</label>
            <textarea name="message" placeholder="Tell us about your project..." rows="5" required
              class="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-danger-red transition resize-none"
            ></textarea>
            <span class="error-message text-danger-red text-xs mt-1 hidden"></span>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="w-full bg-danger-red hover:bg-red-600 text-black font-bold py-3 rounded-lg transition-all glow-hover">
            Send Message
          </button>

          <!-- Success Message -->
          <div class="success-message hidden bg-green-900 border border-green-700 text-green-100 px-4 py-3 rounded-lg">
            <p class="font-semibold">✓ Message sent successfully!</p>
            <p class="text-sm">Thank you for reaching out. We'll get back to you soon.</p>
          </div>
        </form>
      </div>
    `;
  }

  attachEvents() {
    const form = document.getElementById(this.formId);
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Collect form data
      const formData = {
        name: form.querySelector('input[name="name"]').value,
        email: form.querySelector('input[name="email"]').value,
        phone: form.querySelector('input[name="phone"]').value,
        message: form.querySelector('textarea[name="message"]').value,
      };

      // Validate
      const errors = this.validate(formData);

      if (Object.keys(errors).length > 0) {
        // Display errors
        form.querySelectorAll('input, textarea').forEach((field) => {
          const errorMsg = field.parentElement.querySelector('.error-message');
          if (errors[field.name]) {
            field.classList.add('border-danger-red');
            errorMsg.textContent = errors[field.name];
            errorMsg.classList.remove('hidden');
          } else {
            field.classList.remove('border-danger-red');
            errorMsg.classList.add('hidden');
          }
        });
        return;
      }

      // Clear previous errors
      form.querySelectorAll('.error-message').forEach(msg => msg.classList.add('hidden'));
      form.querySelectorAll('input, textarea').forEach(field => field.classList.remove('border-danger-red'));

      // Show loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      try {
        // Simulate sending (in production, send to backend)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success message
        const successMsg = form.querySelector('.success-message');
        successMsg.classList.remove('hidden');

        // Reset form
        form.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
          successMsg.classList.add('hidden');
        }, 5000);
      } catch (error) {
        console.error('Error sending message:', error);
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ContactForm;
}
