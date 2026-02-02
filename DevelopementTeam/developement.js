/* REVEAL ANIMATION */
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.2 });

reveals.forEach(el => observer.observe(el));

/* CONTACT MODAL */
const modal = document.getElementById("contactModal");
const nameEl = document.getElementById("contactName");
const callLink = document.getElementById("callLink");
const whatsappLink = document.getElementById("whatsappLink");

function openContact(name, phone) {
  nameEl.textContent = name;
  callLink.href = `tel:${phone}`;
  whatsappLink.href = `https://wa.me/${phone}`;
  modal.classList.add("active");
}

function closeContact() {
  modal.classList.remove("active");
}
