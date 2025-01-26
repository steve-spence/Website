document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".animate-on-scroll");
    var index = 0;
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            if(entry.target.classList.contains('skill')) {
                entry.target.classList.remove("visible");
                if(index % 2 === 0) { // animate left then right then left ...
                entry.target.style.animation = 'slide-in-from-left 0.6s ease-out forwards';
                } else {
                entry.target.style.animation = 'slide-in-from-right 0.6s ease-out forwards';
                }
                entry.target.style.animationDelay = `${index * 0.1}s`;
                index++;
            }
            observer.unobserve(entry.target);
            }
        });
      },
      { threshold: 0.2 } // Trigger when 10% of the element is visible
    );
    elements.forEach((el) => observer.observe(el));
  });
