// ==========================
    // Small front-end JS: menu, smooth scroll, testimonials, form validation
    // ==========================
    document.addEventListener('DOMContentLoaded', function(){
      // set year in footer
      document.getElementById('year').textContent = new Date().getFullYear();

      // Mobile menu toggle
      const menuBtn = document.getElementById('menu-btn');
      const primaryNav = document.getElementById('primary-nav');
      menuBtn.addEventListener('click', function(){
        const expanded = this.getAttribute('aria-expanded') === 'true' || false;
        this.setAttribute('aria-expanded', !expanded);
        primaryNav.style.display = primaryNav.style.display === 'flex' ? '' : 'flex';
      });

      // Close menu on link click (mobile)
      primaryNav.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>{
        if(window.innerWidth <= 640){ primaryNav.style.display = ''; menuBtn.setAttribute('aria-expanded', false); }
      }));

      // Smooth scroll for internal links
      document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e){
          // If it's an actual anchor on the page, smooth scroll
          const target = document.querySelector(this.getAttribute('href'));
          if(target){
            e.preventDefault();
            target.scrollIntoView({behavior:'smooth', block:'start'});
          }
        });
      });

      // Testimonials carousel (very small)
      const testimonials = document.querySelectorAll('.testimonial');
      let tIndex = 0;
      function showTestimonial(i){
        testimonials.forEach((t, idx)=> t.classList.toggle('active', idx === i));
      }
      if(testimonials.length > 1){
        setInterval(()=>{ tIndex = (tIndex + 1) % testimonials.length; showTestimonial(tIndex); }, 5000);
      }

      // Contact form validation + fallback mailto (no backend required)
      const form = document.getElementById('contact-form');
      const formMsg = document.getElementById('form-msg');
      form.addEventListener('submit', function(e){
        e.preventDefault();
        formMsg.textContent = '';
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();
        const phone = form.phone.value.trim();
        if(!name || !email || !message){
          formMsg.textContent = 'Please fill name, email and a short message.';
          return;
        }
        // simple email check
        if(!/^\S+@\S+\.\S+$/.test(email)){
          formMsg.textContent = 'Please enter a valid email address.';
          return;
        }

        // If you have a backend or Formspree you can POST here. By default we open mail client.
        const subject = encodeURIComponent('Service request from ' + name + ' — ' + form.service.value);
        const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\nPhone: ' + phone + '\nService: ' + form.service.value + '\n\nMessage:\n' + message);
        const mailto = 'mailto:your.email@example.com?subject=' + subject + '&body=' + body;

        // Try to open mail client
        window.location.href = mailto;
        formMsg.textContent = 'Opening your mail client...';
      });

    });