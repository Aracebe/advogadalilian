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

    // Variáveis padrão do slider (mantidas)
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
         // Restaura a transição padrão APÓS o posicionamento sem animação
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
              visualSlideIndex = totalRealSlides; // Salta para o último real (index do último slide real + 1 pois visualSlideIndex começa em 1)
              // Atualiza o índice real correspondente
              currentSlideIndex = totalRealSlides - 1;
              positionSliderWithoutAnimation(); // Salta sem animação
              updateDots(); // Garante que o dot correto esteja ativo após o salto
          }
          // Chegou no clone direito? Salta para o primeiro real
          else if (visualSlideIndex >= totalVisualSlides - 1) {
              visualSlideIndex = 1; // Salta para o primeiro real
              // Atualiza o índice real correspondente
              currentSlideIndex = 0;
              positionSliderWithoutAnimation(); // Salta sem animação
              updateDots(); // Garante que o dot correto esteja ativo após o salto
          }

          // A transição terminou (seja normal ou após um salto sem animação)
          isTransitioning = false; // Permite próximo movimento
          // Confirma o estado dos dots após qualquer movimento ou salto (já feito nos ifs acima, mas redundância segura)
           // updateDots();
    });

    // --- Autoplay ---
    function startInterval() {
        stopInterval(); // Garante que não haja múltiplos intervalos
        if (totalRealSlides > 1) { // Só inicia autoplay se houver mais de 1 slide
            slideInterval = setInterval(() => {
                const isHovering = sliderContainer.matches(':hover');
                const isTouching = isSwipeInProgress; // Verifica se um toque está em andamento
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

    // --- NOVA Lógica de Swipe Mobile ---
    let touchStartX = 0;
    let touchStartY = 0; // Para detectar scroll vertical vs swipe
    let touchEndX = 0;
    let touchEndY = 0;
    let isSwipeInProgress = false; // Flag para controlar o estado do swipe
    const minSwipeDistance = 50; // Distância mínima em pixels para considerar um swipe (ajuste conforme necessário)

    function handleGestureStart(event) {
        // Não iniciar novo swipe se já estiver animando
        if (isTransitioning) return;

        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
        touchEndX = touchStartX; // Reseta no início
        touchEndY = touchStartY; // Reseta no início
        isSwipeInProgress = true; // Marca que um toque começou
        stopInterval(); // Pausa autoplay durante o toque
        // Não remover a transição CSS aqui, deixamos o CSS controlar a animação final
    }

    function handleGestureMove(event) {
        if (!isSwipeInProgress || isTransitioning) return;

        touchEndX = event.touches[0].clientX;
        touchEndY = event.touches[0].clientY;

        // Opcional: Adicionar feedback visual durante o arraste (mais complexo)
        // Por enquanto, focamos apenas na detecção do swipe no final
    }

    function handleGestureEnd() {
        if (!isSwipeInProgress) return; // Só processa se um swipe estava realmente em progresso

        // Não finalizar se ainda estiver em transição (pouco provável, mas seguro)
        if (isTransitioning) {
             isSwipeInProgress = false; // Reseta flag mesmo assim
             resetInterval(); // Tenta reiniciar autoplay
             return;
        }

        isSwipeInProgress = false; // Finaliza o estado de swipe AGORA

        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        // Verifica se foi um swipe horizontal significativo e não um scroll vertical
        // E também verifica se o toque final aconteceu (touchEndX não é 0, o que pode acontecer em cancelamentos)
        if (touchEndX !== 0 && Math.abs(deltaX) > minSwipeDistance && Math.abs(deltaX) > Math.abs(deltaY)) {
            // Swipe horizontal detectado
            if (deltaX < 0) {
                // Swipe para Esquerda (-> Próximo)
                handleNext(); // handleNext já cuida de isTransitioning e resetInterval
            } else {
                // Swipe para Direita (<- Anterior)
                handlePrev(); // handlePrev já cuida de isTransitioning e resetInterval
            }
        } else {
            // Não foi um swipe válido ou foi mais vertical, apenas reinicia o autoplay
            resetInterval();
        }

        // Reseta coordenadas para segurança, independentemente de ter sido swipe ou não
        touchStartX = 0;
        touchStartY = 0;
        touchEndX = 0;
        touchEndY = 0;
    }

    // Adiciona os novos listeners de toque ao wrapper dos slides
    // Usamos passive: true para melhor performance, pois não vamos prevenir o scroll padrão agressivamente aqui
    slidesWrapper.addEventListener('touchstart', handleGestureStart, { passive: true });
    slidesWrapper.addEventListener('touchmove', handleGestureMove, { passive: true });
    slidesWrapper.addEventListener('touchend', handleGestureEnd);
    slidesWrapper.addEventListener('touchcancel', () => { // Reseta se o toque for cancelado
        if (isSwipeInProgress) {
            isSwipeInProgress = false;
            resetInterval(); // Reinicia autoplay se o toque foi cancelado
            // Reseta coordenadas também no cancelamento
             touchStartX = 0;
             touchStartY = 0;
             touchEndX = 0;
             touchEndY = 0;
        }
    });
    // --- FIM da NOVA Lógica de Swipe Mobile ---


    // --- Initial Setup & Click Listeners ---
    if (setupSlider()) { // Só adiciona listeners se o setup foi bem sucedido (mais de 1 slide)
          nextBtn.addEventListener('click', handleNext);
          prevBtn.addEventListener('click', handlePrev);
          // Listeners de mouse/foco para pausar autoplay
          sliderContainer.addEventListener('mouseenter', stopInterval);
          sliderContainer.addEventListener('mouseleave', startInterval);
          sliderContainer.addEventListener('focusin', stopInterval); // Pausa se um elemento dentro ganhar foco (ex: botão)
          sliderContainer.addEventListener('focusout', startInterval); // Retoma se o foco sair do container

          // Listener para visibilidade da aba
          document.addEventListener('visibilitychange', () => {
             if (document.visibilityState === 'hidden') {
                 stopInterval();
             } else if (!sliderContainer.matches(':hover') && !isSwipeInProgress) { // Só retoma se não estiver hover E não estiver tocando
                 startInterval();
             }
         });
    }
} // Fim do if (sliderContainer)
