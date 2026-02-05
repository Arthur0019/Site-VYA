document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        
        // Hamburger animation
        const spans = hamburger.querySelectorAll('span');
        if (nav.classList.contains('nav-active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Simple fade-in animation on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.feature-item, .benefit-card, .product-content, .specs-table');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Catalog download with graceful fallback
    const setupCatalogDownload = (selector) => {
        const btn = document.querySelector(selector);
        if (!btn) return;
        const file = btn.getAttribute('href') || 'catalogo_vya.pdf';
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                const res = await fetch(file, { method: 'HEAD' });
                if (res.ok) {
                    const a = document.createElement('a');
                    a.href = file;
                    a.download = 'catalogo_vya.pdf';
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                } else {
                    alert('Catálogo não encontrado no site. Vamos te enviar por e-mail.');
                    window.location.href = 'mailto:contato@vyamotors.com.br?subject=Solicitar%20Cat%C3%A1logo%20VYA%20Motors&body=Olá!%20Gostaria%20de%20receber%20o%20cat%C3%A1logo%20atual.%20Obrigado.';
                }
            } catch (err) {
                alert('Não foi possível baixar o catálogo agora. Vamos te enviar por e-mail.');
                window.location.href = 'mailto:contato@vyamotors.com.br?subject=Solicitar%20Cat%C3%A1logo%20VYA%20Motors&body=Olá!%20Gostaria%20de%20receber%20o%20cat%C3%A1logo%20atual.%20Obrigado.';
            }
        });
    };

    setupCatalogDownload('.btn-cta');
    setupCatalogDownload('.btn-cta-hero');
});
