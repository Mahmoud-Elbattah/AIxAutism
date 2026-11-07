(() => {
  'use strict';
  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#site-navigation');
  if (!navigation) return;

  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
    navigation.classList.remove('is-open');
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
    navigation.classList.toggle('is-open', !isOpen);
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      toggle.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (!navigation.contains(event.target) && !toggle.contains(event.target)) closeMenu();
  });

  const desktopQuery = window.matchMedia('(min-width: 821px)');
  desktopQuery.addEventListener('change', (event) => {
    if (event.matches) closeMenu();
  });

  // Indicate the section currently being read in the single-page menu.
  const sectionLinks = Array.from(navigation.querySelectorAll('a[href^="#"]'));
  const navSections = sectionLinks
    .map((link) => ({ link, target: document.querySelector(link.getAttribute('href')) }))
    .filter(({ target }) => target);
  let scrollScheduled = false;
  const updateActiveSection = () => {
    const point = window.scrollY + 135;
    let active = navSections[0];
    navSections.forEach((section) => {
      if (section.target.getBoundingClientRect().top + window.scrollY <= point) active = section;
    });
    // The contact section is shorter than the viewport, so it may never
    // reach the threshold above. Highlight it on reaching the page bottom.
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 3) {
      active = navSections[navSections.length - 1];
    }
    navSections.forEach(({ link }) => {
      if (link === active.link) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    scrollScheduled = false;
  };
  window.addEventListener('scroll', () => {
    if (!scrollScheduled) {
      scrollScheduled = true;
      window.requestAnimationFrame(updateActiveSection);
    }
  }, { passive: true });
  window.addEventListener('resize', updateActiveSection);
  window.addEventListener('hashchange', updateActiveSection);
  updateActiveSection();

  // The header is sticky; directly scroll to the document top rather than
  // trying to scroll the sticky header into view. The #home anchor is also
  // outside the header, so the link still works without JavaScript.
  document.querySelectorAll('.back-to-top').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
      if (window.location.hash !== '#home') {
        window.history.replaceState(null, '', '#home');
      }
      // The scroll handler will update the menu highlight while scrolling.
      window.requestAnimationFrame(updateActiveSection);
    });
  });

  // Keep only one year open at a time, including in browsers that do not
  // yet support the native `name` grouping of <details>. The elements remain
  // usable without JavaScript via their built-in disclosure behaviour.
  const editionDisclosures = Array.from(document.querySelectorAll('details.publication-year'));
  editionDisclosures.forEach((details) => {
    details.addEventListener('toggle', () => {
      if (!details.open) return;
      editionDisclosures.forEach((other) => {
        if (other !== details && other.open) other.open = false;
      });
    });
  });

  // Scroll-reveal is visual enhancement only: no content is hidden without JS,
  // and motion is avoided for visitors who request reduced motion.
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduceMotion) {
    const revealTargets = document.querySelectorAll([
      '.about-section .section-grid > div',
      '.archive-section .section-heading',
      '.publication-year',
      '.organisers-section > .container > h2',
      '.organiser-card',
      '.contact-inner > *'
    ].join(', '));
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -7% 0px', threshold: 0.06 });
    revealTargets.forEach((element) => {
      // Keep anything already above the fold visible at first render.
      if (element.getBoundingClientRect().top < window.innerHeight * 0.82) return;
      element.classList.add('reveal-pending');
      observer.observe(element);
    });
  }
})();
