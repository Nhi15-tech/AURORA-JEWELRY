/* =========================================================
   AURORA JEWELRY — INTERACTIONS
   ========================================================= */
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.setAttribute("aria-expanded", "false");

    toggle.addEventListener("click", function () {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Active navigation
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    const href = a.getAttribute("href");
    if (href === current) a.classList.add("active");
  });

  // Product filters — used on nhan.html
  const filterButtons = document.querySelectorAll(".filter-bar button");
  const productCards = document.querySelectorAll(".product-card[data-category]");

  if (filterButtons.length && productCards.length) {
    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.textContent.trim().toLowerCase();

        productCards.forEach(function (card) {
          const category = (card.dataset.category || "").toLowerCase();
          card.classList.toggle(
            "is-hidden",
            filter !== "tất cả" && !category.includes(filter)
          );
        });
      });
    });
  }

  // Order form
  const orderForm = document.getElementById("order-form");
  if (orderForm) {
    orderForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!orderForm.checkValidity()) {
        orderForm.reportValidity();
        return;
      }

      const submitButton = orderForm.querySelector('button[type="submit"]');
      const originalText = submitButton ? submitButton.textContent : "";

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "ĐANG XỬ LÝ...";
      }

      setTimeout(function () {
        alert("Cảm ơn bạn! Aurora Jewelry đã nhận được yêu cầu đặt hàng.");
        orderForm.reset();

        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalText;
        }
      }, 500);
    });
  }
});
