const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const privacyOpen = document.getElementById("privacyOpen");
const privacyModal = document.getElementById("privacyModal");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
let lastScroll = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;
  const menuIsOpen = !mobileMenu.classList.contains("hidden");
  if (currentScroll > lastScroll && currentScroll > 120 && !menuIsOpen) {
    header.style.transform = "translateY(-120%)";
  } else {
    header.style.transform = "translateY(0)";
  }
  lastScroll = Math.max(currentScroll, 0);
}, { passive: true });

menuToggle.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("hidden") === false;
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const openModal = (modal) => {
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
};

const closeModal = (modal) => {
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
};

privacyOpen.addEventListener("click", () => openModal(privacyModal));

document.querySelectorAll("[data-modal-close]").forEach((button) => {
  button.addEventListener("click", () => closeModal(privacyModal));
});

document.querySelectorAll("[data-lightbox]").forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.getAttribute("data-lightbox");
    const img = button.querySelector("img");
    lightboxImage.src = image;
    lightboxImage.alt = img ? img.alt : "Imagem ampliada da Drogaria Total Farma Gold";
    openModal(lightbox);
  });
});

document.querySelectorAll("[data-lightbox-close]").forEach((button) => {
  button.addEventListener("click", () => closeModal(lightbox));
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (!privacyModal.classList.contains("hidden")) closeModal(privacyModal);
    if (!lightbox.classList.contains("hidden")) closeModal(lightbox);
  }
});
