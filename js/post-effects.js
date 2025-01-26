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
                if(index % 2 === 0) {
                entry.target.style.animation = 'slide-in-from-left 0.6s ease-out forwards';
                } else {
                entry.target.style.animation = 'slide-in-from-right 0.6s ease-out forwards';
                }
                entry.target.style.animationDelay = `${index * 0.1}s`;
                index++;
            }
            observer.unobserve(entry.target); // Stop observing once animated
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );
  
    elements.forEach((el) => observer.observe(el));
  });
//   function handleScrollAnimations() {
//     const animatedElements = document.querySelectorAll('.animate-on-scroll');
//     animatedElements.forEach((element, index) => {
//       const elementRect = element.getBoundingClientRect();
//       const isVisible = elementRect.top < window.innerHeight && elementRect.bottom >= 0;
//       if (isVisible) {
//         if (element.classList.contains('skill')) {
//           element.style.animation = 'slide-in-from-left 0.6s ease-out forwards';
//           element.style.animationDelay = `${index * 0.2}s`;
//         } else {
//           element.classList.add('visible');
//         }
//       }
//     });
//   }
  
//   window.addEventListener('scroll', handleScrollAnimations);
//   window.addEventListener('resize', handleScrollAnimations);
//   handleScrollAnimations();
  
//   const style = document.createElement('style');
//   style.innerHTML = `
//     .skill {
//       opacity: 0;
//       transform: translateX(-100px);
//     }
//     .skill.visible {
//       opacity: 1;
//       transform: translateX(0);
//     }
//     @keyframes slide-in-from-left {
//       from {
//         opacity: 0;
//         transform: translateX(-100px);
//       }
//       to {
//         opacity: 1;
//         transform: translateX(0);
//       }
//     }
//   `;
//   document.head.appendChild(style);