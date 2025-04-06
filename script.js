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

    // --- Variáveis para Swipe ---
    let touchStartX = 0;
    let touchEndX = 0;
    let isSwiping = false;
    const swipeThreshold = 50; // Mínimo de pixels para considerar swipe

    function hideControls() {
         if (nextBtn) nextBtn.style.display = 'none';
         if (prevBtn) prevBtn.style.display = 'none';
         if (dotsContainer) dotsContainer.style.display = 'none';
    }

    function setupSlider() {
        slidesWrapper.querySelectorAll('.slide-clone').forEach(clone => clone.remove());
        dotsContainer.innerHTML = '';
        if (slideInterval) clearInterval(slideInterval);

        originalSlides = Array.from(slidesWrapper.children); // Re-read after cleanup
        totalRealSlides = originalSlides.length;

        if (totalRealSlides <= 1) {
            hideControls();
            return false; // Indicate setup was not completed
        }

        // --- Clones ---
        const firstClone = originalSlides[0].cloneNode(true);
        firstClone.classList.add('slide-clone');
        const lastClone = originalSlides[totalRealSlides - 1].cloneNode(true);
        lastClone.classList.add('slide-clone');
        slidesWrapper.appendChild(firstClone);
        slidesWrapper.insertBefore(lastClone, originalSlides[0]);

        // --- Dimensões ---
        const allSlides = slidesWrapper.querySelectorAll('.slide');
        const totalVisualSlides = allSlides.length;
        const slideWidthPercentage = 100 / totalVisualSlides;
        slidesWrapper.style.width = `${totalVisualSlides * 100}%`;
        allSlides.forEach(slide => {
            slide.style.width = `${slideWidthPercentage}%`;
        });

        // --- Posição Inicial ---
        visualSlideIndex = 1;
        currentSlideIndex = 0;
        slidesWrapper.style.transition = 'none';
        slidesWrapper.style.transform = `translateX(-${visualSlideIndex * slideWidthPercentage}%)`;
        void slidesWrapper.offsetWidth;
        slidesWrapper.style.transition = 'transform 0.7s ease-in-out';

        // --- Controles e Autoplay ---
        createDots();
        updateDots(); // Define estado inicial dos dots
        startInterval();
        return true; // Indicate setup completed
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
         // Chamar esta função imediatamente atualiza qual dot está ativo
         const dots = dotsContainer.querySelectorAll('.slider-dot');
         dots.forEach((dot, i) => {
             dot.classList.toggle('active', i === currentSlideIndex);
         });
    }

    function handleDotClick(e) {
          if (isTransitioning) return;
          const targetIndex = parseInt(e.target.dataset.index);
          if (targetIndex === currentSlideIndex) return;
          currentSlideIndex = targetIndex; // Atualiza o índice ANTES
          updateDots(); // Atualiza os dots IMEDIATAMENTE
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
          // updateDots() foi movido para ser chamado imediatamente nos handlers
    }

    function handleNext() {
        if (isTransitioning) return;
        currentSlideIndex = (currentSlideIndex + 1) % totalRealSlides; // Calcula próximo índice ANTES
        updateDots(); // Atualiza dots IMEDIATAMENTE
        visualSlideIndex++;
        moveSlider(true);
        resetInterval();
    }

    function handlePrev() {
        if (isTransitioning) return;
        currentSlideIndex = (currentSlideIndex - 1 + totalRealSlides) % totalRealSlides; // Calcula índice anterior ANTES
        updateDots(); // Atualiza dots IMEDIATAMENTE
        visualSlideIndex--;
        moveSlider(true);
        resetInterval();
    }

    // --- Lógica de Loop (Transition End) ---
    slidesWrapper.addEventListener('transitionend', () => {
          // Só processa se foi uma transição que iniciamos
          if (!isTransitioning) return;

          const totalVisualSlides = slidesWrapper.children.length;

          // Chegou no clone esquerdo?
          if (visualSlideIndex <= 0) {
              visualSlideIndex = totalRealSlides; // Salta para o último real
              currentSlideIndex = totalRealSlides - 1; // Ajusta índice real
              moveSlider(false); // Salta sem animação (isTransitioning será resetado no timeout)
          }
          // Chegou no clone direito?
          else if (visualSlideIndex >= totalVisualSlides - 1) {
              visualSlideIndex = 1; // Salta para o primeiro real
              currentSlideIndex = 0; // Ajusta índice real
              moveSlider(false); // Salta sem animação (isTransitioning será resetado no timeout)
          }
          // Se não pousou em clone, a transição normal acabou
          else {
              isTransitioning = false; // Permite próximo movimento
              // currentSlideIndex já foi atualizado no handleNext/Prev/DotClick
          }
          // Confirma o estado dos dots após qualquer movimento ou salto
          updateDots();
    });

    // --- Autoplay ---
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

    // --- Lógica de Swipe ---
    function handleTouchStart(event) {
        if (isTransitioning) return; // Não começa swipe se animando
        touchStartX = event.touches[0].clientX;
        touchEndX = touchStartX; // Reseta endX
        isSwiping = true;
        // Pausa autoplay enquanto o dedo está na tela
        stopInterval();
        // Remove transição temporariamente para feedback instantâneo (opcional)
        // slidesWrapper.style.transition = 'none';
    }

    function handleTouchMove(event) {
        if (!isSwiping || isTransitioning) return;
        touchEndX = event.touches[0].clientX;
        // Opcional: Mover o slide junto com o dedo (feedback)
        // const currentTranslate = -visualSlideIndex * (100 / slidesWrapper.children.length);
        // const diff = touchEndX - touchStartX;
        // const percentageDiff = (diff / slidesWrapper.offsetWidth) * 100;
        // slidesWrapper.style.transform = `translateX(${currentTranslate + percentageDiff}%)`;
    }

    function handleTouchEnd() {
        if (!isSwiping || isTransitioning) return;
        isSwiping = false;
        const diff = touchStartX - touchEndX; // Positivo se swipe para esquerda (next), negativo se para direita (prev)

        // Verifica se o swipe foi longo o suficiente
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) { // Swipe para esquerda
                handleNext();
            } else { // Swipe para direita
                handlePrev();
            }
        } else {
            // Se não foi swipe, restaura a posição (caso tenha movido no touchmove)
            // moveSlider(true); // Ou apenas reativa o intervalo
            startInterval(); // Se não houve swipe, apenas retoma autoplay
        }
        // Reativa transição caso tenha sido desativada no touchstart/move
        // slidesWrapper.style.transition = 'transform 0.7s ease-in-out';
    }

    // Adiciona os listeners de toque
    // Use { passive: true } onde não precisar de preventDefault
    slidesWrapper.addEventListener('touchstart', handleTouchStart, { passive: true });
    slidesWrapper.addEventListener('touchmove', handleTouchMove, { passive: true }); // Se adicionar feedback com transform, pode precisar de passive: false e preventDefault
    slidesWrapper.addEventListener('touchend', handleTouchEnd);
    slidesWrapper.addEventListener('touchcancel', () => { // Reseta se o toque for cancelado
        isSwiping = false;
        startInterval(); // Retoma autoplay
    });


    // --- Initial Setup & Click Listeners ---
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
