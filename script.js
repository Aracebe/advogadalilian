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
    let visualSlideIndex = 1; // Índice do slide visual (incluindo clones)

    // --- Variáveis para Swipe ---
    let touchStartX = 0;
    let touchEndX = 0;
    let currentDragOffset = 0; // Para guardar o quanto foi arrastado
    let isSwiping = false;
    const swipeThreshold = 35; // Você ainda pode ajustar este valor se necessário
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
        slidesWrapper.style.transition = 'none'; // Garante que não haja transição inicial
        positionSliderWithoutAnimation(); // Usa a nova função para posicionar
        void slidesWrapper.offsetWidth; // Força reflow
        slidesWrapper.style.transition = `transform ${animationDuration} ${animationEasing}`; // Aplica a transição padrão

        // --- Controles e Autoplay ---
        createDots();
        updateDots(); // Define estado inicial dos dots
        startInterval();
        return true; // Indicate setup completed
    }

    // Nova função para calcular a posição percentual correta
    function getCurrentSlideTargetOffsetPercentage() {
        const totalVisualSlides = slidesWrapper.children.length;
        if (totalVisualSlides === 0) return 0;
        const slideWidthPercentage = 100 / totalVisualSlides;
        return -(visualSlideIndex * slideWidthPercentage);
    }

    // Nova função para posicionar o slider SEM animação
    function positionSliderWithoutAnimation() {
        slidesWrapper.style.transition = 'none';
        slidesWrapper.style.transform = `translateX(${getCurrentSlideTargetOffsetPercentage()}%)`;
        // Força o navegador a aplicar a mudança imediatamente
        void slidesWrapper.offsetWidth;
        // Restaura a transição para futuras animações
        // (Será restaurada explicitamente quando necessário, ou no final do setup)
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
          isTransitioning = true; // Inicia transição
          currentSlideIndex = targetIndex; // Atualiza o índice ANTES
          updateDots(); // Atualiza os dots IMEDIATAMENTE
          visualSlideIndex = currentSlideIndex + 1;
          moveSlider(true); // Move com animação
          resetInterval();
    }

    function moveSlider(withAnimation = true) {
          // Não precisa mais de `isTransitioning` aqui, pois será controlado no início e fim
         const targetOffsetPercentage = getCurrentSlideTargetOffsetPercentage();

         slidesWrapper.style.transition = withAnimation
            ? `transform ${animationDuration} ${animationEasing}`
            : 'none';
         slidesWrapper.style.transform = `translateX(${targetOffsetPercentage}%)`;

        // O isTransitioning será resetado no 'transitionend' se withAnimation for true
    }

    function handleNext() {
        if (isTransitioning) return;
        isTransitioning = true; // Inicia transição
        currentSlideIndex = (currentSlideIndex + 1) % totalRealSlides; // Calcula próximo índice ANTES
        updateDots(); // Atualiza dots IMEDIATAMENTE
        visualSlideIndex++;
        moveSlider(true); // Move com animação
        resetInterval();
    }

    function handlePrev() {
        if (isTransitioning) return;
        isTransitioning = true; // Inicia transição
        currentSlideIndex = (currentSlideIndex - 1 + totalRealSlides) % totalRealSlides; // Calcula índice anterior ANTES
        updateDots(); // Atualiza dots IMEDIATAMENTE
        visualSlideIndex--;
        moveSlider(true); // Move com animação
        resetInterval();
    }

    // --- Lógica de Loop (Transition End) ---
    slidesWrapper.addEventListener('transitionend', () => {
          // Só processa se foi uma transição que iniciamos
          if (!isTransitioning) return;

          const totalVisualSlides = slidesWrapper.children.length;

          // Chegou no clone esquerdo? Salta para o último real
          if (visualSlideIndex <= 0) {
              visualSlideIndex = totalRealSlides; // Salta para o último real
              currentSlideIndex = totalRealSlides - 1; // Ajusta índice real
              positionSliderWithoutAnimation(); // Salta sem animação
          }
          // Chegou no clone direito? Salta para o primeiro real
          else if (visualSlideIndex >= totalVisualSlides - 1) {
              visualSlideIndex = 1; // Salta para o primeiro real
              currentSlideIndex = 0; // Ajusta índice real
              positionSliderWithoutAnimation(); // Salta sem animação
          }

          // A transição terminou (seja normal ou após um salto sem animação)
          isTransitioning = false; // Permite próximo movimento
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
        currentDragOffset = 0; // Reseta o offset do drag atual
        isSwiping = true;
        stopInterval(); // Pausa autoplay
        slidesWrapper.style.transition = 'none'; // <<< IMPORTANTE: Remove transição para feedback imediato
    }

    function handleTouchMove(event) {
        if (!isSwiping || isTransitioning) return;
        touchEndX = event.touches[0].clientX;
        currentDragOffset = touchEndX - touchStartX; // Calcula a diferença atual do drag

        // Calcula a posição atual baseada no slide que estava + o drag
        const currentTargetOffset = getCurrentSlideTargetOffsetPercentage();
        // Converte o offset em pixels para porcentagem da LARGURA DO CONTAINER VISÍVEL
        const dragPercentage = (currentDragOffset / sliderContainer.offsetWidth) * 100;

        // Aplica a transformação em tempo real
        slidesWrapper.style.transform = `translateX(${currentTargetOffset + dragPercentage}%)`;
    }

    function handleTouchEnd() {
        if (!isSwiping || isTransitioning) return;
        isSwiping = false;

        // Reativa a transição para o "snap" final
        slidesWrapper.style.transition = `transform ${animationDuration} ${animationEasing}`;

        // Verifica se o swipe foi longo o suficiente
        if (Math.abs(currentDragOffset) > swipeThreshold) {
            if (currentDragOffset < 0) { // Swipe para esquerda (negativo) -> Próximo
                handleNext();
            } else { // Swipe para direita (positivo) -> Anterior
                handlePrev();
            }
        } else {
            // Se não foi swipe longo, anima de volta para a posição original
            isTransitioning = true; // Marca como transição para o listener 'transitionend'
            moveSlider(true); // Anima de volta para a posição correta do visualSlideIndex atual
            startInterval(); // Retoma autoplay se não houve mudança de slide
        }

        // Reseta o offset do drag para segurança
        currentDragOffset = 0;
    }

    // Adiciona os listeners de toque
    slidesWrapper.addEventListener('touchstart', handleTouchStart, { passive: true });
    slidesWrapper.addEventListener('touchmove', handleTouchMove, { passive: true }); // Manter passive: true é geralmente ok
    slidesWrapper.addEventListener('touchend', handleTouchEnd);
    slidesWrapper.addEventListener('touchcancel', () => { // Reseta se o toque for cancelado
        if (isSwiping) {
            isSwiping = false;
            // Anima de volta à posição original se o toque foi cancelado no meio do drag
            slidesWrapper.style.transition = `transform ${animationDuration} ${animationEasing}`;
            isTransitioning = true;
            moveSlider(true);
            startInterval();
        }
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
