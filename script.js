// --- Navegação Mobile ---
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
const body = document.body;
  if (navToggle && mainNav) {
      navToggle.addEventListener('click', () => {
          mainNav.classList.toggle('nav-active');
          navToggle.classList.toggle('active');
          body.classList.toggle('nav-open');
          const isExpanded = mainNav.classList.contains('nav-active');
          navToggle.setAttribute('aria-expanded', isExpanded);
      });
      const navLinks = mainNav.querySelectorAll('a');
      navLinks.forEach(link => {
          link.addEventListener('click', () => {
              if (mainNav.classList.contains('nav-active')) {
                  mainNav.classList.remove('nav-active');
                  navToggle.classList.remove('active');
                  body.classList.remove('nav-open');
                  navToggle.setAttribute('aria-expanded', 'false');
              }
          });
      });
       document.addEventListener('click', function(event) {
          const isClickInsideNav = mainNav.contains(event.target);
          const isClickOnToggle = navToggle.contains(event.target);
          if (!isClickInsideNav && !isClickOnToggle && mainNav.classList.contains('nav-active')) {
              mainNav.classList.remove('nav-active');
              navToggle.classList.remove('active');
              body.classList.remove('nav-open');
              navToggle.setAttribute('aria-expanded', 'false');
          }
      });
  }

// --- Lógica do Slider ---
const sliderContainer = document.querySelector('.slider-container');
if (sliderContainer) {
    const slidesWrapper = sliderContainer.querySelector('.slides-wrapper');
    let originalSlides = Array.from(slidesWrapper.children).filter(el => !el.classList.contains('slide-clone'));
    const nextBtn = sliderContainer.querySelector('.slider-arrow.next');
    const prevBtn = sliderContainer.querySelector('.slider-arrow.prev');
    const dotsContainer = sliderContainer.querySelector('.slider-controls');

    let currentSlideIndex = 0;
    let totalRealSlides = originalSlides.length;
    let isTransitioning = false;
    let slideInterval;
    let visualSlideIndex = 1;

    function hideControls() {
         if (nextBtn) nextBtn.style.display = 'none';
         if (prevBtn) prevBtn.style.display = 'none';
         if (dotsContainer) dotsContainer.style.display = 'none';
    }

    function setupSlider() {
          slidesWrapper.querySelectorAll('.slide-clone').forEach(clone => clone.remove());
          dotsContainer.innerHTML = '';
          if (slideInterval) clearInterval(slideInterval);

          originalSlides = Array.from(slidesWrapper.children);
          totalRealSlides = originalSlides.length;

          if (totalRealSlides <= 1) {
              hideControls();
              return false;
          }

          const firstClone = originalSlides[0].cloneNode(true);
          firstClone.classList.add('slide-clone');
          const lastClone = originalSlides[totalRealSlides - 1].cloneNode(true);
          lastClone.classList.add('slide-clone');

          slidesWrapper.appendChild(firstClone);
          slidesWrapper.insertBefore(lastClone, originalSlides[0]);

          const allSlides = slidesWrapper.querySelectorAll('.slide');
          const totalVisualSlides = allSlides.length;
          const slideWidthPercentage = 100 / totalVisualSlides;

          slidesWrapper.style.width = `${totalVisualSlides * 100}%`;
          allSlides.forEach(slide => {
              slide.style.width = `${slideWidthPercentage}%`;
          });

          visualSlideIndex = 1;
          currentSlideIndex = 0;
          slidesWrapper.style.transition = 'none';
          slidesWrapper.style.transform = `translateX(-${visualSlideIndex * slideWidthPercentage}%)`;
          void slidesWrapper.offsetWidth;
          slidesWrapper.style.transition = 'transform 0.7s ease-in-out';

          createDots();
          updateDots();
          startInterval();
          return true;
    }

    function createDots() {
         dotsContainer.innerHTML = '';
         for (let i = 0; i < totalRealSlides; i++) {
             const dot = document.createElement('button');
             dot.classList.add('slider-dot');
             dot.setAttribute('aria-label', `Ir para Slide ${i + 1}`);
             dot.dataset.index = i;
             dot.addEventListener('click', handleDotClick);
             dotsContainer.appendChild(dot);
         }
    }

    function updateDots() {
         const dots = dotsContainer.querySelectorAll('.slider-dot');
         dots.forEach((dot, i) => {
             dot.classList.toggle('active', i === currentSlideIndex);
         });
    }

    function handleDotClick(e) {
          if (isTransitioning) return;
          const targetIndex = parseInt(e.target.dataset.index);
          if (targetIndex === currentSlideIndex) return;
          currentSlideIndex = targetIndex;
          visualSlideIndex = currentSlideIndex + 1;
          moveSlider(true);
          resetInterval();
    }

    function moveSlider(withAnimation = true) {
          if (isTransitioning && withAnimation) return;
          if (withAnimation) isTransitioning = true;

          const totalVisualSlides = slidesWrapper.children.length;
          if (totalVisualSlides === 0) return;
          const slideWidthPercentage = 100 / totalVisualSlides;
          slidesWrapper.style.transition = withAnimation ? 'transform 0.7s ease-in-out' : 'none';
          slidesWrapper.style.transform = `translateX(-${visualSlideIndex * slideWidthPercentage}%)`;

          if (!withAnimation) {
               setTimeout(() => {
                  isTransitioning = false;
                  slidesWrapper.style.transition = 'transform 0.7s ease-in-out';
               }, 50);
          }

          if (withAnimation) updateDots();
    }

    function handleNext() {
        if (isTransitioning) return;
        visualSlideIndex++;
        moveSlider(true);
        resetInterval();
    }

    function handlePrev() {
        if (isTransitioning) return;
        visualSlideIndex--;
        moveSlider(true);
        resetInterval();
    }

    slidesWrapper.addEventListener('transitionend', () => {
          if (!isTransitioning) return;
          const totalVisualSlides = slidesWrapper.children.length;

          if (visualSlideIndex <= 0) {
              visualSlideIndex = totalRealSlides;
              currentSlideIndex = totalRealSlides - 1;
              moveSlider(false);
          } else if (visualSlideIndex >= totalVisualSlides - 1) {
              visualSlideIndex = 1;
              currentSlideIndex = 0;
              moveSlider(false);
          } else {
               currentSlideIndex = visualSlideIndex - 1;
               isTransitioning = false;
          }
         updateDots();
    });

    function startInterval() {
        stopInterval();
        slideInterval = setInterval(() => {
            const isHovering = sliderContainer.matches(':hover');
            if (!isHovering && document.visibilityState === 'visible') {
               handleNext();
            }
        }, 6000);
    }

    function stopInterval() {
         if (slideInterval) {
             clearInterval(slideInterval);
             slideInterval = null;
         }
    }

    function resetInterval() {
          stopInterval();
          startInterval();
    }

    // --- Initial Setup & Listeners ---
    if (setupSlider()) {
          nextBtn.addEventListener('click', handleNext);
          prevBtn.addEventListener('click', handlePrev);
          sliderContainer.addEventListener('mouseenter', stopInterval);
          sliderContainer.addEventListener('mouseleave', startInterval);
          sliderContainer.addEventListener('focusin', stopInterval);
          sliderContainer.addEventListener('focusout', startInterval);
          document.addEventListener('visibilitychange', () => {
             if (document.visibilityState === 'hidden') {
                 stopInterval();
             } else if (!sliderContainer.matches(':hover')) {
                 startInterval();
             }
         });
    }
}
