const STORAGE_KEY = "faxpc-cart";
const SEED_KEY = "faxpc-cart-seeded";
const COUPON_KEY = "faxpc-coupon";

const couponCatalog = {
  SAVE10: { type: "percent", value: 10 },
  SAVE20: { type: "percent", value: 20 },
  FLAT50: { type: "flat", value: 50 },
};

const sampleItems = [
  {
    id: "gaming-subtitle-presets",
    title: "Gaming Subtitle_Presets!",
    price: 99,
    qty: 1,
    image: "assets/gaming-subtitle.jpg",
  },
  {
    id: "crazy-transition-presets",
    title: "3_Crazy! Transition Preset's",
    price: 15,
    qty: 1,
    image: "assets/crazy-transition.jpg",
  },
  {
    id: "premium-photoshop",
    title: "Premium PhotoShop CC's",
    price: 51,
    qty: 1,
    image: "assets/premium-photoshop.jpg",
  },
];

const productCatalog = [
  {
    id: "gaming-subtitle-presets",
    title: "Gaming Subtitle_Presets!",
    price: 99,
    oldPrice: 299,
    tag: "SALE",
    image: "assets/p1.jpg",
    rating: 4.9,
    description:
      "Gaming subtitle presets built for bold text effects and fast edits.",
    features: [
      "Includes 7+ subtitle presets and font styles for Premiere Pro.",
    ],
  },
  {
    id: "crazy-transition-presets",
    title: "3_Crazy! Transition Preset's",
    price: 15,
    oldPrice: 99,
    tag: "3/PRESET",
    image: "assets/crazy-transition.jpg",
    rating: 4.8,
    description: "Quick transition presets for punchy edits.",
    features: ["3 ready-to-use transitions for Premiere Pro."],
  },
  {
    id: "bbs-transition-pr-file",
    title: "BBS Transition Pr_File!",
    price: 49,
    oldPrice: 389,
    tag: "2+/ZIP FILE",
    image: "assets/bbs-transition.jpg",
    rating: 4.7,
    description: "Transition files for energetic BBS-style edits.",
    features: ["2+ transition files for Premiere Pro."],
  },
  {
    id: "premium-photoshop",
    title: "Premium PhotoShop CC's",
    price: 51,
    oldPrice: 129,
    tag: "13+/ZIP FILE",
    image: "assets/premium-photoshop.jpg",
    rating: 4.7,
    description: "Premium Photoshop resources for creators.",
    features: ["13+ assets compatible with Photoshop CC."],
  },
  {
    id: "faxpc-fonts-pack",
    title: "FAXPC x Font's Pack!",
    price: 29,
    oldPrice: 99,
    tag: "30+/ZIP FILE",
    image: "assets/fonts-pack.jpg",
    rating: 4.6,
    description: "A font pack to level up your designs.",
    features: ["30+ fonts bundled in one zip."],
  },
  {
    id: "pfp-transition",
    title: "PFP_Transition!",
    price: 51,
    oldPrice: 129,
    tag: "3+/ZIP FILE",
    image: "assets/pfp-transition.jpg",
    rating: 4.6,
    description: "Smooth profile transition assets for edits.",
    features: ["3+ transition files ready to drop in."],
  },
  {
    id: "reel-editing-premiere-pro",
    title: "Reel Editing Premiere Pro File's",
    price: 99,
    oldPrice: 229,
    tag: "2+/ZIP FILE",
    image: "assets/reel-editing.jpg",
    rating: 4.9,
    description: "Premiere Pro reels project files for fast edits.",
    features: ["2+ project files built for vertical reels."],
  },
  {
    id: "creative-bgs-pack",
    title: "Creative BG's Pack!",
    price: 31,
    oldPrice: 499,
    tag: "20+/ZIP FILE",
    image: "assets/creative-bgs.jpg",
    rating: 4.5,
    description: "Creative background pack for any design.",
    features: ["20+ high-res backgrounds."],
  },
  {
    id: "gaming-intro-pr-file",
    title: "Gaming Intro Pr_File!",
    price: 199,
    oldPrice: 399,
    tag: "10+/PNG FILE",
    image: "assets/gaming-intro.jpg",
    rating: 4.8,
    description: "Gaming intro assets for bold openers.",
    features: ["10+ PNG elements for intros."],
  },
  {
    id: "cool-transitions-pr-files",
    title: "FAXPC x Cool Transitions Pr-Files!",
    price: 49,
    oldPrice: 299,
    tag: "3+/PNG FILE",
    image: "assets/cool-transitions.jpg",
    rating: 4.7,
    description: "Cool transitions pack for creative edits.",
    features: ["3+ transition overlays for Premiere Pro."],
  },
  {
    id: "bgm1-xp-characters",
    title: "BGM1-XP Character's",
    price: 35,
    oldPrice: 199,
    tag: "3+/PNG FILES",
    image: "assets/bgm1-xp-characters.jpg",
    rating: 4.6,
    description: "Character pack for stylized edits.",
    features: ["3+ PNG character assets."],
  },
  {
    id: "crazy-facecams",
    title: "Crazy! Facecams",
    price: 35,
    oldPrice: 299,
    tag: "10+/PNG FILE",
    image: "assets/crazy-facecams.jpg",
    rating: 4.6,
    description: "Facecam overlays for creators.",
    features: ["10+ PNG facecam frames."],
  },
  {
    id: "trading-high-quality-bgs",
    title: "Trading High Quality BG's",
    price: 15,
    oldPrice: 299,
    tag: "10+/PNG FILE",
    image: "assets/trading-bgs.jpg",
    rating: 4.4,
    description: "Trading-themed background pack.",
    features: ["10+ PNG backgrounds."],
  },
  {
    id: "bgm-4-1-update-bgs",
    title: "BGM 4.1 Update BG's!",
    price: 31,
    oldPrice: 129,
    tag: "15+/ZIP FILE",
    image: "assets/bgm-4-1-update-bgs.jpg",
    rating: 4.5,
    description: "Updated background set for BGM 4.1 style edits.",
    features: ["15+ backgrounds in one zip."],
  },
  {
    id: "song-edit-project-file",
    title: "Song Edit Project File!",
    price: 99,
    oldPrice: 499,
    tag: "ORDER NOW",
    image: "assets/song-edit-project.jpg",
    rating: 4.8,
    description: "Song edit project file for fast production.",
    features: ["Editable project file with organized layers."],
  },
  {
    id: "minecraft-cool-intro-file",
    title: "Minecraft Cool Intro_File!",
    price: 129,
    oldPrice: 549,
    tag: "ORDER NOW",
    image: "assets/minecraft-cool-intro.jpg",
    rating: 4.8,
    description: "Minecraft-inspired intro assets and project.",
    features: ["Intro file plus layered assets."],
  },
];

const formatPrice = (value) => `Rs. ${value.toFixed(2)}`;

const normalizeImagePath = (path) => {
  if (!path) {
    return "assets/placeholder.jpg";
  }

  let normalized = path.replace(/\\/g, "/");
  if (normalized.startsWith("/")) {
    normalized = normalized.slice(1);
  }

  return normalized;
};

const getProductById = (id) =>
  productCatalog.find((item) => item.id === id) || productCatalog[0];

const loadCart = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch (error) {
    return null;
  }
};

const saveCart = (cart) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
};

const loadCoupon = () => {
  const raw = localStorage.getItem(COUPON_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
};

const saveCoupon = (coupon) => {
  if (!coupon) {
    localStorage.removeItem(COUPON_KEY);
    return;
  }

  localStorage.setItem(COUPON_KEY, JSON.stringify(coupon));
};

const ensureSeededCart = () => {
  const existing = loadCart();
  if (existing) {
    return existing;
  }

  if (!localStorage.getItem(SEED_KEY)) {
    saveCart(sampleItems);
    localStorage.setItem(SEED_KEY, "1");
    return sampleItems;
  }

  return [];
};

const updateCartBadge = () => {
  const cart = loadCart() || [];
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const badges = document.querySelectorAll(".cart-dot");
  badges.forEach((badge) => {
    if (count > 0) {
      badge.textContent = count;
      badge.style.display = "grid";
    } else {
      badge.style.display = "none";
    }
  });
};

const addToCart = (product) => {
  const cart = loadCart() || [];
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1, image: normalizeImagePath(product.image) });
  }
  saveCart(cart);
  updateCartBadge();
};

const updateSubtotal = (cart) => {
  const subtotalEl = document.getElementById("cart-subtotal");
  const discountEl = document.getElementById("cart-discount");
  const totalEl = document.getElementById("cart-total");
  const discountRow = document.getElementById("discount-row");
  if (!subtotalEl) {
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const coupon = loadCoupon();
  let discount = 0;
  if (coupon && subtotal > 0) {
    if (coupon.type === "percent") {
      discount = (subtotal * coupon.value) / 100;
    }
    if (coupon.type === "flat") {
      discount = coupon.value;
    }
  }

  discount = Math.min(discount, subtotal);
  const total = subtotal - discount;

  subtotalEl.textContent = formatPrice(subtotal);

  if (discountEl) {
    discountEl.textContent = `- ${formatPrice(discount)}`;
  }

  if (totalEl) {
    totalEl.textContent = formatPrice(total);
  }

  if (discountRow) {
    discountRow.style.display = discount > 0 ? "flex" : "none";
  }
};

const renderCart = (cart) => {
  const list = document.getElementById("cart-list");
  if (!list) {
    return;
  }

  list.innerHTML = "";

  if (cart.length === 0) {
    list.innerHTML = '<div class="cart-empty">Your cart is empty.</div>';
    updateSubtotal(cart);
    return;
  }

  cart.forEach((item) => {
    const row = document.createElement("div");
    row.className = "cart-row";
    row.dataset.id = item.id;
    row.innerHTML = `
      <div class="cart-item">
        <div class="cart-thumb">
          <img src="${normalizeImagePath(item.image)}" alt="${item.title}" />
        </div>
        <div class="cart-details">
          <h3>${item.title}</h3>
          <div class="cart-vendor">FAXPC</div>
          <div class="cart-qty">
            <button class="qty-btn" data-action="decrease" aria-label="Decrease quantity">-</button>
            <span class="qty-count">${item.qty}</span>
            <button class="qty-btn" data-action="increase" aria-label="Increase quantity">+</button>
            <button class="link-button" data-action="remove" type="button">Remove</button>
          </div>
        </div>
      </div>
      <div class="cart-price">${formatPrice(item.price * item.qty)}</div>
    `;
    list.appendChild(row);
  });

  updateSubtotal(cart);
};

const handleCartActions = () => {
  const list = document.getElementById("cart-list");
  if (!list) {
    return;
  }

  list.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const action = target.dataset.action;
    if (!action) {
      return;
    }

    const row = target.closest(".cart-row");
    if (!row) {
      return;
    }

    const cart = loadCart() || [];
    const item = cart.find((entry) => entry.id === row.dataset.id);
    if (!item) {
      return;
    }

    if (action === "increase") {
      item.qty += 1;
    }

    if (action === "decrease") {
      item.qty = Math.max(1, item.qty - 1);
    }

    if (action === "remove") {
      const nextCart = cart.filter((entry) => entry.id !== item.id);
      saveCart(nextCart);
      renderCart(nextCart);
      updateCartBadge();
      return;
    }

    saveCart(cart);
    renderCart(cart);
    updateCartBadge();
  });
};

const setupAddToCart = () => {
  const buttons = document.querySelectorAll(".add-to-cart");
  if (buttons.length === 0) {
    return;
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const dataset = button.dataset;
      const product = {
        id: dataset.id,
        title: dataset.title,
        price: Number(dataset.price) || 0,
        image: normalizeImagePath(dataset.image),
      };

      if (!product.id || !product.title) {
        return;
      }

      addToCart(product);

      const originalText = button.textContent;
      button.textContent = "Added";
      button.classList.add("added");

      window.setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove("added");
      }, 1200);
    });
  });
};
const setupProductImages = () => {
  const cards = document.querySelectorAll(".product-card");
  if (cards.length === 0) {
    return;
  }

  cards.forEach((card) => {
    const button = card.querySelector(".add-to-cart");
    const thumb = card.querySelector(".thumb");
    if (!button || !thumb) {
      return;
    }

    const src = normalizeImagePath(button.dataset.image);
    if (!src) {
      return;
    }

    let image = thumb.querySelector(".thumb-image");
    if (!image) {
      image = document.createElement("img");
      image.className = "thumb-image";
      thumb.prepend(image);
    }

    image.src = src;
    image.alt = button.dataset.title || "Product image";
  });
};

const setupProductLinks = () => {
  const cards = document.querySelectorAll(".product-card");
  if (cards.length === 0) {
    return;
  }

  cards.forEach((card) => {
    const button = card.querySelector(".add-to-cart");
    const link = card.querySelector(".product-link");
    if (!button || !link) {
      return;
    }

    const id = button.dataset.id;
    if (!id) {
      return;
    }

    link.href = `product.html?id=${encodeURIComponent(id)}`;
  });
};

const setupProductDetailsPage = () => {
  if (document.body.dataset.page !== "product") {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const product = getProductById(id);

  const titleEl = document.getElementById("product-title");
  const priceEl = document.getElementById("product-price");
  const oldPriceEl = document.getElementById("product-old-price");
  const tagEl = document.getElementById("product-tag");
  const ratingEl = document.getElementById("product-rating");
  const descriptionEl = document.getElementById("product-description");
  const featuresEl = document.getElementById("product-features");
  const imageEl = document.querySelector(".detail-image");
  const addButton = document.querySelector(".add-to-cart");
  const buyButton = document.querySelector(".buy-now");

  if (titleEl) {
    titleEl.textContent = product.title;
  }

  if (priceEl) {
    priceEl.textContent = formatPrice(product.price);
  }

  if (oldPriceEl) {
    oldPriceEl.textContent = formatPrice(product.oldPrice);
  }

  if (tagEl) {
    tagEl.textContent = product.tag;
  }

  if (ratingEl) {
    ratingEl.textContent = `${product.rating} Average Rating`;
  }

  if (descriptionEl) {
    descriptionEl.textContent = product.description;
  }

  if (featuresEl) {
    featuresEl.innerHTML = "";
    product.features.forEach((feature) => {
      const item = document.createElement("li");
      item.textContent = feature;
      featuresEl.appendChild(item);
    });
  }

  if (imageEl) {
    imageEl.src = normalizeImagePath(product.image);
    imageEl.alt = product.title;
  }

  [addButton, buyButton].forEach((button) => {
    if (!button) {
      return;
    }

    button.dataset.id = product.id;
    button.dataset.title = product.title;
    button.dataset.price = String(product.price);
    button.dataset.image = normalizeImagePath(product.image);
  });

  document.title = `${product.title} - Likhith Visuals`;
};

const setupSort = () => {
  const sortSelect = document.getElementById("product-sort");
  const grid = document.querySelector(".product-grid");
  if (!sortSelect || !grid) {
    return;
  }

  const getPrice = (card) => {
    const button = card.querySelector(".add-to-cart");
    if (button?.dataset.price) {
      return Number(button.dataset.price) || 0;
    }

    const priceText = card.querySelector(".price")?.textContent || "";
    const numeric = priceText.replace(/[^0-9.]/g, "");
    return Number(numeric) || 0;
  };

  const getTitle = (card) => {
    const button = card.querySelector(".add-to-cart");
    if (button?.dataset.title) {
      return button.dataset.title;
    }

    return card.querySelector("h3")?.textContent?.trim() || "";
  };

  const hydrateCards = () => {
    const cards = Array.from(grid.querySelectorAll(".product-card"));
    return cards.map((card, index) => {
      if (!card.dataset.index) {
        card.dataset.index = String(index);
      }

      return {
        card,
        price: getPrice(card),
        title: getTitle(card),
        index: Number(card.dataset.index) || 0,
      };
    });
  };

  const applySort = () => {
    const value = sortSelect.value;
    const cards = hydrateCards();

    const sorted = cards.sort((a, b) => {
      if (value === "price-asc") {
        return a.price - b.price || a.index - b.index;
      }

      if (value === "price-desc") {
        return b.price - a.price || a.index - b.index;
      }

      if (value === "newest") {
        return b.index - a.index;
      }

      return a.index - b.index;
    });

    sorted.forEach(({ card }) => grid.appendChild(card));
  };

  sortSelect.addEventListener("change", applySort);
};

const updateProductCount = () => {
  const countEl = document.getElementById("product-count");
  const grid = document.querySelector(".product-grid");
  if (!countEl || !grid) {
    return;
  }

  const total = grid.querySelectorAll(".product-card").length;
  countEl.textContent = `${total} products`;
};

const setupBuyNow = () => {
  const buttons = document.querySelectorAll(".buy-now");
  if (buttons.length === 0) {
    return;
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const dataset = button.dataset;
      const product = {
        id: dataset.id,
        title: dataset.title,
        price: Number(dataset.price) || 0,
        image: normalizeImagePath(dataset.image),
      };

      if (!product.id || !product.title) {
        return;
      }

      addToCart(product);
      window.location.href = "cart.html";
    });
  });
};

const setupCheckout = () => {
  const button = document.getElementById("checkout-button");
  if (!button) {
    return;
  }

  button.addEventListener("click", () => {
    const cart = loadCart() || [];
    if (cart.length === 0) {
      window.alert("Your cart is empty.");
      return;
    }

    window.alert("Checkout completed (demo). Thank you!");
    saveCart([]);
    saveCoupon(null);
    renderCart([]);
    updateCartBadge();
  });
};

const setupCoupon = () => {
  const input = document.getElementById("coupon-code");
  const button = document.getElementById("apply-coupon");
  const message = document.getElementById("coupon-message");
  if (!input || !button || !message) {
    return;
  }

  const updateMessage = (text, isError = false) => {
    message.textContent = text;
    message.style.color = isError ? "#d93025" : "#2e7d32";
  };

  const applyCoupon = () => {
    const code = input.value.trim().toUpperCase();
    if (!code) {
      saveCoupon(null);
      updateMessage("Enter a coupon code to apply.", true);
      updateSubtotal(loadCart() || []);
      return;
    }

    const coupon = couponCatalog[code];
    if (!coupon) {
      saveCoupon(null);
      updateMessage("Invalid coupon code.", true);
      updateSubtotal(loadCart() || []);
      return;
    }

    saveCoupon({ code, ...coupon });
    updateMessage(`Coupon ${code} applied.`);
    updateSubtotal(loadCart() || []);
  };

  button.addEventListener("click", applyCoupon);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      applyCoupon();
    }
  });

  const saved = loadCoupon();
  if (saved?.code) {
    input.value = saved.code;
    updateMessage(`Coupon ${saved.code} applied.`);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();

  if (document.body.dataset.page === "cart") {
    const cart = ensureSeededCart();
    renderCart(cart);
    handleCartActions();
  }

  setupAddToCart();
  setupSort();
  setupBuyNow();
  setupCheckout();
  updateProductCount();
  setupProductImages();
  setupProductLinks();
  setupProductDetailsPage();
  setupCoupon();
});
