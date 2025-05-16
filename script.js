// ================= SLIDER =================
const slides = document.querySelectorAll('.slides img');
const dots = document.querySelectorAll('.dot');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

let index = 0;

function showSlide(i) {
  slides.forEach((slide, j) => {
    slide.classList.toggle('active', j === i);
    dots[j].classList.toggle('active', j === i);
  });
}

function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide(index);
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
}

next?.addEventListener('click', nextSlide);
prev?.addEventListener('click', prevSlide);

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    index = i;
    showSlide(index);
  });
});

setInterval(nextSlide, 5000); // Auto slide every 5s

// ================= CART =================
document.addEventListener("DOMContentLoaded", () => {
  // Hiển thị giỏ hàng trong cart.html
  if (document.querySelector("#cart-items")) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const totalPriceElement = document.getElementById("total-price");

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Giỏ hàng của bạn đang trống.</p>";
      cartCount.textContent = "Bạn đang có 0 sản phẩm trong giỏ hàng";
      totalPriceElement.textContent = "0";
      return;
    }

    let total = 0;
    cart.forEach((item, index) => {
      const priceNumber = parseInt(item.price.replace(/[^\d]/g, ""));
      total += priceNumber;

      const itemHTML = `
        <div class="cart-item" style="display: flex; gap: 15px; margin-bottom: 15px; align-items: center;">
          <img src="${item.image}" alt="${item.name}" style="width: 80px; height: auto;">
          <div style="flex: 1;">
            <h4 style="margin: 5px 0;">${item.name}</h4>
            <p style="color: green;">${item.price}</p>
          </div>
          <button onclick="removeFromCart(${index})" style="background: red; color: white; border: none; padding: 6px 12px; cursor: pointer;">Xóa</button>
        </div>
      `;
      cartContainer.innerHTML += itemHTML;
    });

    cartCount.textContent = `Bạn đang có ${cart.length} sản phẩm trong giỏ hàng`;
    totalPriceElement.textContent = total.toLocaleString("vi-VN");
  }

  // Xử lý "Thêm vào giỏ hàng" ở trang Home / Shop
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      const productCard = e.target.closest(".product-card");
      const name = productCard.querySelector(".product-name")?.textContent.trim();
      const price = productCard.querySelector(".new-price")?.textContent.trim();
      const image = productCard.querySelector("img")?.getAttribute("src");

      if (!name || !price || !image) return;

      const product = { name, price, image };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));

      alert(`Đã thêm "${name}" vào giỏ hàng!`);
    });
  });
});

// ================= XÓA KHỎI GIỎ =================
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}
