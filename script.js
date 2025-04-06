// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// --- Mobile Menu Toggle Functionality ---
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');
const navLinks = mainNav.querySelectorAll('a');
if (menuToggle && mainNav) {
     menuToggle.addEventListener('click', () => {
        const isActive = mainNav.classList.toggle('is-active');
        menuToggle.classList.toggle('is-active');
        menuToggle.setAttribute('aria-expanded', isActive);
        menuToggle.setAttribute('aria-label', isActive ? 'Fechar menu' : 'Abrir menu');
    });
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Smooth scroll for internal links
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close menu before scrolling
                    if (mainNav.classList.contains('is-active')) {
                         mainNav.classList.remove('is-active');
                         menuToggle.classList.remove('is-active');
                         menuToggle.setAttribute('aria-expanded', 'false');
                         menuToggle.setAttribute('aria-label', 'Abrir menu');
                    }
                    // Optional: add slight delay for menu closing animation if needed
                    // setTimeout(() => {
                    //     targetElement.scrollIntoView({ behavior: 'smooth' });
                    // }, 100); // Example delay
                }
            } else if (mainNav.classList.contains('is-active')) { // Close for external links too
                 mainNav.classList.remove('is-active');
                 menuToggle.classList.remove('is-active');
                 menuToggle.setAttribute('aria-expanded', 'false');
                 menuToggle.setAttribute('aria-label', 'Abrir menu');
            }
        });
    });
 }

// --- Lightbox Functionality (Desktop Only) ---
const lightboxOverlay = document.getElementById('lightbox-overlay');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCloseBtn = document.getElementById('lightbox-close');
const galleryLinks = document.querySelectorAll('a[data-lightbox="gallery-group"]');
const bodyElement = document.body;
let focusedLinkBeforeLightbox = null; // Variable to store the focused element

function openLightbox(event) {
    if (window.innerWidth < 769) { return; } // Don't open lightbox on mobile/tablet
    event.preventDefault();
    focusedLinkBeforeLightbox = document.activeElement; // Store the currently focused element
    const imgSrc = event.currentTarget.getAttribute('href');
    const imgAlt = event.currentTarget.querySelector('img')?.getAttribute('alt') || 'Imagem da galeria';
    lightboxImage.setAttribute('src', imgSrc);
    lightboxImage.setAttribute('alt', `Imagem ampliada: ${imgAlt}`); // Set alt text for screen readers
    document.getElementById('lightbox-image-desc').textContent = `Imagem ampliada: ${imgAlt}`; // Update hidden description

    lightboxOverlay.classList.add('is-active');
    bodyElement.classList.add('lightbox-open'); // Prevent body scroll
    lightboxCloseBtn.focus(); // Focus the close button for accessibility
}

function closeLightbox() {
    lightboxOverlay.classList.remove('is-active');
    bodyElement.classList.remove('lightbox-open'); // Allow body scroll again
    if (focusedLinkBeforeLightbox) {
        focusedLinkBeforeLightbox.focus(); // Return focus to the element that opened the lightbox
        focusedLinkBeforeLightbox = null; // Reset the variable
    }
}

if(lightboxOverlay && lightboxImage && lightboxCloseBtn && galleryLinks.length > 0) {
     galleryLinks.forEach(link => { link.addEventListener('click', openLightbox); });

    lightboxCloseBtn.addEventListener('click', closeLightbox);

    // Close by clicking outside the image (on the overlay)
    lightboxOverlay.addEventListener('click', (event) => {
         if (event.target === lightboxOverlay) {
             closeLightbox();
         }
    });

    // Close with the Esc key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && lightboxOverlay.classList.contains('is-active')) {
            closeLightbox();
        }
    });
 }