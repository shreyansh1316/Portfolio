import { useState, useEffect, useRef } from "react";

// ============ DATA & STATE ============
const PRODUCTS = [
  { id: 1, name: "Tata Salt", nameHi: "नमक", price: 20, unit: "1kg", category: "Staples", stock: 50, emoji: "🧂" },
  { id: 2, name: "Amul Butter", nameHi: "मक्खन", price: 55, unit: "100g", category: "Dairy", stock: 30, emoji: "🧈" },
  { id: 3, name: "Aashirvaad Atta", nameHi: "आटा", price: 280, unit: "5kg", category: "Staples", stock: 25, emoji: "🌾" },
  { id: 4, name: "Surf Excel", nameHi: "सर्फ एक्सेल", price: 120, unit: "500g", category: "Household", stock: 40, emoji: "🫧" },
  { id: 5, name: "Maggi Noodles", nameHi: "मैगी", price: 14, unit: "70g", category: "Snacks", stock: 100, emoji: "🍜" },
  { id: 6, name: "Parle-G", nameHi: "पारले-जी", price: 10, unit: "100g", category: "Snacks", stock: 80, emoji: "🍪" },
  { id: 7, name: "Toor Dal", nameHi: "तूर दाल", price: 160, unit: "1kg", category: "Staples", stock: 35, emoji: "🫘" },
  { id: 8, name: "Sunflower Oil", nameHi: "सनफ्लावर तेल", price: 140, unit: "1L", category: "Oil", stock: 20, emoji: "🫙" },
  { id: 9, name: "Basmati Rice", nameHi: "बासमती चावल", price: 80, unit: "1kg", category: "Staples", stock: 45, emoji: "🍚" },
  { id: 10, name: "Lifebuoy Soap", nameHi: "साबुन", price: 35, unit: "100g", category: "Household", stock: 60, emoji: "🧼" },
  { id: 11, name: "Amul Milk", nameHi: "दूध", price: 28, unit: "500ml", category: "Dairy", stock: 0, emoji: "🥛" },
  { id: 12, name: "Chilli Powder", nameHi: "मिर्च पाउडर", price: 55, unit: "200g", category: "Spices", stock: 30, emoji: "🌶️" },
];

const CUSTOMERS = [
  { id: "C001", name: "Ramesh Sharma", phone: "9876543210", address: "12, Gandhi Nagar", creditLimit: 2000, balance: 1450, loyaltyPoints: 230, lastOrder: "2024-01-20" },
  { id: "C002", name: "Sunita Patel", phone: "9123456789", address: "45, Shivaji Colony", creditLimit: 3000, balance: 800, loyaltyPoints: 510, lastOrder: "2024-01-22" },
  { id: "C003", name: "Mohan Das", phone: "9988776655", address: "7, Ram Niwas", creditLimit: 1500, balance: 0, loyaltyPoints: 90, lastOrder: "2024-01-15" },
];

const ORDERS_DATA = [
  { id: "ORD001", customerId: "C001", customerName: "Ramesh Sharma", items: [{product: "Tata Salt", qty: 2, price: 20}, {product: "Aashirvaad Atta", qty: 1, price: 280}], total: 320, status: "pending", payment: "khata", time: "10:30 AM", date: "Today" },
  { id: "ORD002", customerId: "C002", customerName: "Sunita Patel", items: [{product: "Amul Butter", qty: 1, price: 55}, {product: "Maggi Noodles", qty: 5, price: 14}], total: 125, status: "delivered", payment: "cod", time: "09:15 AM", date: "Today" },
  { id: "ORD003", customerId: "C003", customerName: "Mohan Das", items: [{product: "Basmati Rice", qty: 2, price: 80}, {product: "Toor Dal", qty: 1, price: 160}], total: 320, status: "accepted", payment: "online", time: "11:45 AM", date: "Yesterday" },
];

// ============ ICONS ============
const Icon = ({ name, size = 20, color = "currentColor" }) => {
  const icons = {
    home: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    cart: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>,
    khata: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    profile: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    qr: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="5" y="5" width="3" height="3" fill={color}/><rect x="16" y="5" width="3" height="3" fill={color}/><rect x="16" y="16" width="3" height="3" fill={color}/><rect x="5" y="16" width="3" height="3" fill={color}/></svg>,
    plus: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    minus: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2.5" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    search: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    check: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>,
    close: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    bell: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
    truck: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
    rupee: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><line x1="6" y1="3" x2="18" y2="3"/><line x1="6" y1="9" x2="18" y2="9"/><path d="M6 15h3a6 6 0 000-12"/><path d="M6 21l9-12"/></svg>,
    chart: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    users: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
    order: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,
    download: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    back: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>,
    star: <svg width={size} height={size} fill={color} stroke={color} strokeWidth="1" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    gift: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/></svg>,
    store: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    upload: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>,
    clock: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    whatsapp: <svg width={size} height={size} fill={color} viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
    settings: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  };
  return icons[name] || null;
};

// ============ QR CODE SVG ============
const QRCode = ({ value, size = 120 }) => {
  const pattern = [];
  const seed = value.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const rand = (n) => { let x = Math.sin(seed + n) * 10000; return x - Math.floor(x); };
  const modules = 21;
  for (let r = 0; r < modules; r++) {
    for (let c = 0; c < modules; c++) {
      const isCorner = (r < 7 && c < 7) || (r < 7 && c >= modules - 7) || (r >= modules - 7 && c < 7);
      const isCornerInner = (r >= 2 && r <= 4 && c >= 2 && c <= 4) || (r >= 2 && r <= 4 && c >= modules - 5 && c <= modules - 3) || (r >= modules - 5 && r <= modules - 3 && c >= 2 && c <= 4);
      const filled = isCorner ? true : isCornerInner ? true : rand(r * modules + c) > 0.5;
      pattern.push({ r, c, filled });
    }
  }
  const cellSize = size / modules;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
      <rect width={size} height={size} fill="white" rx="4"/>
      {pattern.map(({ r, c, filled }) => filled && (
        <rect key={`${r}-${c}`} x={c * cellSize} y={r * cellSize} width={cellSize - 0.5} height={cellSize - 0.5} fill="#1a1a1a" rx="0.5"/>
      ))}
    </svg>
  );
};

// ============ TOAST ============
const Toast = ({ msg, type, onClose }) => (
  <div style={{
    position: "fixed", bottom: 80, left: "50%", transform: "translateX(-50%)",
    background: type === "success" ? "#16a34a" : type === "error" ? "#dc2626" : "#f97316",
    color: "white", padding: "10px 20px", borderRadius: 12, fontFamily: "'Poppins', sans-serif",
    fontSize: 13, fontWeight: 600, zIndex: 9999, boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    display: "flex", alignItems: "center", gap: 8, maxWidth: 300, textAlign: "center"
  }}>
    {type === "success" && <Icon name="check" size={16}/>}
    {msg}
  </div>
);

// ============ MAIN APP ============
export default function SmartKhata() {
  const [screen, setScreen] = useState("splash"); // splash, login, customer, owner
  const [userType, setUserType] = useState(null);
  const [currentCustomer, setCurrentCustomer] = useState(CUSTOMERS[0]);
  const [cart, setCart] = useState({});
  const [orders, setOrders] = useState(ORDERS_DATA);
  const [products] = useState(PRODUCTS);
  const [toast, setToast] = useState(null);
  const [customerTab, setCustomerTab] = useState("home");
  const [ownerTab, setOwnerTab] = useState("orders");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [phone, setPhone] = useState("");
  const [loginStep, setLoginStep] = useState("role"); // role, phone, otp
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [deliverySlot, setDeliverySlot] = useState("morning");
  const [groceryText, setGroceryText] = useState("");
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showBillModal, setShowBillModal] = useState(null);
  const [selectedCustomerDetail, setSelectedCustomerDetail] = useState(null);
  const [animIn, setAnimIn] = useState(true);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = products.find(p => p.id === parseInt(id));
    return sum + (p ? p.price * qty : 0);
  }, 0);

  const addToCart = (productId) => {
    setCart(c => ({ ...c, [productId]: (c[productId] || 0) + 1 }));
  };
  const removeFromCart = (productId) => {
    setCart(c => {
      const n = { ...c };
      if (n[productId] > 1) n[productId]--;
      else delete n[productId];
      return n;
    });
  };

  const placeOrder = () => {
    const items = Object.entries(cart).map(([id, qty]) => {
      const p = products.find(p => p.id === parseInt(id));
      return { product: p.name, qty, price: p.price };
    });
    const newOrder = {
      id: `ORD${String(orders.length + 1).padStart(3, "0")}`,
      customerId: currentCustomer.id,
      customerName: currentCustomer.name,
      items, total: cartTotal, status: "pending",
      payment: paymentMethod, time: new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"}),
      date: "Today"
    };
    setOrders(o => [newOrder, ...o]);
    setCart({});
    setShowOrderModal(false);
    showToast("Order placed! ✓ Dukaan ko bhej diya gaya", "success");
    setCustomerTab("home");
  };

  const acceptOrder = (orderId) => {
    setOrders(o => o.map(order => order.id === orderId ? { ...order, status: "accepted" } : order));
    showToast("Order accepted! ✓", "success");
  };

  const rejectOrder = (orderId) => {
    setOrders(o => o.map(order => order.id === orderId ? { ...order, status: "rejected" } : order));
    showToast("Order rejected", "error");
  };

  const deliverOrder = (orderId) => {
    setOrders(o => o.map(order => order.id === orderId ? { ...order, status: "delivered" } : order));
    showToast("Marked as delivered! ✓", "success");
  };

  useEffect(() => {
    setTimeout(() => setScreen("login"), 2200);
  }, []);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.nameHi.includes(searchQuery) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const styles = {
    app: {
      maxWidth: 430, margin: "0 auto", minHeight: "100vh", background: "#f5f5f0",
      fontFamily: "'Poppins', sans-serif", position: "relative", overflow: "hidden",
    },
    statusBar: {
      background: "#16a34a", color: "white", padding: "8px 16px", fontSize: 11,
      display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: 500
    },
    header: {
      background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
      padding: "16px 20px 20px", color: "white",
      boxShadow: "0 4px 20px rgba(22,163,74,0.3)"
    },
    navBar: {
      position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
      width: "100%", maxWidth: 430, background: "white", display: "flex",
      borderTop: "1px solid #e8e8e8", zIndex: 100, boxShadow: "0 -4px 20px rgba(0,0,0,0.08)"
    },
    navBtn: (active) => ({
      flex: 1, padding: "8px 0", background: "none", border: "none",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
      cursor: "pointer", color: active ? "#16a34a" : "#9ca3af", transition: "all 0.2s",
      fontSize: 10, fontWeight: active ? 700 : 500, fontFamily: "'Poppins', sans-serif"
    }),
    card: {
      background: "white", borderRadius: 16, padding: 16, marginBottom: 12,
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)"
    },
    btn: (variant = "primary") => ({
      background: variant === "primary" ? "linear-gradient(135deg, #16a34a, #15803d)"
        : variant === "orange" ? "linear-gradient(135deg, #f97316, #ea580c)"
        : variant === "outline" ? "transparent" : "#f3f4f6",
      color: variant === "outline" ? "#16a34a" : variant === "ghost" ? "#374151" : "white",
      border: variant === "outline" ? "2px solid #16a34a" : "none",
      padding: "12px 24px", borderRadius: 12, fontFamily: "'Poppins', sans-serif",
      fontWeight: 700, fontSize: 14, cursor: "pointer", width: "100%",
      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      boxShadow: variant === "primary" ? "0 4px 15px rgba(22,163,74,0.3)" : "none"
    }),
    badge: (color) => ({
      background: color === "green" ? "#dcfce7" : color === "red" ? "#fee2e2"
        : color === "orange" ? "#ffedd5" : color === "blue" ? "#dbeafe" : "#f3f4f6",
      color: color === "green" ? "#16a34a" : color === "red" ? "#dc2626"
        : color === "orange" ? "#f97316" : color === "blue" ? "#2563eb" : "#6b7280",
      padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700
    }),
    input: {
      width: "100%", padding: "12px 16px", borderRadius: 12, border: "2px solid #e5e7eb",
      fontFamily: "'Poppins', sans-serif", fontSize: 15, outline: "none", boxSizing: "border-box",
      transition: "border-color 0.2s"
    }
  };

  // ======= SPLASH =======
  if (screen === "splash") {
    return (
      <div style={{ ...styles.app, background: "linear-gradient(160deg, #16a34a 0%, #14532d 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
        <div style={{ textAlign: "center", animation: "fadeIn 0.6s ease" }}>
          <div style={{ fontSize: 72, marginBottom: 8 }}>🛒</div>
          <h1 style={{ color: "white", fontSize: 42, fontWeight: 900, margin: "0 0 4px", letterSpacing: -1 }}>SmartKhata</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 16, margin: 0, fontWeight: 500 }}>आपकी डिजिटल खाता बही</p>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginTop: 4 }}>Your Digital Grocery Companion</p>
          <div style={{ marginTop: 48, display: "flex", gap: 8, justifyContent: "center" }}>
            {[0,1,2].map(i => <div key={i} style={{ width: i === 1 ? 24 : 8, height: 8, borderRadius: 4, background: i === 0 ? "white" : "rgba(255,255,255,0.4)", animation: `pulse ${1 + i * 0.3}s infinite` }}/>)}
          </div>
        </div>
        <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}`}</style>
      </div>
    );
  }

  // ======= LOGIN =======
  if (screen === "login") {
    const handleOtpInput = (val, idx) => {
      const newOtp = [...otp];
      newOtp[idx] = val.slice(-1);
      setOtp(newOtp);
    };
    return (
      <div style={{ ...styles.app, background: "linear-gradient(160deg, #16a34a 0%, #14532d 100%)", minHeight: "100vh" }}>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
        <div style={{ padding: "60px 24px 24px", textAlign: "center" }}>
          <div style={{ fontSize: 48 }}>🛒</div>
          <h1 style={{ color: "white", fontSize: 32, fontWeight: 900, margin: "8px 0 4px" }}>SmartKhata</h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, margin: 0 }}>आपकी डिजिटल खाता बही</p>
        </div>
        <div style={{ background: "white", borderRadius: "32px 32px 0 0", minHeight: "60vh", padding: 28, marginTop: 8 }}>
          {loginStep === "role" && (
            <>
              <h2 style={{ textAlign: "center", fontSize: 22, fontWeight: 800, margin: "0 0 8px", color: "#1a1a1a" }}>
                Login करें
              </h2>
              <p style={{ textAlign: "center", color: "#6b7280", fontSize: 13, marginBottom: 28 }}>आप कौन हैं? / Who are you?</p>
              <button style={{ ...styles.btn("primary"), marginBottom: 12, padding: "20px 24px", fontSize: 16 }}
                onClick={() => { setUserType("customer"); setLoginStep("phone"); }}>
                🧑‍🛒 Customer - ग्राहक
              </button>
              <button style={{ ...styles.btn("outline"), padding: "20px 24px", fontSize: 16 }}
                onClick={() => { setUserType("owner"); setLoginStep("phone"); }}>
                🏪 Store Owner - दुकानदार
              </button>
              <div style={{ textAlign: "center", marginTop: 24 }}>
                <p style={{ color: "#9ca3af", fontSize: 12 }}>Powered by SmartKhata v1.0</p>
              </div>
            </>
          )}
          {loginStep === "phone" && (
            <>
              <button onClick={() => setLoginStep("role")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, color: "#6b7280", fontSize: 13, marginBottom: 20, padding: 0 }}>
                <Icon name="back" size={16}/> वापस जाएं
              </button>
              <h2 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 8px", color: "#1a1a1a" }}>
                {userType === "customer" ? "📱 अपना नंबर दर्ज करें" : "🔐 Admin Login"}
              </h2>
              <p style={{ color: "#6b7280", fontSize: 13, marginBottom: 24 }}>
                {userType === "customer" ? "OTP आपके WhatsApp पर आएगा" : "Store admin portal access"}
              </p>
              <input style={styles.input} type="tel" placeholder="10-digit mobile number" value={phone}
                onChange={e => setPhone(e.target.value)} maxLength={10}/>
              <button style={{ ...styles.btn("primary"), marginTop: 16 }}
                onClick={() => { setOtpSent(true); setLoginStep("otp"); showToast("OTP sent to WhatsApp! 📱", "success"); }}>
                OTP भेजें (Send OTP)
              </button>
            </>
          )}
          {loginStep === "otp" && (
            <>
              <button onClick={() => setLoginStep("phone")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, color: "#6b7280", fontSize: 13, marginBottom: 20, padding: 0 }}>
                <Icon name="back" size={16}/> वापस जाएं
              </button>
              <h2 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 8px", color: "#1a1a1a" }}>OTP दर्ज करें</h2>
              <p style={{ color: "#6b7280", fontSize: 13, marginBottom: 24 }}>+91 {phone} पर भेजा गया है</p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 24 }}>
                {otp.map((val, i) => (
                  <input key={i} style={{ ...styles.input, width: 56, textAlign: "center", fontSize: 24, fontWeight: 800, padding: "12px 0", borderColor: val ? "#16a34a" : "#e5e7eb" }}
                    value={val} onChange={e => handleOtpInput(e.target.value, i)} maxLength={1} type="number"/>
                ))}
              </div>
              <button style={styles.btn("primary")}
                onClick={() => { setScreen(userType === "customer" ? "customer" : "owner"); showToast(`Welcome! 🎉`, "success"); }}>
                {userType === "customer" ? "✓ Login करें" : "✓ Admin Dashboard"}
              </button>
              <p style={{ textAlign: "center", color: "#9ca3af", fontSize: 12, marginTop: 16 }}>
                Use OTP: <strong>1234</strong> (demo)
              </p>
            </>
          )}
        </div>
        {toast && <Toast {...toast}/>}
      </div>
    );
  }

  // ======= CUSTOMER APP =======
  if (screen === "customer") {
    const myOrders = orders.filter(o => o.customerId === currentCustomer.id);

    return (
      <div style={styles.app}>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
        <style>{`
          *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
          ::-webkit-scrollbar{width:0;height:0}
          input:focus{border-color:#16a34a!important;outline:none}
          @keyframes slideUp{from{transform:translateY(100%)}to{transform:none}}
          @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
          .fade-in{animation:fadeIn 0.3s ease}
          .product-card:active{transform:scale(0.97)}
        `}</style>

        {/* Header */}
        <div style={styles.header}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <div>
              <p style={{ margin: 0, fontSize: 11, opacity: 0.8 }}>नमस्ते 🙏</p>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>{currentCustomer.name}</h2>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <button onClick={() => setShowQR(true)} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 12, padding: "8px 12px", cursor: "pointer", color: "white" }}>
                <Icon name="qr" size={20} color="white"/>
              </button>
              <button onClick={() => setScreen("login")} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 12, padding: "8px 12px", cursor: "pointer", color: "white", fontSize: 12, fontWeight: 600, fontFamily: "'Poppins',sans-serif" }}>
                Logout
              </button>
            </div>
          </div>
          {/* Balance card */}
          <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 16, padding: "12px 16px", marginTop: 12, display: "flex", justifyContent: "space-between" }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ margin: 0, fontSize: 11, opacity: 0.8 }}>बकाया / Due</p>
              <p style={{ margin: 0, fontWeight: 900, fontSize: 22, color: currentCustomer.balance > 0 ? "#fbbf24" : "#86efac" }}>₹{currentCustomer.balance}</p>
            </div>
            <div style={{ width: 1, background: "rgba(255,255,255,0.3)" }}/>
            <div style={{ textAlign: "center" }}>
              <p style={{ margin: 0, fontSize: 11, opacity: 0.8 }}>Credit Limit</p>
              <p style={{ margin: 0, fontWeight: 800, fontSize: 20 }}>₹{currentCustomer.creditLimit}</p>
            </div>
            <div style={{ width: 1, background: "rgba(255,255,255,0.3)" }}/>
            <div style={{ textAlign: "center" }}>
              <p style={{ margin: 0, fontSize: 11, opacity: 0.8 }}>Points ⭐</p>
              <p style={{ margin: 0, fontWeight: 800, fontSize: 20, color: "#fbbf24" }}>{currentCustomer.loyaltyPoints}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "16px 16px 80px", overflowY: "auto" }}>

          {/* HOME TAB */}
          {customerTab === "home" && (
            <div className="fade-in">
              {/* Quick Actions */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                {[
                  { icon: "cart", label: "Order करें", labelEn: "New Order", color: "#16a34a", tab: "shop" },
                  { icon: "khata", label: "खाता देखें", labelEn: "View Khata", color: "#f97316", tab: "khata" },
                  { icon: "order", label: "Orders", labelEn: "My Orders", color: "#2563eb", tab: "orders" },
                  { icon: "gift", label: "Points", labelEn: "Rewards", color: "#7c3aed", action: () => showToast("Coming Soon! 🎁", "info") },
                ].map(({ icon, label, labelEn, color, tab, action }) => (
                  <button key={label} onClick={() => action ? action() : setCustomerTab(tab)}
                    style={{ background: "white", border: "none", borderRadius: 16, padding: "20px 12px", cursor: "pointer", textAlign: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "transform 0.15s" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>
                      <Icon name={icon} size={22} color={color}/>
                    </div>
                    <p style={{ margin: 0, fontWeight: 800, fontSize: 14, color: "#1a1a1a" }}>{label}</p>
                    <p style={{ margin: 0, fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{labelEn}</p>
                  </button>
                ))}
              </div>

              {/* Recent Orders */}
              <h3 style={{ fontWeight: 800, fontSize: 16, margin: "4px 0 12px", color: "#1a1a1a" }}>हालिया Orders 📦</h3>
              {myOrders.length === 0 ? (
                <div style={{ ...styles.card, textAlign: "center", padding: 32, color: "#9ca3af" }}>
                  <div style={{ fontSize: 40, marginBottom: 8 }}>🛒</div>
                  <p style={{ margin: 0, fontWeight: 600 }}>कोई order नहीं</p>
                  <p style={{ margin: 0, fontSize: 12 }}>Shop tab से order करें</p>
                </div>
              ) : myOrders.slice(0, 3).map(order => (
                <div key={order.id} style={styles.card}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <div>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: 14 }}>{order.id}</p>
                      <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>{order.date} • {order.time}</p>
                    </div>
                    <span style={styles.badge(order.status === "delivered" ? "green" : order.status === "pending" ? "orange" : order.status === "accepted" ? "blue" : "red")}>
                      {order.status === "pending" ? "⏳ Pending" : order.status === "accepted" ? "✓ Accepted" : order.status === "delivered" ? "✅ Delivered" : "❌ Rejected"}
                    </span>
                  </div>
                  <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>{order.items.length} items • {order.payment.toUpperCase()}</p>
                    <p style={{ margin: 0, fontWeight: 800, fontSize: 16, color: "#16a34a" }}>₹{order.total}</p>
                  </div>
                </div>
              ))}

              {/* Payment Reminder */}
              {currentCustomer.balance > 0 && (
                <div style={{ background: "linear-gradient(135deg, #fff7ed, #ffedd5)", border: "2px solid #fed7aa", borderRadius: 16, padding: 16, marginTop: 4 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{ fontSize: 32 }}>💰</div>
                    <div>
                      <p style={{ margin: 0, fontWeight: 800, color: "#9a3412", fontSize: 15 }}>Khata Reminder!</p>
                      <p style={{ margin: 0, fontSize: 12, color: "#c2410c" }}>इस महीने ₹{currentCustomer.balance} बकाया है</p>
                    </div>
                  </div>
                  <button style={{ ...styles.btn("orange"), marginTop: 12, padding: "10px 16px", fontSize: 13 }}
                    onClick={() => showToast("Payment link WhatsApp पर भेजा गया! 📱", "success")}>
                    <Icon name="whatsapp" size={16} color="white"/> WhatsApp पर Pay करें
                  </button>
                </div>
              )}
            </div>
          )}

          {/* SHOP TAB */}
          {customerTab === "shop" && (
            <div className="fade-in">
              <div style={{ display: "flex", gap: 10, marginBottom: 16, alignItems: "center" }}>
                <div style={{ flex: 1, position: "relative" }}>
                  <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}>
                    <Icon name="search" size={18} color="#9ca3af"/>
                  </div>
                  <input style={{ ...styles.input, paddingLeft: 40 }} placeholder="Search products..." value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}/>
                </div>
                {cartCount > 0 && (
                  <button onClick={() => setShowOrderModal(true)} style={{ background: "#16a34a", color: "white", border: "none", borderRadius: 12, padding: "12px 16px", cursor: "pointer", fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 13, whiteSpace: "nowrap", boxShadow: "0 4px 15px rgba(22,163,74,0.3)" }}>
                    🛒 {cartCount} • ₹{cartTotal}
                  </button>
                )}
              </div>

              {/* Upload grocery list */}
              <div style={{ background: "linear-gradient(135deg, #eff6ff, #dbeafe)", border: "2px dashed #93c5fd", borderRadius: 16, padding: 16, marginBottom: 16 }}>
                <p style={{ margin: "0 0 8px", fontWeight: 700, fontSize: 14, color: "#1e40af" }}>📝 List Upload करें</p>
                <textarea style={{ ...styles.input, height: 80, resize: "none", fontSize: 13, background: "transparent" }}
                  placeholder="Type your grocery list here... या list लिखें&#10;E.g: Maggi 5 packet, Atta 5kg, Milk 2L"
                  value={groceryText} onChange={e => setGroceryText(e.target.value)}/>
                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  <button style={{ ...styles.btn("outline"), flex: 1, padding: "8px 12px", fontSize: 12 }}
                    onClick={() => showToast("Image upload feature coming soon!", "info")}>
                    <Icon name="upload" size={14}/> Photo Upload
                  </button>
                  <button style={{ ...styles.btn("primary"), flex: 1, padding: "8px 12px", fontSize: 12 }}
                    onClick={() => { if(groceryText) { showToast("List sent to store! 📤", "success"); setGroceryText(""); }}}>
                    दुकान को भेजें
                  </button>
                </div>
              </div>

              {/* Categories */}
              <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, marginBottom: 12 }}>
                {["All", "Staples", "Dairy", "Snacks", "Household", "Oil", "Spices"].map(cat => (
                  <button key={cat} onClick={() => setSearchQuery(cat === "All" ? "" : cat)}
                    style={{ background: searchQuery === cat || (cat === "All" && !searchQuery) ? "#16a34a" : "white",
                      color: searchQuery === cat || (cat === "All" && !searchQuery) ? "white" : "#374151",
                      border: "none", borderRadius: 20, padding: "6px 16px", cursor: "pointer", whiteSpace: "nowrap",
                      fontSize: 12, fontWeight: 600, fontFamily: "'Poppins',sans-serif",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                    {cat}
                  </button>
                ))}
              </div>

              {/* Products */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {filteredProducts.map(product => (
                  <div key={product.id} className="product-card" style={{ background: "white", borderRadius: 16, padding: 14, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "transform 0.15s", opacity: product.stock === 0 ? 0.6 : 1 }}>
                    <div style={{ fontSize: 36, textAlign: "center", marginBottom: 8 }}>{product.emoji}</div>
                    <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: 13, color: "#1a1a1a", lineHeight: 1.3 }}>{product.name}</p>
                    <p style={{ margin: "0 0 2px", fontSize: 11, color: "#9ca3af" }}>{product.nameHi}</p>
                    <p style={{ margin: "0 0 10px", fontSize: 11, color: "#6b7280" }}>{product.unit}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <p style={{ margin: 0, fontWeight: 900, fontSize: 16, color: "#16a34a" }}>₹{product.price}</p>
                      {product.stock === 0 ? (
                        <span style={{ fontSize: 10, color: "#dc2626", fontWeight: 700 }}>Out of Stock</span>
                      ) : cart[product.id] ? (
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <button onClick={() => removeFromCart(product.id)} style={{ width: 26, height: 26, borderRadius: 8, background: "#fee2e2", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Icon name="minus" size={12} color="#dc2626"/>
                          </button>
                          <span style={{ fontWeight: 800, fontSize: 14, minWidth: 16, textAlign: "center" }}>{cart[product.id]}</span>
                          <button onClick={() => addToCart(product.id)} style={{ width: 26, height: 26, borderRadius: 8, background: "#dcfce7", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Icon name="plus" size={12} color="#16a34a"/>
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => addToCart(product.id)} style={{ width: 30, height: 30, borderRadius: 10, background: "#16a34a", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(22,163,74,0.4)" }}>
                          <Icon name="plus" size={16} color="white"/>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ORDERS TAB */}
          {customerTab === "orders" && (
            <div className="fade-in">
              <h3 style={{ fontWeight: 800, fontSize: 18, margin: "0 0 16px", color: "#1a1a1a" }}>मेरे Orders 📦</h3>
              {myOrders.length === 0 ? (
                <div style={{ ...styles.card, textAlign: "center", padding: 40 }}>
                  <div style={{ fontSize: 48 }}>📭</div>
                  <p style={{ fontWeight: 700, color: "#6b7280" }}>कोई order नहीं मिला</p>
                </div>
              ) : myOrders.map(order => (
                <div key={order.id} style={{ ...styles.card, cursor: "pointer" }} onClick={() => setShowBillModal(order)}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <div>
                      <p style={{ margin: 0, fontWeight: 800, fontSize: 15 }}>{order.id}</p>
                      <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>{order.date} • {order.time}</p>
                    </div>
                    <span style={styles.badge(order.status === "delivered" ? "green" : order.status === "pending" ? "orange" : order.status === "accepted" ? "blue" : "red")}>
                      {order.status === "pending" ? "⏳ Pending" : order.status === "accepted" ? "✓ Accepted" : order.status === "delivered" ? "✅ Delivered" : "❌ Rejected"}
                    </span>
                  </div>
                  <div style={{ background: "#f9fafb", borderRadius: 10, padding: "10px 12px", marginBottom: 10 }}>
                    {order.items.map((item, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: i < order.items.length - 1 ? 4 : 0 }}>
                        <span style={{ fontSize: 12, color: "#374151" }}>{item.product} × {item.qty}</span>
                        <span style={{ fontSize: 12, fontWeight: 700 }}>₹{item.price * item.qty}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: "#6b7280" }}>{order.payment === "khata" ? "📒 Khata" : order.payment === "cod" ? "💵 COD" : "💳 Online"}</span>
                    <p style={{ margin: 0, fontWeight: 900, fontSize: 18, color: "#16a34a" }}>₹{order.total}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* KHATA TAB */}
          {customerTab === "khata" && (
            <div className="fade-in">
              <h3 style={{ fontWeight: 800, fontSize: 18, margin: "0 0 16px", color: "#1a1a1a" }}>मेरी खाता बही 📒</h3>
              <div style={{ background: "linear-gradient(135deg, #f97316, #ea580c)", borderRadius: 20, padding: 20, color: "white", marginBottom: 16 }}>
                <p style={{ margin: 0, fontSize: 13, opacity: 0.85 }}>इस महीने का बकाया</p>
                <p style={{ margin: "4px 0 0", fontSize: 36, fontWeight: 900 }}>₹{currentCustomer.balance}</p>
                <div style={{ display: "flex", gap: 20, marginTop: 16 }}>
                  <div><p style={{ margin: 0, fontSize: 11, opacity: 0.8 }}>Credit Limit</p><p style={{ margin: 0, fontWeight: 800, fontSize: 18 }}>₹{currentCustomer.creditLimit}</p></div>
                  <div><p style={{ margin: 0, fontSize: 11, opacity: 0.8 }}>Available</p><p style={{ margin: 0, fontWeight: 800, fontSize: 18 }}>₹{currentCustomer.creditLimit - currentCustomer.balance}</p></div>
                </div>
              </div>
              <button style={{ ...styles.btn("primary"), marginBottom: 16 }}
                onClick={() => showToast("Payment link WhatsApp पर भेजा गया! 📱", "success")}>
                <Icon name="whatsapp" size={18} color="white"/> Pay via WhatsApp
              </button>
              <h4 style={{ fontWeight: 700, fontSize: 15, margin: "0 0 12px" }}>Transaction History</h4>
              {[
                { date: "Jan 20", desc: "Order ORD001", amount: -320, type: "debit" },
                { date: "Jan 18", desc: "Payment Received", amount: 500, type: "credit" },
                { date: "Jan 15", desc: "Order ORD003", amount: -320, type: "debit" },
                { date: "Jan 10", desc: "Payment Received", amount: 1000, type: "credit" },
              ].map((tx, i) => (
                <div key={i} style={{ ...styles.card, padding: "12px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: tx.type === "credit" ? "#dcfce7" : "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
                        {tx.type === "credit" ? "💚" : "🔴"}
                      </div>
                      <div>
                        <p style={{ margin: 0, fontWeight: 700, fontSize: 13 }}>{tx.desc}</p>
                        <p style={{ margin: 0, fontSize: 11, color: "#9ca3af" }}>{tx.date} • 2024</p>
                      </div>
                    </div>
                    <p style={{ margin: 0, fontWeight: 800, fontSize: 16, color: tx.type === "credit" ? "#16a34a" : "#dc2626" }}>
                      {tx.type === "credit" ? "+" : ""}₹{Math.abs(tx.amount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PROFILE TAB */}
          {customerTab === "profile" && (
            <div className="fade-in">
              <div style={{ ...styles.card, textAlign: "center", padding: 28, marginBottom: 16 }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, #16a34a, #15803d)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontSize: 32 }}>
                  🧑
                </div>
                <h2 style={{ margin: "0 0 4px", fontWeight: 800, fontSize: 20 }}>{currentCustomer.name}</h2>
                <p style={{ margin: 0, color: "#6b7280", fontSize: 14 }}>📱 +91 {currentCustomer.phone}</p>
                <p style={{ margin: "4px 0 16px", color: "#6b7280", fontSize: 13 }}>📍 {currentCustomer.address}</p>
                <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                  <span style={styles.badge("green")}>⭐ {currentCustomer.loyaltyPoints} Points</span>
                  <span style={styles.badge("blue")}>ID: {currentCustomer.id}</span>
                </div>
              </div>

              <button style={{ ...styles.btn(), marginBottom: 8, background: "white", color: "#374151", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
                onClick={() => setShowQR(true)}>
                <Icon name="qr" size={18} color="#16a34a"/> मेरा QR Code देखें
              </button>
              <button style={{ ...styles.btn(), marginBottom: 8, background: "white", color: "#374151", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
                onClick={() => showToast("Notifications settings coming soon!", "info")}>
                <Icon name="bell" size={18} color="#f97316"/> Notifications Settings
              </button>
              <button style={{ ...styles.btn("outline"), marginBottom: 8 }}
                onClick={() => { setScreen("login"); setLoginStep("role"); }}>
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Bottom Nav */}
        <div style={styles.navBar}>
          {[
            { tab: "home", icon: "home", label: "Home" },
            { tab: "shop", icon: "cart", label: "Shop" },
            { tab: "orders", icon: "order", label: "Orders" },
            { tab: "khata", icon: "khata", label: "Khata" },
            { tab: "profile", icon: "profile", label: "Profile" },
          ].map(({ tab, icon, label }) => (
            <button key={tab} style={styles.navBtn(customerTab === tab)} onClick={() => setCustomerTab(tab)}>
              <Icon name={icon} size={20} color={customerTab === tab ? "#16a34a" : "#9ca3af"}/>
              {label}
              {tab === "shop" && cartCount > 0 && (
                <span style={{ position: "absolute", top: 6, background: "#f97316", color: "white", borderRadius: 10, fontSize: 10, fontWeight: 800, padding: "1px 5px", marginLeft: 16 }}>{cartCount}</span>
              )}
            </button>
          ))}
        </div>

        {/* QR Modal */}
        {showQR && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
            onClick={() => setShowQR(false)}>
            <div style={{ background: "white", borderRadius: 24, padding: 32, textAlign: "center", maxWidth: 320, width: "100%" }} onClick={e => e.stopPropagation()}>
              <h3 style={{ fontWeight: 800, fontSize: 18, margin: "0 0 8px" }}>मेरा QR Code 📱</h3>
              <p style={{ color: "#6b7280", fontSize: 13, marginBottom: 20 }}>दुकानदार को scan करने दें</p>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                <QRCode value={`smartkhata://customer/${currentCustomer.id}/${currentCustomer.phone}`} size={160}/>
              </div>
              <p style={{ fontWeight: 700, fontSize: 14, margin: "0 0 4px" }}>{currentCustomer.name}</p>
              <p style={{ color: "#6b7280", fontSize: 12, marginBottom: 20 }}>ID: {currentCustomer.id} • {currentCustomer.phone}</p>
              <button style={styles.btn("primary")} onClick={() => setShowQR(false)}>✓ बंद करें</button>
            </div>
          </div>
        )}

        {/* Order Confirm Modal */}
        {showOrderModal && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200, display: "flex", alignItems: "flex-end" }}>
            <div style={{ background: "white", borderRadius: "28px 28px 0 0", width: "100%", maxWidth: 430, margin: "0 auto", padding: "24px 24px 40px", animation: "slideUp 0.3s ease", maxHeight: "85vh", overflowY: "auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h3 style={{ fontWeight: 800, fontSize: 18, margin: 0 }}>Order Confirm करें 🛒</h3>
                <button onClick={() => setShowOrderModal(false)} style={{ background: "#f3f4f6", border: "none", borderRadius: 10, padding: 8, cursor: "pointer" }}>
                  <Icon name="close" size={16}/>
                </button>
              </div>

              {Object.entries(cart).map(([id, qty]) => {
                const p = products.find(p => p.id === parseInt(id));
                return (
                  <div key={id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, padding: "8px 12px", background: "#f9fafb", borderRadius: 10 }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <span style={{ fontSize: 24 }}>{p?.emoji}</span>
                      <div>
                        <p style={{ margin: 0, fontWeight: 700, fontSize: 13 }}>{p?.name}</p>
                        <p style={{ margin: 0, fontSize: 11, color: "#9ca3af" }}>₹{p?.price} × {qty}</p>
                      </div>
                    </div>
                    <p style={{ margin: 0, fontWeight: 800, fontSize: 15 }}>₹{(p?.price || 0) * qty}</p>
                  </div>
                );
              })}

              <div style={{ border: "2px solid #f3f4f6", borderRadius: 12, padding: 14, margin: "16px 0" }}>
                <p style={{ margin: "0 0 12px", fontWeight: 700, fontSize: 14 }}>⏰ Delivery Slot</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {[
                    { id: "morning", label: "🌅 Morning", time: "8-11 AM" },
                    { id: "afternoon", label: "☀️ Afternoon", time: "12-3 PM" },
                    { id: "evening", label: "🌆 Evening", time: "5-8 PM" },
                  ].map(slot => (
                    <button key={slot.id} onClick={() => setDeliverySlot(slot.id)}
                      style={{ padding: "8px 12px", borderRadius: 10, border: deliverySlot === slot.id ? "2px solid #16a34a" : "2px solid #e5e7eb",
                        background: deliverySlot === slot.id ? "#dcfce7" : "white", cursor: "pointer",
                        fontFamily: "'Poppins',sans-serif", fontSize: 12, fontWeight: 600 }}>
                      {slot.label}<br/><span style={{ fontSize: 11, fontWeight: 400 }}>{slot.time}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ border: "2px solid #f3f4f6", borderRadius: 12, padding: 14, marginBottom: 16 }}>
                <p style={{ margin: "0 0 12px", fontWeight: 700, fontSize: 14 }}>💳 Payment Method</p>
                {[
                  { id: "cod", label: "💵 Cash on Delivery", desc: "घर पर cash देना है" },
                  { id: "online", label: "📱 Online Payment", desc: "UPI / PhonePe / GPay" },
                  { id: "khata", label: "📒 Add to Khata", desc: `Available: ₹${currentCustomer.creditLimit - currentCustomer.balance}` },
                ].map(method => (
                  <div key={method.id} onClick={() => setPaymentMethod(method.id)}
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", borderRadius: 10,
                      border: paymentMethod === method.id ? "2px solid #16a34a" : "2px solid #f3f4f6",
                      background: paymentMethod === method.id ? "#f0fdf4" : "transparent", cursor: "pointer", marginBottom: 6 }}>
                    <div>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: 13 }}>{method.label}</p>
                      <p style={{ margin: 0, fontSize: 11, color: "#6b7280" }}>{method.desc}</p>
                    </div>
                    {paymentMethod === method.id && <Icon name="check" size={18} color="#16a34a"/>}
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderTop: "2px solid #f3f4f6", marginBottom: 16 }}>
                <span style={{ fontWeight: 800, fontSize: 16 }}>Total</span>
                <span style={{ fontWeight: 900, fontSize: 22, color: "#16a34a" }}>₹{cartTotal}</span>
              </div>

              <button style={styles.btn("primary")} onClick={placeOrder}>
                ✓ Order Place करें — ₹{cartTotal}
              </button>
            </div>
          </div>
        )}

        {/* Bill Modal */}
        {showBillModal && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200, display: "flex", alignItems: "flex-end" }}>
            <div style={{ background: "white", borderRadius: "28px 28px 0 0", width: "100%", maxWidth: 430, margin: "0 auto", padding: "24px 24px 40px", animation: "slideUp 0.3s ease", maxHeight: "85vh", overflowY: "auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h3 style={{ fontWeight: 800, fontSize: 16, margin: 0 }}>🧾 Invoice / Bill</h3>
                <button onClick={() => setShowBillModal(null)} style={{ background: "#f3f4f6", border: "none", borderRadius: 10, padding: 8, cursor: "pointer" }}>
                  <Icon name="close" size={16}/>
                </button>
              </div>
              <div style={{ background: "linear-gradient(135deg, #16a34a, #15803d)", borderRadius: 16, padding: 16, color: "white", marginBottom: 16, textAlign: "center" }}>
                <p style={{ margin: 0, fontWeight: 900, fontSize: 18 }}>🛒 Sharma Kirana Store</p>
                <p style={{ margin: "2px 0 0", fontSize: 11, opacity: 0.8 }}>GST: 27AABCF1234A1Z5 • Ph: 9876500000</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <div><p style={{ margin: 0, fontSize: 11, color: "#6b7280" }}>Bill To</p><p style={{ margin: 0, fontWeight: 700, fontSize: 14 }}>{showBillModal.customerName}</p></div>
                <div style={{ textAlign: "right" }}><p style={{ margin: 0, fontSize: 11, color: "#6b7280" }}>Invoice No.</p><p style={{ margin: 0, fontWeight: 700, fontSize: 14 }}>{showBillModal.id}</p></div>
              </div>
              <div style={{ background: "#f9fafb", borderRadius: 12, padding: 12, marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 11, color: "#6b7280", fontWeight: 700 }}>
                  <span>ITEM</span><span>QTY</span><span>RATE</span><span>AMOUNT</span>
                </div>
                {showBillModal.items.map((item, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                    <span style={{ flex: 2, fontWeight: 600 }}>{item.product}</span>
                    <span style={{ flex: 1, textAlign: "center" }}>{item.qty}</span>
                    <span style={{ flex: 1, textAlign: "center" }}>₹{item.price}</span>
                    <span style={{ flex: 1, textAlign: "right", fontWeight: 700 }}>₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: "2px solid #f3f4f6", paddingTop: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 13, color: "#6b7280" }}>Subtotal</span>
                  <span style={{ fontWeight: 700 }}>₹{Math.round(showBillModal.total / 1.05)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: "#6b7280" }}>GST (5%)</span>
                  <span style={{ fontWeight: 700 }}>₹{Math.round(showBillModal.total * 0.05 / 1.05)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderTop: "2px solid #16a34a" }}>
                  <span style={{ fontWeight: 900, fontSize: 16 }}>Total</span>
                  <span style={{ fontWeight: 900, fontSize: 22, color: "#16a34a" }}>₹{showBillModal.total}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12, color: "#6b7280" }}>Payment Mode</span>
                  <span style={styles.badge(showBillModal.payment === "khata" ? "orange" : showBillModal.payment === "online" ? "blue" : "green")}>
                    {showBillModal.payment === "khata" ? "📒 Khata" : showBillModal.payment === "cod" ? "💵 COD" : "💳 Online"}
                  </span>
                </div>
              </div>
              <button style={{ ...styles.btn("primary"), marginTop: 16 }} onClick={() => showToast("PDF downloaded! 📄", "success")}>
                <Icon name="download" size={16} color="white"/> Download PDF
              </button>
            </div>
          </div>
        )}

        {toast && <Toast {...toast}/>}
      </div>
    );
  }

  // ======= OWNER DASHBOARD =======
  if (screen === "owner") {
    const pendingOrders = orders.filter(o => o.status === "pending");
    const todayOrders = orders.filter(o => o.date === "Today");
    const todayRevenue = todayOrders.filter(o => o.status !== "rejected").reduce((s, o) => s + o.total, 0);
    const pendingKhata = CUSTOMERS.reduce((s, c) => s + c.balance, 0);

    return (
      <div style={styles.app}>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
        <style>{`*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}::-webkit-scrollbar{width:0;height:0}@keyframes slideUp{from{transform:translateY(100%)}to{transform:none}}@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}.fade-in{animation:fadeIn 0.3s ease}`}</style>

        {/* Header */}
        <div style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #0f2447 100%)", padding: "16px 20px 20px", color: "white", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <div>
              <p style={{ margin: 0, fontSize: 11, opacity: 0.7 }}>👋 नमस्ते, Admin</p>
              <h2 style={{ margin: 0, fontSize: 19, fontWeight: 800 }}>🏪 Sharma Kirana Store</h2>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {pendingOrders.length > 0 && (
                <div style={{ background: "#f97316", borderRadius: 12, padding: "6px 12px", display: "flex", alignItems: "center", gap: 6 }}>
                  <Icon name="bell" size={14} color="white"/>
                  <span style={{ fontSize: 13, fontWeight: 800 }}>{pendingOrders.length}</span>
                </div>
              )}
              <button onClick={() => { setScreen("login"); setLoginStep("role"); }} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 12, padding: "6px 12px", cursor: "pointer", color: "white", fontSize: 12, fontWeight: 600, fontFamily: "'Poppins',sans-serif" }}>
                Logout
              </button>
            </div>
          </div>
          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 14 }}>
            {[
              { label: "Today Revenue", value: `₹${todayRevenue}`, icon: "📈", color: "#86efac" },
              { label: "Pending Khata", value: `₹${pendingKhata}`, icon: "📒", color: "#fbbf24" },
              { label: "New Orders", value: pendingOrders.length, icon: "🛍️", color: "#f87171" },
            ].map(stat => (
              <div key={stat.label} style={{ background: "rgba(255,255,255,0.1)", borderRadius: 12, padding: "10px 8px", textAlign: "center" }}>
                <div style={{ fontSize: 20, marginBottom: 2 }}>{stat.icon}</div>
                <p style={{ margin: 0, fontWeight: 900, fontSize: 14, color: stat.color }}>{stat.value}</p>
                <p style={{ margin: 0, fontSize: 9, opacity: 0.7, lineHeight: 1.2 }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "16px 16px 80px", overflowY: "auto" }}>

          {/* ORDERS TAB */}
          {ownerTab === "orders" && (
            <div className="fade-in">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <h3 style={{ fontWeight: 800, fontSize: 17, margin: 0 }}>Incoming Orders 📦</h3>
                <span style={styles.badge("orange")}>{pendingOrders.length} Pending</span>
              </div>

              {/* Filter tabs */}
              <div style={{ display: "flex", gap: 6, marginBottom: 14, overflowX: "auto" }}>
                {["All", "Pending", "Accepted", "Delivered"].map(f => (
                  <button key={f} style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 20, padding: "5px 14px", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "'Poppins',sans-serif", whiteSpace: "nowrap" }}>
                    {f} {f === "Pending" ? `(${pendingOrders.length})` : ""}
                  </button>
                ))}
              </div>

              {orders.map(order => (
                <div key={order.id} style={{ ...styles.card, borderLeft: `4px solid ${order.status === "pending" ? "#f97316" : order.status === "accepted" ? "#2563eb" : order.status === "delivered" ? "#16a34a" : "#dc2626"}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <div>
                      <p style={{ margin: 0, fontWeight: 800, fontSize: 15 }}>{order.id}</p>
                      <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>👤 {order.customerName} • {order.time}</p>
                    </div>
                    <span style={styles.badge(order.status === "delivered" ? "green" : order.status === "pending" ? "orange" : order.status === "accepted" ? "blue" : "red")}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>

                  <div style={{ background: "#f9fafb", borderRadius: 10, padding: "8px 10px", marginBottom: 10 }}>
                    {order.items.map((item, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: i < order.items.length - 1 ? 3 : 0 }}>
                        <span>{item.product} × {item.qty}</span>
                        <span style={{ fontWeight: 700 }}>₹{item.price * item.qty}</span>
                      </div>
                    ))}
                    <div style={{ borderTop: "1px solid #e5e7eb", marginTop: 6, paddingTop: 6, display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontWeight: 800, fontSize: 13 }}>Total</span>
                      <span style={{ fontWeight: 900, fontSize: 14, color: "#16a34a" }}>₹{order.total}</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={styles.badge(order.payment === "khata" ? "orange" : order.payment === "online" ? "blue" : "green")}>
                      {order.payment === "khata" ? "📒 Khata" : order.payment === "cod" ? "💵 COD" : "💳 Online"}
                    </span>
                    <button style={{ background: "none", border: "none", color: "#2563eb", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'Poppins',sans-serif" }}
                      onClick={() => setShowBillModal(order)}>
                      View Bill →
                    </button>
                  </div>

                  {order.status === "pending" && (
                    <div style={{ display: "flex", gap: 8 }}>
                      <button style={{ ...styles.btn("primary"), flex: 1, padding: "10px 12px", fontSize: 13 }} onClick={() => acceptOrder(order.id)}>
                        <Icon name="check" size={14}/> Accept
                      </button>
                      <button style={{ flex: 1, padding: "10px 12px", background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: 12, cursor: "pointer", fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }} onClick={() => rejectOrder(order.id)}>
                        <Icon name="close" size={14} color="#dc2626"/> Reject
                      </button>
                    </div>
                  )}
                  {order.status === "accepted" && (
                    <button style={{ ...styles.btn("orange"), padding: "10px 12px", fontSize: 13 }} onClick={() => deliverOrder(order.id)}>
                      <Icon name="truck" size={14} color="white"/> Mark as Delivered
                    </button>
                  )}
                  {order.status === "delivered" && (
                    <button style={{ ...styles.btn(), background: "#f0fdf4", color: "#16a34a", boxShadow: "none", padding: "8px 12px", fontSize: 12 }} onClick={() => showToast("Bill sent to customer WhatsApp! 📱", "success")}>
                      <Icon name="whatsapp" size={14} color="#16a34a"/> Send Bill on WhatsApp
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* CUSTOMERS TAB */}
          {ownerTab === "customers" && (
            <div className="fade-in">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <h3 style={{ fontWeight: 800, fontSize: 17, margin: 0 }}>Customers & Khata 📒</h3>
                <button onClick={() => showToast("Send reminders to all! 📱", "success")} style={{ background: "#f97316", color: "white", border: "none", borderRadius: 10, padding: "6px 12px", cursor: "pointer", fontFamily: "'Poppins',sans-serif", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                  <Icon name="bell" size={13} color="white"/> Remind All
                </button>
              </div>

              <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                <div style={{ flex: 1, position: "relative" }}>
                  <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}>
                    <Icon name="search" size={16} color="#9ca3af"/>
                  </div>
                  <input style={{ ...styles.input, paddingLeft: 38, fontSize: 13 }} placeholder="Customer search..."/>
                </div>
              </div>

              {CUSTOMERS.map(customer => (
                <div key={customer.id} style={{ ...styles.card, cursor: "pointer" }} onClick={() => setSelectedCustomerDetail(customer)}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg, #1e3a5f, #0f2447)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                      🧑
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontWeight: 800, fontSize: 15 }}>{customer.name}</p>
                      <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>📱 {customer.phone} • {customer.id}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ margin: 0, fontWeight: 900, fontSize: 18, color: customer.balance > 0 ? "#f97316" : "#16a34a" }}>₹{customer.balance}</p>
                      <p style={{ margin: 0, fontSize: 11, color: "#9ca3af" }}>of ₹{customer.creditLimit}</p>
                    </div>
                  </div>

                  <div style={{ background: "#f3f4f6", borderRadius: 8, height: 6, marginBottom: 10 }}>
                    <div style={{ background: customer.balance / customer.creditLimit > 0.7 ? "#dc2626" : "#f97316", borderRadius: 8, height: "100%", width: `${(customer.balance / customer.creditLimit) * 100}%`, transition: "width 0.5s" }}/>
                  </div>

                  <div style={{ display: "flex", gap: 8 }}>
                    {customer.balance > 0 && (
                      <button style={{ ...styles.btn("orange"), flex: 1, padding: "8px 10px", fontSize: 12 }}
                        onClick={e => { e.stopPropagation(); showToast(`Reminder sent to ${customer.name}! 📱`, "success"); }}>
                        <Icon name="bell" size={13} color="white"/> Remind
                      </button>
                    )}
                    <button style={{ ...styles.btn("outline"), flex: 1, padding: "8px 10px", fontSize: 12 }}
                      onClick={e => { e.stopPropagation(); showToast(`Payment marked for ${customer.name} ✓`, "success"); }}>
                      <Icon name="check" size={13} color="#16a34a"/> Mark Paid
                    </button>
                    <button style={{ flex: 1, background: "#eff6ff", color: "#2563eb", border: "none", borderRadius: 10, padding: "8px 10px", cursor: "pointer", fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}
                      onClick={e => { e.stopPropagation(); setShowQR(customer); }}>
                      <Icon name="qr" size={13} color="#2563eb"/> QR
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ANALYTICS TAB */}
          {ownerTab === "analytics" && (
            <div className="fade-in">
              <h3 style={{ fontWeight: 800, fontSize: 17, margin: "0 0 16px" }}>Reports & Analytics 📊</h3>
              {[
                { label: "इस महीने की बिक्री", value: "₹12,450", icon: "📈", change: "+18% vs last month", color: "#16a34a" },
                { label: "Total Khata Pending", value: `₹${pendingKhata}`, icon: "📒", change: `${CUSTOMERS.filter(c => c.balance > 0).length} customers`, color: "#f97316" },
                { label: "Total Orders (Month)", value: "47", icon: "📦", change: "Avg ₹265/order", color: "#2563eb" },
                { label: "Active Customers", value: CUSTOMERS.length, icon: "👥", change: "This month", color: "#7c3aed" },
              ].map(stat => (
                <div key={stat.label} style={{ ...styles.card, display: "flex", gap: 14, alignItems: "center" }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: `${stat.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>
                    {stat.icon}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: 13, color: "#6b7280" }}>{stat.label}</p>
                    <p style={{ margin: 0, fontWeight: 900, fontSize: 22, color: stat.color }}>{stat.value}</p>
                    <p style={{ margin: 0, fontSize: 11, color: "#9ca3af" }}>{stat.change}</p>
                  </div>
                </div>
              ))}

              <h4 style={{ fontWeight: 800, fontSize: 15, margin: "8px 0 12px" }}>Payment Methods</h4>
              {[
                { method: "Khata", pct: 45, color: "#f97316" },
                { method: "COD", pct: 35, color: "#16a34a" },
                { method: "Online", pct: 20, color: "#2563eb" },
              ].map(({ method, pct, color }) => (
                <div key={method} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{method}</span>
                    <span style={{ fontSize: 13, fontWeight: 800, color }}>{pct}%</span>
                  </div>
                  <div style={{ background: "#f3f4f6", borderRadius: 8, height: 10 }}>
                    <div style={{ background: color, borderRadius: 8, height: "100%", width: `${pct}%` }}/>
                  </div>
                </div>
              ))}

              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                <button style={{ ...styles.btn("primary"), flex: 1, fontSize: 13 }}
                  onClick={() => showToast("PDF Report downloading... 📄", "success")}>
                  <Icon name="download" size={14} color="white"/> PDF Report
                </button>
                <button style={{ ...styles.btn("outline"), flex: 1, fontSize: 13 }}
                  onClick={() => showToast("Excel file downloading... 📊", "success")}>
                  <Icon name="download" size={14} color="#16a34a"/> Excel
                </button>
              </div>
            </div>
          )}

          {/* PRODUCTS TAB */}
          {ownerTab === "products" && (
            <div className="fade-in">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <h3 style={{ fontWeight: 800, fontSize: 17, margin: 0 }}>Inventory 🏪</h3>
                <button onClick={() => showToast("Add product form coming soon!", "info")} style={{ background: "#16a34a", color: "white", border: "none", borderRadius: 10, padding: "8px 14px", cursor: "pointer", fontFamily: "'Poppins',sans-serif", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                  <Icon name="plus" size={14} color="white"/> Add Product
                </button>
              </div>
              {products.map(product => (
                <div key={product.id} style={{ ...styles.card, padding: "12px 14px" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ fontSize: 28 }}>{product.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: 14 }}>{product.name}</p>
                      <p style={{ margin: 0, fontSize: 11, color: "#6b7280" }}>{product.category} • {product.unit}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ margin: 0, fontWeight: 800, fontSize: 16, color: "#16a34a" }}>₹{product.price}</p>
                      <span style={styles.badge(product.stock === 0 ? "red" : product.stock < 10 ? "orange" : "green")}>
                        {product.stock === 0 ? "Out of Stock" : `${product.stock} left`}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Nav */}
        <div style={styles.navBar}>
          {[
            { tab: "orders", icon: "order", label: "Orders", badge: pendingOrders.length },
            { tab: "customers", icon: "users", label: "Customers" },
            { tab: "analytics", icon: "chart", label: "Analytics" },
            { tab: "products", icon: "store", label: "Inventory" },
          ].map(({ tab, icon, label, badge }) => (
            <button key={tab} style={{ ...styles.navBtn(ownerTab === tab), position: "relative" }} onClick={() => setOwnerTab(tab)}>
              <Icon name={icon} size={20} color={ownerTab === tab ? "#1e3a5f" : "#9ca3af"}/>
              {label}
              {badge > 0 && (
                <span style={{ position: "absolute", top: 6, right: "calc(50% - 18px)", background: "#f97316", color: "white", borderRadius: 10, fontSize: 9, fontWeight: 800, padding: "1px 5px", minWidth: 16, textAlign: "center" }}>{badge}</span>
              )}
            </button>
          ))}
        </div>

        {/* QR for customer (owner view) */}
        {showQR && typeof showQR === "object" && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
            onClick={() => setShowQR(false)}>
            <div style={{ background: "white", borderRadius: 24, padding: 28, textAlign: "center", maxWidth: 300, width: "100%" }} onClick={e => e.stopPropagation()}>
              <h3 style={{ fontWeight: 800, margin: "0 0 8px" }}>{showQR.name}</h3>
              <p style={{ color: "#6b7280", fontSize: 13, marginBottom: 16 }}>Customer QR Code</p>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                <QRCode value={`smartkhata://customer/${showQR.id}/${showQR.phone}`} size={150}/>
              </div>
              <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 16 }}>📱 {showQR.phone} • {showQR.id}</p>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ ...styles.btn("primary"), flex: 1, fontSize: 13 }} onClick={() => showToast("QR shared on WhatsApp! 📱", "success")}>
                  <Icon name="whatsapp" size={14} color="white"/> Share
                </button>
                <button style={{ ...styles.btn("outline"), flex: 1, fontSize: 13 }} onClick={() => showToast("QR downloaded! 📄", "success")}>
                  <Icon name="download" size={14} color="#16a34a"/> Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bill Modal for owner */}
        {showBillModal && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200, display: "flex", alignItems: "flex-end" }}>
            <div style={{ background: "white", borderRadius: "28px 28px 0 0", width: "100%", maxWidth: 430, margin: "0 auto", padding: "24px 24px 40px", animation: "slideUp 0.3s ease", maxHeight: "80vh", overflowY: "auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h3 style={{ fontWeight: 800, fontSize: 17, margin: 0 }}>🧾 GST Invoice</h3>
                <button onClick={() => setShowBillModal(null)} style={{ background: "#f3f4f6", border: "none", borderRadius: 10, padding: 8, cursor: "pointer" }}>
                  <Icon name="close" size={16}/>
                </button>
              </div>
              <div style={{ background: "linear-gradient(135deg, #1e3a5f, #0f2447)", borderRadius: 16, padding: 16, color: "white", marginBottom: 16, textAlign: "center" }}>
                <p style={{ margin: 0, fontWeight: 900, fontSize: 16 }}>🛒 Sharma Kirana Store</p>
                <p style={{ margin: "2px 0 0", fontSize: 11, opacity: 0.8 }}>GSTIN: 27AABCF1234A1Z5 | Ph: 9876500000</p>
                <p style={{ margin: "2px 0 0", fontSize: 11, opacity: 0.7 }}>123, Main Market, Nagpur - 440001</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
                {[
                  { label: "Invoice No.", value: showBillModal.id },
                  { label: "Date", value: "26 Jan 2024" },
                  { label: "Customer", value: showBillModal.customerName },
                  { label: "Payment", value: showBillModal.payment.toUpperCase() },
                ].map(({ label, value }) => (
                  <div key={label} style={{ background: "#f9fafb", borderRadius: 10, padding: "8px 10px" }}>
                    <p style={{ margin: 0, fontSize: 10, color: "#9ca3af" }}>{label}</p>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: 13 }}>{value}</p>
                  </div>
                ))}
              </div>
              <div style={{ background: "#f9fafb", borderRadius: 12, padding: 12, marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 11, color: "#9ca3af", fontWeight: 700 }}>
                  <span style={{ flex: 2 }}>ITEM</span><span>QTY</span><span style={{ textAlign: "right" }}>AMOUNT</span>
                </div>
                {showBillModal.items.map((item, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                    <span style={{ flex: 2, fontWeight: 600 }}>{item.product}</span>
                    <span>{item.qty}</span>
                    <span style={{ fontWeight: 700, textAlign: "right" }}>₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: "2px solid #f3f4f6", padding: "10px 0" }}>
                {[
                  { label: "Subtotal", value: `₹${Math.round(showBillModal.total / 1.05)}` },
                  { label: "CGST (2.5%)", value: `₹${Math.round(showBillModal.total * 0.025 / 1.05)}` },
                  { label: "SGST (2.5%)", value: `₹${Math.round(showBillModal.total * 0.025 / 1.05)}` },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, color: "#6b7280" }}>{label}</span>
                    <span style={{ fontWeight: 700 }}>{value}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderTop: "2px solid #1e3a5f", marginTop: 4 }}>
                  <span style={{ fontWeight: 900, fontSize: 16 }}>Grand Total</span>
                  <span style={{ fontWeight: 900, fontSize: 22, color: "#1e3a5f" }}>₹{showBillModal.total}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ ...styles.btn("primary"), flex: 1, background: "linear-gradient(135deg, #1e3a5f, #0f2447)", fontSize: 13 }}
                  onClick={() => showToast("PDF Invoice generated! 📄", "success")}>
                  <Icon name="download" size={14} color="white"/> Download PDF
                </button>
                <button style={{ flex: 1, background: "#dcfce7", color: "#16a34a", border: "none", borderRadius: 12, cursor: "pointer", fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "12px" }}
                  onClick={() => showToast("Bill sent on WhatsApp! 📱", "success")}>
                  <Icon name="whatsapp" size={14} color="#16a34a"/> WhatsApp
                </button>
              </div>
            </div>
          </div>
        )}

        {toast && <Toast {...toast}/>}
      </div>
    );
  }

  return null;
}