/**
 * Загрузчик компонентов: хедер, футер, слайдер, модалки
 * Лоадер показывается только при необходимости и скрывается сразу после полной загрузки.
 */

(async function loadComponents() {
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    
    const getBasePath = () => {
        const path = window.location.pathname;
        const depth = (path.match(/\//g) || []).length - 1;
        return depth > 1 ? '../'.repeat(depth - 1) : './';
    };
    const basePath = getBasePath();
    
    // Принудительное отображение контента (без лоадера)
    const showContentImmediately = () => {
        let content = document.querySelector('.page-content, [data-page-content]');
        if (!content) content = document.querySelector('.shop-container');
        if (!content || content.classList.contains('shop-container')) {
            const mainContent = document.getElementById('mainContent');
            if (mainContent) content = mainContent;
        }
        if (content) {
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
            content.style.pointerEvents = 'auto';
            content.classList.add('visible');
        }
        const existingLoader = document.getElementById('loaderOverlay');
        if (existingLoader) existingLoader.remove();
        document.body.classList.remove('loader-active');
        document.body.style.overflow = '';
    };
    
    // Инициализация лоадера (без minDuration, без лишних таймеров)
    const initLoader = () => {
        if (document.getElementById('loaderOverlay')) return null;
        // При возврате по истории – сразу показываем контент
        if (window.performance?.navigation?.type === 2) {
            showContentImmediately();
            return null;
        }
        if (typeof PageLoader !== 'undefined') {
            const loader = new PageLoader({
                removeAfter: 300,
                contentSelector: '.shop-container, .page-content, [data-page-content]',
                loaderId: 'loaderOverlay'
            });
            window.__pageLoader = loader;
            return loader.init();
        } else {
            showContentImmediately();
            return null;
        }
    };
    
    // Загрузка одного компонента
    const loadComponent = async (selector, url) => {
        const placeholder = document.querySelector(selector);
        if (!placeholder) return null;
        const response = await fetch(`${basePath}components/${url}`);
        if (!response.ok) throw new Error(`${url} (${response.status})`);
        placeholder.innerHTML = await response.text();
        return placeholder;
    };
    
    try {
        const loaderInstance = initLoader();  // возможно, покажет лоадер
        
        // Параллельно загружаем все компоненты
        const results = await Promise.allSettled([
            loadComponent('#site-header', 'header.html'),
            loadComponent('#site-footer', 'footer.html'),
            loadComponent('#site-modals', 'modals.html'),
            (currentPage === 'index' || currentPage === 'affiche')
                ? loadComponent('#site-hero-slider', 'hero-slider.html')
                : Promise.resolve(null)
        ]);
        
        // Обработка ошибок (заглушки)
        if (results.some(r => r.status === 'rejected')) {
            console.warn('Некоторые компоненты не загружены');
            if (!document.querySelector('#site-header')?.innerHTML.trim()) {
                document.querySelector('#site-header').innerHTML = '<div class="error-placeholder">⚠️ Хедер не загружен</div>';
            }
            if (!document.querySelector('#site-footer')?.innerHTML.trim()) {
                document.querySelector('#site-footer').innerHTML = '<div class="error-placeholder">⚠️ Футер не загружен</div>';
            }
        }
        
        // Подсветка активного пункта меню
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.dataset.page === currentPage) link.classList.add('active');
        });
        
        // Инициализация скриптов компонентов
        if (typeof window.initHeaderScripts === 'function') window.initHeaderScripts();
        if ((currentPage === 'index' || currentPage === 'affiche') && typeof window.initHeroSlider === 'function') window.initHeroSlider();
        if (typeof window.initModals === 'function') window.initModals();
        
        // Завершаем лоадер (он сам скроется, как только сработает window.load)
        // Если лоадер был создан, он уже ожидает load. Дополнительных таймаутов нет.
        if (loaderInstance && window.__pageLoader && typeof window.__pageLoader.finish === 'function') {
            // finish() будет вызван при load, но можно и сразу, если контент уже готов
            // Однако лучше положиться на событие load, чтобы дождаться всех изображений.
            // Ничего не делаем – finish вызовется автоматически при load.
        }
    } catch (err) {
        console.error('Ошибка загрузки компонентов:', err);
        if (window.__pageLoader?.finish) window.__pageLoader.finish();
        else showContentImmediately();
    }
    
    // При возврате через кэш браузера
    window.addEventListener('pageshow', (e) => {
        if (e.persisted) {
            const loader = document.getElementById('loaderOverlay');
            if (loader) loader.remove();
            showContentImmediately();
        }
    });
    
    // Страховка на случай, если лоадер завис (3 секунды)
    setTimeout(() => {
        const loader = document.getElementById('loaderOverlay');
        if (loader && !loader.classList.contains('fade-out')) {
            console.warn('Принудительное скрытие лоадера');
            if (window.__pageLoader?.finish) window.__pageLoader.finish();
            else { loader.remove(); showContentImmediately(); }
        }
    }, 3000);
})();