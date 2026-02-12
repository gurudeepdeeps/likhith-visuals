const STORAGE_KEY = "faxpc-cart";
const SEED_KEY = "faxpc-cart-seeded";
const COUPON_KEY = "faxpc-coupon";
const ORDER_HISTORY_KEY = "faxpc-order-history";
const LAST_ORDER_KEY = "faxpc-last-order";
const CHECKOUT_DETAILS_KEY = "faxpc-checkout-details";

const EMAILJS_PUBLIC_KEY = "B7zVzclIjXPJJ6C0D";
const EMAILJS_SERVICE_ID = "service_5bgbrab";
const EMAILJS_TEMPLATE_ID = "template_vqs92b6";
const EMAILJS_ADMIN_TEMPLATE_ID = "template_admin_notify";

const GOOGLE_SHEETS_API_KEY = "AIzaSyCds-5egUXoYvVzbcHQJzUEm2_X8QZUwQo";
const GOOGLE_SHEETS_SPREADSHEET_ID = "1SAbW4HGsCBFGfFJHvtDXXN9yDo1Y59Il3SOO_8zd878";
const GOOGLE_SHEETS_RANGE = "Orders!A:K";

const ADMIN_EMAIL = "likhithlikhith278@gmail.com";
const ADMIN_PASSWORD = "Likhith@14";

const UPI_ID = "8310577983-4@ybl";
const UPI_PAYEE_NAME = "LIKHITH D A";
const UPI_NOTE = "Order payment";
const UPI_QR_FALLBACK_IMAGE = "assets/qr-code.png";

let upiCheckoutContext = null;

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
// Product catalog with 15 items
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
    image: "assets/p2.jpg",
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
    image: "assets/p3.jpg",
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
    image: "assets/p4.jpg",
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
    image: "assets/p5.jpg",
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
    image: "assets/p6.jpg",
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
    image: "assets/p7.jpg",
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
    image: "assets/p8.jpg",
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
    image: "assets/p9.jpg",
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
    image: "assets/p10.jpg",
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
    image: "assets/p11.jpg",
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
    image: "assets/p12.jpg",
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
    image: "assets/p13.jpg",
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
    image: "assets/p14.jpg",
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
    image: "assets/p15.jpg",
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
    image: "assets/p16.jpg",
    rating: 4.8,
    description: "Minecraft-inspired intro assets and project.",
    features: ["Intro file plus layered assets."],
  },
];

const formatPrice = (value) => `Rs. ${value.toFixed(2)}`;

const createOrderId = () => `LV-${Date.now()}`;

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

const loadOrderHistory = () => {
  const raw = localStorage.getItem(ORDER_HISTORY_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
};

const saveOrderHistory = (orders) => {
  localStorage.setItem(ORDER_HISTORY_KEY, JSON.stringify(orders));
};

const loadLastOrder = () => {
  const raw = localStorage.getItem(LAST_ORDER_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
};

const saveLastOrder = (order) => {
  localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
};

const loadCheckoutDetails = () => {
  const raw = localStorage.getItem(CHECKOUT_DETAILS_KEY);
  if (!raw) {
    return { name: "", email: "", phone: "" };
  }

  try {
    const parsed = JSON.parse(raw);
    return {
      name: parsed?.name || "",
      email: parsed?.email || "",
      phone: parsed?.phone || "",
    };
  } catch (error) {
    return { name: "", email: "", phone: "" };
  }
};

const saveCheckoutDetails = (details) => {
  localStorage.setItem(CHECKOUT_DETAILS_KEY, JSON.stringify(details));
};

const isEmailJsConfigured = () => {
  const values = [EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID];
  return values.every((value) => value && !value.startsWith("YOUR_"));
};

const initEmailJs = () => {
  if (!window.emailjs || !isEmailJsConfigured()) {
    return;
  }

  window.emailjs.init(EMAILJS_PUBLIC_KEY);
};

const sendOrderEmail = (order) => {
  if (!window.emailjs || !isEmailJsConfigured()) {
    return;
  }

  if (!order?.customer?.email) {
    return;
  }

  const orders = (order.items || []).map((item) => ({
    image_url: item.image || "",
    name: item.title,
    units: item.qty,
    price: Number(item.price || 0).toFixed(2),
  }));

  const cost = {
    shipping: "0.00",
    tax: "0.00",
    total: Number(order.amount || 0).toFixed(2),
  };

  window.emailjs
    .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      order_id: order.id,
      orders,
      cost,
      email: order.customer.email,
      customer_name: order.customer.name || "Customer",
      customer_email: order.customer.email,
      customer_phone: order.customer.phone || "",
      order_total: formatPrice(order.amount),
      order_date: new Date(order.createdAt).toLocaleString(),
    })
    .catch((error) => {
      console.error("Email send failed:", error);
    });
};

const sendAdminNotification = (order) => {
  if (!window.emailjs || !isEmailJsConfigured()) {
    return;
  }

  const itemsList = (order.items || [])
    .map((item) => `${item.title} x${item.qty} - Rs. ${item.price}`)
    .join("\n");

  window.emailjs
    .send(EMAILJS_SERVICE_ID, EMAILJS_ADMIN_TEMPLATE_ID, {
      to_email: ADMIN_EMAIL,
      order_id: order.id,
      transaction_id: order.transactionId || "N/A",
      customer_name: order.customer.name || "N/A",
      customer_email: order.customer.email || "N/A",
      customer_phone: order.customer.phone || "N/A",
      order_items: itemsList,
      order_total: formatPrice(order.amount),
      payment_status: order.paymentStatus || "pending",
      payment_method: order.paymentMethod || "UPI QR",
      order_date: new Date(order.createdAt).toLocaleString(),
    })
    .catch((error) => {
      console.error("Admin email failed:", error);
    });
};

const isGoogleSheetsConfigured = () => {
  return (
    GOOGLE_SHEETS_API_KEY &&
    !GOOGLE_SHEETS_API_KEY.startsWith("YOUR_") &&
    GOOGLE_SHEETS_SPREADSHEET_ID &&
    !GOOGLE_SHEETS_SPREADSHEET_ID.startsWith("YOUR_")
  );
};

const submitOrderToGoogleSheets = async (order) => {
  if (!isGoogleSheetsConfigured()) {
    console.warn("Google Sheets not configured");
    return;
  }

  try {
    const row = [
      order.id,
      new Date(order.createdAt).toLocaleString(),
      order.customer.name || "",
      order.customer.email || "",
      order.customer.phone || "",
      order.transactionId || "",
      order.amount,
      order.paymentStatus || "pending",
      order.paymentMethod || "UPI QR",
      (order.items || []).map((item) => `${item.title} x${item.qty}`).join(", "),
      order.discount || 0,
    ];

    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_SPREADSHEET_ID}/values/${GOOGLE_SHEETS_RANGE}:append?valueInputOption=RAW&key=${GOOGLE_SHEETS_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: [row],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.status}`);
    }

    console.log("Order submitted to Google Sheets");
  } catch (error) {
    console.error("Failed to submit to Google Sheets:", error);
  }
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

const calculateSubtotal = (cart) =>
  cart.reduce((sum, item) => sum + item.price * item.qty, 0);

const calculateDiscount = (subtotal, coupon) => {
  if (!coupon || subtotal <= 0) {
    return 0;
  }

  let discount = 0;
  if (coupon.type === "percent") {
    discount = (subtotal * coupon.value) / 100;
  }
  if (coupon.type === "flat") {
    discount = coupon.value;
  }

  return Math.min(discount, subtotal);
};

const buildOrderRecord = ({
  orderId,
  cart,
  subtotal,
  discount,
  total,
  payment,
  customer,
  paymentMethod,
  paymentStatus,
  transactionId,
}) => ({
  id: orderId || createOrderId(),
  createdAt: new Date().toISOString(),
  subtotal,
  discount,
  amount: total,
  currency: "INR",
  paymentId: payment?.transactionId || "",
  transactionId: transactionId || payment?.transactionId || "",
  paymentMethod: paymentMethod || "unknown",
  paymentStatus: paymentStatus || "paid",
  items: cart.map((item) => ({
    id: item.id,
    title: item.title,
    qty: item.qty,
    price: item.price,
    image: normalizeImagePath(item.image),
  })),
  customer: {
    name: customer?.name || "",
    email: customer?.email || "",
    phone: customer?.phone || "",
  },
});

const renderOrderHistory = () => {
  const list = document.getElementById("order-history-list");
  const emptyState = document.getElementById("order-history-empty");
  if (!list || !emptyState) {
    return;
  }

  const history = loadOrderHistory();
  list.innerHTML = "";

  if (history.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  history.forEach((order) => {
    const card = document.createElement("div");
    card.className = "order-history-card";
    const date = order.createdAt
      ? new Date(order.createdAt).toLocaleString()
      : "";
    const items = (order.items || [])
      .map((item) => `${item.title} x${item.qty}`)
      .join(", ");
    const status = order.paymentStatus ? `Status: ${order.paymentStatus}` : "";
    const method = order.paymentMethod ? `Method: ${order.paymentMethod}` : "";
    card.innerHTML = `
      <div>
        <div class="order-history-title">Order ${order.id}</div>
        <div class="order-history-meta">${date}</div>
        <div class="order-history-items">${items || "No items"}</div>
        <div class="order-history-status">${[status, method].filter(Boolean).join(" | ")}</div>
      </div>
      <div class="order-history-total">${formatPrice(order.amount || 0)}</div>
    `;
    list.appendChild(card);
  });
};

const setupOrderHistoryActions = () => {
  const button = document.getElementById("clear-order-history");
  if (!button) {
    return;
  }

  button.addEventListener("click", () => {
    if (!window.confirm("Clear all stored orders?")) {
      return;
    }

    saveOrderHistory([]);
    renderOrderHistory();
  });
};

const setupCheckoutDetails = () => {
  const nameInput = document.getElementById("checkout-name");
  const emailInput = document.getElementById("checkout-email");
  const phoneInput = document.getElementById("checkout-phone");
  if (!nameInput || !emailInput || !phoneInput) {
    return;
  }

  const saved = loadCheckoutDetails();
  nameInput.value = saved.name;
  emailInput.value = saved.email;
  phoneInput.value = saved.phone;

  const persist = () => {
    saveCheckoutDetails({
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim(),
    });
  };

  [nameInput, emailInput, phoneInput].forEach((input) => {
    input.addEventListener("input", persist);
  });
};

const renderOrderSuccess = () => {
  const summary = document.getElementById("order-success-summary");
  const items = document.getElementById("order-success-items");
  if (!summary || !items) {
    return;
  }

  const order = loadLastOrder();
  if (!order) {
    summary.textContent = "We could not find your latest order.";
    items.innerHTML = "";
    return;
  }

  const date = order.createdAt
    ? new Date(order.createdAt).toLocaleString()
    : "";
  summary.innerHTML = `
    <div><strong>Order ID:</strong> ${order.id}</div>
    <div><strong>Transaction ID:</strong> ${order.transactionId || "--"}</div>
    <div><strong>Status:</strong> ${order.paymentStatus || "paid"}</div>
    <div><strong>Date:</strong> ${date}</div>
    <div><strong>Total:</strong> ${formatPrice(order.amount || 0)}</div>
  `;

  items.innerHTML = (order.items || [])
    .map(
      (item) => `
        <div class="order-success-item">
          <span>${item.title}</span>
          <span>x${item.qty}</span>
        </div>
      `
    )
    .join("");
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

const renderHomeProducts = () => {
  if (document.body.dataset.page !== "home") {
    return;
  }

  const grid = document.getElementById("product-grid") || document.querySelector(".product-grid");
  if (!grid) {
    return;
  }

  const thumbClasses = [
    "thumb-blue",
    "thumb-purple",
    "thumb-yellow",
    "thumb-emerald",
    "thumb-teal",
    "thumb-lime",
    "thumb-indigo",
    "thumb-violet",
    "thumb-slate",
    "thumb-cyan",
    "thumb-red",
    "thumb-magenta",
    "thumb-navy",
    "thumb-ice",
    "thumb-cream",
    "thumb-steel",
  ];

  grid.innerHTML = "";

  productCatalog.forEach((product, index) => {
    const card = document.createElement("article");
    card.className = "product-card";

    const thumbClass = thumbClasses[index % thumbClasses.length];

    card.innerHTML = `
      <a class="product-link" href="product.html">
        <div class="card-badge">${product.tag}</div>
        <div class="thumb ${thumbClass}">
          <div class="thumb-tag">${product.tag}</div>
        </div>
        <h3>${product.title}</h3>
        <div class="price-row">
          <span class="price">${formatPrice(product.price)}</span>
          <span class="price-old">${formatPrice(product.oldPrice)}</span>
        </div>
      </a>
      <button
        class="button ghost card-add add-to-cart"
        data-id="${product.id}"
        data-title="${product.title}"
        data-price="${product.price}"
        data-image="${normalizeImagePath(product.image)}"
      >
        Add to Cart
      </button>
      <button
        class="button solid card-buy buy-now"
        data-id="${product.id}"
        data-title="${product.title}"
        data-price="${product.price}"
        data-image="${normalizeImagePath(product.image)}"
      >
        Buy Now
      </button>
    `;

    grid.appendChild(card);
  });
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

const buildUpiLink = ({ amount, orderId }) => {
  const note = `${UPI_NOTE} ${orderId}`.trim();
  const params = new URLSearchParams({
    pa: UPI_ID,
    pn: UPI_PAYEE_NAME,
    am: amount.toFixed(2),
    cu: "INR",
    tn: note,
  });
  return `upi://pay?${params.toString()}`;
};

const buildQrImageUrl = (upiLink) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(upiLink)}`;

const getQrElements = () => ({
  modal: document.getElementById("qr-modal"),
  close: document.getElementById("qr-close"),
  image: document.getElementById("qr-image"),
  amount: document.getElementById("qr-amount"),
  upiText: document.getElementById("upi-id-text"),
  copyButton: document.getElementById("copy-upi"),
  openLink: document.getElementById("open-upi-link"),
  transactionInput: document.getElementById("upi-transaction-id"),
  confirmButton: document.getElementById("confirm-upi-payment"),
});

const openQrModal = (context) => {
  const elements = getQrElements();
  if (!elements.modal) {
    return;
  }

  upiCheckoutContext = context;
  const upiLink = buildUpiLink({ amount: context.total, orderId: context.orderId });

  if (elements.image) {
    elements.image.onerror = () => {
      if (!UPI_QR_FALLBACK_IMAGE) {
        return;
      }

      const fallbackName = UPI_QR_FALLBACK_IMAGE.split("/").pop();
      if (elements.image.src.includes(fallbackName)) {
        return;
      }

      elements.image.src = UPI_QR_FALLBACK_IMAGE;
    };
    elements.image.src = buildQrImageUrl(upiLink);
  }
  if (elements.amount) {
    elements.amount.textContent = formatPrice(context.total);
  }
  if (elements.upiText) {
    elements.upiText.textContent = UPI_ID;
  }
  if (elements.openLink) {
    elements.openLink.href = upiLink;
  }
  if (elements.transactionInput) {
    elements.transactionInput.value = "";
  }

  elements.modal.classList.add("open");
  elements.modal.removeAttribute("aria-hidden");
};

const closeQrModal = () => {
  const elements = getQrElements();
  if (!elements.modal) {
    return;
  }

  elements.modal.classList.remove("open");
  elements.modal.setAttribute("aria-hidden", "true");
  upiCheckoutContext = null;
};

const setupQrModal = () => {
  const elements = getQrElements();
  if (!elements.modal) {
    return;
  }

  if (elements.close) {
    elements.close.addEventListener("click", closeQrModal);
  }

  elements.modal.addEventListener("click", (event) => {
    if (event.target === elements.modal) {
      closeQrModal();
    }
  });

  if (elements.copyButton) {
    elements.copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(UPI_ID);
        window.alert("UPI ID copied.");
      } catch (error) {
        window.prompt("Copy UPI ID:", UPI_ID);
      }
    });
  }

  if (elements.confirmButton) {
    elements.confirmButton.addEventListener("click", () => {
      if (!upiCheckoutContext) {
        return;
      }

      const transactionId = elements.transactionInput?.value.trim();
      if (!transactionId) {
        window.alert("Please enter your transaction ID (UTR).");
        return;
      }

      const order = buildOrderRecord({
        orderId: upiCheckoutContext.orderId,
        cart: upiCheckoutContext.cart,
        subtotal: upiCheckoutContext.subtotal,
        discount: upiCheckoutContext.discount,
        total: upiCheckoutContext.total,
        payment: { transactionId },
        customer: upiCheckoutContext.details,
        paymentMethod: "UPI QR",
        paymentStatus: "pending",
        transactionId,
      });

      const history = loadOrderHistory();
      history.unshift(order);
      saveOrderHistory(history);
      saveLastOrder(order);
      sendOrderEmail(order);
      sendAdminNotification(order);
      submitOrderToGoogleSheets(order);

      saveCart([]);
      saveCoupon(null);
      renderCart([]);
      updateCartBadge();

      closeQrModal();
      window.location.href = "order-success.html";
    });
  }
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

    if (UPI_ID === "yourupi@bank") {
      window.alert("Please update the UPI ID in script.js before accepting payments.");
      return;
    }

    // Calculate totals
    const coupon = loadCoupon();
    const subtotal = calculateSubtotal(cart);
    const discount = calculateDiscount(subtotal, coupon);
    const total = subtotal - discount;

    const details = loadCheckoutDetails();

    const orderId = createOrderId();
    openQrModal({
      orderId,
      cart,
      subtotal,
      discount,
      total,
      details,
    });
  });
};

const setupCoupon = () => {
  const input = document.getElementById("coupon-code");
  const button = document.getElementById("apply-coupon");
  const clearButton = document.getElementById("clear-coupon");
  const message = document.getElementById("coupon-message");
  if (!input || !button || !message || !clearButton) {
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

  const clearCoupon = () => {
    input.value = "";
    saveCoupon(null);
    updateMessage("Coupon cleared.");
    updateSubtotal(loadCart() || []);
  };

  button.addEventListener("click", applyCoupon);
  clearButton.addEventListener("click", clearCoupon);
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
  initEmailJs();

  if (document.body.dataset.page === "cart") {
    const cart = ensureSeededCart();
    renderCart(cart);
    handleCartActions();
    setupCheckoutDetails();
    setupQrModal();
    renderOrderHistory();
    setupOrderHistoryActions();
  }

  if (document.body.dataset.page === "order-success") {
    renderOrderSuccess();
  }

  renderHomeProducts();
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
