/* --- START OF FILE script.js --- */
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
          link.addEventListener('click', (e) => {
              // Fecha o menu mobile ao clicar em QUALQUER link
              if (mainNav.classList.contains('nav-active')) {
                  mainNav.classList.remove('nav-active');
                  navToggle.classList.remove('active');
                  body.classList.remove('nav-open');
                  navToggle.setAttribute('aria-expanded', 'false');
              }

              // Lógica de Smooth Scroll APENAS para links internos na MESMA PÁGINA
              const href = link.getAttribute('href');
              if (href && href.startsWith('#') && href.length > 1) {
                 // Verifica se o elemento alvo está na página atual
                 const targetElement = document.querySelector(href);
                 if (targetElement) {
                     e.preventDefault(); // Previne o salto padrão
                     const headerOffset = document.querySelector('.header')?.offsetHeight || 90; // Altura do header
                     const elementPosition = targetElement.getBoundingClientRect().top;
                     const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                     window.scrollTo({
                          top: offsetPosition,
                          behavior: "smooth"
                     });
                 }
                 // Se o elemento não existe na página atual, deixa o link funcionar normalmente
                 // (Isso pode acontecer se houver links #section em blog.html que deveriam ir para index.html#section)
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

// --- Lógica do Slider (Executará APENAS se .slider-container existir na página) ---
const sliderContainer = document.querySelector('.slider-container');
if (sliderContainer) { // <<< CONDIÇÃO IMPORTANTE
    const slidesWrapper = sliderContainer.querySelector('.slides-wrapper');
    let originalSlides = Array.from(slidesWrapper.children).filter(el => !el.classList.contains('slide-clone'));
    const nextBtn = sliderContainer.querySelector('.slider-arrow.next');
    const prevBtn = sliderContainer.querySelector('.slider-arrow.prev');
    const dotsContainer = sliderContainer.querySelector('.slider-controls');

    let currentSlideIndex = 0;
    let totalRealSlides = originalSlides.length;
    let isTransitioning = false;
    let slideInterval;
    let visualSlideIndex = 1; // Índice do slide visual (incluindo clones)

    const animationDuration = '0.5s';
    const animationEasing = 'ease-out';

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

        // Clones
        const firstClone = originalSlides[0].cloneNode(true);
        firstClone.classList.add('slide-clone');
        const lastClone = originalSlides[totalRealSlides - 1].cloneNode(true);
        lastClone.classList.add('slide-clone');
        slidesWrapper.appendChild(firstClone);
        slidesWrapper.insertBefore(lastClone, originalSlides[0]);

        // Dimensões
        const allSlides = slidesWrapper.querySelectorAll('.slide');
        const totalVisualSlides = allSlides.length;
        const slideWidthPercentage = 100 / totalVisualSlides;
        slidesWrapper.style.width = `${totalVisualSlides * 100}%`;
        allSlides.forEach(slide => {
            slide.style.width = `${slideWidthPercentage}%`;
        });

        // Posição Inicial
        visualSlideIndex = 1;
        currentSlideIndex = 0;
        slidesWrapper.style.transition = 'none';
        positionSliderWithoutAnimation();
        void slidesWrapper.offsetWidth;
        slidesWrapper.style.transition = `transform ${animationDuration} ${animationEasing}`;

        // Controles e Autoplay
        createDots();
        updateDots();
        startInterval();
        return true;
    }

    function getCurrentSlideTargetOffsetPercentage() {
        const totalVisualSlides = slidesWrapper.children.length;
        if (totalVisualSlides === 0) return 0;
        const slideWidthPercentage = 100 / totalVisualSlides;
        return -(visualSlideIndex * slideWidthPercentage);
    }

    function positionSliderWithoutAnimation() {
        slidesWrapper.style.transition = 'none';
        slidesWrapper.style.transform = `translateX(${getCurrentSlideTargetOffsetPercentage()}%)`;
        void slidesWrapper.offsetWidth;
        slidesWrapper.style.transition = `transform ${animationDuration} ${animationEasing}`;
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
          isTransitioning = true;
          currentSlideIndex = targetIndex;
          updateDots();
          visualSlideIndex = currentSlideIndex + 1;
          moveSlider(true);
          resetInterval();
    }

    function moveSlider(withAnimation = true) {
         const targetOffsetPercentage = getCurrentSlideTargetOffsetPercentage();
         slidesWrapper.style.transition = withAnimation ? `transform ${animationDuration} ${animationEasing}` : 'none';
         slidesWrapper.style.transform = `translateX(${targetOffsetPercentage}%)`;
    }

    function handleNext() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentSlideIndex = (currentSlideIndex + 1) % totalRealSlides;
        updateDots();
        visualSlideIndex++;
        moveSlider(true);
        resetInterval();
    }

    function handlePrev() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentSlideIndex = (currentSlideIndex - 1 + totalRealSlides) % totalRealSlides;
        updateDots();
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
              positionSliderWithoutAnimation();
              updateDots();
          } else if (visualSlideIndex >= totalVisualSlides - 1) {
              visualSlideIndex = 1;
              currentSlideIndex = 0;
              positionSliderWithoutAnimation();
              updateDots();
          }
          isTransitioning = false;
    });

    function startInterval() {
        stopInterval();
        if (totalRealSlides > 1) {
            slideInterval = setInterval(() => {
                const isHovering = sliderContainer.matches(':hover');
                const isTouching = isSwipeInProgress;
                if (!isHovering && !isTouching && document.visibilityState === 'visible') {
                   handleNext();
                }
            }, 6000);
        }
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

    // Swipe Mobile Logic
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    let isSwipeInProgress = false;
    const minSwipeDistance = 50;

    function handleGestureStart(event) {
        if (isTransitioning) return;
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
        touchEndX = touchStartX;
        touchEndY = touchStartY;
        isSwipeInProgress = true;
        stopInterval();
    }

    function handleGestureMove(event) {
        if (!isSwipeInProgress || isTransitioning) return;
        touchEndX = event.touches[0].clientX;
        touchEndY = event.touches[0].clientY;
    }

    function handleGestureEnd() {
        if (!isSwipeInProgress) return;
        if (isTransitioning) {
             isSwipeInProgress = false;
             resetInterval();
             return;
        }
        isSwipeInProgress = false;
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        if (touchEndX !== 0 && Math.abs(deltaX) > minSwipeDistance && Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX < 0) { handleNext(); } else { handlePrev(); }
        } else { resetInterval(); }
        touchStartX = 0; touchStartY = 0; touchEndX = 0; touchEndY = 0;
    }

    slidesWrapper.addEventListener('touchstart', handleGestureStart, { passive: true });
    slidesWrapper.addEventListener('touchmove', handleGestureMove, { passive: true });
    slidesWrapper.addEventListener('touchend', handleGestureEnd);
    slidesWrapper.addEventListener('touchcancel', () => {
        if (isSwipeInProgress) {
            isSwipeInProgress = false;
            resetInterval();
            touchStartX = 0; touchStartY = 0; touchEndX = 0; touchEndY = 0;
        }
    });

    // Initial Setup & Listeners
    if (setupSlider()) {
          nextBtn.addEventListener('click', handleNext);
          prevBtn.addEventListener('click', handlePrev);
          sliderContainer.addEventListener('mouseenter', stopInterval);
          sliderContainer.addEventListener('mouseleave', startInterval);
          sliderContainer.addEventListener('focusin', stopInterval);
          sliderContainer.addEventListener('focusout', startInterval);
          document.addEventListener('visibilitychange', () => {
             if (document.visibilityState === 'hidden') { stopInterval(); }
             else if (!sliderContainer.matches(':hover') && !isSwipeInProgress) { startInterval(); }
         });
    }
} // <<< Fim do if (sliderContainer)

/* --- END OF FILE script.js --- */
