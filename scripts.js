/* scripts.js — theme, cursor, reveal, modal */
document.addEventListener('DOMContentLoaded', function(){
  // year
  document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());
  document.getElementById('year2') && (document.getElementById('year2').textContent = new Date().getFullYear());

  // Theme toggle
  const themeToggleButtons = document.querySelectorAll('#theme-toggle');
  function setTheme(isLight){
    document.body.classList.toggle('theme-light', isLight);
    document.body.classList.toggle('theme-dark', !isLight);
    // also change cursor color via CSS class
  }
  // initialize from localStorage
  const saved = localStorage.getItem('adrian_theme');
  setTheme(saved === 'light');
  themeToggleButtons.forEach(btn => btn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('theme-light');
    document.body.classList.toggle('theme-dark', !isLight);
    localStorage.setItem('adrian_theme', isLight ? 'light' : 'dark');
  }));

  // Custom cursor
  const cursor = document.getElementById('cursor');
  window.addEventListener('mousemove', (e)=>{
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  // enlarge on interactive elements
  document.querySelectorAll('a, button').forEach(el=>{
    el.addEventListener('mouseenter', ()=>{ cursor.style.transform = 'translate(-50%,-50%) scale(2)'; })
    el.addEventListener('mouseleave', ()=>{ cursor.style.transform = 'translate(-50%,-50%) scale(1)'; })
  });

  // Scroll reveal with IntersectionObserver
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add('visible');
    });
  }, {threshold: 0.12});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Portfolio modal
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-content');
  const modalClose = document.getElementById('modal-close');

  function openModal(title, desc, imgSrc){
    modalContent.innerHTML = '<h2>'+title+'</h2><p>'+desc+'</p>' +
      (imgSrc? '<img style="width:100%;border-radius:8px;margin-top:12px" src="'+imgSrc+'" alt="project image">' : '');
    modal.setAttribute('aria-hidden','false');
  }
  function closeModal(){ modal.setAttribute('aria-hidden','true'); modalContent.innerHTML=''; }

  document.querySelectorAll('.project-card').forEach(card=>{
    card.addEventListener('click', ()=>{
      const title = card.dataset.title || card.querySelector('h3').textContent;
      const desc = card.dataset.desc || '';
      const img = card.querySelector('img')?.getAttribute('src') || '';
      openModal(title, desc, img);
    });
  });
  modalClose && modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });

  // Accessibility: close modal with escape
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeModal(); });

  // Smooth link transitions
  document.querySelectorAll('a.nav-link').forEach(a=>{
    a.addEventListener('click', (ev)=>{
      // simple behavior: keep default for external anchors
    });
  });

  // If hero video doesn't load, ensure fallback poster visible
  const hv = document.getElementById('hero-video');
  if(hv){
    hv.addEventListener('error', ()=>{ hv.style.display='none'; });
  }
});
