    // Nav scroll behavior
    const nav = document.getElementById('nav');
    const backToTop = document.getElementById('backToTop');

    function onScroll() {
      const scrolled = window.scrollY > 80;
      nav.classList.toggle('scrolled', scrolled);
      backToTop.classList.toggle('visible', window.scrollY > 600);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Back to top
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Mobile menu
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function updateActiveNav() {
      const scrollPos = window.scrollY + 120;
      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }
    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // Fade-in on scroll (Intersection Observer)
    const fadeEls = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(el => observer.observe(el));

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('img');

    document.querySelectorAll('[data-lightbox]').forEach(item => {
      item.style.cursor = 'zoom-in';
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightbox.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    lightbox.addEventListener('click', () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
      lightboxImg.src = '';
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
        lightboxImg.src = '';
      }
    });

    // Resource Modals
    let savedScrollY = 0;

    function openModal(modal) {
      savedScrollY = window.scrollY;
      modal.classList.add('open');
      document.body.classList.add('modal-open');
      document.body.style.top = '-' + savedScrollY + 'px';
    }

    function closeModal(modal) {
      modal.classList.remove('open');
      document.body.classList.remove('modal-open');
      document.body.style.top = '';
      window.scrollTo(0, savedScrollY);
    }

    document.querySelectorAll('.member-card[data-modal]').forEach(card => {
      card.addEventListener('click', (e) => {
        const modalId = 'modal-' + card.dataset.modal;
        const modal = document.getElementById(modalId);
        if (modal) {
          e.preventDefault();
          openModal(modal);
        }
      });
    });

    document.querySelectorAll('.resource-modal').forEach(modal => {
      const closeBtn = modal.querySelector('.resource-modal-close');
      const inner = modal.querySelector('.resource-modal-inner');

      closeBtn.addEventListener('click', () => closeModal(modal));
      modal.addEventListener('click', (e) => {
        if (!inner.contains(e.target)) closeModal(modal);
      });

      // Stop wheel events from bubbling to the page when scrolling inside the modal content
      inner.addEventListener('wheel', (e) => {
        e.stopPropagation();
      }, { passive: true });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.resource-modal.open').forEach(m => closeModal(m));
      }
    });

    // Bylaws TOC smooth scroll + active highlight
    (function() {
      const bylawsModal = document.getElementById('modal-bylaws');
      if (!bylawsModal) return;
      const tocLinks = bylawsModal.querySelectorAll('.bylaws-toc a');
      const content = bylawsModal.querySelector('.bylaws-content');

      tocLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const target = bylawsModal.querySelector(link.getAttribute('href'));
          if (target) {
            content.scrollTo({
              top: target.offsetTop - 20,
              behavior: 'smooth'
            });
            tocLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
          }
        });
      });

      // Update active TOC on scroll
      content.addEventListener('scroll', () => {
        const sections = bylawsModal.querySelectorAll('.bylaws-article, #bylaw-preamble');
        const scrollPos = content.scrollTop + 60;
        let current = '';
        sections.forEach(section => {
          if (section.offsetTop <= scrollPos) current = section.id;
        });
        if (current) {
          tocLinks.forEach(l => {
            l.classList.toggle('active', l.getAttribute('href') === '#' + current);
          });
        }
      });
    })();

    // Reunion Carousel
    (function() {
      const carousel = document.getElementById('reunionCarousel');
      if (!carousel) return;

      const slides = carousel.querySelectorAll('.carousel-slide');
      const dots = carousel.querySelectorAll('.carousel-dot');
      const prevBtn = carousel.querySelector('.prev');
      const nextBtn = carousel.querySelector('.next');
      const currentEl = document.getElementById('carouselCurrent');
      const totalEl = document.getElementById('carouselTotal');
      let current = 0;
      let autoTimer;

      totalEl.textContent = String(slides.length).padStart(2, '0');

      function goTo(index) {
        current = (index + slides.length) % slides.length;
        slides.forEach((s, i) => s.classList.toggle('active', i === current));
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
        currentEl.textContent = String(current + 1).padStart(2, '0');
        resetAuto();
      }

      function resetAuto() {
        clearInterval(autoTimer);
        autoTimer = setInterval(() => goTo(current + 1), 6000);
      }

      prevBtn.addEventListener('click', () => goTo(current - 1));
      nextBtn.addEventListener('click', () => goTo(current + 1));
      dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

      // Pause on hover
      carousel.addEventListener('mouseenter', () => clearInterval(autoTimer));
      carousel.addEventListener('mouseleave', resetAuto);

      resetAuto();
    })();

    // Alumni tabs
    const alumniTabs = document.querySelectorAll('.alumni-tab');
    const alumniPanels = document.querySelectorAll('.alumni-panel');

    alumniTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        alumniTabs.forEach(t => {
          t.classList.toggle('active', t === tab);
          t.setAttribute('aria-selected', t === tab);
        });
        alumniPanels.forEach(panel => {
          panel.classList.toggle('active', panel.id === 'panel-' + target);
        });
      });
    });

    // Legend card click to expand bio on mobile/touch
    document.querySelectorAll('.legend-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (window.matchMedia('(hover: none)').matches) {
          card.classList.toggle('expanded');
        }
      });
    });

    // Smooth scroll offset for fixed nav
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const offset = 70;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  </script>
