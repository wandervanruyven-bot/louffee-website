document.addEventListener('DOMContentLoaded', () => {

    // Language switching
    const langSwitch = document.getElementById('langSwitch');
    let currentLang = 'nl';

    langSwitch.addEventListener('click', (e) => {
        const option = e.target.closest('.lang-switch__option');
        if (!option || option.dataset.lang === currentLang) return;

        currentLang = option.dataset.lang;

        langSwitch.querySelectorAll('.lang-switch__option').forEach(opt => {
            opt.classList.toggle('active', opt.dataset.lang === currentLang);
        });

        document.querySelectorAll('[data-nl][data-en]').forEach(el => {
            el.textContent = el.dataset[currentLang];
        });

        document.documentElement.lang = currentLang;
    });

    // Navigation scroll effect
    const nav = document.getElementById('nav');
    const onScroll = () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobile menu
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('open');
            navLinks.classList.remove('open');
        });
    });

    // Menu tabs
    const menuTabs = document.querySelectorAll('.menu__tab');
    const menuItems = document.querySelectorAll('.menu__item');

    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.dataset.category;

            menuTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            menuItems.forEach(item => {
                if (item.dataset.category === category) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // Scroll reveal
    const reveals = document.querySelectorAll('.section__label, .section__title, .about__image, .about__text, .about__stats, .menu__item, .reviews__card, .contact__detail, .instagram__item');

    reveals.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
