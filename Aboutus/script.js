/* =======================
   REVEAL ON SCROLL
======================= */
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.2 }
);

reveals.forEach(r => observer.observe(r));

/* =======================
   MODAL + TYPEWRITER
======================= */
const infoModal = document.getElementById("infoModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const closeModal = document.getElementById("closeModal");

let typingTimeout = null;

function openModal(title, text) {
  modalTitle.textContent = title;
  modalText.textContent = "";
  infoModal.classList.add("active");

  let i = 0;
  const speed = 8;

  function typeWriter() {
    if (i < text.length) {
      modalText.textContent += text.charAt(i);
      i++;
      typingTimeout = setTimeout(typeWriter, speed);
    }
  }
  typeWriter();
}

function closeModalFn() {
  infoModal.classList.remove("active");
  clearTimeout(typingTimeout);
}

closeModal.addEventListener("click", closeModalFn);

// close on ESC
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && infoModal.classList.contains("active")) {
    closeModalFn();
  }
});

// close on outside click
infoModal.addEventListener("click", e => {
  if (e.target === infoModal) {
    closeModalFn();
  }
});

/* =======================
   SCROLL INDICATOR LOGIC
======================= */
const scrollIndicator = document.getElementById("scrollIndicator");
let showTimeout = null;

function showScrollIndicator() {
  scrollIndicator.classList.add("show");
}

function hideScrollIndicator() {
  scrollIndicator.classList.remove("show");
}

window.addEventListener("scroll", () => {
  hideScrollIndicator();
  clearTimeout(showTimeout);

  if (window.scrollY < 80) {
    showTimeout = setTimeout(showScrollIndicator, 3000);
  }
});

// initial appearance
setTimeout(showScrollIndicator, 1500);
