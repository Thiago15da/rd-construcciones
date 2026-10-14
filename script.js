// Navegación y año de copyright.
const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-links");
function closeMenu() {
  if (!menu || !menuButton) return;
  menu.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menú");
}
menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menu?.classList.toggle("open", !isOpen);
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
});
menu?.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeMenu();
});
const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());

// Visor accesible: se utilizan las diez imágenes originales de la galería.
const galleryTriggers = Array.from(document.querySelectorAll(".gallery-trigger"));
const viewer = document.querySelector("#gallery-dialog");
const viewerImage = viewer?.querySelector(".dialog-image");
const viewerCaption = viewer?.querySelector(".dialog-caption");
const viewerCounter = viewer?.querySelector(".dialog-counter");
let currentImageIndex = 0;
let lastGalleryTrigger = null;

function showGalleryImage(index) {
  if (!viewerImage || galleryTriggers.length === 0) return;
  currentImageIndex = (index + galleryTriggers.length) % galleryTriggers.length;
  const item = galleryTriggers[currentImageIndex];
  const photo = item.querySelector("img");
  viewerImage.src = photo.getAttribute("src");
  viewerImage.alt = photo.alt;
  if (viewerCaption) viewerCaption.textContent = item.parentElement.querySelector("figcaption")?.textContent || "RD Construcciones";
  if (viewerCounter) viewerCounter.textContent = String(currentImageIndex + 1).padStart(2, "0") + " / " + String(galleryTriggers.length).padStart(2, "0");
}
galleryTriggers.forEach((trigger, index) => {
  trigger.addEventListener("click", () => {
    if (!viewer || typeof viewer.showModal !== "function") return;
    lastGalleryTrigger = trigger;
    showGalleryImage(index);
    viewer.showModal();
    viewer.querySelector(".dialog-close")?.focus();
  });
});
viewer?.querySelector(".dialog-close")?.addEventListener("click", () => viewer.close());
viewer?.querySelector(".dialog-prev")?.addEventListener("click", () => showGalleryImage(currentImageIndex - 1));
viewer?.querySelector(".dialog-next")?.addEventListener("click", () => showGalleryImage(currentImageIndex + 1));
viewer?.addEventListener("keydown", event => {
  if (event.key === "ArrowRight") { event.preventDefault(); showGalleryImage(currentImageIndex + 1); }
  if (event.key === "ArrowLeft") { event.preventDefault(); showGalleryImage(currentImageIndex - 1); }
});
viewer?.addEventListener("click", event => {
  if (event.target === viewer) viewer.close();
});
viewer?.addEventListener("close", () => lastGalleryTrigger?.focus());
