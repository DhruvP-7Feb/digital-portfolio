document.addEventListener('DOMContentLoaded', () => {
  const tocLinks = document.querySelectorAll('.toc-card');

  // ===== SECTION MAPPING =====
  const sections = Array.from(tocLinks).map(link => {
    const id = link.getAttribute('href');
    return document.querySelector(id);
  });

  tocLinks.forEach(link => link.classList.remove('active'));

  // ===== SMOOTH SCROLL ON CLICK =====
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

  // ===== AUTO HIGHLIGHT ON SCROLL =====
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

  // -----------------------------------------------------------------
  //                      🌙 DARK / LIGHT MODE TOGGLE
  // -----------------------------------------------------------------

  const toggleBtn = document.querySelector('.theme-toggle');

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // Update button text dynamically
    if (document.body.classList.contains('dark-mode')) {
      toggleBtn.textContent = "☀️ Light Mode";
    } else {
      toggleBtn.textContent = "🌙 Dark Mode";
    }

    // Optional: Save mode in localStorage
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark-mode") ? "dark" : "light"
    );
  });

  // Restore theme on page load
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    document.querySelector('.theme-toggle').textContent = "☀️ Light Mode";
  }
});
