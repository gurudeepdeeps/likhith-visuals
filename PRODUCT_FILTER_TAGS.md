# Product Filter Tags Guide

## Overview

You can now assign **Filter Tags** to products when adding or editing them in the admin panel. This allows you to control how products appear on the home page and in different sorting filters.

---

## Available Filter Options

### 1. **Regular** (Default)
- Standard product
- Shows in all filters
- Sorted by frequency, price, or date

### 2. **Newest** ✨
- Highlights recently added products
- Appears **first** when "Newest" filter is selected
- Use this for new product launches

### 3. **Featured** ⭐
- Highlights popular/best-selling products
- Appears **first** when "Featured" filter is selected
- Use this for top products

---

## How to Use

### **Adding a New Product**

1. Go to **Admin Panel** → `admin.html`
2. Click **"Add Product"** button
3. Fill in product details:
   - Product ID
   - Title
   - Price
   - Old Price (optional)
   - **Tag** (e.g., "SALE", "NEW")
   - **Filter** ← **New Field!**
     - Select: **Regular**, **Newest**, or **Featured**
   - Rating
   - Image URL
   - Download URL
   - Description
   - Features

4. Click **"Save Product"**

### **Editing a Product**

1. Go to **Products** tab
2. Click **"Edit"** on a product
3. Change the **Filter** dropdown to desired option
4. Click **"Save Product"**

---

## Examples

### Setting Up a New Launch Product

```
Product: "Advanced Gaming Presets"
Filter: Newest  ← Makes it appear first on "Newest" filter
```

When customers go to home page:
- Default sort shows "Newest" first
- Your new product appears at the top! 🎉

---

### Setting Up a Best Seller

```
Product: "Creative BG Pack"
Filter: Featured  ← Makes it appear first on "Featured" filter
```

When customers click "Featured" filter:
- Your best-selling product appears at the top! ⭐

---

## How Home Page Sorting Works

### **Newest Filter (Default)**
1. Products marked as "Newest" appear first
2. Then regular products sorted by recently added
3. Recently added = higher position

### **Featured Filter**
1. Products marked as "Featured" appear first
2. Then products sorted by most orders
3. Most popular = higher position

### **Price: Low to High**
Sorts all products by price (ignores filter tags)

### **Price: High to Low**
Sorts all products by price (ignores filter tags)

---

## Database Tracking

All filter tags are saved in Supabase under:
- **Table:** `products`
- **Column:** `filter_tag`
- **Values:** `featured`, `newest`, `regular`

### Run This SQL to Add Column (if needed):

```sql
ALTER TABLE products
ADD COLUMN IF NOT EXISTS filter_tag TEXT DEFAULT 'regular' 
CHECK (filter_tag IN ('featured', 'newest', 'regular'));
```

---

## Best Practices

✅ **DO:**
- Mark your TOP 3 products as "Featured"
- Mark NEW products as "Newest" for 1-2 weeks
- Update tags monthly as products change
- Use with compelling product names and descriptions

❌ **DON'T:**
- Mark all products as featured (loses impact)
- Keep "Newest" tag too long (loses freshness)
- Forget to change filters as inventory changes

---

## Tips & Tricks

### Launch New Product
1. Add product with Filter = "Newest"
2. Creates immediate visibility
3. Customers see new items first

### Boost Sales on Seasonal Product
1. Mark popular item as "Featured"
2. Short-term sales boost
3. Rotate featured items monthly

### Clear Underperformers
1. Demote to "Regular" filter
2. Still visible but lower priority
3. Makes room for new stars

---

## FAQ

**Q: Can a product be both "Newest" and "Featured"?**
A: No, each product has ONE filter tag. Choose the most important one. You can change it anytime.

**Q: What if I don't select a filter?**
A: Default is "Regular" - product still visible in all filters, just not prioritized.

**Q: How long should I keep "Newest" tag?**
A: Usually 1-2 weeks after launch. After that, change to "Regular" or "Featured" if it's performing well.

**Q: Does it affect pricing?**
A: No, filter tags only affect sorting/display, not price.

**Q: Can customers see the filter tag?**
A: No, it only affects how products are sorted. Customers just see better product discovery.

---

## Troubleshooting

**Filter dropdown not showing in admin form?**
- Refresh the page (Ctrl+F5)
- Check browser console for errors
- Make sure you ran the Supabase SQL migration

**Products not sorting correctly?**
- Refresh home page (Ctrl+F5)
- Clear browser cache
- Check that product has a filter_tag value in Supabase

**Want to see which products have which tags?**
- Go to Supabase → SQL Editor
- Run: `SELECT id, title, filter_tag FROM products;`
- Shows all products and their current filter tags

---

## Next Steps

1. ✅ Run the SQL migration if needed
2. ✅ Add your TOP 3 products as "Featured"
3. ✅ Mark your newest launch as "Newest"
4. ✅ Test the home page filters
5. ✅ Update filter tags monthly

**The result?** Better product discoverability = Higher sales! 📈

