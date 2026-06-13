/* ============================================
   パティスリー カヌリエ — script.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================
     1. ヘッダー スクロール検知
     ============================================ */
  const header = document.getElementById('site-header');

  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // 初期実行


  /* ============================================
     2. ハンバーガーメニュー
     ============================================ */
  const hamburger  = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuLinks  = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

  const openMenu = () => {
    hamburger.classList.add('active');
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  };

  const closeMenu = () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  };

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      if (hamburger.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    menuLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }


  /* ============================================
     3. スクロールフェードイン (Intersection Observer)
     ============================================ */
  const fadeEls = document.querySelectorAll('.fade-in');

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  fadeEls.forEach(el => io.observe(el));


  /* ============================================
     4. スムーズスクロール（ハッシュリンク）
     ============================================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();

      const headerH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--header-h'),
        10
      ) || 64;

      const top = targetEl.getBoundingClientRect().top + window.scrollY - headerH;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ============================================
     5. 現在年を自動でフッターに挿入
     ============================================ */
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }


  /* ============================================
     6. フェードスライドショー (Hero & Concept)
     ============================================ */
  const initSlideshow = (containerSelector, slideSelector, intervalTime) => {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const slides = container.querySelectorAll(slideSelector);
    if (slides.length <= 1) return;

    let currentIndex = 0;

    setInterval(() => {
      slides[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % slides.length;
      slides[currentIndex].classList.add('active');
    }, intervalTime);
  };

  // ヒーローのスライドショー（5秒間隔）
  initSlideshow('.hero-slides', '.hero-slide', 5000);

  // コンセプト（Our Story）のスライドショー（5秒間隔）
  initSlideshow('.concept-slides', '.concept-slide', 5000);


  /* ============================================
     7. オープニングローダー制御
     ============================================ */
  window.addEventListener('load', () => {
    const openingMask = document.getElementById('opening-mask');
    if (!openingMask) return;

    // 最低1.8秒はロゴを表示し、その後ふわっとメイン画面にフェードアウト
    setTimeout(() => {
      openingMask.classList.add('loaded');
    }, 1800);
  });

});
