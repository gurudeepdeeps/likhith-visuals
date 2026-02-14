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
  
  const loginSection = document.getElementById("admin-login");
  const dashboard = document.getElementById("admin-dashboard");
  const form = document.getElementById("admin-login-form");
  const error = document.getElementById("admin-login-error");

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

  form.addEventListener("submit", async (e) => {
    console.log("Form submit event fired!");
    e.preventDefault();
    const password = document.getElementById("admin-password").value;

    console.log("Login attempt");
    
    // Fetch admin settings from Supabase
    const adminSettings = await getAdminSettingsFromSupabase();
    
    if (!adminSettings) {
      error.textContent = "Unable to connect to server. Please check your setup.";
      error.style.color = "#d93025";
      error.style.display = "block";
      return;
    }

    if (password === adminSettings.password_hash) {
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

// Password Reset functionality
const setupPasswordReset = () => {
  const modal = document.getElementById("password-reset-modal");
  const forgotBtn = document.getElementById("forgot-password-btn");
  const closeBtn = document.getElementById("password-reset-close");
  
  const step1 = document.getElementById("reset-step-1");
  const step2 = document.getElementById("reset-step-2");
  
  const requestForm = document.getElementById("request-otp-form");
  const verifyForm = document.getElementById("verify-otp-form");
  
  const requestMessage = document.getElementById("request-otp-message");
  const verifyMessage = document.getElementById("verify-otp-message");
  
  const cancelBtn = document.getElementById("request-otp-cancel");
  const backBtn = document.getElementById("verify-otp-back");

  if (!modal || !forgotBtn) return;

  const showMessage = (element, message, isSuccess = false) => {
    element.textContent = message;
    element.className = `password-message show ${isSuccess ? 'success' : 'error'}`;
  };

  const hideMessage = (element) => {
    element.classList.remove('show');
  };

  const openModal = () => {
    step1.style.display = "block";
    step2.style.display = "none";
    requestForm.reset();
    verifyForm.reset();
    hideMessage(requestMessage);
    hideMessage(verifyMessage);
    modal.classList.add("open");
    modal.removeAttribute("aria-hidden");
  };

  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  };

  const goToStep2 = () => {
    step1.style.display = "none";
    step2.style.display = "block";
    hideMessage(requestMessage);
  };

  const goToStep1 = () => {
    step2.style.display = "none";
    step1.style.display = "block";
    hideMessage(verifyMessage);
  };

  forgotBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  cancelBtn.addEventListener("click", closeModal);
  backBtn.addEventListener("click", goToStep1);

  // Step 1: Request OTP
  requestForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("reset-email").value.trim();

    if (!email) {
      showMessage(requestMessage, "Please enter your email", false);
      return;
    }

    // Disable submit button
    const submitBtn = requestForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    const result = await requestPasswordReset(email);

    submitBtn.disabled = false;
    submitBtn.textContent = "Send OTP";

    if (result.success) {
      showMessage(requestMessage, result.message, true);
      setTimeout(() => {
        goToStep2();
      }, 1500);
    } else {
      showMessage(requestMessage, result.message || "Failed to send OTP", false);
    }
  });

  // Step 2: Verify OTP and Reset Password
  verifyForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("reset-email").value.trim();
    const otp = document.getElementById("otp-code").value.trim();
    const newPassword = document.getElementById("reset-new-password").value;
    const confirmPassword = document.getElementById("reset-confirm-password").value;

    // Validation
    if (!otp || otp.length !== 6) {
      showMessage(verifyMessage, "Please enter a valid 6-digit OTP", false);
      return;
    }

    if (newPassword.length < 6) {
      showMessage(verifyMessage, "Password must be at least 6 characters", false);
      return;
    }

    if (newPassword !== confirmPassword) {
      showMessage(verifyMessage, "Passwords do not match", false);
      return;
    }

    // Disable submit button
    const submitBtn = verifyForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "Resetting...";

    const result = await resetPasswordWithOTP(email, otp, newPassword);

    submitBtn.disabled = false;
    submitBtn.textContent = "Reset Password";

    if (result.success) {
      showMessage(verifyMessage, "Password reset successfully!", true);
      setTimeout(() => {
        closeModal();
        alert("Password reset successfully! Please login with your new password.");
      }, 1500);
    } else {
      showMessage(verifyMessage, result.message || "Failed to reset password", false);
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
const loadAdminData = async () => {
  await renderOrders();
  await renderProducts();
  await renderCoupons();
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

// Coupon Management
const renderCoupons = async () => {
  const tbody = document.getElementById("coupons-table-body");
  if (!tbody) return;

  const coupons = await loadCouponsFromSupabase();
  tbody.innerHTML = "";

  if (coupons.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 24px">No coupons yet</td></tr>';
    return;
  }

  coupons.forEach((coupon) => {
    const row = document.createElement("tr");
    const typeLabel = coupon.type === "percent" ? `${coupon.value}% Off` : `Rs. ${coupon.value} Off`;
    const statusBadge = coupon.status === "active" 
      ? '<span style="color: #0f9d58; font-weight: bold;">● Active</span>'
      : '<span style="color: #999;">● Inactive</span>';

    row.innerHTML = `
      <td><strong>${coupon.code}</strong></td>
      <td>${coupon.type === "percent" ? "Percentage" : "Flat Amount"}</td>
      <td>${typeLabel}</td>
      <td>${coupon.description || "—"}</td>
      <td>${statusBadge}</td>
      <td>
        <button class="button ghost edit-coupon" data-code="${coupon.code}">Edit</button>
        <button class="button ghost delete-coupon" data-code="${coupon.code}">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  setupCouponActions();
};

const openCouponModal = async (couponCode = null) => {
  const modal = document.getElementById("coupon-modal");
  const title = document.getElementById("coupon-modal-title");
  const form = document.getElementById("coupon-form");
  if (!modal || !form) return;

  form.reset();

  if (couponCode) {
    const coupons = await loadCouponsFromSupabase();
    const coupon = coupons.find((c) => c.code === couponCode);
    if (!coupon) return;

    title.textContent = "Edit Coupon";
    document.getElementById("coupon-edit-id").value = couponCode;
    document.getElementById("coupon-code").value = coupon.code;
    document.getElementById("coupon-code").readOnly = true; // Prevent changing code on edit
    document.getElementById("coupon-type").value = coupon.type;
    document.getElementById("coupon-value").value = coupon.value;
    document.getElementById("coupon-description").value = coupon.description || "";
    document.getElementById("coupon-status").value = coupon.status || "active";
  } else {
    title.textContent = "Add Coupon";
    document.getElementById("coupon-edit-id").value = "";
    document.getElementById("coupon-code").readOnly = false;
    document.getElementById("coupon-status").value = "active";
  }

  modal.classList.add("open");
  modal.removeAttribute("aria-hidden");
};

const closeCouponModal = () => {
  const modal = document.getElementById("coupon-modal");
  if (!modal) return;

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
};

const setupCouponModal = () => {
  const addBtn = document.getElementById("add-coupon-btn");
  const closeBtn = document.getElementById("coupon-modal-close");
  const cancelBtn = document.getElementById("coupon-form-cancel");
  const form = document.getElementById("coupon-form");

  if (addBtn) {
    addBtn.addEventListener("click", () => openCouponModal());
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeCouponModal);
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", closeCouponModal);
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      saveCouponFromForm();
    });
  }

  // Auto-uppercase coupon code input
  const codeInput = document.getElementById("coupon-code");
  if (codeInput) {
    codeInput.addEventListener("input", (e) => {
      e.target.value = e.target.value.toUpperCase();
    });
  }
};

const saveCouponFromForm = async () => {
  const editId = document.getElementById("coupon-edit-id").value;

  const coupon = {
    code: document.getElementById("coupon-code").value.trim().toUpperCase(),
    type: document.getElementById("coupon-type").value,
    value: parseFloat(document.getElementById("coupon-value").value) || 0,
    description: document.getElementById("coupon-description").value.trim(),
    status: document.getElementById("coupon-status").value,
  };

  if (!coupon.code) {
    alert("Coupon code is required");
    return;
  }

  if (coupon.value <= 0) {
    alert("Coupon value must be greater than 0");
    return;
  }

  // Save to Supabase
  const success = await saveCouponToSupabase(coupon);
  
  if (success) {
    await renderCoupons();
    closeCouponModal();
    alert("Coupon saved successfully");
  } else {
    alert("Failed to save coupon. Please try again.");
  }
};

const setupCouponActions = () => {
  const tbody = document.getElementById("coupons-table-body");
  if (!tbody) return;

  tbody.onclick = async (event) => {
    const target = event.target;
    if (!target) return;

    if (target.classList.contains("edit-coupon")) {
      const couponCode = target.dataset.code;
      await openCouponModal(couponCode);
      return;
    }

    if (target.classList.contains("delete-coupon")) {
      const couponCode = target.dataset.code;
      if (!couponCode) return;

      if (confirm(`Are you sure you want to delete coupon "${couponCode}"?`)) {
        const success = await deleteCouponFromSupabase(couponCode);
        if (success) {
          await renderCoupons();
          alert("Coupon deleted");
        } else {
          alert("Failed to delete coupon. Please try again.");
        }
      }
    }
  };
};

// Password Change Management
const setupPasswordChange = () => {
  const form = document.getElementById("password-change-form");
  const resetBtn = document.getElementById("password-reset-btn");
  const messageEl = document.getElementById("password-change-message");

  if (!form || !messageEl) return;

  const showMessage = (message, isSuccess = false) => {
    messageEl.textContent = message;
    messageEl.className = `password-message show ${isSuccess ? 'success' : 'error'}`;
    setTimeout(() => {
      messageEl.classList.remove('show');
    }, 5000);
  };

  const resetForm = () => {
    form.reset();
    messageEl.classList.remove('show');
  };

  if (resetBtn) {
    resetBtn.addEventListener("click", resetForm);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const currentPassword = document.getElementById("current-password").value;
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Validation
    if (newPassword.length < 6) {
      showMessage("New password must be at least 6 characters long", false);
      return;
    }

    if (newPassword !== confirmPassword) {
      showMessage("New passwords do not match", false);
      return;
    }

    // Verify current password
    const adminSettings = await getAdminSettingsFromSupabase();
    if (!adminSettings) {
      showMessage("Unable to verify current password", false);
      return;
    }
    
    if (currentPassword !== adminSettings.password_hash) {
      showMessage("Current password is incorrect", false);
      return;
    }

    // Update password
    const result = await updateAdminPasswordInSupabase(newPassword);
    
    if (result.success) {
      showMessage(result.message, true);
      resetForm();
    } else {
      showMessage(result.message || "Failed to change password", false);
    }
  });
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
  setupPasswordReset();
  setupAdminLogout();
  setupAdminTabs();
  setupOrderActions();
  setupProductStatusUpdates();
  setupProductModal();
  setupCouponModal();
  setupPasswordChange();
});
