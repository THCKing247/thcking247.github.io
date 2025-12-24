// Scroll reveal
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add("in");
  });
},{threshold:.15});
reveals.forEach(r=>io.observe(r));

// Header shrink
const header = document.querySelector(".site-header");
window.addEventListener("scroll",()=>{
  if(window.scrollY > 30) header.classList.add("is-shrunk");
  else header.classList.remove("is-shrunk");
},{passive:true});

// Particles
const canvas = document.getElementById("particles");
if(canvas){
  const ctx = canvas.getContext("2d");
  let w,h;
  function resize(){
    w=canvas.width=window.innerWidth;
    h=canvas.height=window.innerHeight;
  }
  resize();
  window.addEventListener("resize",resize);

  const dots=[...Array(70)].map(()=>({
    x:Math.random()*w,
    y:Math.random()*h,
    r:Math.random()*2+1,
    vx:(Math.random()-.5)*.4,
    vy:(Math.random()-.5)*.4
  }));

  function draw(){
    ctx.clearRect(0,0,w,h);
    dots.forEach(d=>{
      d.x+=d.vx; d.y+=d.vy;
      if(d.x<0||d.x>w) d.vx*=-1;
      if(d.y<0||d.y>h) d.vy*=-1;
      ctx.beginPath();
      ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
      ctx.fillStyle="rgba(255,255,255,.35)";
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}
