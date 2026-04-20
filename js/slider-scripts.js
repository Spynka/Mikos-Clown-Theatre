/**
 * Инициализация Hero-слайдера
 * Вызывается после загрузки компонента на index.html или affiche.html
 */
window.initHeroSlider = function() {
    const slider = document.getElementById('heroSliderAfisha');
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.hero-slide-afisha');
    const dots = slider.querySelectorAll('.slider-dot');
    const leftArrow = slider.querySelector('.slider-arrow-left');
    const rightArrow = slider.querySelector('.slider-arrow-right');
    
    if (slides.length === 0) return; // Защита, если слайдер пустой
    
    let currentSlide = 0;
    let autoInterval;
    
    function showSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
        currentSlide = index;
        resetAutoSlide();
    }
    
    function nextSlide() { showSlide(currentSlide + 1); }
    function prevSlide() { showSlide(currentSlide - 1); }
    function resetAutoSlide() {
        if (autoInterval) clearInterval(autoInterval);
        autoInterval = setInterval(nextSlide, 5000); // 5 секунд как в афише
    }
    
    // Обработчики
    if (leftArrow) leftArrow.addEventListener('click', prevSlide);
    if (rightArrow) rightArrow.addEventListener('click', nextSlide);
    dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));
    
    // Запуск
    resetAutoSlide();
    
    // Кнопки "Купить билет" / "О спектакле" (универсальная обработка)
    slider.querySelectorAll('.hero-btn-dark, .hero-btn-light').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            if (!id) return;
            
            if (e.currentTarget.classList.contains('hero-btn-dark')) {
                // Купить билет — проверяем, есть ли данные в window.allPerformances или window.events
                const perf = window.allPerformances?.find(p => p.id == id) || 
                            window.events?.find(p => p.id == id);
                if (perf) {
                    localStorage.setItem('selectedPerformance', JSON.stringify({
                        id: perf.id,
                        title: perf.name,
                        dateTime: perf.date,
                        hall: perf.venue,
                        poster: perf.img
                    }));
                    window.location.href = 'checkout.html';
                }
            } else {
                // О спектакле
                window.location.href = `performance.html?id=${id}`;
            }
        });
    });
};