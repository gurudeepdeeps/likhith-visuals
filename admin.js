// Admin authentication state
let isAdminAuthenticated = false;

// Check authentication on load
const checkAdminAuth = () => {
  const auth = sessionStorage.getItem("admin-auth");
  return auth === "authenticated";
};

const setAdminAuth = (authenticated) => {
  if (authenticated) {
    sessionStorage.setItem("admin-auth", "authenticated");
  } else {
    sessionStorage.removeItem("admin-auth");
  }
  isAdminAuthenticated = authenticated;
};

// Login functionality
const setupAdminLogin = () => {
  const loginSection = document.getElementById("admin-login");
  const dashboard = document.getElementById("admin-dashboard");
  const form = document.getElementById("admin-login-form");
  const error = document.getElementById("admin-login-error");

  if (!form) return;

  // Check if already authenticated
  if (checkAdminAuth()) {
    loginSection.style.display = "none";
    dashboard.style.display = "block";
    isAdminAuthenticated = true;
    loadAdminData();
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const password = document.getElementById("admin-password").value;

    if (password === ADMIN_PASSWORD) {
      setAdminAuth(true);
      loginSection.style.display = "none";
      dashboard.style.display = "block";
      error.textContent = "";
      loadAdminData();
    } else {
      error.textContent = "Incorrect password";
      error.style.color = "#d93025";
    }
  });
};

// Logout functionality
const setupAdminLogout = () => {
  const button = document.getElementById("admin-logout");
  if (!button) return;

  button.addEventListener("click", () => {
    setAdminAuth(false);
    window.location.reload();
  });
};

// Tab switching
const setupAdminTabs = () => {
  const tabs = document.querySelectorAll(".admin-tab");
  if (tabs.length === 0) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetTab = tab.dataset.tab;

      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      document.querySelectorAll(".admin-section").forEach((section) => {
        section.style.display = "none";
      });

      const targetSection = document.getElementById(`tab-${targetTab}`);
      if (targetSection) {
        targetSection.style.display = "block";
      }
    });
  });
};

// Load admin data
const loadAdminData = () => {
  renderOrders();
  renderProducts();
  updateStats();
};

// Render orders table
const renderOrders = () => {
  const tbody = document.getElementById("orders-table-body");
  if (!tbody) return;

  const orders = loadOrderHistory();
  tbody.innerHTML = "";

  if (orders.length === 0) {
    tbody.innerHTML = '<tr><td colspan="10" style="text-align: center; padding: 24px">No orders yet</td></tr>';
    return;
  }

  orders.forEach((order) => {
    const row = document.createElement("tr");
    const date = order.createdAt
      ? new Date(order.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
      : "";
    const items = (order.items || [])
      .map((item) => `${item.title} (x${item.qty})`)
      .join(", ");

    row.innerHTML = `
      <td><strong>${order.id}</strong></td>
      <td>${date}</td>
      <td>${order.customer?.name || "N/A"}</td>
      <td>${order.customer?.email || "N/A"}</td>
      <td>${order.customer?.phone || "N/A"}</td>
      <td><strong>${order.transactionId || "N/A"}</strong></td>
      <td><strong>${formatPrice(order.amount || 0)}</strong></td>
      <td><span class="status-badge status-${order.paymentStatus || "pending"}">${order.paymentStatus || "pending"}</span></td>
      <td>${order.paymentMethod || "N/A"}</td>
      <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">${items}</td>
    `;
    tbody.appendChild(row);
  });
};

// Update statistics
const updateStats = () => {
  const orders = loadOrderHistory();
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.paymentStatus === "pending").length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.amount || 0), 0);

  const totalEl = document.getElementById("stat-total-orders");
  const pendingEl = document.getElementById("stat-pending");
  const revenueEl = document.getElementById("stat-revenue");

  if (totalEl) totalEl.textContent = totalOrders;
  if (pendingEl) pendingEl.textContent = pendingOrders;
  if (revenueEl) revenueEl.textContent = formatPrice(totalRevenue);
};

// Export orders as CSV
const exportOrdersCSV = () => {
  const orders = loadOrderHistory();
  if (orders.length === 0) {
    alert("No orders to export");
    return;
  }

  const headers = [
    "Order ID",
    "Date",
    "Customer Name",
    "Email",
    "Phone",
    "Transaction ID",
    "Amount",
    "Status",
    "Method",
    "Items",
    "Discount",
  ];

  const rows = orders.map((order) => {
    const items = (order.items || [])
      .map((item) => `${item.title} x${item.qty}`)
      .join("; ");
    return [
      order.id,
      new Date(order.createdAt).toLocaleString(),
      order.customer?.name || "",
      order.customer?.email || "",
      order.customer?.phone || "",
      order.transactionId || "",
      order.amount || 0,
      order.paymentStatus || "pending",
      order.paymentMethod || "UPI QR",
      items,
      order.discount || 0,
    ];
  });

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))].join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `orders_${new Date().toISOString().split("T")[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Setup order actions
const setupOrderActions = () => {
  const refreshBtn = document.getElementById("refresh-orders");
  const exportBtn = document.getElementById("export-orders");

  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      renderOrders();
      updateStats();
    });
  }

  if (exportBtn) {
    exportBtn.addEventListener("click", exportOrdersCSV);
  }
};

// Product Management
const PRODUCTS_STORAGE_KEY = "admin-products";

const loadProducts = () => {
  const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error("Failed to load products:", error);
    }
  }
  return productCatalog;
};

const saveProducts = (products) => {
  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
};

const renderProducts = () => {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  const products = loadProducts();
  grid.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "admin-product-card";
    card.innerHTML = `
      <div class="admin-product-image">
        <img src="${product.image}" alt="${product.title}" onerror="this.src='assets/placeholder.jpg'">
      </div>
      <div class="admin-product-details">
        <h3>${product.title}</h3>
        <div class="admin-product-meta">
          <span>ID: ${product.id}</span>
          <span>${formatPrice(product.price)} (was ${formatPrice(product.oldPrice)})</span>
          <span>Tag: ${product.tag}</span>
          <span>Rating: ${product.rating}</span>
        </div>
        <div class="admin-product-actions">
          <button class="button ghost edit-product" data-id="${product.id}">Edit</button>
          <button class="button ghost delete-product" data-id="${product.id}">Delete</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  setupProductActions();
};

// Product modal
const openProductModal = (productId = null) => {
  const modal = document.getElementById("product-modal");
  const title = document.getElementById("product-modal-title");
  const form = document.getElementById("product-form");
  if (!modal || !form) return;

  form.reset();

  if (productId) {
    const products = loadProducts();
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    title.textContent = "Edit Product";
    document.getElementById("product-edit-id").value = productId;
    document.getElementById("product-id").value = product.id;
    document.getElementById("product-title").value = product.title;
    document.getElementById("product-price").value = product.price;
    document.getElementById("product-old-price").value = product.oldPrice || "";
    document.getElementById("product-tag").value = product.tag || "";
    document.getElementById("product-rating").value = product.rating || "";
    document.getElementById("product-image").value = product.image;
    document.getElementById("product-description").value = product.description || "";
    document.getElementById("product-features").value = (product.features || []).join("\n");
  } else {
    title.textContent = "Add Product";
    document.getElementById("product-edit-id").value = "";
  }

  modal.classList.add("open");
  modal.removeAttribute("aria-hidden");
};

const closeProductModal = () => {
  const modal = document.getElementById("product-modal");
  if (!modal) return;

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
};

const setupProductModal = () => {
  const addBtn = document.getElementById("add-product-btn");
  const closeBtn = document.getElementById("product-modal-close");
  const cancelBtn = document.getElementById("product-form-cancel");
  const form = document.getElementById("product-form");

  if (addBtn) {
    addBtn.addEventListener("click", () => openProductModal());
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeProductModal);
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", closeProductModal);
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      saveProductFromForm();
    });
  }
};

const saveProductFromForm = () => {
  const editId = document.getElementById("product-edit-id").value;
  const products = loadProducts();

  const product = {
    id: document.getElementById("product-id").value.trim(),
    title: document.getElementById("product-title").value.trim(),
    price: Number(document.getElementById("product-price").value) || 0,
    oldPrice: Number(document.getElementById("product-old-price").value) || 0,
    tag: document.getElementById("product-tag").value.trim(),
    rating: Number(document.getElementById("product-rating").value) || 5,
    image: document.getElementById("product-image").value.trim(),
    description: document.getElementById("product-description").value.trim(),
    features: document
      .getElementById("product-features")
      .value.split("\n")
      .map((f) => f.trim())
      .filter((f) => f),
  };

  if (editId) {
    const index = products.findIndex((p) => p.id === editId);
    if (index !== -1) {
      products[index] = product;
    }
  } else {
    if (products.find((p) => p.id === product.id)) {
      alert("Product ID already exists");
      return;
    }
    products.push(product);
  }

  saveProducts(products);
  renderProducts();
  closeProductModal();
  alert("Product saved successfully");
};

const setupProductActions = () => {
  const editBtns = document.querySelectorAll(".edit-product");
  const deleteBtns = document.querySelectorAll(".delete-product");

  editBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = btn.dataset.id;
      openProductModal(productId);
    });
  });

  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = btn.dataset.id;
      if (confirm("Are you sure you want to delete this product?")) {
        const products = loadProducts();
        const filtered = products.filter((p) => p.id !== productId);
        saveProducts(filtered);
        renderProducts();
        alert("Product deleted");
      }
    });
  });
};

// Initialize admin panel
document.addEventListener("DOMContentLoaded", () => {
  if (document.body.dataset.page !== "admin") {
    return;
  }

  setupAdminLogin();
  setupAdminLogout();
  setupAdminTabs();
  setupOrderActions();
  setupProductModal();
});
