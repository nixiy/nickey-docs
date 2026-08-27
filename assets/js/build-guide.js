(() => {
  const guide = document.querySelector(".post-content");
  if (!guide) return;

  const modal = document.createElement("div");
  modal.className = "lightbox";
  modal.hidden = true;
  modal.innerHTML = `<div class="lightbox-dialog" role="dialog" aria-modal="true" aria-label="画像を拡大表示"><button class="lightbox-close" type="button" aria-label="画像を閉じる">×</button><img class="lightbox-image" alt=""><p class="lightbox-caption"></p></div>`;
  document.body.append(modal);

  const modalImage = modal.querySelector(".lightbox-image");
  const caption = modal.querySelector(".lightbox-caption");
  const closeButton = modal.querySelector(".lightbox-close");
  let lastTrigger;

  const close = () => {
    modal.hidden = true;
    modalImage.removeAttribute("src");
    lastTrigger?.focus();
  };
  const open = (image, trigger) => {
    lastTrigger = trigger;
    modalImage.src = image.currentSrc || image.src;
    modalImage.alt = image.alt;
    caption.textContent = image.alt;
    modal.hidden = false;
    closeButton.focus();
  };

  guide.querySelectorAll("img:not(.emoji)").forEach((image) => {
    if (image.closest(".guide-image-button")) return;
    const parent = image.parentElement;
    const figure = document.createElement("figure");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "guide-image-button";
    button.setAttribute("aria-label", `${image.alt || "画像"}を拡大表示`);
    if (parent.tagName === "P" && parent.childNodes.length === 1) {
      parent.before(figure);
    } else {
      image.before(figure);
    }
    figure.append(button);
    button.append(image);
    if (image.alt) {
      const figcaption = document.createElement("figcaption");
      figcaption.textContent = image.alt;
      figure.append(figcaption);
    }
    if (parent.tagName === "P" && parent.childNodes.length === 0) parent.remove();
    button.addEventListener("click", () => open(image, button));
  });

  [
    "ソケット1個分の片側パッド",
    "バッテリー側の片方の線だけ",
    "トッププレートとPCBを重ね",
    "左右それぞれのXIAO",
    "レイヤー0でSpace左隣",
    "右側へ settings_reset",
  ].forEach((snippet) => {
    const procedure = [...guide.querySelectorAll("ol")].find((list) =>
      list.firstElementChild?.textContent.includes(snippet)
    );
    procedure?.classList.add("procedure");
  });

  [...guide.children].forEach((element) => {
    const next = element.nextElementSibling;
    if (element.tagName === "FIGURE" && next?.tagName === "FIGURE" && !element.parentElement.classList.contains("guide-hero")) {
      const gallery = document.createElement("div");
      gallery.className = "gallery";
      element.before(gallery);
      gallery.append(element, next);
    }
  });

  closeButton.addEventListener("click", close);
  modal.addEventListener("click", (event) => { if (event.target === modal) close(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !modal.hidden) close(); });
})();
