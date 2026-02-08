// reveal animation
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add("active");
  });
},{threshold:0.2});
reveals.forEach(r=>observer.observe(r));

// category switch
const cats = document.querySelectorAll(".cat");
const groups = document.querySelectorAll(".faq-group");

cats.forEach(btn=>{
  btn.addEventListener("click",()=>{
    cats.forEach(c=>c.classList.remove("active"));
    btn.classList.add("active");

    groups.forEach(g=>{
      g.classList.remove("active");
      if(g.id === btn.dataset.cat){
        g.classList.add("active");
      }
    });
  });
});

// accordion
document.querySelectorAll(".faq-question").forEach(q=>{
  q.addEventListener("click",()=>{
    const item = q.parentElement;
    const group = item.parentElement;

    group.querySelectorAll(".faq-item").forEach(i=>{
      if(i !== item) i.classList.remove("active");
    });

    item.classList.toggle("active");
  });
});
