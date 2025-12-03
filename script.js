document.addEventListener('DOMContentLoaded', () => {
  const tocLinks = document.querySelectorAll('.toc-card');

  const sections = Array.from(tocLinks).map(link => {
    const id = link.getAttribute('href');
    return document.querySelector(id);
  });

  tocLinks.forEach(link => link.classList.remove('active'));

  // Smooth Scroll
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

      tocLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Auto Highlight
  window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY + 150;
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

    if (!activated) {
      tocLinks.forEach(l => l.classList.remove('active'));
    }
  });
});
