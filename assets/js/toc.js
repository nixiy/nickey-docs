(() => {
  const content = document.querySelector(".post-content") || document.querySelector("main");
  const lists = document.querySelectorAll("[data-toc-list]");

  if (!content || !lists.length) return;

  const headings = [...content.querySelectorAll("h2, h3")].filter(
    (heading) => !heading.closest("[data-toc]")
  );
  const usedIds = new Set();

  const makeId = (heading, index) => {
    const base =
      heading.id ||
      heading.textContent
        .normalize("NFKC")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\p{Letter}\p{Number}_-]/gu, "") ||
      `section-${index + 1}`;
    let id = base;
    let suffix = 2;

    while (usedIds.has(id) || (document.getElementById(id) && document.getElementById(id) !== heading)) {
      id = `${base}-${suffix++}`;
    }

    usedIds.add(id);
    heading.id = id;
    return id;
  };

  const sections = headings.map((heading, index) => ({
    heading,
    id: makeId(heading, index),
    level: Number(heading.tagName.slice(1)),
    label: heading.textContent.trim(),
  }));

  lists.forEach((list) => {
    sections.forEach(({ id, level, label }) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      item.className = `toc-level-${level}`;
      link.href = `#${id}`;
      link.textContent = label;
      link.dataset.tocTarget = id;
      item.append(link);
      list.append(item);
    });
  });

  if (!("IntersectionObserver" in window)) return;

  const links = [...document.querySelectorAll("[data-toc-target]")];
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (!visible) return;
      links.forEach((link) => {
        link.classList.toggle("is-active", link.dataset.tocTarget === visible.target.id);
      });
    },
    { rootMargin: "-15% 0px -75%", threshold: 0 }
  );

  sections.forEach(({ heading }) => observer.observe(heading));
})();

