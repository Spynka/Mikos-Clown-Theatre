// js/loader-animation.js
class PageLoader {
  constructor(options = {}) {
    this.options = {
      removeAfter: options.removeAfter || 300,   // только время на fade-out
      loaderId: options.loaderId || 'loaderOverlay',
      contentId: options.contentId || 'mainContent',
      ...options
    };
    
    this.loader = null;
    this.content = null;
    this.animationActive = false;
    this.animationFrameId = null;
    this.isFinished = false;
    this._loadHandler = null;
  }

  createLoaderHTML() {
    return `
      <div class="loader-overlay" id="${this.options.loaderId}">
        <div class="loader-logo-container">
          <img class="logo-img" src="SVG/logo-2.svg" alt="Знак" loading="eager">
          <img class="logo-img" src="SVG/logo.svg" alt="Логотип" loading="eager">
        </div>
        <div class="juggling-stage" id="jugglingStage">
          <div class="ball red" id="ball1"></div>
          <div class="ball blue" id="ball2"></div>
          <div class="ball light" id="ball3"></div>
        </div>
        <div class="loader-caption">
          щас загрузится
          <div class="dots"><span></span><span></span><span></span></div>
        </div>
      </div>
    `;
  }

  injectStyles() {
    if (document.getElementById('loader-animation-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'loader-animation-styles';
    styles.textContent = `
      .loader-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #FFFFFF;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 10001;
        transition: opacity 0.3s ease-out, visibility 0.3s ease-out;
        padding: 0 !important;
        margin: 0 !important;
        box-sizing: border-box !important;
      }

      .loader-overlay.fade-out {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
      }

      .loader-logo-container {
        margin-bottom: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
      }

      .loader-logo-container .logo-img {
        height: 56px;
        width: auto;
        object-fit: contain;
      }

      .juggling-stage {
        position: relative;
        width: 200px;
        height: 180px;
        margin: 0 auto 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: visible;
      }

      .ball {
        position: absolute;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: 3px solid #1A1718;
        will-change: transform;
        transition: none;
        top: 0;
        left: 0;
      }

      .ball.red { background: #E8454D; box-shadow: 4px 4px 0 #1A1718; }
      .ball.blue { background: #2A3D5E; box-shadow: 4px 4px 0 #1A1718; }
      .ball.light { background: #DCE4F0; box-shadow: 4px 4px 0 #1A1718; }

      .loader-caption {
        font-family: 'Unbounded', sans-serif;
        font-weight: 600;
        font-size: 14px;
        color: #5A5556;
        letter-spacing: 0.8px;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 0;
        padding-top: 8px;
      }

      .loader-caption .dots {
        display: inline-flex;
        gap: 4px;
      }

      .loader-caption .dots span {
        width: 5px;
        height: 5px;
        background: #E8454D;
        border-radius: 50%;
        animation: dotPulse 1.2s infinite ease-in-out;
      }

      .loader-caption .dots span:nth-child(2) { animation-delay: 0.2s; }
      .loader-caption .dots span:nth-child(3) { animation-delay: 0.4s; }

      @keyframes dotPulse {
        0%, 80%, 100% { opacity: 0.2; transform: scale(0.7); }
        40% { opacity: 1; transform: scale(1.4); }
      }

      body.loader-active .shop-container:not(.visible),
      body.loader-active .page-content:not(.visible),
      body.loader-active [data-content-wrapper]:not(.visible) {
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.4s ease, transform 0.4s ease;
        pointer-events: none;
      }

      body:not(.loader-active) .shop-container,
      body:not(.loader-active) .page-content,
      body:not(.loader-active) [data-content-wrapper] {
        opacity: 1 !important;
        transform: translateY(0) !important;
        pointer-events: auto !important;
      }

      .shop-container.visible,
      .page-content.visible,
      [data-content-wrapper].visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
        pointer-events: auto !important;
      }

      body.loader-active {
        overflow: hidden !important;
        padding-top: 0 !important;
      }

      @media (max-width: 500px) {
        .ball { width: 40px; height: 40px; border-width: 2px; }
        .juggling-stage { width: 160px; height: 160px; margin-bottom: 28px; }
        .loader-logo-container .logo-img { height: 44px; }
        .loader-logo-container { gap: 14px; margin-bottom: 40px; }
        .loader-caption { font-size: 12px; }
      }
    `;
    document.head.appendChild(styles);
  }

  initJuggling() {
    const stage = document.getElementById('jugglingStage');
    const ball1 = document.getElementById('ball1');
    const ball2 = document.getElementById('ball2');
    const ball3 = document.getElementById('ball3');

    if (!stage || !ball1 || !ball2 || !ball3) return;

    this.animationActive = true;
    const centerX = stage.offsetWidth / 2;
    const centerY = stage.offsetHeight / 2;
    const radiusX = 55;
    const radiusY = 50;
    let angle = 0;
    const phase1 = 0;
    const phase2 = (2 * Math.PI) / 3;
    const phase3 = (4 * Math.PI) / 3;
    const speed = 0.075;

    const setBallPosition = (ball, currentAngle) => {
      const halfWidth = ball.offsetWidth / 2;
      const halfHeight = ball.offsetHeight / 2;
      const x = radiusX * Math.cos(currentAngle);
      const y = radiusY * Math.sin(currentAngle * 2);
      const left = centerX + x - halfWidth;
      const top = centerY + y - halfHeight;
      
      ball.style.transform = `translate(${left}px, ${top}px)`;
      
      const scaleFactor = 0.88 + 0.24 * ((Math.sin(currentAngle * 2) + 1) / 2);
      ball.style.width = `${48 * scaleFactor}px`;
      ball.style.height = `${48 * scaleFactor}px`;
    };

    const animate = () => {
      if (!this.animationActive) return;
      angle = (angle + speed) % (2 * Math.PI);
      
      setBallPosition(ball1, angle + phase1);
      setBallPosition(ball2, angle + phase2);
      setBallPosition(ball3, angle + phase3);
      
      this.animationFrameId = requestAnimationFrame(animate);
    };

    setBallPosition(ball1, phase1);
    setBallPosition(ball2, phase2);
    setBallPosition(ball3, phase3);
    
    this.animationFrameId = requestAnimationFrame(animate);
  }

  finish() {
    if (!this.animationActive || this.isFinished) return;
    
    this.animationActive = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    
    // Немедленно скрываем лоадер (без задержки на физику падения)
    this.hideLoader();
  }

  hideLoader() {
    if (this.isFinished) return;
    this.isFinished = true;
    
    document.body.classList.remove('loader-active');
    document.body.style.overflow = '';
    
    const showAndFix = (el) => {
      if (!el) return;
      el.classList.add('visible');
      el.style.opacity = '1';
      el.style.pointerEvents = 'auto';
      el.style.setProperty('transform', 'none', 'important');
      el.style.setProperty('will-change', 'auto', 'important');
    };
    
    showAndFix(this.content);
    
    const shopContainer = document.querySelector('.shop-container');
    if (shopContainer && shopContainer !== this.content) {
      showAndFix(shopContainer);
      shopContainer.style.setProperty('overflow', 'visible', 'important');
      shopContainer.style.setProperty('overflow-x', 'visible', 'important');
      shopContainer.style.setProperty('overflow-y', 'visible', 'important');
    }
    
    document.body.style.background = '#FFFFFF';
    
    if (this.loader) {
      this.loader.classList.add('fade-out');
    }
    
    setTimeout(() => {
      if (this.loader && this.loader.parentNode) {
        this.loader.remove();
        this.loader = null;
      }
      this.dispatchEvent('loaderHidden');
      this.destroy();
    }, this.options.removeAfter);
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (this._loadHandler) {
      window.removeEventListener('load', this._loadHandler);
      this._loadHandler = null;
    }
    this.animationActive = false;
  }

  dispatchEvent(name) {
    window.dispatchEvent(new CustomEvent(name, { detail: { loader: this } }));
  }

  init(contentSelector = null) {
    // Проверяем, загружена ли страница уже
    const isAlreadyLoaded = document.readyState === 'complete';
    
    // Находим контент, который нужно показать после загрузки
    if (contentSelector) {
      this.content = document.querySelector(contentSelector);
    }
    if (!this.content) {
      this.content = document.getElementById(this.options.contentId);
    }
    if (!this.content) {
      this.content = document.querySelector('.page-content') ||
                     document.querySelector('[data-content-wrapper]');
    }
    if (!this.content) {
      this.content = document.querySelector('.shop-container');
    }
    if (this.content && this.content.classList.contains('shop-container')) {
      const mainContent = this.content.querySelector('#mainContent');
      if (mainContent) this.content = mainContent;
    }
    
    // Если страница уже загружена и контент есть – не показываем лоадер совсем
    if (isAlreadyLoaded && this.content) {
      console.log('PageLoader: страница уже загружена, лоадер не нужен');
      this.showContentImmediately();
      return this;
    }
    
    // Иначе – показываем лоадер и ждём события load
    if (document.getElementById(this.options.loaderId)) {
      console.warn('PageLoader: лоадер уже существует в DOM');
      return this;
    }
    
    this.injectStyles();
    
    document.body.classList.add('loader-active');
    document.body.style.overflow = 'hidden';
    
    const temp = document.createElement('div');
    temp.innerHTML = this.createLoaderHTML();
    const loaderElement = temp.firstElementChild;
    document.body.insertBefore(loaderElement, document.body.firstChild);
    
    this.loader = document.getElementById(this.options.loaderId);
    
    if (!this.content) {
      console.warn('PageLoader: контент не найден, скрываем лоадер');
      setTimeout(() => this.hideLoader(), 100);
      return this;
    }
    
    console.log('PageLoader: ожидание полной загрузки страницы');
    setTimeout(() => this.initJuggling(), 100);
    
    this._loadHandler = () => {
      console.log('PageLoader: страница полностью загружена – скрываем лоадер');
      this.finish();
    };
    window.addEventListener('load', this._loadHandler);
    
    // Если load уже произошёл между проверкой и добавлением слушателя (гонка)
    if (document.readyState === 'complete') {
      this._loadHandler();
    }
    
    return this;
  }
  
  showContentImmediately() {
    // Убираем блокировку скролла и делаем контент видимым без лоадера
    document.body.classList.remove('loader-active');
    document.body.style.overflow = '';
    if (this.content) {
      this.content.classList.add('visible');
      this.content.style.opacity = '1';
      this.content.style.pointerEvents = 'auto';
      this.content.style.setProperty('transform', 'none', 'important');
    }
    const shopContainer = document.querySelector('.shop-container');
    if (shopContainer) {
      shopContainer.classList.add('visible');
      shopContainer.style.opacity = '1';
      shopContainer.style.setProperty('overflow', 'visible', 'important');
    }
    this.dispatchEvent('loaderHidden');
  }
}

window.PageLoader = PageLoader;