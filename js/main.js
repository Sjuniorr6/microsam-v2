document.addEventListener('DOMContentLoaded', function () {
  
  // Carrossel sincronizado: banner + cards + carousel visual
  (function initSyncedCarousel(){
    const carousel = document.querySelector('#visual .visual-carousel');
    const dotsWrap = document.querySelector('#visual .visual-dots');
    const bannerImg = document.querySelector('.banner-img');
    const leftColumn = document.querySelector('.left-column');
    
    if (!carousel || !dotsWrap) {
      console.log('Carousel elements not found');
      return;
    }

    // Dados sincronizados: imagem + conteúdo do card
    const slides = [
      {
        img: 'img/datacenter2.jpg',
        title: 'Conheça a MicroSan',
        content: `
          <p>A MicroSan Informática é uma empresa de comércio de equipamentos que cria e desenvolve soluções e inovações, que visa fornecer um trabalho plenamente satisfatório, tanto ao cliente físico como ao jurídico, atuando de forma rentável com redução de custos e melhores resultados para nossos clientes.</p>
          <h3>Conhecimento técnico e visão estratégica</h3>
          <p>A empresa reúne ao longo de sua história experiência com relação aos avanços tecnológicos, inovação de sistemas e desenvolvimento de políticas sustentáveis. Isso aliado à qualidade e visão de mercado, faz da MicroSan um diferencial importante no país.</p>
        `
      },
      {
        img: 'img/data1.jpg', 
        title: 'Nossa História',
        content: `
          <p>Presente no mercado desde 1998, a MicroSan está localizada em São Paulo com sede própria e atuando constantemente no aprimoramento na Gestão de Serviços de TI.</p>
          <p>Somos reconhecidos pela qualidade, comprometimento, profissionais especializados e por atender aos clientes em missões críticas juntamente com nossos parceiros a nível Brasil o que possibilita excelência e agilidade em nosso atendimento.</p>
          <h3>Nossos diferenciais</h3>
          <p>Diante de um cenário onde agilidade, competitividade e sucesso dependem dos diferenciais de uma corporação, a MicroSan preza a qualidade e fidelidade junto a nossos clientes.</p>
        `
      },
      {
        img: 'img/fisico.jpg',
        title: 'Serviços e Soluções',
        content: `
          <h3>Locação de Equipamentos</h3>
          <p>A MicroSan Informática possui um estoque de produtos para locação à disposição. Entre as vantagens: maior facilidade na homologação de sistemas e projetos, multiplicação das oportunidades, otimização dos processos internos.</p>
          <p><strong>Disponível:</strong> servidores, nobreaks, racks — DELL/HP/IBM/ORACLE-SUN/FUJITSU. Nobreaks APC. Racks APC/DELL/HP/IBM/EMC.</p>
          <h3>Manutenção e Suporte</h3>
          <p>A MicroSan atua na manutenção de servidores, parts e peças, racks e nobreaks. Fazemos upgrade de controladoras, atualização de firmware/BIOS, higienização de sistemas de exaustão.</p>
        `
      }
    ];

    // Clear and setup carousel HTML
    carousel.innerHTML = '';
    dotsWrap.innerHTML = '';
    
    // Create image slides
    slides.forEach((slide, i) => {
      const img = document.createElement('img');
      img.className = 'v-slide';
      img.src = slide.img;
      img.alt = `Visual ${i+1}`;
      img.style.cssText = `
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        opacity: 0;
        transition: opacity 0.5s cubic-bezier(0.2, 0.9, 0.2, 1);
      `;
      carousel.appendChild(img);
    });

    const imgSlides = Array.from(carousel.querySelectorAll('.v-slide'));

    // Create or find content container in left column
    let contentSlide = leftColumn.querySelector('.content-slide');
    if (!contentSlide) {
      // Hide existing cards and create new container
      const existingCards = leftColumn.querySelectorAll('.institucional-card');
      existingCards.forEach(card => card.style.display = 'none');
      
      contentSlide = document.createElement('div');
      contentSlide.className = 'content-slide institucional-card';
      leftColumn.appendChild(contentSlide);
    }
    
    // Style content container
    contentSlide.style.cssText = `
      background: var(--card);
      padding: 20px;
      border-radius: 10px;
      border: 1px solid rgba(15,23,36,0.05);
      box-shadow: 0 4px 12px rgba(2,6,23,0.06);
      min-height: 400px;
      transition: opacity 0.5s ease, transform 0.5s ease;
      display: block;
      position: relative;
    `;

    // Criar controles de navegação no card de conteúdo
    const controlsContainer = document.createElement('div');
    controlsContainer.style.cssText = `
      position: absolute;
      top: 20px;
      right: 20px;
      display: flex;
      gap: 8px;
      z-index: 10;
    `;

    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '‹';
    prevBtn.type = 'button';
    prevBtn.style.cssText = `
      width: 32px;
      height: 32px;
      border: 1px solid rgba(15,23,36,0.1);
      background: rgba(255,255,255,0.9);
      border-radius: 50%;
      cursor: pointer;
      font-size: 18px;
      font-weight: bold;
      color: var(--primary);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      backdrop-filter: blur(4px);
    `;

    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '›';
    nextBtn.type = 'button';
    nextBtn.style.cssText = prevBtn.style.cssText;

    // Hover effects for buttons
    [prevBtn, nextBtn].forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        btn.style.background = 'var(--primary)';
        btn.style.color = '#fff';
        btn.style.transform = 'scale(1.05)';
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.background = 'rgba(255,255,255,0.9)';
        btn.style.color = 'var(--primary)';
        btn.style.transform = 'scale(1)';
      });
    });

    controlsContainer.appendChild(prevBtn);
    controlsContainer.appendChild(nextBtn);
    contentSlide.appendChild(controlsContainer);

    let idx = 0;

    // Create dots
    slides.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.style.cssText = `
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: none;
        background: rgba(15,23,36,0.15);
        cursor: pointer;
        padding: 0;
        transition: all 0.2s ease;
        margin: 0 4px;
      `;
      
      if (i === 0) {
        btn.classList.add('active');
        btn.style.background = 'var(--primary)';
        btn.style.transform = 'scale(1.1)';
      }
      
      btn.addEventListener('click', () => go(i));
      dotsWrap.appendChild(btn);
    });
    
    const dots = Array.from(dotsWrap.children);

    function updateContent(i) {
      const slide = slides[i];
      contentSlide.style.opacity = '0.3';
      contentSlide.style.transform = 'translateY(10px)';
      
      setTimeout(() => {
        contentSlide.innerHTML = `
          <h2 style="margin:0 0 12px 0;font-weight:700;font-size:18px;color:var(--text)">${slide.title}</h2>
          <div style="color:var(--muted);line-height:1.6;font-size:14px">${slide.content}</div>
        `;
        
        // Re-adicionar controles após atualizar conteúdo
        contentSlide.appendChild(controlsContainer);
        
        contentSlide.style.opacity = '1';
        contentSlide.style.transform = 'translateY(0)';
      }, 250);
    }

    function go(i) {
      if (i === idx) return;
      
      // Hide current image
      if (imgSlides[idx]) {
        imgSlides[idx].style.opacity = '0';
      }
      if (dots[idx]) {
        dots[idx].classList.remove('active');
        dots[idx].style.background = 'rgba(15,23,36,0.15)';
        dots[idx].style.transform = 'scale(1)';
      }
      
      // Show new image
      idx = i;
      if (imgSlides[idx]) {
        imgSlides[idx].style.opacity = '1';
      }
      if (dots[idx]) {
        dots[idx].classList.add('active');
        dots[idx].style.background = 'var(--primary)';
        dots[idx].style.transform = 'scale(1.1)';
      }
      
      // Update banner
      if (bannerImg && slides[idx]) {
        bannerImg.style.transition = 'opacity 0.3s ease';
        bannerImg.style.opacity = '0.7';
        setTimeout(() => {
          bannerImg.src = slides[idx].img;
          bannerImg.style.opacity = '1';
        }, 150);
      }
      
      // Update content
      updateContent(i);
    }

    function goNext() {
      go((idx + 1) % slides.length);
    }

    function goPrev() {
      go((idx - 1 + slides.length) % slides.length);
    }

    // Event listeners para os controles
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      goNext();
      resetAutoplay();
    });

    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      goPrev();
      resetAutoplay();
    });

    // Initialize first slide
    if (imgSlides.length > 0) {
      imgSlides[0].style.opacity = '1';
      updateContent(0);
      
      // Set initial banner
      if (bannerImg && slides[0]) {
        bannerImg.src = slides[0].img;
      }
    }

    // Autoplay management
    let timer;
    
    function startAutoplay() {
      timer = setInterval(() => {
        goNext();
      }, 24000); // 24 segundos
    }

    function stopAutoplay() {
      clearInterval(timer);
    }

    function resetAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    startAutoplay();
    
    // Pause on hover
    if (carousel) {
      carousel.addEventListener('mouseenter', stopAutoplay);
      carousel.addEventListener('mouseleave', startAutoplay);
    }

    if (contentSlide) {
      contentSlide.addEventListener('mouseenter', stopAutoplay);
      contentSlide.addEventListener('mouseleave', startAutoplay);
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        goPrev();
        resetAutoplay();
      } else if (e.key === 'ArrowRight') {
        goNext();
        resetAutoplay();
      }
    });

    console.log('Synced carousel initialized with', slides.length, 'slides');
  })();

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});