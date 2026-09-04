(() => {
  const images = [...document.querySelectorAll(".page-content img:not(.emoji)")].filter(
    (image) => !image.closest("a")
  );

  if (!images.length) return;

  const viewer = document.createElement("div");
  viewer.className = "image-lightbox";
  viewer.hidden = true;
  viewer.setAttribute("role", "dialog");
  viewer.setAttribute("aria-modal", "true");
  viewer.setAttribute("aria-label", "画像を拡大表示");
  viewer.innerHTML =
    '<div class="image-lightbox__panel"><button class="image-lightbox__close" type="button" aria-label="拡大表示を閉じる">&times;</button><img class="image-lightbox__image" alt=""></div>';
  document.body.append(viewer);

  const expandedImage = viewer.querySelector("img");
  const panel = viewer.querySelector(".image-lightbox__panel");
  const closeButton = viewer.querySelector("button");
  let triggerImage = null;

  const close = () => {
    if (viewer.hidden) return;
    viewer.hidden = true;
    document.body.style.overflow = "";
    triggerImage?.focus();
  };

  const open = (image) => {
    triggerImage = image;
    expandedImage.src = image.currentSrc || image.src;
    expandedImage.alt = image.alt;
    viewer.hidden = false;
    document.body.style.overflow = "hidden";
    closeButton.focus();
  };

  images.forEach((image) => {
    image.dataset.lightboxImage = "";
    image.tabIndex = 0;
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", `${image.alt || "画像"}を拡大表示`);
    image.addEventListener("click", () => open(image));
    image.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open(image);
      }
    });
  });

  closeButton.addEventListener("click", close);
  expandedImage.addEventListener("click", close);
  viewer.addEventListener("click", (event) => {
    if (!panel.contains(event.target)) close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });
})();
