(function() {
    // 1. Подсветка активного пункта меню (жирный чёрный)
    function setActiveMenu() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const allLinks = document.querySelectorAll('.nav-menu a, .extra-nav-list a, .mobile-nav a');
        allLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath || (currentPath === '' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // 2. Мобильное меню (выезд справа, крестик левее)
    function initMobileMenu() {
        const burgerIcon = document.getElementById('burgerIcon');
        const mobileNav = document.getElementById('mobileNav');
        const overlay = document.getElementById('overlay');
        const closeMobileBtn = document.getElementById('closeMobileMenu');
        if (!burgerIcon || !mobileNav || !overlay) return;

        function openMobileMenu() {
            mobileNav.classList.add('open');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        function closeMobileMenu() {
            mobileNav.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        burgerIcon.addEventListener('click', openMobileMenu);
        if (closeMobileBtn) closeMobileBtn.addEventListener('click', closeMobileMenu);
        overlay.addEventListener('click', closeMobileMenu);
    }

    // 3. Дополнительное меню (три точки)
    function initExtraMenu() {
        const dotsIcon = document.getElementById('dotsIcon');
        const closeIcon = document.getElementById('closeIcon');
        const extraRow = document.getElementById('extraMenuRow');
        if (!dotsIcon || !closeIcon || !extraRow) return;
        function openExtraMenu() {
            extraRow.classList.add('open');
            dotsIcon.style.display = 'none';
            closeIcon.style.display = 'inline-flex';
        }
        function closeExtraMenu() {
            extraRow.classList.remove('open');
            dotsIcon.style.display = 'inline-flex';
            closeIcon.style.display = 'none';
        }
        dotsIcon.addEventListener('click', openExtraMenu);
        closeIcon.addEventListener('click', closeExtraMenu);
    }

    // 4. Подписка на новости
    function initNewsletter() {
        const subscribeBtn = document.getElementById('subscribeBtn');
        if (subscribeBtn) {
            subscribeBtn.addEventListener('click', () => {
                const chk = document.getElementById('consentCheckbox');
                const err = document.getElementById('consentError');
                if (!chk || !chk.checked) {
                    if (err) {
                        err.style.display = 'block';
                        setTimeout(() => err.style.display = 'none', 2500);
                    }
                } else {
                    alert('Спасибо за подписку!');
                    const emailInput = document.getElementById('subscribeEmail');
                    if (emailInput) emailInput.value = '';
                    chk.checked = false;
                }
            });
        }
    }

    // 5. Кнопки "Купить билет" и "Заказать шоу"
    function initButtons() {
        const ticketBtns = document.querySelectorAll('.footer-btn-primary, .buy-ticket-btn');
        ticketBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                alert('Билеты скоро в продаже');
            });
        });
        const secondaryBtn = document.querySelector('.footer-btn-secondary');
        if (secondaryBtn) {
            secondaryBtn.addEventListener('click', () => alert('Заказ шоу: свяжитесь с нами по телефону'));
        }
    }

    // Запуск всех функций после загрузки страницы
    document.addEventListener('DOMContentLoaded', function() {
        setActiveMenu();
        initMobileMenu();
        initExtraMenu();
        initNewsletter();
        initButtons();
    });
})();