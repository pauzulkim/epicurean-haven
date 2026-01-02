// Data user customer (bisa dilihat di halaman publik)
export const customers = [
  {
    id: 1,
    email: "customer1@example.com",
    password: "password123",
    name: "John Doe",
    phone: "081234567890",
    address: "Jl. Sudirman No. 123, Jakarta"
  },
  {
    id: 2,
    email: "customer2@example.com",
    password: "password456",
    name: "Jane Smith",
    phone: "082345678901",
    address: "Jl. Thamrin No. 456, Jakarta"
  }
];

// Data admin (TIDAK ditampilkan di halaman publik)
export const admins = [
  {
    id: 1,
    username: "admin_epicurean",
    password: "Admin123!",
    name: "Master Admin",
    role: "super_admin"
  },
  {
    id: 2,
    username: "manager_fnb",
    password: "Manager123!",
    name: "Restaurant Manager",
    role: "manager"
  }
];

// SECRET: Halaman login admin tersembunyi
// URL: /admin-secret-login (hanya diketahui oleh admin)