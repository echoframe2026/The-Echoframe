const splash = document.getElementById("splash");
const app = document.getElementById("app");

setTimeout(() => {
  splash.style.display = "none";
  app.classList.remove("hidden");
}, 4000);

/* 星空動畫 */
const bg = document.getElementById("bg");
const ctx = bg.getContext("2d");

bg.width = window.innerWidth;
bg.height = window.innerHeight;

let stars = Array.from({length: 100}, () => ({
  x: Math.random()*bg.width,
  y: Math.random()*bg.height,
  r: Math.random()*2
}));

function drawStars() {
  ctx.clearRect(0,0,bg.width,bg.height);
  ctx.fillStyle = "white";

  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
    ctx.fill();

    s.y += 0.2;
    if(s.y > bg.height) s.y = 0;
  });

  requestAnimationFrame(drawStars);
}
drawStars();

/* 情緒變化 */
document.querySelectorAll(".color").forEach(el => {
  el.onclick = () => {
    let e = el.dataset.emotion;

    if(e === "happy") bg.style.filter = "brightness(1.3)";
    if(e === "calm") bg.style.filter = "blur(2px)";
    if(e === "sad") bg.style.filter = "grayscale(1)";
    if(e === "stress") bg.style.filter = "contrast(2)";
  };
});

/* 畫布 */
const draw = document.getElementById("draw");
const dtx = draw.getContext("2d");

draw.width = window.innerWidth;
draw.height = window.innerHeight;

let painting = false;

draw.onmousedown = () => painting = true;
draw.onmouseup = () => painting = false;

draw.onmousemove = (e) => {
  if(!painting) return;
  dtx.fillStyle = "white";
  dtx.beginPath();
  dtx.arc(e.clientX, e.clientY, 3, 0, Math.PI*2);
  dtx.fill();
};

/* Share */
document.getElementById("save").onclick = () => {
  let data = draw.toDataURL();
  let arr = JSON.parse(localStorage.getItem("art") || "[]");
  arr.push(data);
  localStorage.setItem("art", JSON.stringify(arr));
};

/* Gallery */
document.getElementById("galleryBtn").onclick = () => {
  let g = document.getElementById("gallery");
  g.classList.remove("hidden");

  g.innerHTML = "";

  let arr = JSON.parse(localStorage.getItem("art") || "[]");
  arr.forEach(src => {
    let img = document.createElement("img");
    img.src = src;
    g.appendChild(img);
  });
};
