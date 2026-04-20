
/**
 * Загрузчик компонентов: хедер, футер, слайдер
 * Автоматически определяет путь для вложенных страниц
 */

(async function loadComponents() {
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    
    const getBasePath = () => {
        const path = window.location.pathname;
        const depth = (path.match(/\//g) || []).length - 1;
        return depth > 1 ? '../'.repeat(depth - 1) : './';
    };
    
    const basePath = getBasePath();
    
    try {
        // 1. Загрузка хедера
        const headerRes = await fetch(`${basePath}components/header.html`);
        if (!headerRes.ok) throw new Error('header.html');
        document.getElementById('site-header').innerHTML = await headerRes.text();
        
        // 2. Загрузка футера
        const footerRes = await fetch(`${basePath}components/footer.html`);
        if (!footerRes.ok) throw new Error('footer.html');
        document.getElementById('site-footer').innerHTML = await footerRes.text();
        
		// 3. 🔥 Загрузка hero-слайдера (для главной И афиши)
		if (currentPage === 'index' || currentPage === 'affiche') {
			const sliderRes = await fetch(`${basePath}components/hero-slider.html`);
			if (!sliderRes.ok) throw new Error('hero-slider.html');
			const sliderHTML = await sliderRes.text();
			
			// Вставляем слайдер ВНУТРЬ заглушки #site-hero-slider
			const sliderPlaceholder = document.getElementById('site-hero-slider');
			if (sliderPlaceholder) {
				sliderPlaceholder.innerHTML = sliderHTML;
			}
		}
        
        // 4. Подсветка активной ссылки в меню
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.dataset.page === currentPage) {
                link.classList.add('active');
            }
        });
        
		// 5. 🔥 Инициализация скриптов (после вставки компонентов)
		setTimeout(() => {
			if (typeof window.initHeaderScripts === 'function') {
				window.initHeaderScripts();
			}
			// 🔑 Инициализируем слайдер и на главной, и на афише
			if ((currentPage === 'index' || currentPage === 'affiche') && 
				typeof window.initHeroSlider === 'function') {
				window.initHeroSlider();
			}
		}, 50);
        
    } catch (err) {
        console.error('❌ Ошибка загрузки компонентов:', err.message);
        const placeholder = '<div style="padding:20px;text-align:center;color:#E8454D;background:#fff;border-radius:8px;margin:20px">⚠️ Не удалось загрузить компонент</div>';
        if (document.getElementById('site-header')) document.getElementById('site-header').innerHTML = placeholder;
        if (document.getElementById('site-footer')) document.getElementById('site-footer').innerHTML = placeholder;
    }
})();