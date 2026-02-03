/********************************
  GLOBAL STATE
*********************************/
let coursesData = [];
let activeCategory = "All";

let instructorsData = [];

let batchesData = [];

const HERO_BATCHES_LIMIT = 3;

console.log('abc')


/********************************
 API URLs
 *********************************/
const COURSES_API ="https://script.google.com/macros/s/AKfycbwltM3uKcpBChARKXFjhNWLV9gwdYbeyfPSYW8MQxxTVjGFB2sVFPhLJAO0yoIbjRv5/exec?type=courses";

const APPS_SCRIPT_URL ="https://script.google.com/macros/s/AKfycbz8UIja_wA40bpcLsLPgfhLqYHatagyonctByUxHQjVL5bRKDaYuG41Hw_bwk8Muu3W/exec";

const INSTRUCTORS_API ="https://script.google.com/macros/s/AKfycbwltM3uKcpBChARKXFjhNWLV9gwdYbeyfPSYW8MQxxTVjGFB2sVFPhLJAO0yoIbjRv5/exec?type=instructors";

const BATCHES_API =    "https://script.google.com/macros/s/AKfycbwltM3uKcpBChARKXFjhNWLV9gwdYbeyfPSYW8MQxxTVjGFB2sVFPhLJAO0yoIbjRv5/exec?type=batches";

/********************************
  DOM READY
*********************************/
document.addEventListener("DOMContentLoaded", () => {
  const coursesContainer = document.getElementById("coursesContainer");
  const searchInput = document.getElementById("courseSearch");
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const callbackForm = document.getElementById("callbackForm");

  /* ------------------------------
     HAMBURGER MENU
  --------------------------------*/
  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }


  /* ------------------------------
     FETCH COURSES FROM EXCEL
  --------------------------------*/
  async function fetchCoursesFromSheet() {
    try {
      const res = await fetch(COURSES_API);
      const data = await res.json();

      if (!Array.isArray(data)) {
        console.error("Invalid courses data:", data);
        return;
      }

      coursesData = data;
      renderCourses(coursesData);
    } catch (err) {
      console.error("Failed to load courses:", err);
    }
  }

  /* ------------------------------
     RENDER COURSES
  --------------------------------*/
  window.renderCourses = function (courses) {
    coursesContainer.innerHTML = "";

    if (!courses.length) {
      coursesContainer.innerHTML =
        "<p class='col-span-full text-center'>No courses found</p>";
      return;
    }

    courses.forEach(course => {
      const card = document.createElement("div");

      card.className = `
        bg-white rounded-2xl overflow-hidden
        border border-muted/30
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl
      `;

      card.innerHTML = `
        <img src="${course.image}" class="w-full h-44 object-cover" />

        <div class="p-6">
          <h3 class="text-xl font-semibold mb-2">${course.title}</h3>
          <p class="text-sm text-muted mb-4">${course.shortDesc}</p>

          <div class="flex justify-between text-sm mb-4">
            <span>⏱ ${course.duration}</span>
            <span>💰 ${course.fees}</span>
          </div>

          <button
            onclick="showCourseDetails('${course.id}')"
            class="w-full bg-accent text-white py-3 rounded-md font-semibold"
          >
            View Full Details
          </button>
        </div>
      `;

      coursesContainer.appendChild(card);
    });
  };

  /* ------------------------------
     FILTER + SEARCH
  --------------------------------*/
  window.filterCourses = function (category) {
    activeCategory = category;

    document.querySelectorAll(".filter-pill").forEach(btn => {
      btn.classList.remove("active");
      if (btn.dataset.category === category) {
        btn.classList.add("active");
      }
    });

    applyFilters();
  };

  window.applyFilters = function () {
    const query = searchInput.value.toLowerCase();

    let filtered =
      activeCategory === "All"
        ? coursesData
        : coursesData.filter(c => c.category === activeCategory);

    if (query) {
      filtered = filtered.filter(c =>
        c.title.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query)
      );
    }

    renderCourses(filtered);
  };

  searchInput?.addEventListener("input", applyFilters);

  /* ------------------------------
     COURSE MODAL
  --------------------------------*/
  window.showCourseDetails = function (courseId) {
    const course = coursesData.find(c => c.id === courseId);
    if (!course) return;

    document.getElementById("modalTitle").innerText = course.title;
    document.getElementById("modalDescription").innerText = course.description;
    document.getElementById("modalDuration").innerText = course.duration;
    document.getElementById("modalFees").innerText = course.fees;
    document.getElementById("modalLevel").innerText = course.level;
    document.getElementById("modalPlacement").innerText = course.placement;
    document.getElementById("modalTrainers").innerText = course.trainers;

    const list = document.getElementById("modalHighlights");
    list.innerHTML = "";
    course.highlights.forEach(h => {
      const li = document.createElement("li");
      li.innerText = h;
      list.appendChild(li);
    });

    document.getElementById("courseModal").classList.remove("hidden");
    document.getElementById("courseModal").classList.add("flex");
  };

  window.closeModal = function () {
    document.getElementById("courseModal").classList.add("hidden");
  };

  window.handleEnrollClick = function () {
    closeModal();
    document.getElementById("callback")?.scrollIntoView({ behavior: "smooth" });
  };

  /* ------------------------------
     CALLBACK FORM SUBMIT
  --------------------------------*/
  if (callbackForm) {
    callbackForm.addEventListener("submit", async e => {
      e.preventDefault();

      const formData = new FormData(callbackForm);
      formData.append("formType", "Request Callback");

      try {
        await fetch(APPS_SCRIPT_URL, {
          method: "POST",
          body: formData
        });

        alert("Thank you! Our team will contact you shortly.");
        callbackForm.reset();
      } catch (err) {
        alert("Network error. Try again later.");
      }
    });
  }

  /* ------------------------------
     INIT
  --------------------------------*/
  fetchCoursesFromSheet();
});



/***********************
  WHY JOIN US RENDER (COURSE STYLE)
************************/
const whyContainer = document.getElementById("whyContainer");

whyData.forEach(item => {
  const card = document.createElement("div");

  card.className = `
    bg-white rounded-2xl overflow-hidden
    border border-muted/30
    transition-all duration-300
    hover:-translate-y-1 hover:shadow-xl hover:border-accent
  `;

  card.innerHTML = `
    <!-- Image -->
    <img
      src="${item.image}"
      alt="${item.title}"
      class="w-full h-40 object-cover"
    />

    <!-- Content -->
    <div class="p-6">
      <h3 class="font-heading text-lg font-semibold mb-3">
        ${item.title}
      </h3>

      <p class="text-sm text-primary mb-4">
        ${item.description}
      </p>

      <ul class="text-sm text-secondary space-y-1">
        ${item.points.map(p => `<li>✔ ${p}</li>`).join("")}
      </ul>
    </div>
  `;

  whyContainer.appendChild(card);
});



 /* ------------------------------
     FETCH INSTRUCTORS FROM EXCEL
  --------------------------------*/

async function fetchInstructorsFromSheet() {
  try {
    const res = await fetch(INSTRUCTORS_API);
    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error("Invalid instructors data", data);
      return;
    }

    instructorsData = data;
    renderInstructors(); // 👈 same render logic call

  } catch (err) {
    console.error("Failed to load instructors:", err);
  }
}



/***********************
  INSTRUCTORS RENDER
************************/

function renderInstructors() {
  const instructorsContainer =
    document.getElementById("instructorsContainer");

  instructorsContainer.innerHTML = "";

  instructorsData.forEach(inst => {
    const card = document.createElement("div");

    card.className = `
      bg-white rounded-2xl overflow-hidden
      border border-muted/30
      transition-all duration-300
      hover:-translate-y-1 hover:shadow-xl hover:border-accent
    `;

    card.innerHTML = `
      <img
        src="${inst.image}"
        alt="${inst.name}"
        class="w-full h-48 object-contain bg-secondary/10"
      />

      <div class="p-6">
        <h3 class="font-heading text-xl font-semibold mb-1">
          ${inst.name}
        </h3>

        <p class="text-sm text-accent font-medium mb-2">
          ${inst.role}
        </p>

        <p class="text-sm text-muted mb-3">
          ${inst.experience}
        </p>

        <p class="text-sm text-muted mb-4">
          ${inst.bio}
        </p>

        <div class="flex flex-wrap gap-2">
          ${inst.expertise
            .map(
              skill => `
            <span class="text-xs px-3 py-1 bg-secondary/20 rounded-full text-primary">
              ${skill}
            </span>`
            )
            .join("")}
        </div>
      </div>
    `;

    instructorsContainer.appendChild(card);
  });
}


document.addEventListener("DOMContentLoaded", () => {
  fetchInstructorsFromSheet();
});


/* ------------------------------
     Hero render function
  --------------------------------*/

  function renderHeroBatches(batches) {
  const heroContainer = document.getElementById("heroBatches");
  if (!heroContainer) return;

  heroContainer.innerHTML = "";

  batches.slice(0, 3).forEach(batch => {
    const card = document.createElement("div");

    card.className = `
      relative
      rounded-2xl
      bg-white
      border border-black/5
      px-5 py-5
      shadow-[0_12px_30px_rgba(0,0,0,0.06)]
      transition-all duration-300 ease-out
      hover:-translate-y-1.5
      hover:shadow-[0_22px_50px_rgba(0,0,0,0.12)]
      w-full max-w-[340px]
      group
    `;

    card.innerHTML = `
      <!-- Accent strip -->
      <div class="absolute left-0 top-0 h-full w-1.5 bg-accent rounded-l-2xl"></div>

      <!-- Header -->
      <div class="flex items-start justify-between gap-3 mb-4">
        <h4 class="text-[15px] font-semibold text-primary leading-snug">
          ${batch.title}
        </h4>

        ${
          batch.badge
            ? `<span
                class="text-[11px] px-3 py-1 rounded-full
                       bg-accent/10 text-accent
                       font-semibold whitespace-nowrap">
                ${batch.badge}
              </span>`
            : ""
        }
      </div>

      <!-- Divider -->
      <div class="h-px bg-black/5 mb-4"></div>

      <!-- Info -->
      <div class="space-y-3 text-[14px] text-muted mb-5">

        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
            <i class="fa-regular fa-calendar text-accent text-sm"></i>
          </div>
          <span class="font-medium text-primary">${batch.startDate}</span>
        </div>

        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
            <i class="fa-solid fa-laptop-code text-accent text-sm"></i>
          </div>
          <span>${batch.mode}</span>
        </div>

      </div>

      <!-- CTA -->
<a
  href="#callback"
  class="inline-flex justify-center items-center w-full
         bg-gray-700 text-white py-2.5 rounded-md
         font-semibold text-sm
         transition-all duration-300
         hover:bg-gray-800 hover:shadow-md"
>
  Enroll Now
</a>

    `;

    heroContainer.appendChild(card);
  });
}


//   function renderHeroBatches(batches) {
//   const heroContainer = document.getElementById("heroBatches");
//   if (!heroContainer) return;

//   heroContainer.innerHTML = "";

//   batches.slice(0, 3).forEach(batch => {
//     const card = document.createElement("div");

//     card.className = `
//       relative
//       rounded-2xl
//       bg-white
//       border border-black/5
//       px-6 py-5
//       shadow-[0_12px_30px_rgba(0,0,0,0.06)]
//       transition-all duration-300 ease-out
//       hover:-translate-y-1.5
//       hover:shadow-[0_22px_50px_rgba(0,0,0,0.12)]
//       group
//     `;

//     card.innerHTML = `
//       <!-- Accent strip -->
//       <div class="absolute left-0 top-0 h-full w-1.5 bg-accent rounded-l-2xl"></div>

//       <!-- Header -->
//       <div class="flex items-start justify-between gap-4 mb-5">
//         <h4 class="text-[16px] font-semibold text-primary leading-snug">
//           ${batch.title}
//         </h4>

//         ${
//           batch.badge
//             ? `<span
//                 class="text-[11px] px-3 py-1 rounded-full
//                        bg-accent/10 text-accent
//                        font-semibold whitespace-nowrap">
//                 ${batch.badge}
//               </span>`
//             : ""
//         }
//       </div>

//       <!-- Divider -->
//       <div class="h-px bg-black/5 mb-4"></div>

//       <!-- Info -->
//       <div class="space-y-3 text-[14px] text-muted">

//         <div class="flex items-center gap-3">
//           <div class="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
//             <i class="fa-regular fa-calendar text-accent text-sm"></i>
//           </div>
//           <span class="font-medium text-primary">${batch.startDate}</span>
//         </div>

//         <div class="flex items-center gap-3">
//           <div class="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
//             <i class="fa-solid fa-laptop-code text-accent text-sm"></i>
//           </div>
//           <span>${batch.mode}</span>
//         </div>

//       </div>
//     `;

//     heroContainer.appendChild(card);
//   });
// }


//   function renderHeroBatches(batches) {
//   const heroContainer = document.getElementById("heroBatches");
//   if (!heroContainer) return;

//   heroContainer.innerHTML = "";

//   batches.slice(0, 3).forEach(batch => {
//     const card = document.createElement("div");

//     card.className = `
//       relative
//       rounded-2xl
//       bg-[#faf9f5]
//       border border-[#BFC0C0]/30
//       px-6 py-5
//       shadow-[0_10px_30px_rgba(0,0,0,0.06)]
//       transition-all duration-300
//       hover:-translate-y-1
//       hover:shadow-[0_20px_45px_rgba(0,0,0,0.10)]
//     `;

//     card.innerHTML = `
//       <!-- Accent strip -->
//       <div class="absolute left-0 top-0 h-full w-1.5 bg-[#EF8354] rounded-l-2xl"></div>

//       <!-- Header -->
//       <div class="flex items-start justify-between gap-3 mb-4">
//         <h4 class="text-[16px] font-semibold text-[#2D3142] leading-snug">
//           ${batch.title}
//         </h4>

//         ${
//           batch.badge
//             ? `<span
//                 class="text-[11px] px-3 py-1 rounded-full
//                        bg-primary
//                        text-white font-medium whitespace-nowrap">
//                 ${batch.badge}
//               </span>`
//             : ""
//         }
//       </div>

//       <!-- Info -->
//       <div class="space-y-2 text-[14px] text-[#4F5D75]">
//         <div class="flex items-center gap-2">
//           <i class="fa-regular fa-calendar text-[#EF8354]"></i>
//           <span>${batch.startDate}</span>
//         </div>

//         <div class="flex items-center gap-2">
//           <i class="fa-solid fa-laptop-code text-[#EF8354]"></i>
//           <span>${batch.mode}</span>
//         </div>
//       </div>
//     `;

//     heroContainer.appendChild(card);
//   });
// }


// function renderHeroBatches(batches) {
//   const heroContainer = document.getElementById("heroBatches");
//   if (!heroContainer) return;

//   heroContainer.innerHTML = "";

//   batches.slice(0, 3).forEach(batch => {
//     const card = document.createElement("div");

//     card.className = `
//       relative
//       rounded-2xl
//       bg-[#faf9f5]
//       border border-[#BFC0C0]/30
//       px-6 py-5
//       shadow-[0_10px_30px_rgba(0,0,0,0.06)]
//       transition-all duration-300
//       hover:-translate-y-1
//       hover:shadow-[0_20px_45px_rgba(0,0,0,0.10)]
//     `;

//     card.innerHTML = `
//       <!-- Accent strip -->
//       <div class="absolute left-0 top-0 h-full w-1.5 bg-[#EF8354] rounded-l-2xl"></div>

//       <!-- Header -->
//       <div class="flex items-start justify-between gap-3 mb-4">
//         <h4 class="text-[16px] font-semibold text-[#2D3142] leading-snug">
//           ${batch.title}
//         </h4>


//         ${
//           batch.badge
//             ? `<span
//                 class="text-[11px] px-3 py-1 rounded-full
//                        bg-primary
//                        text-white font-medium whitespace-nowrap">
//                 ${batch.badge}
//               </span>`
//             : ""
//         }
//       </div>

//       <!-- Info -->
//       <div class="space-y-2 text-[14px] text-[#4F5D75]">
//         <div class="flex items-center gap-2">
//           <span class="text-[#EF8354]">📅</span>
//           <span>${batch.startDate}</span>
//         </div>

//         <div class="flex items-center gap-2">
//           <span class="text-[#EF8354]">💻</span>
//           <span>${batch.mode}</span>
//         </div>
//       </div>
//     `;

//     heroContainer.appendChild(card);
//   });
// }




/* ------------------------------
     FETCH UPCOMMING BATCHES FROM EXCEL
  --------------------------------*/

  async function fetchBatchesFromSheet() {
    try {
      const res = await fetch(BATCHES_API);
      const data = await res.json();

      if (!Array.isArray(data)) {
        console.error("Invalid batches data:", data);
        return;
      }

      batchesData = data;
      renderBatches(); // 👈 tera same render logic call
      // renderHeroBatches(batchesData);
      renderHeroBatches(batchesData);

    } catch (err) {
      console.error("Failed to load batches:", err);
    }
  }




/***********************
  PREMIUM BATCH CARDS
************************/

function renderBatches() {
  const batchesContainer = document.getElementById("batchesContainer");
  batchesContainer.innerHTML = "";

  batchesData.forEach(batch => {
    const card = document.createElement("div");

    card.className = `
      bg-white rounded-2xl overflow-hidden
      border border-muted/30
      transition-all duration-300
      hover:shadow-2xl hover:-translate-y-1
    `;

    card.innerHTML = `
      <div class="relative bg-secondary/10 p-6">
        <span class="absolute top-4 right-4 bg-primary text-white text-xs px-3 py-1 rounded-full">
          ${batch.badge}
        </span>

        <h3 class="font-heading text-xl font-semibold text-primary mb-2">
          ${batch.title}
        </h3>

        <p class="text-sm text-primary/80">
          ${batch.description}
        </p>
      </div>

      <div class="p-6 space-y-4 text-sm">
        <div class="flex items-start gap-3">
          <span>🎓</span>
          <p>${batch.eligibility}</p>
        </div>

        <div class="flex items-start gap-3">
          <span>📅</span>
          <p><strong>Next Batch:</strong> ${batch.startDate}</p>
        </div>

        <div class="flex items-start gap-3">
          <span>⏳</span>
          <p><strong>Duration:</strong> ${batch.duration}</p>
        </div>

        <div class="flex items-start gap-3">
          <span>💻</span>
          <p><strong>Mode:</strong> ${batch.mode}</p>
        </div>
      </div>

      <div class="p-6 flex gap-4">
        <a
          href="${batch.brochure}"
          class="flex-1 text-center border border-primary text-primary py-2 rounded-md font-medium hover:bg-primary hover:text-white transition"
        >
          Download Brochure
        </a>

        <a
          href="#callback"
          class="flex-1 inline-flex justify-center items-center bg-accent text-white py-2 px-4 rounded-md font-semibold hover:opacity-90 transition"
        >
          ${batch.cta}
        </a>
      </div>
    `;

    batchesContainer.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fetchBatchesFromSheet();
});



