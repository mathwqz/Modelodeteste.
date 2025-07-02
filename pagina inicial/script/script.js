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
// SLIDER DE PROMOÇÕES ka
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


window.addEventListener('load', () => {
  const tempo = performance.now();
  console.log(`A página carregou em ${tempo.toFixed(2)} milissegundos.`);
});

// JavaScript (script.js)
let inicio; // variável para armazenar o tempo inicial

document.getElementById("botao").addEventListener("click", () => {
  inicio = performance.now(); // marca o tempo quando o botão é clicado

  // Simula uma ação que demora (como carregar dados)
  setTimeout(() => {
    const fim = performance.now(); // marca o tempo quando a ação termina
    const duracao = fim - inicio; // calcula o tempo total
    console.log(`Tempo de resposta: ${duracao.toFixed(2)} milissegundos.`);
  }, 500); // espera 500ms (simulando um atraso)
});


function abrirManual() {
  const modal = document.getElementById('manualModal');
  if (!localStorage.getItem('manualVisto')) {
    modal.style.display = 'block';
  }
}

function fecharManual() {
  const modal = document.getElementById('manualModal');
  modal.style.display = 'none';
  localStorage.setItem('manualVisto', 'true');
}

window.addEventListener('DOMContentLoaded', abrirManual);


  function toggleUserMenu() {
    const menu = document.getElementById("userDropdown");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  }

  // Mostrar nome e avatar ao carregar
  window.onload = function () {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      document.getElementById("userName").textContent = user.nome;
      const avatar = localStorage.getItem(`avatar_${user.email}`);
      if (avatar) {
        document.getElementById("userAvatar").src = avatar;
      }
    }
  };

  function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "/pagina inicial/html/login.html";
  }

  // Fecha menu se clicar fora
  document.addEventListener("click", function (event) {
    const menu = document.getElementById("userDropdown");
    const avatar = document.getElementById("userAvatar");
    if (!menu.contains(event.target) && !avatar.contains(event.target)) {
      menu.style.display = "none";
    }
  });

