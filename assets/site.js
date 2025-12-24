// ===== Scroll Reveal =====
(function(){
  const els = document.querySelectorAll(".reveal");
  if (els.length === 0) return;

  if (!("IntersectionObserver" in window)) {
    els.forEach(el => el.classList.add("in"));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("in");
    });
  }, { threshold: 0.15 });

  els.forEach(el => io.observe(el));
})();

// ===== Particles (lightweight canvas) =====
(function(){
  const canvas = document.getElementById("particles");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  function resize(){
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    ctx.setTransform(1,0,0,1,0,0);
  }
  resize();
  window.addEventListener("resize", resize, { passive: true });

  const dpr = window.devicePixelRatio || 1;
  const count = 70;

  const parts = Array.from({length: count}, () => ({
    x: Math.random(),
    y: Math.random(),
    r: 0.7 + Math.random()*1.8,
    vx: (-0.15 + Math.random()*0.3),
    vy: (-0.10 + Math.random()*0.2),
    a: 0.12 + Math.random()*0.25
  }));

  function tick(){
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0,0,w,h);

    for (const p of parts){
      p.x += p.vx / 1000;
      p.y += p.vy / 1000;

      if (p.x < -0.02) p.x = 1.02;
      if (p.x > 1.02) p.x = -0.02;
      if (p.y < -0.02) p.y = 1.02;
      if (p.y > 1.02) p.y = -0.02;

      const px = p.x * w, py = p.y * h;

      ctx.beginPath();
      ctx.arc(px, py, p.r * dpr, 0, Math.PI*2);
      ctx.fillStyle = `rgba(255,255,255,${p.a})`;
      ctx.fill();
    }

    requestAnimationFrame(tick);
  }

  tick();
})();
