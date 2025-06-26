// ============================
// ELEMENTOS
// ============================
const grid = document.getElementById("product-grid");
const cards = [...grid.querySelectorAll(".card")];
const campoBusca = document.getElementById("search");

// ============================
// BUSCA POR NOME
// ============================
function buscarProdutos() {
  const termo = campoBusca.value.toLowerCase();

  cards.forEach(card => {
    const titulo = card.querySelector("h4, h2")?.textContent.toLowerCase() || "";
    const mostrar = titulo.includes(termo);
    card.style.display = mostrar ? "block" : "none";
  });
}

campoBusca.addEventListener("input", buscarProdutos);

// ============================
// SLIDER DE PROMOÇÕES
// ============================
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
const dotsContainer = document.getElementById("slider-dots");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
    if (dotsContainer.children[i]) {
      dotsContainer.children[i].classList.toggle("active", i === index);
    }
  });
  currentSlide = index;
}

function moveSlide(direction) {
  let newIndex = currentSlide + direction;
  if (newIndex < 0) newIndex = totalSlides - 1;
  if (newIndex >= totalSlides) newIndex = 0;
  showSlide(newIndex);
}

slides.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.addEventListener("click", () => showSlide(i));
  dotsContainer.appendChild(dot);
});

showSlide(currentSlide);
setInterval(() => moveSlide(1), 6000);

document.addEventListener("DOMContentLoaded", () => {
  const categoryCheckboxes = document.querySelectorAll(".filter-category");
  const priceMinInput = document.getElementById("price-min");
  const priceMaxInput = document.getElementById("price-max");
  const applyBtn = document.getElementById("btn-apply");
  const resetBtn = document.getElementById("btn-reset");
  const productGrid = document.getElementById("product-grid");
  const cards = productGrid.querySelectorAll(".card");

  function parsePrice(text) {
    // Pega o número do preço formatado (ex: "R$ 1.200" ou "R$ 1.200,00")
    let num = text.replace(/[^0-9,]/g, "").replace(",", ".");
    return parseFloat(num) || 0;
  }

  function filterProducts() {
    // Quais categorias estão marcadas?
    const selectedCategories = Array.from(categoryCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value.toLowerCase());

    const minPrice = parseFloat(priceMinInput.value) || 0;
    const maxPrice = parseFloat(priceMaxInput.value) || Infinity;

    cards.forEach(card => {
      // Pega a categoria do card (procura no texto Categoria: XXX)
      const categoryText = card.querySelector(".card-body p:nth-child(2)");
      const priceText = card.querySelector(".card-body p:nth-child(3)");

      let category = "";
      if (categoryText) {
        category = categoryText.textContent.toLowerCase().replace("categoria:", "").trim();
      }

      let price = 0;
      if (priceText) {
        price = parsePrice(priceText.textContent);
      } else {
        // Se o card não tem categoria e preço (ex: alguns produtos no seu html),
        // tenta pegar preço do segundo <p> se existir
        const pElems = card.querySelectorAll(".card-body p");
        if (pElems.length > 0) price = parsePrice(pElems[pElems.length - 1].textContent);
      }

      const matchCategory = selectedCategories.includes(category);
      const matchPrice = price >= minPrice && price <= maxPrice;

      if (matchCategory && matchPrice) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  }

  applyBtn.addEventListener("click", filterProducts);

  resetBtn.addEventListener("click", () => {
    categoryCheckboxes.forEach(cb => (cb.checked = true));
    priceMinInput.value = "";
    priceMaxInput.value = "";
    cards.forEach(card => (card.style.display = "flex"));
  });
});