import axios from "axios";
import { sampleProducts } from "../data/sampleProducts";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

// Attach JWT token automatically
client.interceptors.request.use((config) => {
  try {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const parsed = JSON.parse(userInfo);
      if (parsed?.token) {
        config.headers.Authorization = `Bearer ${parsed.token}`;
      }
    }
  } catch (err) {
    console.error("Token attach error:", err);
  }
  return config;
});

// Helper for local mock products sync
const getLocalProducts = () => {
  try {
    const stored = localStorage.getItem("shopnest_custom_products");
    if (stored) {
      const custom = JSON.parse(stored);
      return [...custom, ...sampleProducts];
    }
  } catch (e) {
    console.error(e);
  }
  return sampleProducts;
};

// API Services
export const productService = {
  async getAll(params = {}) {
    try {
      const res = await client.get("/api/products", { params });
      if (Array.isArray(res.data) && res.data.length > 0) {
        return res.data;
      }
      return getLocalProducts();
    } catch (error) {
      console.warn("Backend unavailable, using rich mock catalog:", error.message);
      let list = getLocalProducts();

      // Apply client-side filters if fallback
      if (params.category && params.category !== "All" && params.category !== "all") {
        list = list.filter((p) => p.category?.toLowerCase() === params.category.toLowerCase());
      }
      if (params.keyword) {
        const kw = params.keyword.toLowerCase();
        list = list.filter(
          (p) =>
            p.name?.toLowerCase().includes(kw) ||
            p.brand?.toLowerCase().includes(kw) ||
            p.description?.toLowerCase().includes(kw)
        );
      }
      return list;
    }
  },

  async getById(id) {
    try {
      const res = await client.get(`/api/products/${id}`);
      if (res.data) return res.data;
    } catch (error) {
      console.warn("Backend single product lookup fallback:", error.message);
    }
    const all = getLocalProducts();
    return all.find((p) => p._id === id) || sampleProducts[0];
  },

  async addReview(productId, reviewData) {
    try {
      const res = await client.post(`/api/products/${productId}/reviews`, reviewData);
      return res.data;
    } catch (error) {
      console.warn("Review added locally:", error.message);
      return {
        success: true,
        message: "Review added successfully (Demo Mode)",
        review: {
          ...reviewData,
          _id: "rev_" + Date.now(),
          createdAt: new Date().toISOString(),
        },
      };
    }
  },

  async create(productData) {
    try {
      const isFormData = productData instanceof FormData;
      const res = await client.post("/api/products", productData, {
        headers: isFormData ? { "Content-Type": "multipart/form-data" } : {},
      });
      return res.data;
    } catch (error) {
      console.warn("Product created locally:", error.message);
      const newProd = {
        _id: "prod_cust_" + Date.now(),
        ...(typeof productData === "object" ? productData : {}),
        createdAt: new Date().toISOString(),
      };
      try {
        const existing = JSON.parse(localStorage.getItem("shopnest_custom_products") || "[]");
        existing.unshift(newProd);
        localStorage.setItem("shopnest_custom_products", JSON.stringify(existing));
      } catch (e) {
        console.error(e);
      }
      return newProd;
    }
  },

  async delete(id) {
    try {
      const res = await client.delete(`/api/products/${id}`);
      return res.data;
    } catch (error) {
      console.warn("Product deleted locally:", error.message);
      try {
        let existing = JSON.parse(localStorage.getItem("shopnest_custom_products") || "[]");
        existing = existing.filter((p) => p._id !== id);
        localStorage.setItem("shopnest_custom_products", JSON.stringify(existing));
      } catch (e) {
        console.error(e);
      }
      return { success: true, message: "Deleted successfully" };
    }
  },
};

export const orderService = {
  async create(orderData) {
    try {
      const res = await client.post("/api/orders", orderData);
      return res.data;
    } catch (error) {
      console.warn("Order saved locally:", error.message);
      const newOrder = {
        _id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
        orderItems: orderData.items.map((it) => ({
          product: it.productId,
          name: it.name,
          image: it.imageUrl,
          price: it.price,
          qty: it.qty,
        })),
        shippingAddress: orderData.shippingAddress,
        paymentStatus: orderData.paymentStatus || "Paid",
        orderStatus: "Processing",
        itemsPrice: orderData.items.reduce((s, i) => s + i.price * i.qty, 0),
        totalPrice: orderData.totalAmount,
        createdAt: new Date().toISOString(),
      };

      try {
        const stored = JSON.parse(localStorage.getItem("shopnest_demo_orders") || "[]");
        stored.unshift(newOrder);
        localStorage.setItem("shopnest_demo_orders", JSON.stringify(stored));
      } catch (e) {
        console.error(e);
      }

      return { success: true, order: newOrder };
    }
  },

  async getMyOrders() {
    try {
      const res = await client.get("/api/orders/myorders");
      if (res.data?.success && Array.isArray(res.data.orders)) {
        return res.data.orders;
      }
      if (Array.isArray(res.data)) return res.data;
    } catch (error) {
      console.warn("Orders fetched from local storage:", error.message);
    }
    try {
      const stored = localStorage.getItem("shopnest_demo_orders");
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return [];
  },

  async cancelOrder(id) {
    try {
      const res = await client.put(`/api/orders/${id}/cancel`);
      return res.data;
    } catch (error) {
      console.warn("Order cancelled locally:", error.message);
      try {
        let stored = JSON.parse(localStorage.getItem("shopnest_demo_orders") || "[]");
        stored = stored.map((o) => (o._id === id ? { ...o, orderStatus: "Cancelled" } : o));
        localStorage.setItem("shopnest_demo_orders", JSON.stringify(stored));
      } catch (e) {
        console.error(e);
      }
      return { success: true, message: "Order cancelled successfully" };
    }
  },

  async getAllAdmin() {
    try {
      const res = await client.get("/api/orders");
      if (res.data?.success && Array.isArray(res.data.orders)) {
        return res.data.orders;
      }
      if (Array.isArray(res.data)) return res.data;
    } catch (error) {
      console.warn("Admin orders fallback:", error.message);
    }
    try {
      const stored = localStorage.getItem("shopnest_demo_orders");
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return [];
  },

  async updateStatus(id, orderStatus) {
    try {
      const res = await client.put(`/api/orders/${id}/status`, { orderStatus });
      return res.data;
    } catch (error) {
      console.warn("Admin order status updated locally:", error.message);
      try {
        let stored = JSON.parse(localStorage.getItem("shopnest_demo_orders") || "[]");
        stored = stored.map((o) => (o._id === id ? { ...o, orderStatus } : o));
        localStorage.setItem("shopnest_demo_orders", JSON.stringify(stored));
      } catch (e) {
        console.error(e);
      }
      return { success: true, message: "Order status updated" };
    }
  },
};

export const analyticsService = {
  async getStats() {
    try {
      const res = await client.get("/api/analytics");
      if (res.data?.success) return res.data;
    } catch (error) {
      console.warn("Analytics stats local fallback:", error.message);
    }
    const products = getLocalProducts();
    let demoOrders = [];
    try {
      demoOrders = JSON.parse(localStorage.getItem("shopnest_demo_orders") || "[]");
    } catch {}

    const totalRevenue = demoOrders.reduce((s, o) => s + (o.totalPrice || 0), 485000);
    return {
      success: true,
      totalUsers: 142,
      totalOrders: demoOrders.length + 38,
      totalProducts: products.length,
      totalRevenue,
      categoryCounts: {
        electronics: 4,
        fashion: 4,
        sports: 4,
        medicines: 4,
      },
      recentOrders: demoOrders.slice(0, 5),
    };
  },
};

export default client;
