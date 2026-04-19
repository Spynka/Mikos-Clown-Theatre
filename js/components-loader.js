/**
 * Загрузчик хедера и футера через fetch
 * Автоматически определяет путь к компонентам
 */

(async function loadComponents() {
    // Определяем текущую страницу для подсветки активной ссылки
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    
    // Автоматически определяем базовый путь (для вложенных страниц)
    const getBasePath = () => {
        const path = window.location.pathname;
        const depth = (path.match(/\//g) || []).length - 1;
        return depth > 1 ? '../'.repeat(depth - 1) : './';
    };
    
    const basePath = getBasePath();
    
    try {
        // Загрузка хедера
        const headerRes = await fetch(`${basePath}components/header.html`);
        if (!headerRes.ok) throw new Error('header.html');
        const headerHTML = await headerRes.text();
        document.getElementById('site-header').innerHTML = headerHTML;
        
        // Загрузка футера
        const footerRes = await fetch(`${basePath}components/footer.html`);
        if (!footerRes.ok) throw new Error('footer.html');
        const footerHTML = await footerRes.text();
        document.getElementById('site-footer').innerHTML = footerHTML;
        
        // 🔥 Подсветка активной страницы
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.dataset.page === currentPage) {
                link.classList.add('active');
            }
        });
        
        // 🔥 Запуск инициализации скриптов (если функция существует)
        if (typeof window.initHeaderScripts === 'function') {
            window.initHeaderScripts();
        }
        
    } catch (err) {
        console.error('❌ Ошибка загрузки компонентов:', err.message);
        // Фоллбэк: показываем сообщение
        const placeholder = '<div style="padding:20px;text-align:center;color:#E8454D;background:#fff;border-radius:8px;margin:20px">⚠️ Не удалось загрузить меню</div>';
        document.getElementById('site-header').innerHTML = placeholder;
        document.getElementById('site-footer').innerHTML = placeholder;
    }
})();