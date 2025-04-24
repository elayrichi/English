document.addEventListener('DOMContentLoaded', function() {
    // Анимация сервисов при прокрутке
    const serviceCards = document.querySelectorAll('.service-card');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Функция для проверки видимости элемента
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Функция для анимации элементов
    function animateElements() {
        serviceCards.forEach((card, index) => {
            if (isElementInViewport(card)) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 150 * index);
            }
        });
        
        portfolioItems.forEach((item, index) => {
            if (isElementInViewport(item)) {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 150 * index);
            }
        });
    }
    
    // Запускаем при загрузке
    animateElements();
    
    // И при прокрутке
    window.addEventListener('scroll', animateElements);
    
    // Плавная прокрутка для якорей
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Ленивая загрузка изображений
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '200px 0px'
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
});