// reveal animation
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add("active");
  });
},{threshold:0.2});
reveals.forEach(r=>observer.observe(r));

// counters
document.querySelectorAll(".stat").forEach(stat=>{
  const target = +stat.dataset.target;
  const el = stat.querySelector("h2");
  let count = 0;
  const inc = Math.ceil(target/80);

  const timer = setInterval(()=>{
    count += inc;
    if(count >= target){
      el.textContent = target + (el.textContent.includes('%')?'%':'');
      clearInterval(timer);
    } else {
      el.textContent = count;
    }
  },30);
});

// modal
const modal = document.getElementById("infoModal");
const titleEl = document.getElementById("modalTitle");
const textEl = document.getElementById("modalText");

function openModal(title,text){
  titleEl.textContent = title;
  textEl.textContent = "";
  modal.classList.add("active");

  let i=0;
  function type(){
    if(i<text.length){
      textEl.textContent += text[i++];
      setTimeout(type,8);
    }
  }
  type();
}
function closeModal(){
  modal.classList.remove("active");
}

// scroll indicator
const scrollIndicator = document.getElementById("scrollIndicator");
let timer=null;

function showScroll(){
  scrollIndicator.classList.add("show");
}
function hideScroll(){
  scrollIndicator.classList.remove("show");
}

window.addEventListener("scroll",()=>{
  hideScroll();
  clearTimeout(timer);
  if(window.scrollY<80){
    timer=setTimeout(showScroll,3000);
  }
});
setTimeout(showScroll,1500);
