
  const header = document.querySelector('header');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    if (window.scrollY < lastScrollY) {
      // Scrolling up - show header with falling effect
      header.classList.add('show');
    } else {
      // Scrolling down - hide header
      header.classList.remove('show');
    }
    lastScrollY = window.scrollY;
  });

  // Initially show the header when the page loads
  window.addEventListener('load', () => {
    header.classList.add('show');
  });