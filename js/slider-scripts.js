/**
 * Инициализация Hero-слайдера
 * Исправленная версия с рабочими стрелками и свайпом
 */
window.initHeroSlider = function() {
    const slider = document.getElementById('heroSliderAfisha');
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.hero-slide-afisha');
    const dots = slider.querySelectorAll('.slider-dot');
    const leftArrow = slider.querySelector('.slider-arrow-left');
    const rightArrow = slider.querySelector('.slider-arrow-right');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    let autoInterval;
    let startX = 0;
    let isDragging = false;
    
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
        autoInterval = setInterval(nextSlide, 5000);
    }
    
    // === Обработчики для стрелок (теперь работают) ===
    if (leftArrow) {
        leftArrow.addEventListener('click', (e) => {
            e.stopPropagation();
            prevSlide();
        });
    }
    if (rightArrow) {
        rightArrow.addEventListener('click', (e) => {
            e.stopPropagation();
            nextSlide();
        });
    }
    
    // Точки
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => showSlide(i));
    });
    
    // === Свайп для мобильных ===
    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });
    
    slider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        // Предотвращаем скролл страницы во время свайпа
        const diff = startX - e.touches[0].clientX;
        if (Math.abs(diff) > 10) {
            e.preventDefault();
        }
    }, { passive: false });
    
    slider.addEventListener('touchend', (e) => {
        if (!isDragging || !startX) return;
        
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        const threshold = 50;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                nextSlide(); // Свайп влево
            } else {
                prevSlide(); // Свайп вправо
            }
        }
        
        startX = 0;
        isDragging = false;
    });
    
    // === Мышь (для десктопа, если нужен драг) ===
    slider.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        isDragging = true;
        e.preventDefault();
    });
    
    slider.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });
    
    slider.addEventListener('mouseup', (e) => {
        if (!isDragging || !startX) return;
        
        const endX = e.clientX;
        const diff = startX - endX;
        const threshold = 50;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        
        startX = 0;
        isDragging = false;
    });
    
    slider.addEventListener('mouseleave', () => {
        isDragging = false;
        startX = 0;
    });
    
    // Кнопки действий
    slider.querySelectorAll('.hero-btn-dark, .hero-btn-light').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = e.currentTarget.dataset.id;
            if (!id) return;
            
            if (e.currentTarget.classList.contains('hero-btn-dark')) {
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
                window.location.href = `performance.html?id=${id}`;
            }
        });
    });
    
    // Запуск автослайда
    resetAutoSlide();
};

// Удаляем дублирующуюся функцию initAfishaSliderSwipe, 
// так как вся логика теперь в initHeroSlider