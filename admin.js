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
  console.log("setupAdminLogin called");
  console.log("ADMIN_PASSWORD is defined:", typeof ADMIN_PASSWORD !== 'undefined');
  
  const loginSection = document.getElementById("admin-login");
  const dashboard = document.getElementById("admin-dashboard");
  const form = document.getElementById("admin-login-form");
  const error = document.getElementById("admin-login-error");

  console.log("Form element found:", !!form);
  console.log("Error element found:", !!error);

  if (!form) {
    console.error("Login form not found!");
    return;
  }

  // Check if already authenticated
  if (checkAdminAuth()) {
    loginSection.style.display = "none";
    dashboard.style.display = "block";
    isAdminAuthenticated = true;
    loadAdminData();
    return;
  }

  form.addEventListener("submit", (e) => {
    console.log("Form submit event fired!");
    e.preventDefault();
    const password = document.getElementById("admin-password").value;

    console.log("Login attempt with password:", password);
    console.log("Expected password:", ADMIN_PASSWORD);
    console.log("Match:", password === ADMIN_PASSWORD);

    if (password === ADMIN_PASSWORD) {
      console.log("Password correct, logging in...");
      setAdminAuth(true);
      loginSection.style.display = "none";
      dashboard.style.display = "block";
      error.textContent = "";
      loadAdminData();
    } else {
      console.log("Password incorrect, showing error");
      error.textContent = "Incorrect password. Please try again.";
      error.style.color = "#d93025";
      error.style.display = "block";
      console.log("Login failed");
    }
  });
  
  console.log("Form submit listener attached");
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
const loadAdminData = async () => {
  await renderOrders();
  await renderProducts();
  await updateStats();
};

const PRODUCT_STATUS_OPTIONS = ["Sent on whatsapp", "sent on email", "pending", "rejected"];

const formatOrderDate = (value) => {
  if (!value) {
    return "";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return String(value);
  }

  return parsed.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
};

const formatOrderItems = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    return "";
  }

  return items
    .map((item) => {
      if (item && item.title) {
        return `${item.title}${item.qty ? ` (x${item.qty})` : ""}`;
      }
      return JSON.stringify(item);
    })
    .join(", ");
};

const buildProductStatusSelect = (order) => {
  const selected = order.productStatus || "pending";
  const disabled = !supabaseClient ? "disabled" : "";
  const options = PRODUCT_STATUS_OPTIONS.map((option) => {
    const isSelected = option === selected ? "selected" : "";
    return `<option value="${option}" ${isSelected}>${option}</option>`;
  }).join("");

  return `<select class="admin-product-status" data-order-id="${order.id}" data-current-status="${selected}" ${disabled}>
    ${options}
  </select>`;
};

// Render orders table
const renderOrders = async () => {
  const tbody = document.getElementById("orders-table-body");
  if (!tbody) return;

  // Load from Supabase (fallback to localStorage if unavailable)
  const orders = await loadOrdersFromSupabase();
  tbody.innerHTML = "";

  if (orders.length === 0) {
    tbody.innerHTML = '<tr><td colspan="17" style="text-align: center; padding: 24px">No orders yet</td></tr>';
    return;
  }

  orders.forEach((order) => {
    const row = document.createElement("tr");
    const items = formatOrderItems(order.items);

    row.innerHTML = `
      <td><strong>${order.id || ""}</strong></td>
      <td>${order.orderNumber || ""}</td>
      <td>${order.customerName || ""}</td>
      <td>${order.customerEmail || ""}</td>
      <td>${order.customerPhone || ""}</td>
      <td>${order.razorpayOrderId || ""}</td>
      <td>${order.razorpayPaymentId || ""}</td>
      <td>${order.razorpaySignature || ""}</td>
      <td style="max-width: 240px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">${items}</td>
      <td>${formatPrice(order.subtotal || 0)}</td>
      <td>${formatPrice(order.discount || 0)}</td>
      <td><strong>${formatPrice(order.totalAmount || 0)}</strong></td>
      <td>${order.paymentStatus || "pending"}</td>
      <td>${order.paymentMethod || ""}</td>
      <td>${formatOrderDate(order.createdAt)}</td>
      <td>${formatOrderDate(order.uploadedAt)}</td>
      <td>${buildProductStatusSelect(order)}</td>
    `;
    tbody.appendChild(row);
  });
};

// Update statistics
const updateStats = async () => {
  const orders = await loadOrdersFromSupabase();
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.paymentStatus === "pending").length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || o.amount || 0), 0);

  const totalEl = document.getElementById("stat-total-orders");
  const pendingEl = document.getElementById("stat-pending");
  const revenueEl = document.getElementById("stat-revenue");

  if (totalEl) totalEl.textContent = totalOrders;
  if (pendingEl) pendingEl.textContent = pendingOrders;
  if (revenueEl) revenueEl.textContent = formatPrice(totalRevenue);
};

// Export orders as CSV
const exportOrdersCSV = async () => {
  const orders = await loadOrdersFromSupabase();
  if (orders.length === 0) {
    alert("No orders to export");
    return;
  }

  const headers = [
    "id",
    "order_number",
    "customer_name",
    "customer_email",
    "customer_phone",
    "razorpay_order_id",
    "razorpay_payment_id",
    "razorpay_signature",
    "items",
    "subtotal",
    "discount",
    "total_amount",
    "payment_status",
    "payment_method",
    "created_at",
    "uploaded_at",
    "product_status",
  ];

  const rows = orders.map((order) => {
    const items = Array.isArray(order.items) ? JSON.stringify(order.items) : "";
    return [
      order.id || "",
      order.orderNumber || "",
      order.customerName || "",
      order.customerEmail || "",
      order.customerPhone || "",
      order.razorpayOrderId || "",
      order.razorpayPaymentId || "",
      order.razorpaySignature || "",
      items,
      order.subtotal || 0,
      order.discount || 0,
      order.totalAmount || 0,
      order.paymentStatus || "pending",
      order.paymentMethod || "",
      order.createdAt || "",
      order.uploadedAt || "",
      order.productStatus || "pending",
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
    refreshBtn.addEventListener("click", async () => {
      await renderOrders();
      await updateStats();
    });
  }

  if (exportBtn) {
    exportBtn.addEventListener("click", exportOrdersCSV);
  }
};

const updateOrderProductStatus = async (orderId, status) => {
  if (!supabaseClient) {
    return false;
  }

  try {
    const { error } = await supabaseClient
      .from("orders")
      .update({ product_status: status, uploaded_at: new Date().toISOString() })
      .eq("id", orderId);

    if (error) {
      console.error("Supabase product status update error:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to update product status:", error);
    return false;
  }
};

const setupProductStatusUpdates = () => {
  const tbody = document.getElementById("orders-table-body");
  if (!tbody) {
    return;
  }

  tbody.addEventListener("change", async (event) => {
    const target = event.target;
    if (!target || !target.classList.contains("admin-product-status")) {
      return;
    }

    const orderId = target.dataset.orderId;
    const status = target.value;
    if (!orderId) {
      return;
    }

    const success = await updateOrderProductStatus(orderId, status);
    if (!success) {
      alert("Failed to update product status. Please try again.");
      target.value = target.dataset.currentStatus || "pending";
      return;
    }

    target.dataset.currentStatus = status;
  });
};

// Product Management
// PRODUCTS_STORAGE_KEY is already declared in script.js

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

const renderProducts = async () => {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  const products = await loadProductsFromSupabase();
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
          <span>${formatPrice(product.price)} (was ${formatPrice(product.oldPrice || product.price)})</span>
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
const openProductModal = async (productId = null) => {
  const modal = document.getElementById("product-modal");
  const title = document.getElementById("product-modal-title");
  const form = document.getElementById("product-form");
  if (!modal || !form) return;

  form.reset();

  if (productId) {
    const products = await loadProductsFromSupabase();
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    title.textContent = "Edit Product";
    document.getElementById("product-edit-id").value = productId;
    document.getElementById("product-id").value = product.id;
    document.getElementById("product-title").value = product.title;
    document.getElementById("product-price").value = product.price;
    document.getElementById("product-old-price").value = product.oldPrice || "";
    document.getElementById("product-tag").value = product.tag || "";
    document.getElementById("product-filter-tag").value = product.filterTag || "regular";
    document.getElementById("product-rating").value = product.rating || "";
    document.getElementById("product-image").value = product.image;
    document.getElementById("product-download-url").value = product.downloadUrl || "";
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
  const imageFileInput = document.getElementById("product-image-file");
  const imageStatus = document.getElementById("product-image-status");
  const imageUploadBtn = document.getElementById("product-image-upload-btn");

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

  if (imageUploadBtn && imageFileInput) {
    imageUploadBtn.addEventListener("click", () => {
      imageFileInput.click();
    });
  }

  if (imageFileInput) {
    imageFileInput.addEventListener("change", async () => {
      const file = imageFileInput.files?.[0];
      if (!file) {
        return;
      }

      if (imageStatus) {
        imageStatus.textContent = "Uploading image...";
      }

      const url = await uploadProductImageToSupabase(file);
      if (url) {
        const imageInput = document.getElementById("product-image");
        if (imageInput) {
          imageInput.value = url;
        }
        if (imageStatus) {
          imageStatus.textContent = "Upload complete. Image URL updated.";
        }
        imageFileInput.value = "";
      } else if (imageStatus) {
        imageStatus.textContent = "Upload failed. Please try again.";
      }
    });
  }
};

const saveProductFromForm = async () => {
  const editId = document.getElementById("product-edit-id").value;
  const products = await loadProductsFromSupabase();

  const imageFileInput = document.getElementById("product-image-file");
  let imageUrl = document.getElementById("product-image").value.trim();
  const file = imageFileInput?.files?.[0];

  if (!imageUrl && file) {
    const uploadedUrl = await uploadProductImageToSupabase(file);
    if (uploadedUrl) {
      imageUrl = uploadedUrl;
      const imageInput = document.getElementById("product-image");
      if (imageInput) {
        imageInput.value = uploadedUrl;
      }
    }
  }

  const product = {
    id: document.getElementById("product-id").value.trim(),
    title: document.getElementById("product-title").value.trim(),
    price: Number(document.getElementById("product-price").value) || 0,
    oldPrice: Number(document.getElementById("product-old-price").value) || 0,
    tag: document.getElementById("product-tag").value.trim(),
    filterTag: document.getElementById("product-filter-tag").value.trim(),
    rating: Number(document.getElementById("product-rating").value) || 5,
    image: imageUrl,
    downloadUrl: document.getElementById("product-download-url").value.trim(),
    description: document.getElementById("product-description").value.trim(),
    features: document
      .getElementById("product-features")
      .value.split("\n")
      .map((f) => f.trim())
      .filter((f) => f),
  };

  if (!editId && products.find((p) => p.id === product.id)) {
    alert("Product ID already exists");
    return;
  }

  // Save to Supabase
  const success = await saveProductToSupabase(product);
  
  if (success) {
    // Also save to localStorage as backup
    if (editId) {
      const index = products.findIndex((p) => p.id === editId);
      if (index !== -1) {
        products[index] = product;
      }
    } else {
      products.push(product);
    }
    saveProducts(products);
    
    await renderProducts();
    closeProductModal();
    alert("Product saved successfully");
  } else {
    alert("Failed to save product. Please try again.");
  }
};

const setupProductActions = () => {
  const grid = document.getElementById("products-grid");
  if (!grid) {
    return;
  }

  grid.onclick = async (event) => {
    const target = event.target;
    if (!target) {
      return;
    }

    if (target.classList.contains("edit-product")) {
      const productId = target.dataset.id;
      await openProductModal(productId);
      return;
    }

    if (target.classList.contains("delete-product")) {
      const productId = target.dataset.id;
      if (!productId) {
        return;
      }

      if (confirm("Are you sure you want to delete this product?")) {
        const success = await deleteProductFromSupabase(productId);
        if (success) {
          const products = loadProducts();
          const filtered = products.filter((p) => p.id !== productId);
          saveProducts(filtered);
          await renderProducts();
          alert("Product deleted");
        } else {
          alert("Failed to delete product. Please try again.");
        }
      }
    }
  };
};

// Initialize admin panel
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded fired");
  console.log("Page type:", document.body.dataset.page);
  
  if (document.body.dataset.page !== "admin") {
    console.log("Not admin page, exiting");
    return;
  }

  console.log("Initializing admin panel");
  setupAdminLogin();
  setupAdminLogout();
  setupAdminTabs();
  setupOrderActions();
  setupProductStatusUpdates();
  setupProductModal();
});
