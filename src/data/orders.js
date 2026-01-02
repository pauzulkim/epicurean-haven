export let orders = [
  {
    id: "ORD-001",
    customerId: 1,
    customerName: "John Doe",
    items: [
      { productId: 1, name: "Truffle Risotto", quantity: 2, price: 450000 },
      { productId: 4, name: "Tiramisu Classico", quantity: 1, price: 150000 }
    ],
    total: 1050000,
    status: "completed",
    date: "2023-10-15",
    paymentMethod: "Credit Card"
  },
  {
    id: "ORD-002",
    customerId: 2,
    customerName: "Jane Smith",
    items: [
      { productId: 2, name: "Wagyu Steak A5", quantity: 1, price: 1250000 },
      { productId: 8, name: "Craft Gin Tonic", quantity: 2, price: 185000 }
    ],
    total: 1620000,
    status: "processing",
    date: "2023-10-16",
    paymentMethod: "Bank Transfer"
  }
];

// Fungsi untuk menambah order baru
export const addOrder = (order) => {
  orders.push(order);
  return order;
};

// Fungsi untuk mendapatkan order by customer
export const getOrdersByCustomer = (customerId) => {
  return orders.filter(order => order.customerId === customerId);
};