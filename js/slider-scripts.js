// =============================================
// ИНИЦИАЛИЗАЦИЯ СЛАЙДЕРА С МОДАЛЬНЫМ ОКНОМ
// =============================================
(function() {
    'use strict';
    
    // Ждем полной загрузки DOM
    function initWhenReady() {
        const slider = document.getElementById('heroSliderAfisha');
        if (!slider) {
            console.warn('Слайдер не найден, повторная попытка через 500ms...');
            setTimeout(initWhenReady, 500);
            return;
        }
        
        // Проверяем, загружены ли слайды
        const slides = slider.querySelectorAll('.hero-slide-afisha');
        if (slides.length === 0) {
            console.warn('Слайды еще не загружены, ожидание...');
            // Используем MutationObserver для отслеживания появления слайдов
            observeSliderContent(slider);
            return;
        }
        
        initHeroSliderWithModal();
    }
    
    // Наблюдатель за содержимым слайдера
    function observeSliderContent(slider) {
        console.log('Запуск наблюдателя за содержимым слайдера...');
        
        const observer = new MutationObserver(function(mutations) {
            for (let mutation of mutations) {
                if (mutation.type === 'childList' || mutation.type === 'subtree') {
                    const slides = slider.querySelectorAll('.hero-slide-afisha');
                    if (slides.length > 0) {
                        console.log(`Обнаружено ${slides.length} слайдов через наблюдатель`);
                        observer.disconnect();
                        initHeroSliderWithModal();
                        break;
                    }
                }
            }
        });
        
        observer.observe(slider, {
            childList: true,
            subtree: true,
            attributes: false,
            characterData: false
        });
        
        // Таймаут на случай, если слайды никогда не загрузятся
        setTimeout(() => {
            observer.disconnect();
            const slides = slider.querySelectorAll('.hero-slide-afisha');
            if (slides.length > 0) {
                console.log('Принудительная инициализация по таймауту');
                initHeroSliderWithModal();
            } else {
                console.error('Слайды не загрузились после ожидания');
            }
        }, 5000);
    }
    
    function initHeroSliderWithModal() {
        console.log('🚀 Инициализация слайдера...');
        
        const slider = document.getElementById('heroSliderAfisha');
        if (!slider) {
            console.error('Контейнер слайдера не найден');
            return;
        }
        
        const slides = slider.querySelectorAll('.hero-slide-afisha');
        const dots = document.querySelectorAll('.slider-dot');
        const leftArrow = document.getElementById('sliderArrowLeft');
        const rightArrow = document.getElementById('sliderArrowRight');
        
        console.log(`Найдено слайдов: ${slides.length}, точек: ${dots.length}`);
        console.log(`Стрелки: левая=${!!leftArrow}, правая=${!!rightArrow}`);
        
        if (slides.length === 0) {
            console.error('Слайды не найдены!');
            return;
        }
        
        let currentSlide = 0;
        let autoPlayInterval;
        const autoPlayDelay = 5000;
        
        // Данные спектаклей
        const performancesData = {
            1: { id: 1, name: 'Лишь бы не было детей', img: 'images/content/performances/15.jpg', time: '90 минут' },
            2: { id: 2, name: 'Богатыри', img: 'images/content/performances/3.jpg', time: '100 минут' },
            3: { id: 3, name: 'Ожидание', img: 'images/content/performances/9.jpg', time: '80 минут' },
            4: { id: 4, name: 'Кабаре-Шапито', img: 'images/content/performances/10.jpg', time: '110 минут' },
            5: { id: 5, name: 'Авиаторы', img: 'images/content/performances/6.jpg', time: '95 минут' }
        };
        
        // Расширенные сессии
        const extendedSessions = [
            { performanceId: 1, date: '15 апреля 19:00', venue: 'Основная сцена', month: 'апрель' },
            { performanceId: 1, date: '16 апреля 19:00', venue: 'Основная сцена', month: 'апрель' },
            { performanceId: 1, date: '22 апреля 19:00', venue: 'Основная сцена', month: 'апрель' },
            { performanceId: 1, date: '5 мая 19:00', venue: 'Основная сцена', month: 'май' },
            { performanceId: 1, date: '12 мая 19:00', venue: 'Малая сцена', month: 'май' },
            { performanceId: 2, date: '22 апреля 18:00', venue: 'Основная сцена', month: 'апрель' },
            { performanceId: 2, date: '29 апреля 18:00', venue: 'Основная сцена', month: 'апрель' },
            { performanceId: 2, date: '10 мая 18:00', venue: 'Основная сцена', month: 'май' },
            { performanceId: 3, date: '5 мая 20:00', venue: 'Малая сцена', month: 'май' },
            { performanceId: 3, date: '15 мая 20:00', venue: 'Малая сцена', month: 'май' },
            { performanceId: 4, date: '12 мая 19:00', venue: 'Основная сцена', month: 'май' },
            { performanceId: 4, date: '19 мая 19:00', venue: 'Основная сцена', month: 'май' },
            { performanceId: 5, date: '20 октября 19:00', venue: 'Основная сцена', month: 'октябрь' },
            { performanceId: 5, date: '27 октября 19:00', venue: 'Основная сцена', month: 'октябрь' }
        ];
        
        let currentPerformance = null;
        let selectedSession = null;
        let currentMonthFilter = 'all';
        
        // Создаем модальное окно при первом вызове
        let modalInitialized = false;
        
        function initModalOnce() {
            if (modalInitialized) return;
            if (document.getElementById('sessionModal')) {
                modalInitialized = true;
                bindModalEvents();
                return;
            }
            
            console.log('Создание модального окна...');
            
            const modalHTML = `
                <div class="modal-overlay" id="sessionModal">
                    <div class="modal-container">
                        <div class="modal-header">
                            <h3 id="modalPerformanceName">Выбор сеанса</h3>
                            <button class="modal-close" id="closeSessionModalBtn">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="modal-performance-title">
                                <i class="fas fa-ticket-alt"></i> 
                                <span id="selectedPlayTitle"></span>
                            </div>
                            <div class="date-filter" id="dateFilterContainer"></div>
                            <div class="sessions-list" id="sessionsListContainer"></div>
                        </div>
                        <div class="modal-footer">
                            <button class="modal-confirm-btn" id="confirmSessionBtn" disabled>
                                <i class="fas fa-shopping-cart"></i> Перейти к покупке
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            
            // Добавляем стили если их нет
            if (!document.getElementById('sessionModalStyles')) {
                const styles = `
                    <style id="sessionModalStyles">
                        .modal-overlay {
                            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                            background: rgba(0, 0, 0, 0.7); display: flex; align-items: flex-start;
                            justify-content: center; z-index: 10000; visibility: hidden; opacity: 0;
                            transition: 0.3s ease; padding: 20px; padding-top: 100px;
                            box-sizing: border-box; overflow-y: auto;
                        }
                        .modal-overlay.active { visibility: visible; opacity: 1; }
                        .modal-container {
                            background: #FFFFFF; max-width: 520px; width: 100%;
                            max-height: calc(90vh - 100px); border-radius: 16px; overflow: hidden;
                            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2); display: flex;
                            flex-direction: column; transform: scale(0.95);
                            transition: transform 0.3s ease; border: 1px solid #E5E3E1; margin: 0 auto;
                        }
                        .modal-overlay.active .modal-container { transform: scale(1); }
                        .modal-header {
                            padding: 24px 24px 16px; border-bottom: 1px solid #E5E3E1;
                            display: flex; align-items: center; justify-content: space-between;
                        }
                        .modal-header h3 {
                            font-family: 'Unbounded', sans-serif; font-size: 20px; font-weight: 700;
                            color: #1A1718; margin: 0; padding-left: 12px; position: relative;
                        }
                        .modal-header h3::before {
                            content: ''; position: absolute; left: 0; top: 0; width: 3px;
                            height: 100%; background: #E8454D; border-radius: 1.5px;
                        }
                        .modal-close {
                            width: 36px; height: 36px; border-radius: 50%; background: #F8F7F6;
                            border: 1px solid #E5E3E1; color: #5A5556; font-size: 18px;
                            display: flex; align-items: center; justify-content: center;
                            cursor: pointer; transition: all 0.2s;
                        }
                        .modal-close:hover { background: #E8454D; color: #FFFFFF; border-color: #E8454D; }
                        .modal-body { padding: 24px; overflow-y: auto; flex: 1; }
                        .modal-performance-title {
                            font-size: 16px; font-weight: 600; color: #3D393A; margin-bottom: 20px;
                            padding-bottom: 12px; border-bottom: 1px dashed #E5E3E1;
                            display: flex; align-items: center; gap: 8px;
                        }
                        .modal-performance-title i { color: #E8454D; font-size: 16px; }
                        .modal-performance-title span { font-family: 'Unbounded', sans-serif; font-weight: 600; color: #1A1718; }
                        .date-filter { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px; }
                        .filter-btn {
                            background: #F8F7F6; border: 1px solid #E5E3E1; color: #404040;
                            padding: 8px 16px; border-radius: 40px; font-size: 14px; font-weight: 600;
                            cursor: pointer; transition: all 0.2s; font-family: 'Unbounded', sans-serif;
                        }
                        .filter-btn:hover { background: #E9E7E5; border-color: #D5D3D1; }
                        .filter-btn.active { background: #2A3D5E; border-color: #2A3D5E; color: #FFFFFF; }
                        .sessions-list { display: flex; flex-direction: column; gap: 12px; }
                        .session-item {
                            background: #F8F7F6; border-radius: 12px; padding: 16px 18px;
                            border: 1px solid #E5E3E1; display: flex; align-items: center;
                            justify-content: space-between; transition: all 0.2s; cursor: pointer;
                        }
                        .session-item:hover {
                            border-color: #4A6294; background: #FFFFFF;
                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); transform: translateX(4px);
                        }
                        .session-item.selected {
                            border-color: #4A6294; background: #E8EEF7;
                            box-shadow: 0 0 0 2px rgba(74, 98, 148, 0.15);
                        }
                        .session-info { display: flex; flex-direction: column; gap: 6px; }
                        .session-date { font-weight: 700; font-size: 16px; color: #1A1718; font-family: 'Unbounded', sans-serif; }
                        .session-meta { display: flex; gap: 16px; font-size: 14px; color: #5A5556; }
                        .session-meta i { width: 16px; margin-right: 4px; color: #4A6294; }
                        .session-select-indicator {
                            width: 24px; height: 24px; border-radius: 50%; border: 2px solid #D5D3D1;
                            display: flex; align-items: center; justify-content: center;
                            color: white; font-size: 12px; background: transparent; flex-shrink: 0;
                        }
                        .session-item.selected .session-select-indicator { background: #4A6294; border-color: #4A6294; }
                        .no-sessions {
                            text-align: center; padding: 40px 20px; color: #5A5556;
                            font-style: italic; background: #F8F7F6; border-radius: 12px;
                            border: 1px dashed #E5E3E1;
                        }
                        .modal-footer { padding: 20px 24px; border-top: 1px solid #E5E3E1; background: #FFFFFF; }
                        .modal-confirm-btn {
                            width: 100%; background: #E8454D; color: #FFFFFF; border: none;
                            padding: 14px 20px; border-radius: 8px; font-weight: 600; font-size: 16px;
                            font-family: 'Unbounded', sans-serif; cursor: pointer; transition: background 0.2s;
                            display: flex; align-items: center; justify-content: center; gap: 8px;
                        }
                        .modal-confirm-btn:disabled { background: #E5E3E1; color: #9A9896; cursor: not-allowed; border: 1px solid #D5D3D1; }
                        .modal-confirm-btn:not(:disabled):hover { background: #D62830; }
                        @media (max-width: 480px) {
                            .modal-overlay { align-items: flex-end; padding: 0; padding-top: 60px; }
                            .modal-container { max-width: 100%; border-radius: 16px 16px 0 0; max-height: calc(90vh - 60px); }
                            .modal-header { padding: 20px 20px 12px; }
                            .modal-body { padding: 20px; }
                            .modal-footer { padding: 16px 20px; }
                        }
                    </style>
                `;
                document.head.insertAdjacentHTML('beforeend', styles);
            }
            
            modalInitialized = true;
            bindModalEvents();
        }
        
        function bindModalEvents() {
            const sessionModal = document.getElementById('sessionModal');
            const closeBtn = document.getElementById('closeSessionModalBtn');
            const confirmBtn = document.getElementById('confirmSessionBtn');
            
            console.log('Привязка событий модального окна...');
            console.log('Модальное окно:', !!sessionModal);
            console.log('Кнопка закрытия:', !!closeBtn);
            console.log('Кнопка подтверждения:', !!confirmBtn);
            
            if (closeBtn) {
                // Удаляем старый обработчик, если есть
                const newCloseBtn = closeBtn.cloneNode(true);
                closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
                
                newCloseBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log('Клик по кнопке закрытия');
                    closeSessionModal();
                });
            }
            
            if (sessionModal) {
                sessionModal.addEventListener('click', function(e) {
                    if (e.target === sessionModal) {
                        console.log('Клик по оверлею');
                        closeSessionModal();
                    }
                });
            }
            
            if (confirmBtn) {
                // Удаляем старый обработчик, если есть
                const newConfirmBtn = confirmBtn.cloneNode(true);
                confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
                
                newConfirmBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log('🔥 Клик по кнопке "Перейти к покупке"');
                    console.log('selectedSession:', selectedSession);
                    console.log('currentPerformance:', currentPerformance);
                    
                    if (selectedSession && currentPerformance) {
                        console.log('✅ Переход к покупке:', currentPerformance.name, selectedSession.date);
                        
                        const performanceData = {
                            id: currentPerformance.id,
                            title: currentPerformance.name,
                            dateTime: selectedSession.date,
                            hall: selectedSession.venue,
                            poster: currentPerformance.img,
                            duration: currentPerformance.time,
                            price: '1 500 ₽'
                        };
                        
                        localStorage.setItem('selectedPerformance', JSON.stringify(performanceData));
                        console.log('Данные сохранены в localStorage:', performanceData);
                        
                        // Небольшая задержка перед переходом
                        setTimeout(() => {
                            window.location.href = 'checkout.html';
                        }, 100);
                    } else {
                        console.error('❌ Не выбран сеанс или спектакль');
                        alert('Пожалуйста, выберите дату и время сеанса');
                    }
                });
            }
            
            // Закрытие по Escape
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && sessionModal && sessionModal.classList.contains('active')) {
                    closeSessionModal();
                }
            });
        }
        
        function closeSessionModal() {
            console.log('Закрытие модального окна');
            const sessionModal = document.getElementById('sessionModal');
            if (sessionModal) {
                sessionModal.classList.remove('active');
                document.body.style.overflow = '';
            }
            currentPerformance = null;
            selectedSession = null;
            startAutoPlay();
        }
        
        function openSessionModal(performance) {
            console.log('📋 Открытие модального окна для:', performance.name);
            
            initModalOnce();
            
            currentPerformance = performance;
            selectedSession = null;
            currentMonthFilter = 'all';
            
            const playTitle = document.getElementById('selectedPlayTitle');
            const modalName = document.getElementById('modalPerformanceName');
            
            if (playTitle) playTitle.textContent = performance.name;
            if (modalName) modalName.textContent = `Выбор сеанса: ${performance.name}`;
            
            renderMonthFilter();
            renderSessionsList();
            
            // Сбрасываем кнопку подтверждения
            const confirmBtn = document.getElementById('confirmSessionBtn');
            if (confirmBtn) {
                confirmBtn.disabled = true;
                console.log('Кнопка подтверждения заблокирована');
            }
            
            const sessionModal = document.getElementById('sessionModal');
            if (sessionModal) {
                sessionModal.classList.add('active');
                document.body.style.overflow = 'hidden';
                console.log('Модальное окно открыто');
            } else {
                console.error('Модальное окно не найдено в DOM!');
            }
            
            stopAutoPlay();
        }
        
        function renderMonthFilter() {
            const container = document.getElementById('dateFilterContainer');
            if (!container || !currentPerformance) return;
            
            const sessionsForPerf = extendedSessions.filter(s => s.performanceId === currentPerformance.id);
            const months = [...new Set(sessionsForPerf.map(s => s.month))];
            
            let html = `<button class="filter-btn ${currentMonthFilter === 'all' ? 'active' : ''}" data-month="all">Все даты</button>`;
            months.forEach(month => {
                const monthCapitalized = month.charAt(0).toUpperCase() + month.slice(1);
                html += `<button class="filter-btn ${currentMonthFilter === month ? 'active' : ''}" data-month="${month}">${monthCapitalized}</button>`;
            });
            container.innerHTML = html;
            
            container.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    currentMonthFilter = btn.dataset.month;
                    renderMonthFilter();
                    renderSessionsList();
                });
            });
        }
        
        function renderSessionsList() {
            const container = document.getElementById('sessionsListContainer');
            if (!container || !currentPerformance) return;
            
            let sessions = extendedSessions.filter(s => s.performanceId === currentPerformance.id);
            if (currentMonthFilter !== 'all') {
                sessions = sessions.filter(s => s.month === currentMonthFilter);
            }
            sessions.sort((a, b) => a.date.localeCompare(b.date));
            
            if (sessions.length === 0) {
                container.innerHTML = '<div class="no-sessions"><i class="far fa-calendar-times"></i> Нет сеансов в выбранном месяце</div>';
                return;
            }
            
            let html = '';
            sessions.forEach(session => {
                const isSelected = selectedSession && 
                    selectedSession.date === session.date && 
                    selectedSession.venue === session.venue;
                
                html += `
                    <div class="session-item ${isSelected ? 'selected' : ''}" data-date="${session.date}" data-venue="${session.venue}" data-month="${session.month}" data-performance-id="${session.performanceId}">
                        <div class="session-info">
                            <div class="session-date">${session.date}</div>
                            <div class="session-meta">
                                <span><i class="fas fa-map-marker-alt"></i> ${session.venue}</span>
                                <span><i class="far fa-clock"></i> ${currentPerformance.time}</span>
                            </div>
                        </div>
                        <div class="session-select-indicator">
                            ${isSelected ? '<i class="fas fa-check"></i>' : ''}
                        </div>
                    </div>
                `;
            });
            container.innerHTML = html;
            
            container.querySelectorAll('.session-item').forEach(item => {
                item.addEventListener('click', function() {
                    selectedSession = {
                        date: this.dataset.date,
                        venue: this.dataset.venue,
                        month: this.dataset.month,
                        performanceId: parseInt(this.dataset.performanceId)
                    };
                    console.log('Выбран сеанс:', selectedSession);
                    renderSessionsList();
                    
                    const confirmBtn = document.getElementById('confirmSessionBtn');
                    if (confirmBtn) {
                        confirmBtn.disabled = false;
                        console.log('Кнопка подтверждения разблокирована');
                    }
                });
            });
        }
        
        function showSlide(index) {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[index].classList.add('active');
            if (dots[index]) dots[index].classList.add('active');
            
            currentSlide = index;
            
            // Перепривязываем события после смены слайда
            // (на случай, если слайдер пересоздает DOM)
            setTimeout(attachButtonEvents, 100);
        }
        
        function nextSlide() {
            showSlide(currentSlide + 1);
        }
        
        function prevSlide() {
            showSlide(currentSlide - 1);
        }
        
        function startAutoPlay() {
            stopAutoPlay();
            autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
        }
        
        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
            }
        }
        
        // Привязываем обработчики к стрелкам
        if (leftArrow) {
            leftArrow.addEventListener('click', () => {
                prevSlide();
                startAutoPlay();
            });
        }
        
        if (rightArrow) {
            rightArrow.addEventListener('click', () => {
                nextSlide();
                startAutoPlay();
            });
        }
        
        // Привязываем обработчики к точкам
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                startAutoPlay();
            });
        });
        
        // 🔥 ГЛАВНОЕ: Привязываем обработчики к кнопкам в слайдах
        function attachButtonEvents() {
            console.log('🔍 Поиск кнопок в слайдах...');
            
            // Кнопки "Купить билет" (темные кнопки)
            const buyButtons = document.querySelectorAll('.hero-btn-dark');
            console.log(`Найдено кнопок "Купить билет": ${buyButtons.length}`);
            
            buyButtons.forEach((btn) => {
                // Проверяем, не привязан ли уже обработчик
                if (btn.dataset.eventBound === 'true') return;
                btn.dataset.eventBound = 'true';
                
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const performanceId = parseInt(this.dataset.id);
                    console.log(`🎯 Клик по кнопке "Купить билет", ID спектакля: ${performanceId}`);
                    
                    if (!performanceId || isNaN(performanceId)) {
                        console.error('❌ Некорректный ID спектакля:', this.dataset.id);
                        return;
                    }
                    
                    const performance = performancesData[performanceId];
                    if (performance) {
                        console.log('✅ Найден спектакль:', performance.name);
                        openSessionModal(performance);
                    } else {
                        console.error('❌ Спектакль не найден для ID:', performanceId);
                        // Пробуем прямой переход, если нет данных о сеансах
                        window.location.href = `checkout.html?id=${performanceId}`;
                    }
                });
            });
            
            // Кнопки "О спектакле" (светлые кнопки)
            const detailsButtons = document.querySelectorAll('.hero-btn-light');
            console.log(`Найдено кнопок "О спектакле": ${detailsButtons.length}`);
            
            detailsButtons.forEach((btn) => {
                if (btn.dataset.eventBound === 'true') return;
                btn.dataset.eventBound = 'true';
                
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const performanceId = this.dataset.id;
                    console.log(`📖 Клик по кнопке "О спектакле", ID: ${performanceId}`);
                    
                    if (performanceId) {
                        window.location.href = `performance.html?id=${performanceId}`;
                    } else {
                        console.error('❌ Не указан ID спектакля для кнопки "О спектакле"');
                    }
                });
            });
        }
        
        // Запуск слайдера
        if (slides.length > 0) {
            showSlide(0);
            startAutoPlay();
            
            // Привязываем события сразу и с задержкой (на случай асинхронной загрузки)
            attachButtonEvents();
            setTimeout(attachButtonEvents, 500);
            setTimeout(attachButtonEvents, 1000);
            
            // Остановка автоплея при наведении
            const sliderContainer = document.getElementById('heroSliderAfisha');
            if (sliderContainer) {
                sliderContainer.addEventListener('mouseenter', stopAutoPlay);
                sliderContainer.addEventListener('mouseleave', startAutoPlay);
            }
            
            console.log('✅ Слайдер успешно инициализирован!');
        }
    }
    
    // Запускаем инициализацию
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initWhenReady, 300);
        });
    } else {
        setTimeout(initWhenReady, 300);
    }
    
})();