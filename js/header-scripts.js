/**
 * Общая логика хедера и футера
 * Вызывается после подгрузки компонентов
 */

function initHeaderScripts() {
    // ===== Десктоп: выпадающее меню "⋯" =====
    const dotsIcon = document.getElementById('dotsIcon');
    const closeIcon = document.getElementById('closeIcon');
    const extraRow = document.getElementById('extraMenuRow');
    
    function openExtraMenu() {
        extraRow?.classList.add('open');
        if (dotsIcon) dotsIcon.style.display = 'none';
        if (closeIcon) closeIcon.style.display = 'inline-flex';
    }
    function closeExtraMenu() {
        extraRow?.classList.remove('open');
        if (dotsIcon) dotsIcon.style.display = 'inline-flex';
        if (closeIcon) closeIcon.style.display = 'none';
    }
    dotsIcon?.addEventListener('click', openExtraMenu);
    closeIcon?.addEventListener('click', closeExtraMenu);
    
    // ===== Мобильное меню =====
    const burgerIcon = document.getElementById('burgerIcon');
    const mobileNav = document.getElementById('mobileNav');
    const overlay = document.getElementById('overlay');
    const closeMobileBtn = document.getElementById('closeMobileMenu');
    
    function openMobileMenu() {
        mobileNav?.classList.add('open');
        overlay?.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.body.classList.add('menu-open');
    }
    function closeMobileMenu() {
        mobileNav?.classList.remove('open');
        overlay?.classList.remove('active');
        document.body.style.overflow = '';
        document.body.classList.remove('menu-open');
    }
    
    burgerIcon?.addEventListener('click', openMobileMenu);
    closeMobileBtn?.addEventListener('click', closeMobileMenu);
    overlay?.addEventListener('click', closeMobileMenu);
    
    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav?.classList.contains('open')) {
            closeMobileMenu();
        }
    });
    
    // ===== Подписка на новости (футер) =====
    const subscribeBtn = document.getElementById('subscribeBtn');
    const consentCheckbox = document.getElementById('consentCheckbox');
    const consentError = document.getElementById('consentError');
    
    subscribeBtn?.addEventListener('click', () => {
        if (!consentCheckbox?.checked) {
            if (consentError) {
                consentError.style.display = 'block';
                setTimeout(() => consentError.style.display = 'none', 2500);
            }
            return;
        }
        const email = document.getElementById('subscribeEmail')?.value;
        if (email) {
            alert('✅ Спасибо за подписку!');
            document.getElementById('subscribeEmail').value = '';
            consentCheckbox.checked = false;
        }
    });
    
    // ===== Форма "Заказчикам" =====
    const clientForm = document.getElementById('clientFormMain');
    clientForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('✅ Заявка отправлена! Мы свяжемся с вами.');
        clientForm.reset();
    });
}

// Экспортируем функцию глобально
window.initHeaderScripts = initHeaderScripts;