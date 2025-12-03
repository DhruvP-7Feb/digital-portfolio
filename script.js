document.addEventListener('DOMContentLoaded', () => {
  const tocLinks = document.querySelectorAll('.toc-card');

  // Get all sections based on the href of each TOC link
  const sections = Array.from(tocLinks).map(link => {
    const id = link.getAttribute('href');
    return document.querySelector(id);
  });

  // Remove active class initially
  tocLinks.forEach(link => link.classList.remove('active'));

  // ===== Smooth Scroll on Click =====
  tocLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }

      // highlight clicked
      tocLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // ===== Auto-highlight Based on Scroll =====
  window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY + 150; // offset for better accuracy
    let activated = false;

    sections.forEach((sec, index) => {
      if (
        sec.offsetTop <= scrollPos &&
        sec.offsetTop + sec.offsetHeight > scrollPos
      ) {
        tocLinks.forEach(l => l.classList.remove('active'));
        tocLinks[index].classList.add('active');
        activated = true;
      }
    });

    // If no section is in view, remove highlight
    if (!activated) {
      tocLinks.forEach(l => l.classList.remove('active'));
    }
  });
});
