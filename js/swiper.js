const swiper = new Swiper('.swiper-container', {
    // slidesPerView: 4,         // Показывать 5 слайдов одновременно
    // slidesPerGroup: 1,        // Прокручивать по 1 слайду
    loop: true,               // Бесконечная прокрутка
    autoplay: {
      delay: 5000,            // Пауза перед автопрокруткой
      disableOnInteraction: false, // Продолжать автопрокрутку после взаимодействия
    },
    speed: 1000,              // Скорость анимации (в миллисекундах)
    navigation: {
      nextEl: '.button-next', // Кнопка "вправо"
      prevEl: '.button-prev', // Кнопка "влево"
    },
    breakpoints: {
        320: {
            slidesPerView: 1,         // Показывать 5 слайдов одновременно
            slidesPerGroup: 1,        // Прокручивать по 1 слайду
        },
        480: {
            slidesPerView: 2,         // Показывать 5 слайдов одновременно
            slidesPerGroup: 1,        // Прокручивать по 1 слайду
        },
        998: {
            slidesPerView: 3,         // Показывать 5 слайдов одновременно
            slidesPerGroup: 1,        // Прокручивать по 1 слайду
        },
        1300: {
            slidesPerView: 4,         // Показывать 5 слайдов одновременно
            slidesPerGroup: 1,        // Прокручивать по 1 слайду
        },
    }
  });