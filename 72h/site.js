(() => {
  const root = document.documentElement;
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark' || (!storedTheme && matchMedia('(prefers-color-scheme: dark)').matches)) root.classList.add('dark');
  document.querySelectorAll('[data-theme-toggle]').forEach((button) => button.addEventListener('click', () => {
    root.classList.toggle('dark');
    localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
  }));
  const menu = document.querySelector('.mobile-menu');
  document.querySelectorAll('[data-menu-open]').forEach((button) => button.addEventListener('click', () => menu?.classList.add('open')));
  document.querySelectorAll('[data-menu-close], .mobile-menu a').forEach((element) => element.addEventListener('click', () => menu?.classList.remove('open')));
  const carousel = document.querySelector('.app-carousel');
  if (carousel) {
    const slides = [...carousel.querySelectorAll('.carousel-slide')];
    const caption = carousel.querySelector('[data-carousel-caption]');
    const counter = carousel.querySelector('[data-carousel-count]');
    const language = root.lang === 'en' ? 'en' : 'es';
    let activeIndex = 0;
    const showSlide = (index) => {
      activeIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        slide.hidden = slideIndex !== activeIndex;
        slide.classList.toggle('is-active', slideIndex === activeIndex);
      });
      if (caption) caption.textContent = `${slides[activeIndex].getAttribute(`data-caption-${language}`)}${language === 'en' ? ' · Screenshot in Spanish' : ''}`;
      if (counter) counter.textContent = `${activeIndex + 1} / ${slides.length}`;
    };
    carousel.querySelector('[data-carousel-prev]')?.addEventListener('click', () => showSlide(activeIndex - 1));
    carousel.querySelector('[data-carousel-next]')?.addEventListener('click', () => showSlide(activeIndex + 1));
    let touchStartX = 0;
    carousel.addEventListener('touchstart', (event) => { touchStartX = event.changedTouches[0].screenX; }, { passive: true });
    carousel.addEventListener('touchend', (event) => {
      const distance = event.changedTouches[0].screenX - touchStartX;
      if (Math.abs(distance) > 45) showSlide(activeIndex + (distance < 0 ? 1 : -1));
    }, { passive: true });
    showSlide(0);
  }
})();
