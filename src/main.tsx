import './index.css';

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. PRELOADER CONTROLLER
     ========================================================================== */
  const preloader = document.getElementById('preloader');
  
  // Fade out loader once everything is fully loaded
  window.addEventListener('load', () => {
    if (preloader) {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 800);
    }
  });

  // Fallback in case window load event is delayed or already fired
  setTimeout(() => {
    if (preloader && !preloader.classList.contains('fade-out')) {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 800);
    }
  }, 2500);


  /* ==========================================================================
     2. NAVIGATION & NAVBAR SCROLL
     ========================================================================== */
  const header = document.getElementById('header');
  
  const handleNavbarScroll = () => {
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  };

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // Run once at start to capture active reload states


  /* ==========================================================================
     3. MOBILE DROPDOWN NAVIGATION MENU
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileNavOverlay) {
    const toggleMenu = () => {
      mobileToggle.classList.toggle('active');
      mobileNavOverlay.classList.toggle('active');
      
      // Prevent body scrolling when menu is active
      if (mobileNavOverlay.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };

    mobileToggle.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }


  /* ==========================================================================
     4. HERO CINEMATOGRAPHIC PARALLAX BACKGROUND
     ========================================================================== */
  const heroBg = document.getElementById('hero-parallax-bg');
  
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      // Scale translation speed for subtle depth effect
      heroBg.style.transform = `translate3d(0, ${scrollY * 0.35}px, 0)`;
    }, { passive: true });
  }


  /* ==========================================================================
     5. HIGH-PERFORMANCE SCROLL REVEAL (INTERSECTION OBSERVER)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-fade');

  if (typeof IntersectionObserver !== 'undefined') {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          // Unobserve once revealed to save CPU performance
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12, // Reveal when 12% of the card is visible
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is unsupported
    const revealOnScrollFallback = () => {
      revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9;
        if (isVisible) {
          el.classList.add('reveal-active');
        }
      });
    };
    window.addEventListener('scroll', revealOnScrollFallback, { passive: true });
    revealOnScrollFallback();
  }


  /* ==========================================================================
     6. PREMIUM FAQ ACCORDION INTERACTION
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        
        // Close all other open FAQ items to maintain clean accordion architecture
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('open');
          }
        });
        
        // Toggle active item
        if (isOpen) {
          item.classList.remove('open');
        } else {
          item.classList.add('open');
        }
      });
    }
  });


  /* ==========================================================================
     7. BACK-TO-TOP BUTTON CONTROLLER
     ========================================================================== */
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  /* ==========================================================================
     8. ACTIVE MENU HIGHLIGHT ON SCROLL
     ========================================================================== */
  const sections = document.querySelectorAll('section[id], footer[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-link');

  const highlightNavOnScroll = () => {
    const scrollPosition = window.scrollY + 120; // offset of header heights

    sections.forEach(section => {
      const sectionTop = (section as HTMLElement).offsetTop;
      const sectionHeight = (section as HTMLElement).offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        desktopNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });
  highlightNavOnScroll();
});
