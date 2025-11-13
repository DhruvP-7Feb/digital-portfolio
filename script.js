document.addEventListener('DOMContentLoaded', () => {
  const tocLinks = document.querySelectorAll('.contents-section .toc-card');
  const sections = Array.from(tocLinks).map(link => document.querySelector(link.getAttribute('href')));

  // ✅ Remove all active classes on load
  tocLinks.forEach(link => link.classList.remove('active'));

  // Smooth scroll on click
  tocLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      tocLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Highlight TOC link on scroll
  window.addEventListener('scroll', () => {
    let fromTop = window.scrollY + 120; // offset for header
    let anyActive = false;

    sections.forEach((section, index) => {
      if (section.offsetTop <= fromTop && (section.offsetTop + section.offsetHeight) > fromTop) {
        tocLinks.forEach(l => l.classList.remove('active'));
        tocLinks[index].classList.add('active');
        anyActive = true;
      }
    });

    // If no section matches, remove all active classes
    if (!anyActive) tocLinks.forEach(l => l.classList.remove('active'));
  });
});

// ===== CERTIFICATE UPLOAD & LOCAL PREVIEW =====
(function() {
  const certInput = document.getElementById('certUpload');
  const certList = document.getElementById('certList');

  if (!certInput || !certList) return;

  const fileURLs = new Map(); // store object URLs for cleanup

  function createListItem(file) {
    const li = document.createElement('li');
    li.className = 'cert-item';

    const meta = document.createElement('div');
    meta.className = 'cert-meta';

    const name = document.createElement('div');
    name.className = 'cert-name';
    name.textContent = file.name;

    const size = document.createElement('div');
    size.className = 'cert-size';
    size.textContent = `${Math.round(file.size / 1024)} KB`;

    meta.appendChild(name);
    meta.appendChild(size);

    const actions = document.createElement('div');
    actions.className = 'cert-actions';

    // Create object URL for preview/download
    const url = URL.createObjectURL(file);
    fileURLs.set(file.name + file.size, url);

    // Preview link
    const viewLink = document.createElement('a');
    viewLink.href = url;
    viewLink.target = '_blank';
    viewLink.rel = 'noopener';
    viewLink.textContent = 'View';
    actions.appendChild(viewLink);

    // Download link
    const dl = document.createElement('a');
    dl.href = url;
    dl.download = file.name;
    dl.textContent = 'Download';
    actions.appendChild(dl);

    // Remove button
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      const key = file.name + file.size;
      if (fileURLs.has(key)) {
        URL.revokeObjectURL(fileURLs.get(key));
        fileURLs.delete(key);
      }
      li.remove();
    });
    actions.appendChild(removeBtn);

    li.appendChild(meta);
    li.appendChild(actions);
    return li;
  }

  certInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      // Accept only images (png/jpg/jpeg)
      if (!file.type.startsWith('image/')) return;
      const item = createListItem(file);
      certList.appendChild(item);
    });
    certInput.value = ''; // allow re-selecting same file
  });

  // Cleanup object URLs on page unload
  window.addEventListener('beforeunload', () => {
    for (const url of fileURLs.values()) URL.revokeObjectURL(url);
  });
})();
