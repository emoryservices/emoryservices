const services = {
  designs: {
    number: "01 / 05",
    tag: "Residential Design",
    mark: "D",
    name: "Emory Services",
    emphasis: "Designs",
    description:
      "Thoughtful residential plans for additions, remodels, kitchens, bathrooms, garages, decks, and more.",
    features: ["Permit plan sets", "Existing and as-built plans", "Revision assistance"],
    label: "Visit Emory Services Designs",
    url: "https://designs.emory.services",
    color: "var(--designs)",
  },
  realty: {
    number: "02 / 05",
    tag: "Real Estate",
    mark: "M",
    name: "Missy Emory",
    emphasis: "@ Huff Realty",
    description:
      "Personal guidance and clear communication to help you buy or sell with confidence.",
    features: ["Home buying", "Home selling", "Personal guidance"],
    label: "Visit Missy Emory at Huff Realty",
    url: "https://missyemory.huff.com",
    color: "var(--realty)",
  },
  kitchen: {
    number: "03 / 05",
    tag: "Prepared Meals",
    mark: "K",
    name: "Emory",
    emphasis: "Kitchen Co.",
    description:
      "Comforting, chef-prepared meals made with care for a deliciously easy week.",
    features: ["Weekly menu", "Prepared with care", "Easy ordering"],
    label: "Visit Emory Kitchen Co.",
    url: "https://kitchen.emory.services",
    color: "var(--kitchen)",
  },
  notary: {
    number: "04 / 05",
    tag: "Notary Service",
    mark: "S",
    name: "Emory",
    emphasis: "Sign & Seal",
    description:
      "Professional, dependable notarization with a simple way to get started when your documents matter.",
    features: ["Reliable service", "Clear next steps", "Convenient appointments"],
    label: "Visit Emory Sign & Seal",
    url: "https://notary.emory.services",
    color: "var(--notary)",
  },
  tech: {
    number: "05 / 05",
    tag: "Technology Solutions",
    mark: "T",
    name: "Emory",
    emphasis: "Tech",
    description:
      "Practical technology solutions for small businesses, professionals, and people who want their technology to work better.",
    features: ["IT and cloud", "Websites and digital cards", "Security and automation"],
    label: "Visit EmoryTech",
    url: "https://helpme.emorytech.us",
    color: "var(--tech)",
  },
};

const options = [...document.querySelectorAll(".finder-option")];
const panel = document.querySelector(".finder-result");

function selectService(key, moveFocus = false) {
  const service = services[key];
  if (!service || !panel) return;

  options.forEach((option) => {
    const active = option.dataset.service === key;
    option.classList.toggle("is-active", active);
    option.setAttribute("aria-selected", active ? "true" : "false");
    option.tabIndex = active ? 0 : -1;
  });

  panel.style.setProperty("--active", service.color);
  panel.querySelector(".result-number").textContent = service.number;
  panel.querySelector(".result-tag").textContent = service.tag;
  panel.querySelector(".result-watermark").textContent = service.mark;
  panel.querySelector(".result-copy h3").innerHTML = `${service.name} <em>${service.emphasis}</em>`;
  panel.querySelector(".result-description").textContent = service.description;
  panel.querySelector(".result-features").innerHTML = service.features
    .map((feature) => `<li>${feature}</li>`)
    .join("");

  const link = panel.querySelector(".result-link");
  const linkIcon = link.querySelector("svg").outerHTML;
  link.href = service.url;
  link.innerHTML = `${service.label}${linkIcon}`;

  if (moveFocus) panel.focus({ preventScroll: true });
}

options.forEach((option, index) => {
  option.addEventListener("click", () => selectService(option.dataset.service));
  option.addEventListener("keydown", (event) => {
    if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();

    let nextIndex = index;
    if (["ArrowDown", "ArrowRight"].includes(event.key)) nextIndex = (index + 1) % options.length;
    if (["ArrowUp", "ArrowLeft"].includes(event.key)) nextIndex = (index - 1 + options.length) % options.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = options.length - 1;

    const nextOption = options[nextIndex];
    nextOption.focus();
    selectService(nextOption.dataset.service);
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
