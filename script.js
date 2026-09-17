// TrueRep Privacy Policy Interactivity Script

document.addEventListener('DOMContentLoaded', () => {
  // 1. Reading Progress Bar
  const progressBar = document.getElementById('readingProgress');
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }
  }, { passive: true });

  // 2. Table of Contents ScrollSpy
  const sections = document.querySelectorAll('.policy-section');
  const tocLinks = document.querySelectorAll('.toc-link');

  const observerOptions = {
    root: null,
    rootMargin: '-80px 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        tocLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // 3. Search & Filter
  const searchInput = document.getElementById('policySearch');
  const clearBtn = document.getElementById('clearSearch');
  const searchNotFound = document.getElementById('searchNotFound');
  const searchKeyword = document.getElementById('searchKeyword');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      let matchCount = 0;

      if (query.length > 0) {
        clearBtn.style.display = 'block';
      } else {
        clearBtn.style.display = 'none';
      }

      sections.forEach(section => {
        const text = section.innerText.toLowerCase();
        if (query === '' || text.includes(query)) {
          section.style.display = 'block';
          matchCount++;
        } else {
          section.style.display = 'none';
        }
      });

      if (matchCount === 0 && query !== '') {
        searchNotFound.style.display = 'block';
        searchKeyword.textContent = e.target.value;
      } else {
        searchNotFound.style.display = 'none';
      }
    });

    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      clearBtn.style.display = 'none';
      searchNotFound.style.display = 'none';
      sections.forEach(sec => sec.style.display = 'block');
      searchInput.focus();
    });
  }

  // 4. Toast Notification System
  const toast = document.getElementById('toast');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // 5. Copy Email
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyBtnLabel = document.getElementById('copyBtnLabel');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = 'support@truerep.app';
      try {
        await navigator.clipboard.writeText(email);
        copyBtnLabel.textContent = 'Copied!';
        showToast('✓ Support email copied to clipboard!');
        setTimeout(() => {
          copyBtnLabel.textContent = 'Copy Email';
        }, 2200);
      } catch (err) {
        showToast('Email: support@truerep.app');
      }
    });
  }

  // 6. Copy Policy URL
  const copyUrlBtn = document.getElementById('copyUrlBtn');
  if (copyUrlBtn) {
    copyUrlBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        showToast('✓ Privacy policy URL copied to clipboard!');
      } catch (err) {
        showToast('URL: ' + window.location.href);
      }
    });
  }
});
