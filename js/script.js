// ===== Helpers =====
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// ===== Elements =====
const themeBtn = $("#themeBtn");
const contactForm = $("#contactForm");
const formMessage = $("#formMessage");

const searchInput = $("#searchInput");
const projectCards = $$(".project-card");
const noResults = $("#noResults");

// ===== Theme toggle with localStorage =====
(function initTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }

  updateThemeIcon();
})();

function updateThemeIcon() {
  if (!themeBtn) return;

  if (document.body.classList.contains("dark")) {
    themeBtn.textContent = "☀️";
  } else {
    themeBtn.textContent = "🌙";
  }
}

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    updateThemeIcon();
  });
}

// ===== Project Search (Dynamic Content) =====
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    let found = false;

    projectCards.forEach((card) => {
      const projectText = card.getAttribute("data-project").toLowerCase();

      if (projectText.includes(query)) {
        card.style.display = "block";
        found = true;
      } else {
        card.style.display = "none";
      }
    });

    if (noResults) {
      if (found) {
        noResults.style.display = "none";
      } else {
        noResults.style.display = "block";
      }
    }
  });
}

// ===== Contact Form Validation and Feedback =====
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = $("#name").value.trim();
    const email = $("#email").value.trim();
    const message = $("#message").value.trim();

    if (!name || !email || !message) {
      formMessage.textContent = "Please fill in all fields before sending your message.";
      formMessage.style.color = "red";
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      formMessage.textContent = "Please enter a valid email address.";
      formMessage.style.color = "red";
      return;
    }

    formMessage.textContent = `Thank you, ${name}! Your message has been received successfully.`;
    formMessage.style.color = "green";

    contactForm.reset();
  });
}