// Espera o conteúdo da página carregar para executar TODOS os scripts
document.addEventListener('DOMContentLoaded', () => {

    /**
     * ATUALIZAÇÃO DINÂMICA DO ANO NO RODAPÉ
     */
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    /**
     * ANIMAÇÕES DE SCROLL PARA OS PAINÉIS
     */
    const contentPanels = document.querySelectorAll('.content-panel');
    const panelObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                panelObserver.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1 });

    contentPanels.forEach(panel => {
        panelObserver.observe(panel);
    });

    /**
     * ANIMAÇÃO DOS MEDIDORES DE IDIOMAS
     */
    const medidores = document.querySelectorAll('.grafico-circular');
    const languageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const medidor = entry.target;
                const percentualAlvo = parseInt(medidor.dataset.percent, 10);
                const textoPercentual = medidor.querySelector('.percentual');
                
                medidor.style.setProperty('--p', percentualAlvo);

                let valorAtual = 0;
                const animacao = setInterval(() => {
                    if (valorAtual >= percentualAlvo) {
                        clearInterval(animacao);
                        textoPercentual.textContent = `${percentualAlvo}%`;
                        return;
                    }
                    valorAtual++;
                    textoPercentual.textContent = `${valorAtual}%`;
                }, 20);

                observer.unobserve(medidor);
            }
        });
    }, { threshold: 0.5 });

    medidores.forEach(medidor => {
        languageObserver.observe(medidor);
    });

    /**
     * LÓGICA PARA EMBARALHAR OS PROJETOS (SEMPRE)
     */
    const projectWrapper = document.querySelector('.project-swiper .swiper-wrapper');
    if (projectWrapper) {
        const slides = Array.from(projectWrapper.children);
        for (let i = slides.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [slides[i], slides[j]] = [slides[j], slides[i]];
        }
        slides.forEach(slide => projectWrapper.appendChild(slide));
    }

    /**
     * LÓGICA PARA EMBARALHAR OS LIVROS (APENAS NO MOBILE)
     */
    if (window.innerWidth < 768) {
        const bookWrapper = document.querySelector('.book-swiper .swiper-wrapper');
        if (bookWrapper) {
            const slides = Array.from(bookWrapper.children);
            for (let i = slides.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [slides[i], slides[j]] = [slides[j], slides[i]];
            }
            slides.forEach(slide => bookWrapper.appendChild(slide));
        }
    }


    /**
     * INICIALIZAÇÃO DO SWIPER.JS PARA PROJETOS
     */
    const projectSwiper = new Swiper('.project-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 10000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        pagination: {
          el: '#projetos .swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          768: { slidesPerView: 2, spaceBetween: 30 },
          1024: { slidesPerView: 3, spaceBetween: 30, loop: false }
        }
    });

    /**
     * INICIALIZAÇÃO DO SWIPER.JS PARA LIVROS
     */
    const bookSwiper = new Swiper('.book-swiper', {
        loop: true,
        grabCursor: true,
        pagination: {
          el: '#repertorio .swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '#repertorio .swiper-button-next',
          prevEl: '#repertorio .swiper-button-prev',
        },
        breakpoints: {
          320: { slidesPerView: 1.3, spaceBetween: 15 },
          500: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 20, loop: false },
          1024: { slidesPerView: 4, spaceBetween: 25, loop: false }
        }
    });

});