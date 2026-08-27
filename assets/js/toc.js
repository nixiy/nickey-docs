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

  let h2Number = 0;
  let h3Number = 0;
  const sections = headings.map((heading, index) => {
    const level = Number(heading.tagName.slice(1));

    if (level === 2) {
      h2Number += 1;
      h3Number = 0;
    } else {
      h3Number += 1;
    }

    return {
      heading,
      id: makeId(heading, index),
      level,
      number: level === 2 ? `${h2Number}` : `${h2Number}.${h3Number}`,
      label: heading.dataset.tocLabel || heading.textContent.trim(),
      step: heading.dataset.step,
    };
  });

  sections.forEach(({ heading, number, step }) => {
    if (!step) return;
    const numberLabel = document.createElement("span");
    numberLabel.className = "step-number";
    numberLabel.textContent = `STEP ${step}`;
    heading.prepend(numberLabel);
  });

  lists.forEach((list) => {
    let currentH2Item = null;
    let sublist = null;

    sections.forEach(({ id, level, number, label, step }) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      const numberLabel = document.createElement("span");
      const textLabel = document.createElement("span");
      item.className = `toc-level-${level}`;
      link.href = `#${id}`;
      link.dataset.tocTarget = id;
      numberLabel.className = "toc-number";
      numberLabel.textContent = step ? step : number;
      textLabel.textContent = label;
      link.append(numberLabel, textLabel);
      item.append(link);

      if (level === 2) {
        list.append(item);
        currentH2Item = item;
        sublist = null;
        return;
      }

      if (!currentH2Item) {
        list.append(item);
        return;
      }

      if (!sublist) {
        sublist = document.createElement("ol");
        sublist.className = "toc-sublist";
        currentH2Item.append(sublist);
      }

      sublist.append(item);
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
