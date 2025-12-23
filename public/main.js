// Enhanced Main JavaScript with Advanced Features
// Mark document as JS-enabled to allow gated animations/styles
document.documentElement.classList.add('js-enabled');

// Mapeamento de códigos de produtos para uso global (WhatsApp message)
const PRODUCT_CODES = {
  'copo-termico-473': ['41140021', '41140022', '41140023', '41140024'],
  'squeeze-ragnar': ['41140025', '41140026', '41140027', '41140028', '41140029'],
  'squeeze-erald': ['41140030', '41140035', '41140032', '41140033'],
  'copo-quenchpro': ['41140037', '41140038', '41140039'],
  'copo-cuia': ['41140040', '41140041', '41140042'],
  'caneta-clare': ['40240004', '40240005'],
  'caneta-beta-soft': ['40240002', '40240001'],
  'caneta-lyme': ['40240006', '40240007'],
  'caneta-olaf': ['40240009', '40240008'],
  'caneta-caribe': ['40220015'],
  'caneta-elegance': ['40220016', '40220017'],
  'caneta-executiva': ['40220006', '40220005'],
  'caneta-comercial': ['40220001', '40220002', '40220003', '40220004', '40220006', '40220007', '40220008'],
  'caneta-touch': ['40220003', '40220004']
};

// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// Scroll Progress Bar
function updateScrollProgress() {
  const scrollProgress = document.getElementById('scrollProgress');
  if (!scrollProgress) return;
  
  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  
  scrollProgress.style.width = scrollPercent + '%';
}

// Back to Top Button
function initBackToTop() {
  const backToTop = document.getElementById('backToTop');
  if (!backToTop) return;
  
  function toggleBackToTop() {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  }
  
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  window.addEventListener('scroll', toggleBackToTop);
}

// Lazy Loading e Parallax removidos (uso de loading="lazy" nativo e design minimalista)

// Smooth reveal on scroll - enhanced version
function handleReveal(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}

const revealObserver = new IntersectionObserver(handleReveal, { 
  threshold: 0.1,
  rootMargin: '50px 0px -50px 0px'
});

// Service Worker Registration
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered successfully');
      })
      .catch(error => {
        console.log('SW registration failed');
      });
  }
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
  // Existing functionality
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
  
  // Timer de segurança: após 3 segundos, revela todos os elementos não revelados
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.revealed)').forEach(el => {
      el.classList.add('revealed');
    });
  }, 3000);
  
  // Initialize new features
  initBackToTop();
  registerServiceWorker();
  initBlurUp();
  initProductFilters();
  initLightbox();
  initCarousel();
  initScrollSpy();
  initAutoHideHeader();
  initSelectionCounter();
  initCompare();
  initProductDetails();
});

// Scroll event listener for progress bar
window.addEventListener('scroll', updateScrollProgress);

// Current year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Netlify forms: se houve redirect com ?sucesso=1, mostra confirmação
const params = new URLSearchParams(window.location.search);
const form = document.getElementById('orcamento-form');
const formMsg = document.getElementById('formMsg');

if (params.get('sucesso') === '1' && formMsg) {
  formMsg.className = 'mt-6 text-center text-zapGreen bg-zapGreen/10 border border-zapGreen/20 rounded-xl p-4';
  formMsg.textContent = '✅ Obrigado! Recebemos seu pedido e retornaremos em breve.';
  formMsg.classList.remove('hidden');
  showToast('Pedido enviado com sucesso! Retornaremos em breve.');
}

// Smooth scroll enhancement for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerHeight = 0; // header removido
      const targetPosition = target.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      // Header/nav removidos: sem atualização de aria-current/fechamento de menu
    }
  });
});

// Lógica de nav ativo removida (sem header/nav principal)

// Card hover effects minimalistas (controlados por CSS)

// Enhanced form submission with loading states
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML = '<span class="inline-flex items-center"><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Enviando...</span>';
      showToast('Enviando seu pedido...');

      // Monta mensagem para WhatsApp com os campos preenchidos (direcionar para número ZapSign)
      const payload = buildWhatsAppMessage();
      if (payload) {
        const waLink = `https://wa.me/553125666504?text=${payload}`;
        window.open(waLink, '_blank', 'noopener');
      }

      // Re-enable after a delay (in case of errors)
      setTimeout(() => {
        submitButton.disabled = false;
        submitButton.innerHTML = 'Enviar Solicitação de Orçamento';
      }, 5000);
    }

    return false;
  });
}

// Auto-hide Header removido

// Remove blur-up effect when images finish loading
function initBlurUp() {
  const images = Array.from(document.querySelectorAll('img.blur-up'));
  if (!images.length) return;

  images.forEach((img) => {
    const markLoaded = () => img.classList.add('loaded');
    if (img.complete && img.naturalWidth > 0) {
      // Already loaded from cache
      markLoaded();
    } else {
      img.addEventListener('load', markLoaded, { once: true });
      img.addEventListener('error', markLoaded, { once: true });
      // Try decoding for browsers that support it
      if (typeof img.decode === 'function') {
        img.decode().then(markLoaded).catch(() => {});
      }
    }
  });
}

// Filtros de produtos por categoria
function initProductFilters() {
  const toolbar = document.getElementById('productFilter');
  if (!toolbar) return;
  const cards = Array.from(document.querySelectorAll('[data-category]'));
  const searchInput = document.getElementById('productSearch');
  const emptyState = document.getElementById('productEmpty');
  const counts = toolbar.querySelectorAll('[data-count]');

  // Preencher contadores
  const counter = cards.reduce((acc, card) => {
    const cat = card.getAttribute('data-category');
    acc[cat] = (acc[cat] || 0) + 1;
    acc.todos = (acc.todos || 0) + 1;
    return acc;
  }, {});
  counts.forEach(span => {
    const key = span.getAttribute('data-count');
    span.textContent = counter[key] ? `(${counter[key]})` : '';
  });

  function applyFilters() {
    const activeBtn = toolbar.querySelector('button[aria-pressed="true"]');
    const filter = activeBtn ? activeBtn.getAttribute('data-filter') : 'todos';
    const term = (searchInput?.value || '').toLowerCase().trim();
    let visible = 0;

    cards.forEach(card => {
      const cat = card.getAttribute('data-category');
      const name = card.querySelector('h3')?.textContent.toLowerCase() || '';
      const matchesFilter = filter === 'todos' || cat === filter;
      const matchesSearch = !term || name.includes(term) || cat.includes(term);
      const show = matchesFilter && matchesSearch;
      card.style.display = show ? '' : 'none';
      if (show) visible += 1;
    });

    if (emptyState) {
      emptyState.classList.toggle('hidden', visible !== 0);
    }
  }

  toolbar.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-filter]');
    if (!btn) return;

    // Toggle pressed state
    toolbar.querySelectorAll('button[data-filter]').forEach(b => {
      const isActive = b === btn;
      b.setAttribute('aria-pressed', String(isActive));
      b.classList.toggle('bg-zapGreen', isActive);
      b.classList.toggle('text-white', isActive);
      b.classList.toggle('ring-zapGreen', isActive);
      b.classList.toggle('text-zapGray', !isActive);
      b.classList.toggle('ring-gray-200', !isActive);
    });

    applyFilters();
  });

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      applyFilters();
    });
  }

  applyFilters();
}

// Lightbox para imagens dos cards
function initLightbox() {
  const modal = document.getElementById('lightbox');
  const imgEl = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('lightboxClose');
  if (!modal || !imgEl || !closeBtn) return;

  function open(src, alt) {
    imgEl.src = src;
    imgEl.alt = alt || 'Visualização do produto';
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.classList.add('no-scroll');
  }

  function close() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.classList.remove('no-scroll');
    imgEl.src = '';
  }

  // Clique/teclado nas imagens dos cards (Produtos e Destaques)
  document.querySelectorAll('#produtos img, #destaques img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => open(img.src, img.alt));
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(img.src, img.alt);
      }
    });
  });

  closeBtn.addEventListener('click', close);
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}

// Carousel simples com scroll-snap
function initCarousel() {
  const el = document.getElementById('destaquesCarousel');
  const prev = document.getElementById('destaquesPrev');
  const next = document.getElementById('destaquesNext');
  if (!el || !prev || !next) return;

  const step = () => Math.min(400, Math.max(240, el.clientWidth * 0.5));
  prev.addEventListener('click', () => el.scrollBy({ left: -step(), behavior: 'smooth' }));
  next.addEventListener('click', () => el.scrollBy({ left: step(), behavior: 'smooth' }));
}

// Auto-hide header on scroll down, show on scroll up
function initAutoHideHeader() {
  const header = document.querySelector('header');
  if (!header) return;

  let lastY = window.scrollY;
  let ticking = false;
  const threshold = 32;

  const update = () => {
    const currentY = window.scrollY;
    const delta = currentY - lastY;
    const nearTop = currentY < 120;

    if (delta > threshold && !nearTop) {
      header.classList.add('header-hidden');
    } else if (delta < -8 || nearTop) {
      header.classList.remove('header-hidden');
    }

    lastY = currentY;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
}

// Gera mensagem pré-formatada para WhatsApp a partir do formulário
function buildWhatsAppMessage() {
  const nome = document.getElementById('nome')?.value?.trim();
  const empresa = document.getElementById('empresa')?.value?.trim();
  const email = document.getElementById('email')?.value?.trim();
  const telefone = document.getElementById('telefone')?.value?.trim();
  const quantidade = document.getElementById('quantidade')?.value?.trim();
  const mensagem = document.getElementById('mensagem')?.value?.trim();
  // Mapear os produtos do catálogo para buscar o código correto
  let productGalleries = window.productGalleries || {};
  // Se ainda não estiver disponível, tente inicializar a função que popula o mapeamento
  if (!Object.keys(productGalleries).length && typeof initProductDetails === 'function') {
    try {
      initProductDetails();
    } catch (err) {
      console.debug('buildWhatsAppMessage: initProductDetails failed', err);
    }
    productGalleries = window.productGalleries || {};
  }
  const produtos = Array.from(document.querySelectorAll('[data-product-row]'))
    .map(row => {
      const checkbox = row.querySelector('input[type="checkbox"]');
      if (!checkbox || !checkbox.checked) return null;
      const qty = row.querySelector('input[type="number"]')?.value?.trim();
      const name = checkbox.value || checkbox.textContent || '';
      const productId = row.dataset.productId;
      if (!name) return null;
      let code = '';
      // Buscar código do produto no mapeamento atualizado
      if (productGalleries && productGalleries[productId] && productGalleries[productId].productCode) {
        code = productGalleries[productId].productCode;
      } else if (PRODUCT_CODES[productId]) {
        code = PRODUCT_CODES[productId].join('/');
      }
      let codesStr = code ? ` (Cód: ${code})` : '';
      return qty ? `• ${name}${codesStr} — ${qty} un` : `• ${name}${codesStr}`;
    })
    .filter(Boolean);

  const linhas = [
    'Olá, gostaria de um orçamento.',
    nome ? `Nome: ${nome}` : '',
    empresa ? `Empresa: ${empresa}` : '',
    email ? `E-mail: ${email}` : '',
    telefone ? `Telefone: ${telefone}` : '',
    produtos.length ? `Produtos:\n${produtos.join('\n')}` : '',
    quantidade ? `Quantidade estimada: ${quantidade}` : '',
    mensagem ? `Observações: ${mensagem}` : ''
  ].filter(Boolean);

  return encodeURIComponent(linhas.join('\n'));
}

// Scrollspy for nav highlighting
function initScrollSpy() {
  const links = Array.from(document.querySelectorAll('header a[href^="#"], #mobileMenu a[href^="#"]'));
  const sections = links
    .map(l => document.querySelector(l.getAttribute('href')))
    .filter(Boolean);
  if (!links.length || !sections.length) return;

  const onScroll = () => {
    const offset = 120;
    let current = null;
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top - offset <= 0) current = sec.id;
    });
    links.forEach(link => {
      const match = link.getAttribute('href').replace('#', '') === current;
      link.classList.toggle('text-zapGray', match);
      link.classList.toggle('font-bold', match);
      link.setAttribute('aria-current', match ? 'page' : 'false');
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Toast helper
function showToast(message = '') {
  const wrapper = document.getElementById('toast');
  if (!wrapper) return;
  const box = wrapper.firstElementChild;
  if (!box) return;
  box.textContent = message;
  wrapper.classList.remove('hidden');
  box.classList.add('animate-slide-up');
  setTimeout(() => {
    wrapper.classList.add('hidden');
  }, 3200);
}

// Selection counter for form checkboxes
function initSelectionCounter() {
  const counter = document.getElementById('selectionCounter');
  const previewBtn = document.getElementById('showPreviewBtn');
  const previewContainer = document.getElementById('orderPreview');
  const previewItems = document.getElementById('previewItems');
  const closePreview = document.getElementById('closePreview');
  const rows = document.querySelectorAll('[data-product-row]');
  
  console.log('initSelectionCounter:', { counter, previewBtn, previewContainer, rows: rows.length });
  
  if (!rows.length) return;

  function updateCounter() {
    const checked = Array.from(rows).filter(row => {
      const cb = row.querySelector('input[type="checkbox"]');
      return cb && cb.checked;
    });
    
    const count = checked.length;
    console.log('updateCounter:', count);
    
    if (count > 0) {
      if (counter) {
        counter.textContent = `${count} selecionado${count > 1 ? 's' : ''}`;
        counter.classList.remove('hidden');
        counter.classList.add('pulse-soft');
        setTimeout(() => counter.classList.remove('pulse-soft'), 300);
      }
      if (previewBtn) {
        previewBtn.classList.remove('hidden');
        console.log('previewBtn shown');
      }
    } else {
      if (counter) counter.classList.add('hidden');
      if (previewBtn) previewBtn.classList.add('hidden');
      if (previewContainer) previewContainer.classList.add('hidden');
    }
  }

  function updatePreview() {
    if (!previewItems) return;
    
    const items = Array.from(rows)
      .map(row => {
        const cb = row.querySelector('input[type="checkbox"]');
        if (!cb || !cb.checked) return null;
        const qty = row.querySelector('input[type="number"]')?.value?.trim() || '—';
        const name = row.querySelector('span')?.textContent || cb.value;
        return { name, qty };
      })
      .filter(Boolean);
    
    if (items.length === 0) {
      previewItems.innerHTML = '<p class="text-zapGray/50 italic">Nenhum produto selecionado</p>';
      return;
    }
    
    previewItems.innerHTML = items
      .map(item => `<div class="flex justify-between"><span>${item.name}</span><span class="font-semibold">${item.qty} un</span></div>`)
      .join('');
  }

  rows.forEach(row => {
    const cb = row.querySelector('input[type="checkbox"]');
    const numInput = row.querySelector('input[type="number"]');
    
    if (cb) {
      cb.addEventListener('change', () => {
        console.log('checkbox changed');
        updateCounter();
        // Highlight row when checked
        row.classList.toggle('ring-2', cb.checked);
        row.classList.toggle('ring-zapGreen/40', cb.checked);
        row.classList.toggle('bg-zapGreen/5', cb.checked);
      });
    }
    
    if (numInput) {
      numInput.addEventListener('input', updatePreview);
    }
  });

  if (previewBtn) {
    previewBtn.addEventListener('click', () => {
      console.log('previewBtn clicked');
      updatePreview();
      if (previewContainer) {
        previewContainer.classList.toggle('hidden');
      }
    });
  }

  if (closePreview) {
    closePreview.addEventListener('click', () => {
      if (previewContainer) previewContainer.classList.add('hidden');
    });
  }

  updateCounter();
}

// Product details modal with gallery feature
function initProductDetails() {
  // Product image folders mapping
  const productGalleries = {
    'display-backlight-a3': {
      folder: 'Display Backlight A3',
      colors: ['display_A3'],
      angles: 3,
      productCode: '40250002',
      size: 'A3',
      minNote: 'ou múltiplos de 5',
      description: 'Display iluminado A3, painel backlight para comunicação visual de alta visibilidade.',
      material: 'Estrutura metálica e lona backlight',
      packaging: 'Embala em caixa individual, oferecendo segurança no manuseio, transporte e armazenamento do produto.',
      minQuantity: 5,
      colorCodes: []
    },
    'display-backlight-a4': {
      folder: 'Display Backlight A4',
      colors: ['display_A4'],
      angles: 3,
      productCode: '40250001',
      size: 'A4',
      minNote: 'ou múltiplos de 5',
      description: 'Display iluminado A4, ideal para áreas compactas e balcões de atendimento.',
      material: 'Estrutura metálica e lona backlight',
      packaging: 'Embala em caixa individual, oferecendo segurança no manuseio, transporte e armazenamento do produto.',
      minQuantity: 5,
      colorCodes: []
    },
    'frame-backlight': {
      folder: 'Frame Backlight',
      colors: ['frame-backlight'],
      angles: 3,
      productCode: '40240014',
      size: '100x200 cm',
      description: 'Frame backlight para exposição em vitrines e pontos de venda.',
      material: 'Perfil de alumínio e lona backlight',
      packaging: 'Acompanha bolsa própria que protege a estrutura e facilita o transporte.',
      minQuantity: 1,
      colorCodes: []
    },
    'pdv-automatico': {
      folder: 'PDV Automático',
      colors: ['pdv-automatico'],
      angles: 3,
      productCode: '40240013',
      size: '2073x1000 mm',
      description: 'Balcão PDV automático para exposição e vendas em pontos estratégicos.',
      material: 'Polionda e revestimentos',
      packaging: 'Acompanha bolsa própria para proteção e transporte; enviado em caixa para o recebimento do cliente.',
      minQuantity: 1,
      colorCodes: []
    },
    'pdv-polionda': {
      folder: 'PDV Polionda',
      colors: ['pdv-polionda'],
      angles: 3,
      productCode: '40220024',
      size: '1850x900 mm',
      description: 'Balcão leve em polionda, fácil montagem e transporte.',
      material: 'Polionda',
      packaging: 'Embala em caixa individual com saco protetor para transporte e armazenamento.',
      minQuantity: 1,
      colorCodes: []
    },
    'pdv-pu': {
      folder: 'PDV PU',
      colors: ['pdv-pu'],
      angles: 3,
      productCode: '40220025',
      size: '1830x770 mm',
      description: 'Balcão PDV em PU com acabamento elegante para vitrines e eventos.',
      material: 'PU estruturado',
      packaging: 'Embala em caixa individual com saco protetor.',
      minQuantity: 1,
      colorCodes: []
    },
    'pop-up-automatico': {
      folder: 'Pop Up Automático',
      colors: ['pop-up-automatico'],
      angles: 3,
      productCode: '40240012',
      size: '3x3 m',
      description: 'Estrutura pop up automática para montagem rápida em eventos e feiras.',
      material: 'Estrutura metálica e tecido impresso',
      packaging: 'Embala em caixa individual com saco protetor; acompanha bolsa de transporte.',
      minQuantity: 1,
      colorCodes: []
    },
    'roll-up-banner': {
      folder: 'Roll Up Banner',
      colors: ['roll-up'],
      angles: 3,
      productCode: '40240011',
      size: '85x200 cm',
      description: 'Banner retrátil roll-up, fácil transporte e instalação rápida.',
      material: 'Lona vinílica e estrutura em alumínio',
      packaging: 'Embala em caixa individual com saco protetor; cada unidade acompanha bolsa.',
      minQuantity: 1,
      colorCodes: []
    },
    'x-banner': {
      folder: 'X Banner',
      colors: ['xbanner'],
      angles: 3,
      productCode: '40220025',
      size: '60x160 cm',
      description: 'X Banner para comunicação versátil em pontos de venda e eventos.',
      material: 'Lona e estrutura em fibra/metal',
      packaging: 'Embala em caixa individual com saco protetor; acompanha bolsa para transporte.',
      minQuantity: 1,
      colorCodes: []
    },
    'adesivo-vinil': {
      folder: 'PDV Automático',
      colors: ['pdv-automatico'],
      angles: 6,
      description: 'Adesivo vinil para personalização de superfícies lisas, recorte eletrônico, impressão digital, acabamento fosco ou brilho.',
      material: 'Vinil adesivo',
      packaging: 'Rolos ou recortes sob medida',
      minQuantity: 1,
      colorCodes: []
    },
    'adesivo-resinado': {
      folder: 'PDV Polionda',
      colors: ['pdv-polionda'],
      angles: 4,
      description: 'Adesivo resinado com efeito 3D, alta durabilidade, ideal para logomarcas, materiais promocionais e identificação visual.',
      material: 'Vinil + resina PU',
      packaging: 'Recortes individuais',
      minQuantity: 1,
      colorCodes: []
    },
    'placa-acm': {
      folder: 'Frame Backlight',
      colors: ['frame-backlight'],
      angles: 8,
      description: 'Placa de alumínio composto (ACM) para fachadas, sinalização e decoração. Acabamento premium.',
      material: 'Alumínio composto',
      packaging: 'Sob medida',
      minQuantity: 1,
      colorCodes: []
    },
    'placa-ps': {
      folder: 'PDV PU',
      colors: ['pdv-pu'],
      angles: 5,
      description: 'Placa em poliestireno (PS) para sinalização interna, leveza e ótimo custo-benefício.',
      material: 'Poliestireno',
      packaging: 'Sob medida',
      minQuantity: 1,
      colorCodes: []
    },
    'fachada-letra-caixa': {
      folder: 'Pop Up Automático',
      colors: ['pop-up-automatico'],
      angles: 7,
      description: 'Fachada com letra caixa em relevo para fachadas, recepções e ambientes internos. Diversos materiais e acabamentos.',
      material: 'PVC, acrílico, aço ou ACM',
      packaging: 'Instalação sob medida',
      minQuantity: 1,
      colorCodes: []
    },
    'fachada-lona': {
      folder: 'Roll Up Banner',
      colors: ['roll-up'],
      angles: 5,
      description: 'Fachada em lona econômica e resistente, impressão digital de alta qualidade, instalação rápida.',
      material: 'Lona vinílica',
      packaging: 'Sob medida',
      minQuantity: 1,
      colorCodes: []
    },
    'painel-backlight': {
      folder: 'Frame Backlight',
      colors: ['frame-backlight'],
      angles: 8,
      description: 'Painel backlight iluminado para comunicação visual de alto impacto, ideal para vitrines e fachadas.',
      material: 'Estrutura metálica e lona backlight',
      packaging: 'Sob medida',
      minQuantity: 1,
      colorCodes: []
    },
    'banners': {
      folder: 'X Banner',
      colors: ['xbanner'],
      angles: 5,
      description: 'Banners promocionais, faixas para eventos, impressão resistente para uso interno e externo.',
      material: 'Lona ou tecido',
      packaging: 'Sob medida',
      minQuantity: 1,
      colorCodes: []
    },
    'copo-termico-473': {
      folder: 'copo térmico',
      colors: ['preto', 'azul', 'branco', 'rosa'],
      angles: 5,
      description: 'Copo térmico de 473ml em aço inox de alta qualidade com abridor integrado na tampa. Mantém bebidas geladas por até 12 horas e quentes por até 6 horas. Ideal para uso diário, escritório ou atividades ao ar livre. Acabamento premium com pintura eletrostática resistente a riscos.',
      material: 'Aço inox 304',
      packaging: 'Caixa individual com proteção interna',
      minQuantity: 50,
      colorCodes: [
        { label: 'Preto', code: '41140021' },
        { label: 'Azul', code: '41140022' },
        { label: 'Branco', code: '41140023' },
        { label: 'Rosa', code: '41140024' }
      ]
    },
    'squeeze-ragnar': {
      folder: 'squeeze ragnar',
      colors: ['preto', 'azul', 'branco', 'vermelho', 'cromo'],
      angles: 4,
      description: 'Squeeze Ragnar de 500ml com design moderno e estrutura reforçada em aço inox. Tampa rosqueável com vedação de silicone. Ideal para academia, trilhas e uso corporativo. Superfície lisa perfeita para gravação a laser.',
      material: 'Aço inox 304',
      packaging: 'Caixa individual',
      minQuantity: 40,
      colorCodes: [
        { label: 'Preto', code: '41140025' },
        { label: 'Azul', code: '41140026' },
        { label: 'Branco', code: '41140027' },
        { label: 'Vermelho', code: '41140028' },
        { label: 'Cromo Satinado', code: '41140029' }
      ]
    },
    'squeeze-erald': {
      folder: 'squeeze erald',
      colors: ['preto', 'azul', 'branco', 'rosa'],
      angles: 3,
      description: 'Squeeze Erald de 500ml em alumínio leve e resistente. Design compacto e ergonômico, fácil de transportar. Tampa com trava de segurança. Excelente custo-benefício para grandes volumes.',
      material: 'Alumínio',
      packaging: 'Embalagem plástica individual',
      minQuantity: 60,
      colorCodes: [
        { label: 'Preto', code: '41140030' },
        { label: 'Azul', code: '41140035' },
        { label: 'Branco', code: '41140032' },
        { label: 'Rosa', code: '41140033' }
      ]
    },
    'copo-quenchpro': {
      folder: 'copo quencher',
      colors: ['preto', 'azul', 'branco'],
      angles: 3,
      description: 'Copo QuenchPro de 1200ml com grande capacidade e alça integrada para transporte. Dupla parede em aço inox com isolamento térmico. Tampa com canudo reutilizável. Perfeito para longas jornadas de trabalho.',
      material: 'Aço inox 304 dupla parede',
      packaging: 'Caixa individual premium',
      minQuantity: 25,
      colorCodes: [
        { label: 'Preto', code: '41140037' },
        { label: 'Azul', code: '41140038' },
        { label: 'Branco', code: '41140039' }
      ]
    },
    'copo-cuia': {
      folder: 'copo cuia',
      colors: ['preto', 'azul', 'branco'],
      angles: 4,
      description: 'Copo térmico Cuia de 360ml, compacto e versátil. Design inspirado na tradicional cuia, perfeito para chimarrão ou bebidas em geral. Estrutura em aço inox com isolamento térmico eficiente.',
      material: 'Aço inox 304',
      packaging: 'Caixa individual',
      minQuantity: 50,
      colorCodes: [
        { label: 'Preto', code: '41140040' },
        { label: 'Azul', code: '41140041' },
        { label: 'Branco', code: '41140042' }
      ]
    },
    'caneta-clare': {
      folder: 'caneta metal claire',
      colors: ['preta', 'branca'],
      angles: 3,
      description: 'Caneta metálica Clare em alumínio com acabamento clean e sofisticado. Clip metálico resistente e mecanismo de acionamento suave. Carga esferográfica azul de alta durabilidade. Presença moderna para uso profissional.',
      material: 'Alumínio',
      packaging: 'Individual em plástico anti-eletrostático com proteção de tinta',
      minQuantity: 50,
      colorCodes: [
        { label: 'Preta', code: '40240004' },
        { label: 'Branca', code: '40240005' }
      ]
    },
    'caneta-beta-soft': {
      folder: 'caneta metal beta soft',
      colors: ['preta', 'branca'],
      angles: 3,
      description: 'Caneta metálica Beta Soft com acabamento soft touch que proporciona conforto na escrita. Corpo em alumínio com revestimento emborrachado. Design executivo elegante para ambientes corporativos.',
      material: 'Alumínio com revestimento soft touch',
      packaging: 'Individual em plástico anti-eletrostático com proteção de tinta',
      minQuantity: 50,
      colorCodes: [
        { label: 'Preta', code: '40240002' },
        { label: 'Branca', code: '40240001' }
      ]
    },
    'caneta-lyme': {
      folder: 'caneta metal lyme',
      colors: ['branca', 'silver'],
      angles: 3,
      description: 'Caneta metálica Lyme com visual limpo e executivo. Acabamento metalizado de alta qualidade com detalhes cromados. Ideal para materiais promocionais corporativos de alto padrão.',
      material: 'Alumínio',
      packaging: 'Individual em plástico anti-eletrostático com proteção de tinta',
      minQuantity: 50,
      colorCodes: [
        { label: 'Branca', code: '40240006' },
        { label: 'Silver', code: '40240007' }
      ]
    },
    'caneta-olaf': {
      folder: 'caneta metal olaf',
      colors: ['branca', 'preta'],
      angles: 3,
      description: 'Caneta metálica Olaf com design minimalista e elegante. Corpo cilíndrico em alumínio com acabamento fosco premium. Perfeita para eventos corporativos e ambientes executivos.',
      material: 'Alumínio',
      packaging: 'Individual em plástico anti-eletrostático com proteção de tinta',
      minQuantity: 50,
      colorCodes: [
        { label: 'Preta', code: '40240009' },
        { label: 'Branca', code: '40240008' }
      ]
    },
    'caneta-caribe': {
      folder: 'caneta caribe',
      colors: ['preta'],
      angles: 3,
      description: 'Caneta plástica Caribe com corpo leve e design funcional. Ideal para grandes volumes promocionais. Clip integrado e acionamento por clique. Excelente relação custo-benefício.',
      material: 'Plástico ABS',
      packaging: 'Individual em plástico anti-eletrostático com proteção de tinta',
      minQuantity: 50,
      colorCodes: [
        { label: 'Preta', code: '40220015' }
      ]
    },
    'caneta-elegance': {
      folder: 'caneta elegance',
      colors: ['preta', 'prata'],
      angles: 3,
      description: 'Caneta plástica Elegance com visual sofisticado e detalhes metalizados. Corpo ergonômico para escrita confortável. Ideal para uso institucional e eventos.',
      material: 'Plástico ABS com detalhes metalizados',
      packaging: 'Individual em plástico anti-eletrostático com proteção de tinta',
      minQuantity: 50,
      colorCodes: [
        { label: 'Preta', code: '40220016' },
        { label: 'Prata', code: '40220017' }
      ]
    },
    'caneta-executiva': {
      folder: 'caneta executiva',
      colors: ['preta', 'branca'],
      angles: 3,
      description: 'Caneta plástica Executiva com acabamento premium e presença visual superior. Design clássico com detalhes cromados. Escrita suave e durável.',
      material: 'Plástico ABS premium',
      packaging: 'Individual em plástico anti-eletrostático com proteção de tinta',
      minQuantity: 50,
      colorCodes: [
        { label: 'Prata', code: '40220006' },
        { label: 'Branca', code: '40220005' }
      ]
    },
    'caneta-comercial': {
      folder: 'caneta comercial',
      colors: ['preta', 'azul', 'vermelha', 'amarela', 'verde', 'cinza'],
      angles: 3,
      description: 'Caneta plástica Comercial versátil e disponível em grande variedade de cores. Corpo leve e econômico, ideal para distribuição em massa. Tinta de alta qualidade com escrita suave.',
      material: 'Plástico',
      packaging: 'Individual em plástico anti-eletrostático com proteção de tinta',
      minQuantity: 50,
      colorCodes: [
        { label: 'Preta', code: '40220001' },
        { label: 'Azul', code: '40220002' },
        { label: 'Vermelha', code: '40220003' },
        { label: 'Amarela', code: '40220004' },
        { label: 'Verde', code: '40220006' },
        { label: 'Cinza', code: '40220007' },
        { label: 'Branca', code: '40220008' }
      ]
    },
    'caneta-touch': {
      folder: 'caneta touch e suporte',
      colors: ['preta', 'branca'],
      angles: 4,
      description: 'Caneta plástica Touch com ponteira touch screen e apoio para celular integrado. Multifuncional e moderna, perfeita para o público conectado. Ideal para materiais promocionais tech.',
      material: 'Plástico ABS',
      packaging: 'Individual em plástico anti-eletrostático com proteção de tinta',
      minQuantity: 50,
      colorCodes: [
        { label: 'Branca', code: '40220003' },
        { label: 'Preta', code: '40220004' }
      ]
    }
  };
  // exportar para `window` para que outras funções (ex: buildWhatsAppMessage) leiam os códigos
  window.productGalleries = productGalleries;

  // Create modal
  let modal = document.getElementById('productDetailModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'productDetailModal';
    modal.className = 'fixed inset-0 z-50 hidden items-center justify-center p-4';
    modal.innerHTML = `
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" id="detailModalBackdrop"></div>
      <div class="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto z-10">
        <button type="button" id="closeDetailModal" class="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center text-zapGray transition-colors z-20" aria-label="Fechar">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
        <div id="detailContent" class="p-0"></div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const content = document.getElementById('detailContent');
  const closeBtn = document.getElementById('closeDetailModal');
  const backdrop = document.getElementById('detailModalBackdrop');
  
  let currentImageIndex = 0;
  let currentGallery = [];

  function buildGallery(productId, selectedColor = null) {
    const gallery = productGalleries[productId];
    if (!gallery) return [];
    
    const images = [];
    const color = selectedColor || gallery.colors[0];
    
    for (let i = 1; i <= gallery.angles; i++) {
      images.push({
        src: `public/assets/images/${encodeURIComponent(gallery.folder)}/imagens/0${i}_${color}.avif`,
        alt: `Ângulo ${i} - ${color}`
      });
    }
    
    return images;
  }

  function updateMainImage(index) {
    currentImageIndex = index;
    const mainImg = document.getElementById('mainProductImage');
    const thumbnails = document.querySelectorAll('.gallery-thumb');
    const prevBtn = document.getElementById('galleryPrevBtn');
    const nextBtn = document.getElementById('galleryNextBtn');
    if (mainImg && currentGallery[index]) {
      mainImg.src = currentGallery[index].src;
      mainImg.alt = currentGallery[index].alt;
    }
    thumbnails.forEach((thumb, i) => {
      thumb.classList.toggle('ring-2', i === index);
      thumb.classList.toggle('ring-zapGreen', i === index);
      thumb.classList.toggle('opacity-60', i !== index);
    });
    if (prevBtn) prevBtn.classList.toggle('hidden', index === 0);
    if (nextBtn) nextBtn.classList.toggle('hidden', index === currentGallery.length - 1);
  }

  function openModal(productId) {
    const article = document.querySelector(`[data-product-id="${productId}"]`);
    const gallery = productGalleries[productId];
    if (!article || !gallery) return;

    const title = article.querySelector('h3')?.textContent || '';
    const badge = article.querySelector('.badge-min')?.textContent || '';
    const firstColor = gallery.colors[0];
    
    currentGallery = buildGallery(productId, firstColor);
    currentImageIndex = 0;

    const colorButtons = gallery.colors.map((color, i) => `
      <button type="button" class="color-btn px-3 py-1.5 text-xs rounded-full border transition-all ${i === 0 ? 'bg-zapGreen text-white border-zapGreen' : 'border-gray-300 text-zapGray hover:border-zapGreen'}" data-color="${color}" data-product="${productId}">
        ${color.charAt(0).toUpperCase() + color.slice(1)}
      </button>
    `).join('');

    const thumbnailsHtml = currentGallery.map((img, i) => `
      <button type="button" class="gallery-thumb w-16 h-16 rounded-lg overflow-hidden bg-lightGray flex-shrink-0 transition-all ${i === 0 ? 'ring-2 ring-zapGreen' : 'opacity-60 hover:opacity-100'}" data-index="${i}">
        <img src="${img.src}" alt="${img.alt}" class="w-full h-full object-contain" />
      </button>
    `).join('');

    // Gerar HTML dos códigos dos produtos (usar fallback para PRODUCT_CODES se necessário)
    let codes = Array.isArray(gallery.colorCodes) ? gallery.colorCodes.slice() : [];
    if ((!codes || !codes.length) && gallery.productCode) {
      codes = [{ label: 'Código do produto', code: gallery.productCode }];
    }
    if ((!codes || !codes.length) && PRODUCT_CODES[productId]) {
      // Construir pares label/code usando cores conhecidas e o mapa global
      const pc = PRODUCT_CODES[productId] || [];
      codes = (gallery.colors || []).map((col, i) => ({ label: col.charAt(0).toUpperCase() + col.slice(1), code: pc[i] || '' }));
    }

    const colorCodesHtml = (codes || [])
      .filter(c => c && (c.code || c.label))
      .map(c => `<div class="flex justify-between text-xs"><span class="text-zapGray/60">${c.label}</span><span class="font-mono font-semibold text-zapGray">${c.code || '—'}</span></div>`)
      .join('');

    // Debug: se não houver códigos, logar para facilitar diagnóstico
    if (!colorCodesHtml) console.debug('openModal: sem códigos para', productId, gallery, PRODUCT_CODES[productId]);

    content.innerHTML = `
      <div class="grid md:grid-cols-2 gap-0">
        <div class="bg-lightGray p-6 md:p-8">
          <div class="relative aspect-square w-full bg-white rounded-xl overflow-hidden mb-4 shadow-sm flex items-center justify-center">
            <button type="button" id="galleryPrevBtn" aria-label="Imagem anterior" class="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-zapGreen/80 hover:text-white text-zapGreen rounded-full w-9 h-9 flex items-center justify-center shadow transition-all ${currentGallery.length > 1 ? '' : 'hidden'}">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <img id="mainProductImage" src="${currentGallery[0]?.src || ''}" alt="${title}" class="w-full h-full object-contain" />
            <button type="button" id="galleryNextBtn" aria-label="Próxima imagem" class="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-zapGreen/80 hover:text-white text-zapGreen rounded-full w-9 h-9 flex items-center justify-center shadow transition-all ${currentGallery.length > 1 ? '' : 'hidden'}">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
          <div class="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            ${thumbnailsHtml}
          </div>
        </div>
        <div class="p-6 md:p-8 flex flex-col">
          <div class="mb-2 text-sm text-zapGray/70">Tamanho: ${gallery.size || '—'}</div>
          <div class="mb-4">
          </div>
          <h3 class="text-2xl font-bold text-zapGray mb-4">${title}</h3>
          <div class="mb-4">
            <p class="text-xs text-zapGray/60 mb-2">Cores disponíveis:</p>
            <div class="flex flex-wrap gap-2">
              ${colorButtons}
            </div>
          </div>
          <div class="mb-4 bg-gray-50 rounded-lg p-3">
            <p class="text-xs font-semibold text-zapGray mb-2">Códigos do produto:</p>
            <div class="space-y-1">
              ${colorCodesHtml || '<p class="text-xs text-zapGray/50">Códigos disponíveis sob consulta.</p>'}
            </div>
          </div>
          <p class="text-sm font-semibold text-zapGreen mb-4">Quantidade mínima: ${gallery.minQuantity || 50} unidades${gallery.minNote ? ' ' + gallery.minNote : ''}</p>
          <div class="space-y-3 mb-6 flex-1">
            <div class="flex items-start gap-2">
              <span class="text-zapGreen mt-0.5">✓</span>
              <p class="text-sm text-zapGray/80"><strong>Material:</strong> ${gallery.material}</p>
            </div>
            <div class="flex items-start gap-2">
              <span class="text-zapGreen mt-0.5">✓</span>
              <p class="text-sm text-zapGray/80"><strong>Embalagem:</strong> ${gallery.packaging}</p>
            </div>
            <p class="text-zapGray/90 leading-relaxed text-sm mt-4">${gallery.description}</p>
          </div>
          <div class="mt-auto pt-4 border-t border-gray-100">
            <a href="#contato" class="btn-primary w-full" onclick="document.getElementById('productDetailModal').classList.add('hidden'); document.getElementById('productDetailModal').classList.remove('flex'); document.body.classList.remove('no-scroll');">
              Solicitar Orçamento
            </a>
          </div>
        </div>
      </div>
    `;

    // Add event listeners for gallery
    document.querySelectorAll('.gallery-thumb').forEach(thumb => {
      thumb.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        updateMainImage(parseInt(thumb.dataset.index));
      });
    });
    // Add event listeners for navigation arrows
    const prevBtn = document.getElementById('galleryPrevBtn');
    const nextBtn = document.getElementById('galleryNextBtn');
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (currentImageIndex > 0) {
          updateMainImage(currentImageIndex - 1);
        }
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (currentImageIndex < currentGallery.length - 1) {
          updateMainImage(currentImageIndex + 1);
        }
      });
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.classList.add('no-scroll');
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.classList.remove('no-scroll');
  }

  // Click on product card image or detail button
  document.querySelectorAll('.product-card').forEach(card => {
    const productId = card.dataset.productId;
    const imgContainer = card.querySelector('.img-container');
    const detailBtn = card.querySelector('.btn-detail');
    
    if (imgContainer) {
      imgContainer.addEventListener('click', () => openModal(productId));
    }
    
    if (detailBtn) {
      detailBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openModal(productId);
      });
    }
  });

  closeBtn?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
    // Arrow navigation
    if (!modal.classList.contains('hidden')) {
      if (e.key === 'ArrowRight' && currentImageIndex < currentGallery.length - 1) {
        updateMainImage(currentImageIndex + 1);
      } else if (e.key === 'ArrowLeft' && currentImageIndex > 0) {
        updateMainImage(currentImageIndex - 1);
      }
    }
  });
}

// Product comparison feature
function initCompare() {
  const compareBar = document.getElementById('compareBar');
  const compareCount = document.getElementById('compareCount');
  const openBtn = document.getElementById('openCompareBtn');
  const clearBtn = document.getElementById('clearCompareBtn');
  const modal = document.getElementById('compareModal');
  const closeModal = document.getElementById('closeCompareModal');
  const content = document.getElementById('compareContent');
  const compareBtns = document.querySelectorAll('.btn-compare');
  
  if (!compareBar || !compareBtns.length) return;

  const MAX_COMPARE = 3;
  let compareList = [];

  function updateBar() {
    if (compareList.length > 0) {
      compareBar.classList.remove('hidden');
      compareCount.textContent = compareList.length;
    } else {
      compareBar.classList.add('hidden');
    }

    // Update button states
    compareBtns.forEach(btn => {
      const id = btn.getAttribute('data-compare');
      const isSelected = compareList.includes(id);
      btn.classList.toggle('bg-zapGreen', isSelected);
      btn.classList.toggle('text-white', isSelected);
      btn.classList.toggle('ring-zapGreen', isSelected);
      btn.classList.toggle('text-zapGray', !isSelected);
      btn.classList.toggle('ring-gray-200', !isSelected);
      btn.classList.toggle('btn-compare-selected', isSelected);
    });
  }

  function toggleCompare(productId) {
    const index = compareList.indexOf(productId);
    if (index > -1) {
      compareList.splice(index, 1);
    } else if (compareList.length < MAX_COMPARE) {
      compareList.push(productId);
    } else {
      showToast(`Máximo de ${MAX_COMPARE} produtos para comparar`);
      return;
    }
    updateBar();
  }

  function openCompareModal() {
    if (compareList.length < 2) {
      showToast('Selecione pelo menos 2 produtos para comparar');
      return;
    }

    // Build comparison cards
    const cards = compareList.map(id => {
      const article = document.querySelector(`[data-product-id="${id}"]`);
      if (!article) return '';
      
      const title = article.querySelector('h3')?.textContent || '';
      const img = article.querySelector('img')?.src || '';
      const material = article.querySelector('p')?.textContent || '';
      const desc = article.querySelectorAll('p')[article.querySelectorAll('p').length - 1]?.textContent || '';
      const badge = article.querySelector('.badge')?.textContent || '';

      return `
        <div class="bg-lightGray rounded-xl p-4 space-y-3">
          <img src="${img}" alt="${title}" class="w-full aspect-square object-contain rounded-lg bg-white" />
          <h4 class="font-semibold text-zapGray">${title}</h4>
          <p class="text-xs text-zapGray/70">${material}</p>
          <p class="text-sm text-zapGray/80">${desc}</p>
          <span class="badge badge-ghost text-xs">${badge}</span>
        </div>
      `;
    }).join('');

    content.innerHTML = cards;
    modal.classList.remove('hidden');
    document.body.classList.add('no-scroll');
  }

  function closeCompareModalFn() {
    modal.classList.add('hidden');
    document.body.classList.remove('no-scroll');
  }

  compareBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const productId = btn.getAttribute('data-compare');
      toggleCompare(productId);
    });
  });

  if (openBtn) openBtn.addEventListener('click', openCompareModal);
  if (clearBtn) clearBtn.addEventListener('click', () => {
    compareList = [];
    updateBar();
  });
  if (closeModal) closeModal.addEventListener('click', closeCompareModalFn);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeCompareModalFn();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeCompareModalFn();
    }
  });
}