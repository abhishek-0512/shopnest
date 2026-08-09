export const sampleProducts = [
  // ================= ELECTRONICS =================
  {
    _id: "prod_elec_01",
    name: "Apple iPhone 15 Pro Max",
    brand: "Apple",
    category: "electronics",
    price: 139999,
    originalPrice: 159900,
    stock: 14,
    rating: 4.9,
    numReviews: 128,
    imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80",
    description: "Experience the revolutionary Titanium design, A17 Pro powerhouse chip, next-gen 48MP camera system with 5x optical telephoto lens, and the customizable Action button.",
    attributes: {
      storage: "256 GB",
      color: "Natural Titanium",
      display: "6.7-inch Super Retina XDR OLED",
      battery: "Up to 29 hours playback"
    },
    badge: "Bestseller",
    isFeatured: true,
    reviews: [
      {
        _id: "rev_01",
        name: "Aarav Sharma",
        rating: 5,
        comment: "Phenomenal build quality and battery life. The titanium feel is premium beyond words!",
        createdAt: "2026-07-28T10:30:00Z"
      },
      {
        _id: "rev_02",
        name: "Priya Patel",
        rating: 5,
        comment: "The camera is unmatched for low light and portrait photography. Worth every single penny.",
        createdAt: "2026-08-01T14:15:00Z"
      }
    ]
  },
  {
    _id: "prod_elec_02",
    name: "Sony WH-1000XM5 Wireless Headphones",
    brand: "Sony",
    category: "electronics",
    price: 26990,
    originalPrice: 34990,
    stock: 22,
    rating: 4.8,
    numReviews: 94,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    description: "Industry-leading noise cancellation powered by two processors and 8 microphones. Enjoy ultra-clear hands-free calling and up to 30 hours of continuous wireless playback.",
    attributes: {
      batteryLife: "30 Hours",
      connectivity: "Bluetooth 5.2 / 3.5mm",
      noiseCancelling: "Active Dual-Processor ANC",
      weight: "250g"
    },
    badge: "Trending",
    isFeatured: true,
    reviews: [
      {
        _id: "rev_03",
        name: "Rohan Verma",
        rating: 5,
        comment: "ANC is magical in noisy metro commutes. Soundstage is crystal crisp and deep.",
        createdAt: "2026-07-15T09:00:00Z"
      }
    ]
  },
  {
    _id: "prod_elec_03",
    name: "Apple MacBook Pro 14\" M3 Max",
    brand: "Apple",
    category: "electronics",
    price: 199900,
    originalPrice: 229900,
    stock: 8,
    rating: 4.9,
    numReviews: 67,
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
    description: "Extreme performance meets stunning Liquid Retina XDR screen. Powered by the M3 Max chip with 14-core CPU and 30-core GPU for uncompromising creative & coding workflows.",
    attributes: {
      ram: "36 GB Unified Memory",
      ssd: "1 TB NVMe SSD",
      display: "14.2-inch Liquid Retina XDR",
      chip: "Apple M3 Max"
    },
    badge: "Pro Choice",
    isFeatured: true,
    reviews: [
      {
        _id: "rev_04",
        name: "Devendra K.",
        rating: 5,
        comment: "Handles 4K video rendering and containerized builds in seconds. Silent fans and unbelievable screen.",
        createdAt: "2026-08-02T16:45:00Z"
      }
    ]
  },
  {
    _id: "prod_elec_04",
    name: "Samsung Galaxy Watch 6 Classic",
    brand: "Samsung",
    category: "electronics",
    price: 32999,
    originalPrice: 39999,
    stock: 18,
    rating: 4.7,
    numReviews: 53,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
    description: "Refined stainless steel rotating bezel, advanced sleep coaching, sapphire crystal glass, and continuous ECG and body composition tracking.",
    attributes: {
      caseSize: "47mm Stainless Steel",
      sensors: "BioActive (ECG, HR, BIA)",
      waterResistance: "5ATM + IP68",
      display: "Super AMOLED Always-on"
    },
    badge: "Hot Deal",
    isFeatured: false,
    reviews: []
  },

  // ================= FASHION =================
  {
    _id: "prod_fash_01",
    name: "Heritage Wool Overcoat",
    brand: "Nordic Atelier",
    category: "fashion",
    price: 7999,
    originalPrice: 12999,
    stock: 15,
    rating: 4.8,
    numReviews: 42,
    imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80",
    description: "Tailored from Italian double-faced melton wool blend, featuring notched lapels, horn buttons, and a silhouette designed for layering during crisp winters.",
    attributes: {
      material: "80% Merino Wool, 20% Cashmere",
      fit: "Tailored Relaxed Fit",
      care: "Dry Clean Only",
      gender: "Unisex"
    },
    badge: "Luxury",
    isFeatured: true,
    reviews: [
      {
        _id: "rev_05",
        name: "Simran K.",
        rating: 5,
        comment: "The drape and weight are incredible. Looks and feels like a designer piece costing 4x more.",
        createdAt: "2026-07-20T11:20:00Z"
      }
    ]
  },
  {
    _id: "prod_fash_02",
    name: "Minimalist Italian Leather Sneakers",
    brand: "Veloce",
    category: "fashion",
    price: 5499,
    originalPrice: 8999,
    stock: 25,
    rating: 4.7,
    numReviews: 88,
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80",
    description: "Handcrafted in Florence using full-grain calfskin leather, Margom rubber soles, and cushioned memory foam footbeds for day-long walking comfort.",
    attributes: {
      upper: "100% Full-Grain Calfskin",
      sole: "Vulcanized Natural Rubber",
      color: "Optic White / Tan Lining",
      sizes: "UK 6 - UK 11"
    },
    badge: "Bestseller",
    isFeatured: true,
    reviews: [
      {
        _id: "rev_06",
        name: "Vikram R.",
        rating: 5,
        comment: "Super comfortable straight out of the box. Versatile for both chinos and denim.",
        createdAt: "2026-08-04T12:00:00Z"
      }
    ]
  },
  {
    _id: "prod_fash_03",
    name: "Silk Blend Tailored Blazer",
    brand: "Sartorial Club",
    category: "fashion",
    price: 6499,
    originalPrice: 10499,
    stock: 12,
    rating: 4.6,
    numReviews: 31,
    imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop&q=80",
    description: "Breathable textured linen-silk blend with structured shoulder pads, horn buttons, and functional sleeve buttonholes.",
    attributes: {
      fabric: "65% Silk, 35% Belgian Linen",
      pockets: "Two welt, one ticket pocket",
      lining: "Cupro Bemberg"
    },
    badge: "Trending",
    isFeatured: false,
    reviews: []
  },
  {
    _id: "prod_fash_04",
    name: "Aviator Titanium Polarized Sunglasses",
    brand: "Solstice",
    category: "fashion",
    price: 3999,
    originalPrice: 5999,
    stock: 30,
    rating: 4.8,
    numReviews: 49,
    imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80",
    description: "Ultra-lightweight Japanese aerospace titanium frames with UV400 polarized emerald gradient glass lenses for glare-free vision.",
    attributes: {
      frame: "Beta Titanium (14g)",
      lenses: "UV400 Category 3 Polarized",
      warranty: "2 Years Comprehensive"
    },
    badge: "New Arrival",
    isFeatured: false,
    reviews: []
  },

  // ================= SPORTS =================
  {
    _id: "prod_sport_01",
    name: "Nike ZoomX Vaporfly Next% 3",
    brand: "Nike",
    category: "sports",
    price: 18995,
    originalPrice: 22995,
    stock: 10,
    rating: 4.9,
    numReviews: 76,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
    description: "Engineered for marathon PRs. Features responsive ZoomX foam paired with a full-length curved carbon fiber Flyplate for unparalleled energy return.",
    attributes: {
      cushioning: "Full-Length ZoomX Foam",
      plate: "Carbon Fiber Flyplate",
      drop: "8 mm",
      weight: "185 grams (Men's UK 8)"
    },
    badge: "Pro Choice",
    isFeatured: true,
    reviews: [
      {
        _id: "rev_07",
        name: "Karan Johar",
        rating: 5,
        comment: "Shaved 4 minutes off my half marathon time! The propulsion is unbelievable.",
        createdAt: "2026-07-29T18:00:00Z"
      }
    ]
  },
  {
    _id: "prod_sport_02",
    name: "Smart Adjustable Dumbbell Set (24kg)",
    brand: "IronFlex",
    category: "sports",
    price: 14999,
    originalPrice: 19999,
    stock: 16,
    rating: 4.8,
    numReviews: 64,
    imageUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&auto=format&fit=crop&q=80",
    description: "Rapid dial adjustment system from 2.5kg up to 24kg in increments of 1kg. Replaces 15 pairs of traditional dumbbells with anti-slip knurled steel grips.",
    attributes: {
      weightRange: "2.5 kg to 24 kg per dumbbell",
      mechanism: "Dual-Dial Quick Select",
      plates: "Heavy-Duty Coated Cast Iron"
    },
    badge: "Bestseller",
    isFeatured: true,
    reviews: [
      {
        _id: "rev_08",
        name: "Ananya M.",
        rating: 5,
        comment: "Saved so much space in my apartment gym. The dial turns smoothly with satisfying clicks.",
        createdAt: "2026-08-05T08:30:00Z"
      }
    ]
  },
  {
    _id: "prod_sport_03",
    name: "Garmin Forerunner 965 GPS Tri Watch",
    brand: "Garmin",
    category: "sports",
    price: 61990,
    originalPrice: 69990,
    stock: 7,
    rating: 4.9,
    numReviews: 38,
    imageUrl: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80",
    description: "Brilliant AMOLED touchscreen display with lightweight titanium bezel, built-in full-color maps, multi-band GPS, and comprehensive training readiness metrics.",
    attributes: {
      batteryLife: "Up to 23 days (smartwatch)",
      display: "1.4-inch AMOLED Display",
      metrics: "HRV, Training Readiness, VO2 Max"
    },
    badge: "Top Rated",
    isFeatured: false,
    reviews: []
  },
  {
    _id: "prod_sport_04",
    name: "Carbon Pro Yoga & Pilates Mat (6mm)",
    brand: "Manduka",
    category: "sports",
    price: 3499,
    originalPrice: 4999,
    stock: 35,
    rating: 4.7,
    numReviews: 57,
    imageUrl: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&auto=format&fit=crop&q=80",
    description: "High-density closed-cell cushioning with textured anti-slip surface that repels sweat and moisture. Eco-certified biodegradable natural tree rubber.",
    attributes: {
      thickness: "6 mm High-Density",
      dimensions: "185 cm x 68 cm",
      material: "Eco Organic Natural Rubber"
    },
    badge: "Eco Friendly",
    isFeatured: false,
    reviews: []
  },

  // ================= MEDICINES & WELLNESS =================
  {
    _id: "prod_med_01",
    name: "Omron Complete Smart ECG & BP Monitor",
    brand: "Omron",
    category: "medicines",
    price: 9499,
    originalPrice: 12999,
    stock: 20,
    rating: 4.9,
    numReviews: 83,
    imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80",
    description: "Clinically validated 2-in-1 upper arm blood pressure monitor and single-lead ECG that records heart rhythm and detects AFib in under 30 seconds with Bluetooth sync.",
    attributes: {
      connectivity: "Bluetooth to iOS & Android",
      detection: "AFib, Tachycardia, Bradycardia",
      validation: "FDA Cleared & European Society of Hypertension"
    },
    badge: "Doctor Approved",
    isFeatured: true,
    reviews: [
      {
        _id: "rev_09",
        name: "Dr. Sandeep Mehta",
        rating: 5,
        comment: "Excellent accuracy comparable to hospital grade monitors. Vital tool for senior heart monitoring.",
        createdAt: "2026-07-22T07:15:00Z"
      }
    ]
  },
  {
    _id: "prod_med_02",
    name: "Pure Himalayan Shilajit Resin (Gold Grade)",
    brand: "VedaPure",
    category: "medicines",
    price: 1899,
    originalPrice: 2999,
    stock: 45,
    rating: 4.8,
    numReviews: 112,
    imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80",
    description: "100% pure organic Himalayan resin harvested at 18,000+ feet. Contains >80% Fulvic Acid and 84+ ionic trace minerals for sustained vitality and stamina.",
    attributes: {
      potency: "80%+ Fulvic Acid",
      origin: "Kishtwar Himalayas (18,000 ft)",
      certification: "Ayush GMP & Lab Tested"
    },
    badge: "Bestseller",
    isFeatured: true,
    reviews: [
      {
        _id: "rev_10",
        name: "Aditya N.",
        rating: 5,
        comment: "Noticeable boost in morning energy and recovery after workouts. Authentic pea-sized dose.",
        createdAt: "2026-08-03T19:20:00Z"
      }
    ]
  },
  {
    _id: "prod_med_03",
    name: "Triple Strength Omega-3 Wild Fish Oil (120 Softgels)",
    brand: "Nordic Health",
    category: "medicines",
    price: 1499,
    originalPrice: 2299,
    stock: 50,
    rating: 4.8,
    numReviews: 71,
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80",
    description: "Molecularly distilled wild-caught deep ocean fish oil. Delivers 1000mg EPA + 500mg DHA per serving with zero fishy burps and lemon essence.",
    attributes: {
      dosage: "1500mg Total Omega-3s (1000 EPA / 500 DHA)",
      form: "Burp-Less Enteric Softgels",
      count: "120 Softgels (2 Months Supply)"
    },
    badge: "Popular",
    isFeatured: false,
    reviews: []
  },
  {
    _id: "prod_med_04",
    name: "Smart Mesh Ultrasonic Nebulizer",
    brand: "AeroCare",
    category: "medicines",
    price: 2199,
    originalPrice: 3499,
    stock: 28,
    rating: 4.7,
    numReviews: 44,
    imageUrl: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800&auto=format&fit=crop&q=80",
    description: "Silent, pocket-sized ultrasonic mesh nebulizer for instant respiratory relief for adults and kids. USB rechargeable with self-cleaning mode.",
    attributes: {
      particleSize: "MMAD < 3.5 microns",
      noiseLevel: "< 25 dB (Ultra-quiet)",
      battery: "Built-in Lithium USB-C"
    },
    badge: "Essential",
    isFeatured: false,
    reviews: []
  }
];

export const sampleCategories = [
  {
    id: "all",
    name: "All Products",
    icon: "FiGrid",
    count: 16,
    color: "#6366f1"
  },
  {
    id: "electronics",
    name: "Electronics",
    icon: "FiSmartphone",
    count: 4,
    color: "#3b82f6",
    tagline: "Latest Flagships & Audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "fashion",
    name: "Fashion & Apparel",
    icon: "FiTag",
    count: 4,
    color: "#ec4899",
    tagline: "Tailored & Trendsetting Styles",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "sports",
    name: "Sports & Fitness",
    icon: "FiActivity",
    count: 4,
    color: "#10b981",
    tagline: "High Performance Gear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "medicines",
    name: "Medicines & Health",
    icon: "FiHeart",
    count: 4,
    color: "#f59e0b",
    tagline: "Certified Wellness & Diagnostics",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=80"
  }
];

export const promoCoupons = [
  {
    code: "SHOPNEST20",
    discountPercent: 20,
    maxDiscount: 5000,
    description: "20% OFF on all orders over ₹1,999"
  },
  {
    code: "WELCOME50",
    flatDiscount: 500,
    minCartValue: 1500,
    description: "Flat ₹500 OFF for new members"
  },
  {
    code: "FREESHIP",
    freeShipping: true,
    description: "Zero delivery fees on any cart total"
  }
];
