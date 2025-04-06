:root {
    --color-primary: #000000;
    --color-secondary: #b3a17d;
    --color-background: #ffffff;
    --color-text-dark: #333333;
    --color-text-light: #f8f8f8;
    --color-text-header: #1a1a1a;
    --color-section-alt: #f9f9f9;
    --container-width: 1250px;
    --header-height: 90px; /* Pode precisar ajustar ligeiramente se o header ficar mais alto */
    --font-primary: 'Montserrat', sans-serif;
    --font-secondary: 'EB Garamond', serif;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; font-size: 16px; }
body { font-family: var(--font-primary); line-height: 1.7; color: var(--color-text-dark); background-color: var(--color-background); padding-top: var(--header-height); overflow-x: hidden; }
img { max-width: 100%; height: auto; display: block; }
a { text-decoration: none; color: var(--color-secondary); transition: color 0.3s ease; }
a:hover { color: #cea870; }
ul { list-style: none; }
h1, h2, h3, h4, h5, h6 { font-family: var(--font-secondary); font-weight: 700; color: var(--color-primary); line-height: 1.3; margin-bottom: 0.75em; }
h2 { font-size: 2.5rem; color: var(--color-primary); text-align: center; margin-bottom: 60px; position: relative; padding-bottom: 15px; }
h2::after { content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 70px; height: 3px; background-color: var(--color-secondary); }
h3 { font-size: 1.9rem; color: var(--color-primary); margin-bottom: 20px; }
h4 { font-family: var(--font-primary); font-weight: 700; font-size: 1.25rem; color: var(--color-secondary); margin-bottom: 15px; }
p { margin-bottom: 1rem; color: #555; }
section { padding: 90px 0; overflow: hidden; }
.container { max-width: var(--container-width); margin: 0 auto; padding: 0 20px; }
.text-center { text-align: center; }
.btn { display: inline-block; padding: 14px 30px; background-color: var(--color-secondary); color: var(--color-primary); border: 2px solid var(--color-secondary); border-radius: 5px; font-weight: 700; text-transform: uppercase; transition: all 0.3s ease; cursor: pointer; font-family: var(--font-primary); letter-spacing: 0.5px; }
.btn:hover { background-color: transparent; color: var(--color-secondary); }
.btn-dark { background-color: var(--color-secondary); color: var(--color-primary); }
.btn-dark:hover { background-color: var(--color-background); color: var(--color-secondary); border-color: var(--color-secondary); }

/* --- HEADER --- */
.header { position: fixed; top: 0; left: 0; width: 100%; height: var(--header-height); background-color: var(--color-background); color: var(--color-text-header); z-index: 1000; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08); display: flex; align-items: center; }
.header .container { display: flex; justify-content: space-between; align-items: center; width: 100%; }
.header-brand { display: flex; align-items: center; gap: 18px; }
/* --- HEADER TITLE GROUP --- */
.header-title-group {
    line-height: 1.1;
}
.header-name {
    font-family: var(--font-secondary);
    font-size: 1.7rem;
    font-weight: 700;
    color: var(--color-text-header);
    white-space: nowrap;
    margin-bottom: 0;
    line-height: 1.1;
}
.header-subtitle {
    display: block;
    font-family: var(--font-primary);
    font-size: 0.75rem;
    font-weight: 500;
    color: #555;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    white-space: nowrap;
    margin-top: 2px;
    line-height: 1;
}
/* --- FIM HEADER TITLE GROUP --- */
.main-nav ul { display: flex; gap: 35px; }
.main-nav a { color: var(--color-text-header); font-weight: 500; padding: 8px 0; position: relative; text-transform: uppercase; font-size: 0.9rem; letter-spacing: 1px; }
.main-nav a::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 2px; background-color: var(--color-secondary); transition: width 0.3s ease; }
.main-nav a:hover, .main-nav a.active { color: var(--color-text-header); }
.main-nav a:hover::after, .main-nav a.active::after { width: 100%; }
.nav-toggle { display: none; background: none; border: none; cursor: pointer; padding: 10px; }
.nav-toggle span { display: block; width: 25px; height: 3px; background-color: var(--color-text-header); margin-bottom: 5px; border-radius: 2px; transition: all 0.3s ease; }
.nav-toggle span:last-child { margin-bottom: 0; }

/* --- LOGO STYLES (IMG Tag Version - Final) --- */
.logo-image {
    display: block;
    height: auto;
    max-width: 100%;
}
.logo-link {
     line-height: 0;
}
.header-logo-container {
    display: block;
    width: 64px;
    flex-shrink: 0;
}
.footer-logo-container {
    display: block;
    max-width: 55px;
    margin-bottom: 15px; /* Alinha à esquerda por padrão */
}
/* --- FIM LOGO STYLES --- */

/* --- SLIDER --- */
#home { height: 70vh; min-height: 500px; position: relative; overflow: hidden; padding: 0; background-color: var(--color-primary); }
.slider-container { height: 100%; position: relative; }
.slides-wrapper { display: flex; height: 100%; will-change: transform; }
.slide {
    height: 100%;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    /* Largura definida por JS */
}
.slide-1 { background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://github.com/Aracebe/advogadalilian/blob/content/photo01.webp?raw=true'); }
.slide-2 { background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://github.com/Aracebe/advogadalilian/blob/content/photo02.webp?raw=true'); }
.slide-3 { background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://github.com/Aracebe/advogadalilian/blob/content/photo03.webp?raw=true'); }
.slide-content { color: var(--color-text-light); text-align: center; max-width: 850px; width: 90%; padding: 25px; background: rgba(0, 0, 0, 0.65); border-radius: 8px; position: relative; z-index: 3; }
.slide-content h1 {
    font-family: var(--font-primary); /* Fonte Montserrat */
    font-size: 3rem;
    margin-bottom: 0.6em;
    color: var(--color-text-light);
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8);
    font-weight: 700;
    line-height: 1.2;
}
.slide-content p { font-size: 1.2rem; margin-bottom: 1.8em; color: #e8e8e8; text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7); font-family: var(--font-primary); font-weight: 400; line-height: 1.6; }
.slider-controls { position: absolute; bottom: 25px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px; z-index: 10; }
.slider-dot { width: 25px; height: 5px; background-color: rgba(255, 255, 255, 0.4); border-radius: 3px; cursor: pointer; border: none; padding: 0; transition: width 0.4s ease, background-color 0.4s ease; }
.slider-dot.active { background-color: var(--color-secondary); width: 45px; }
.slider-arrow { position: absolute; top: 50%; transform: translateY(-50%); background-color: rgba(0, 0, 0, 0.4); color: white; border: none; padding: 15px; cursor: pointer; z-index: 10; font-size: 1.5rem; transition: background-color 0.3s ease; border-radius: 50%; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; }
.slider-arrow:hover { background-color: rgba(0, 0, 0, 0.7); }
.slider-arrow.prev { left: 30px; }
.slider-arrow.next { right: 30px; }

/* --- SEÇÕES DE ÁREA --- */
.area-section { display: flex; align-items: center; gap: 60px; margin-bottom: 0; padding: 90px 0; }
.area-section:nth-child(odd) { background-color: var(--color-section-alt); }
.area-section:nth-child(even) { background-color: var(--color-background); }
.area-section .container { display: flex; align-items: center; gap: 60px; width: 100%; }
.area-section:nth-child(odd) .container { flex-direction: row; }
.area-section:nth-child(even) .container { flex-direction: row-reverse; }
.area-content { flex: 1; padding: 30px; border-radius: 5px; border-left: 4px solid var(--color-secondary); }
.area-image { flex: 0 0 42%; max-width: 42%; border-radius: 8px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12); }
.area-image img { width: 100%; height: 420px; object-fit: cover; transition: transform 0.4s ease; }
.area-image img:hover { transform: scale(1.05); }
.area-content h3 { font-size: 1.9rem; margin-bottom: 25px; position: relative; padding-bottom: 10px; }
.area-content h3::after { content: ''; position: absolute; bottom: 0; left: 0; width: 60px; height: 3px; background-color: var(--color-secondary); }
.area-content p { font-size: 1rem; color: #444; margin-bottom: 1.2rem; }
.area-content .btn { margin-top: 15px; }

/* --- SOBRE --- */
#sobre { background-color: var(--color-background); padding: 100px 0; }
.about-content { display: flex; align-items: center; gap: 50px; }
.about-image { flex: 0 0 35%; max-width: 35%; position: relative; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border-radius: 8px; overflow: hidden; }
.about-image img { width: 100%; height: auto; object-fit: cover; display: block; }
.about-text { flex: 1; }
.about-text .about-name { font-family: var(--font-secondary); font-size: 2.2rem; color: var(--color-primary); margin-bottom: 5px; line-height: 1.2; }
.about-text .about-title { display: block; font-size: 1.1rem; color: var(--color-secondary); font-family: var(--font-primary); font-weight: 500; margin-bottom: 25px; letter-spacing: 1px; text-transform: uppercase; }
.about-text p { color: #444; font-size: 1.05rem; }
.about-text .btn { margin-top: 25px; }

/* --- BLOG --- */
#blog { background-color: var(--color-section-alt); }
.blog-preview-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 35px; margin-bottom: 50px; }
.post-preview { background-color: var(--color-background); border-radius: 8px; overflow: hidden; box-shadow: 0 5px 20px rgba(0, 0, 0, 0.07); transition: transform 0.3s ease, box-shadow 0.3s ease; display: flex; flex-direction: column; }
.post-preview:hover { transform: translateY(-6px); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); }
.post-preview img { width: 100%; height: 220px; object-fit: cover; }
.post-content { padding: 25px; flex-grow: 1; display: flex; flex-direction: column; }
.post-content h4 { font-family: var(--font-secondary); font-size: 1.35rem; color: var(--color-primary); margin-bottom: 12px; line-height: 1.4; }
.post-content p { color: #555; font-size: 0.95rem; line-height: 1.6; margin-bottom: 20px; flex-grow: 1; }
.read-more-link { color: var(--color-secondary); font-weight: 700; font-size: 0.9rem; text-decoration: none; align-self: flex-start; transition: color 0.3s ease; }
.read-more-link:hover { color: #cea870; text-decoration: underline; }
.view-all-blog { text-align: center; }

/* --- FOOTER --- */
.footer {
    background-color: var(--color-primary); color: #ccc; padding: 80px 0 40px 0;
    border-top: 5px solid var(--color-secondary);
}
.footer-content { display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 50px; align-items: start; margin-bottom: 50px; }
.footer-column h4 { font-family: var(--font-primary); color: var(--color-secondary); margin-bottom: 25px; text-transform: uppercase; font-size: 1rem; letter-spacing: 1.5px; font-weight: 700; }
/* First column defaults to left alignment */
.footer-brand-name { font-family: var(--font-secondary); font-size: 1.3rem; color: var(--color-text-light); margin-bottom: 18px; line-height: 1.2; }
.footer-column:nth-child(1) .about-text {
     color: #bbb; font-size: 0.95rem; line-height: 1.8; margin-bottom: 30px;
     max-width: 95%;
}
.footer-column .social-heading { margin-bottom: 15px; }
.footer-contact-list li { margin-bottom: 18px; display: flex; align-items: center; gap: 12px; color: #bbb; font-size: 0.95rem; }
.footer-contact-list img.icon { width: 20px; height: 20px; flex-shrink: 0; }
.footer-contact-list a { color: #bbb; word-break: break-word; }
.footer-contact-list a:hover { color: var(--color-secondary); }
.quick-links-list li { margin-bottom: 12px; }
.quick-links-list a { color: #bbb; font-size: 0.95rem; }
.quick-links-list a:hover { color: var(--color-secondary); padding-left: 5px; transition: padding-left 0.3s ease; }
 .footer-social-links { display: flex; flex-wrap: wrap; gap: 12px; justify-content: flex-start; /* Align left */ }
 .footer-social-links a { display: inline-block; transition: transform 0.3s ease; line-height: 0; }
 .footer-social-links a:hover { transform: scale(1.1); }
 .footer-social-links img { width: 24px; height: 24px; filter: invert(87%) sepia(15%) saturate(764%) hue-rotate(348deg) brightness(91%) contrast(85%); transition: filter 0.3s ease; }
 .footer-social-links a:hover img { filter: brightness(0) invert(1); }
.footer-bottom { border-top: 1px solid rgba(255, 255, 255, 0.15); padding-top: 30px; margin-top: 40px; text-align: center; font-size: 0.9em; color: #aaa; }
.footer-bottom a { color: var(--color-secondary); }
.footer-bottom a:hover { text-decoration: underline; }

/* --- MEDIA QUERIES --- */
@media (max-width: 992px) {
    body { padding-top: calc(var(--header-height) - 10px); }
    .header { height: calc(var(--header-height) - 10px); }
    .header-logo-container { width: 58px; }
    .header-name { font-size: 1.5rem;}
    .header-subtitle { font-size: 0.7rem; }
    .main-nav ul { gap: 25px; }
    .main-nav a { font-size: 0.85rem; }
    h2 { font-size: 2.1rem; margin-bottom: 50px; }
    h3 { font-size: 1.7rem; }
    .slide-content h1 { font-size: 2.4rem; }
    .slide-content p { font-size: 1.05rem; }
    .area-section .container { flex-direction: column !important; gap: 30px; align-items: stretch; }
    .area-image { max-width: 80%; margin: 0 auto 30px auto; height: auto;}
    .area-image img { height: auto; max-height: 350px; }
    .area-content { text-align: center; padding: 25px; border-left: none; border-top: 4px solid var(--color-secondary); width: 100%; }
    .area-content h3::after { left: 50%; transform: translateX(-50%); }
    .about-content { flex-direction: column; text-align: center; gap: 30px; align-items: center; }
    .about-image { flex-basis: auto; max-width: 60%; margin: 0 auto; height: auto; }
     .about-image img { max-height: 380px; }
    .about-text .about-name { text-align: center; font-size: 2rem;}
    .about-text .about-title { margin: 5px auto 20px auto; }
    .blog-preview-grid { grid-template-columns: repeat(2, 1fr); gap: 25px; }
    .footer-content { grid-template-columns: 1fr; gap: 40px; }
    /* Footer Alignment on Mobile: Left align all columns */
    .footer-column { text-align: left; }
    .footer-logo-container { max-width: 50px; margin-left: 0; margin-right: auto; }
    .footer-brand-name { text-align: left; }
    .footer-column .about-text { max-width: 100%; margin-left: 0; margin-right: 0; }
    .footer-social-links { justify-content: flex-start; }
    .quick-links-list { text-align: left; }
    .footer-column:nth-child(3) { text-align: left; }
    .footer-contact-list li { display: flex; justify-content: flex-start; max-width: 100%; margin-left: 0; }
    .footer-column:nth-child(1), .footer-column:nth-child(2), .footer-column:nth-child(3) { grid-column: auto; }
}

@media (max-width: 768px) {
     body { padding-top: calc(var(--header-height) - 20px); }
     .header { height: calc(var(--header-height) - 20px); }
     .header-logo-container { width: 46px; }
     .header-name { display: none; }
     .header-subtitle { display: none; }
     .main-nav { position: fixed; top: calc(var(--header-height) - 20px); right: -100%; width: 70%; max-width: 300px; height: calc(100vh - (var(--header-height) - 20px)); background-color: #fff; box-shadow: -5px 0 15px rgba(0,0,0,0.1); transition: right 0.4s ease-in-out; overflow-y: auto; padding-top: 30px; z-index: 1050;}
     .main-nav.nav-active { right: 0; }
     .main-nav ul { flex-direction: column; gap: 0; }
     .main-nav li { width: 100%; border-bottom: 1px solid #eee; }
     .main-nav a { display: block; padding: 15px 25px; font-size: 1rem; color: var(--color-text-header); font-weight: 500; width: 100%; }
     .main-nav a:hover, .main-nav a.active { background-color: #f8f8f8; color: var(--color-secondary); }
     .main-nav a::after { display: none; }
     .nav-toggle { display: block; z-index: 1100; position: relative;}
     .nav-toggle.active span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
     .nav-toggle.active span:nth-child(2) { opacity: 0; }
     .nav-toggle.active span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }
     body.nav-open { overflow: hidden; }
     body::after { content: ''; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 998; opacity: 0; visibility: hidden; transition: opacity 0.4s ease, visibility 0.4s ease; }
     body.nav-open::after { opacity: 1; visibility: visible; }
     #home { height: 65vh; min-height: 420px;}
     .slide-content { padding: 20px 15px; width: 88%; }
     .slide-content h1 { font-size: 1.8rem; line-height: 1.3; margin-bottom: 0.5em; }
     .slide-content p { font-size: 0.95rem; line-height: 1.5; margin-bottom: 1.5em; }
     .btn { padding: 10px 20px; font-size: 0.85rem;}
     .slider-controls { bottom: 15px; }
     .slider-dot { width: 15px; height: 4px; }
     .slider-dot.active { width: 28px; }
     .slider-arrow { width: 45px; height: 45px; padding: 12px; font-size: 1.3rem;}
     h2 { font-size: 1.7rem; margin-bottom: 40px;}
     h3 { font-size: 1.5rem; }
     section { padding: 70px 0; }
     .area-image { max-width: 90%; height: auto;}
     .area-image img { max-height: 300px; }
     .area-content { padding: 20px; }
     .about-image { max-width: 75%; }
     .about-image img { max-height: 330px; }
     .about-text .about-name { font-size: 1.8rem; }
     .blog-preview-grid { grid-template-columns: 1fr; gap: 30px; }
     .post-preview img { height: 200px; }
     .footer-column { margin-bottom: 30px; }
     .footer-brand-name { font-size: 1.3rem;}
     .footer-column .about-text { max-width: 100%; margin-bottom: 20px;}
     .footer-column .social-heading { margin-top: 15px; margin-bottom: 10px;}
     .footer-social-links { margin-top: 0; gap: 10px; }
     .footer-social-links img { width: 22px; height: 22px;}
      .footer-column:nth-child(1) { order: 1;}
      .footer-column:nth-child(3) { order: 2;}
      .footer-column:nth-child(2) { order: 3;}
}

 @media (max-width: 480px) {
      #home { height: 70vh; }
      .slide-content { width: 90%; padding: 15px 10px; }
      .slide-content h1 { font-size: 1.6rem; }
      .slide-content p { font-size: 0.9rem; }
      .slider-arrow { width: 40px; height: 40px; padding: 10px; font-size: 1.2rem;}
      .slider-arrow.prev { left: 10px; }
      .slider-arrow.next { right: 10px; }
      .slider-dot { width: 12px; height: 3px; }
      .slider-dot.active { width: 22px; }
      h2 { font-size: 1.5rem; }
      h3 { font-size: 1.3rem; }
      .about-image { max-width: 80%; }
       .about-image img { max-height: 280px; }
      .about-text .about-name { font-size: 1.6rem; }
      .footer-logo-container { max-width: 45px; }
      .footer-brand-name { font-size: 1.2rem; }
      .footer-column .about-text { font-size: 0.9rem; }
      .footer-contact-list li { font-size: 0.9rem; }
      .quick-links-list a { font-size: 0.9rem; }
 }
