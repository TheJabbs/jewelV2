
import { Customer, Product, Cart, Order, Wishlist } from '../types/dashboard';

// Mock Products
export const mockProducts: Product[] = [
  {
    prod_id: 1,
    prod_name: "Diamond Solitaire Pendant",
    prod_description: "A timeless classic featuring a brilliant-cut diamond set in 18k white gold.",
    prod_img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=2187&auto=format&fit=crop",
    cost: 1250,
    created: new Date("2023-05-10"),
    cart: [],
    orders: [],
    product_img: [
      {
        img_id: 1,
        prod_id: 1,
        img_url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=2187&auto=format&fit=crop"
      }
    ]
  },
  {
    prod_id: 2,
    prod_name: "Pearl Strand Necklace",
    prod_description: "Luxurious cultured pearls arranged in a classic strand with a gold clasp.",
    prod_img: "https://images.unsplash.com/photo-1611085583191-af1c1f1e8ecb?q=80&w=1974&auto=format&fit=crop",
    cost: 890,
    created: new Date("2023-06-15"),
    cart: [],
    orders: [],
    product_img: [
      {
        img_id: 2,
        prod_id: 2,
        img_url: "https://images.unsplash.com/photo-1611085583191-af1c1f1e8ecb?q=80&w=1974&auto=format&fit=crop"
      }
    ]
  },
  {
    prod_id: 3,
    prod_name: "Gold Chain",
    prod_description: "A sophisticated Italian-crafted gold chain with a contemporary design.",
    prod_img: "https://images.unsplash.com/photo-1599459183460-b1e9231659af?q=80&w=1974&auto=format&fit=crop",
    cost: 720,
    created: new Date("2023-07-20"),
    cart: [],
    orders: [],
    product_img: [
      {
        img_id: 3,
        prod_id: 3,
        img_url: "https://images.unsplash.com/photo-1599459183460-b1e9231659af?q=80&w=1974&auto=format&fit=crop"
      }
    ]
  }
];

// Create mock cart items
const mockCartItems: Cart[] = [
  {
    cart_id: 1,
    cust_id: 1,
    prod_id: 1,
    created: new Date("2023-10-15"),
    customers: {} as Customer, // This will be populated later
    product: mockProducts[0]
  },
  {
    cart_id: 2,
    cust_id: 1,
    prod_id: 2,
    created: new Date("2023-10-16"),
    customers: {} as Customer, // This will be populated later
    product: mockProducts[1]
  }
];

// Create mock orders
const mockOrders: Order[] = [
  {
    order_id: 1,
    cust_id: 1,
    prod_id: 3,
    created: new Date("2023-09-10"),
    customers: {} as Customer, // This will be populated later
    product: mockProducts[2]
  }
];

// Create mock wishlist items
const mockWishlistItems: Wishlist[] = [
  {
    wishlist_id: 1,
    cust_id: 1,
    prod_id: 3,
    created: new Date("2023-08-05"),
    customers: {} as Customer, // This will be populated later
    product: mockProducts[2]
  }
];

// Create mock customer with references to cart and orders
export const mockCustomer: Customer = {
  cust_id: 1,
  username: "johndoe",
  email: "johndoe@example.com",
  pass: "hashed_password",
  phone: "+1234567890",
  cart: mockCartItems,
  orders: mockOrders,
  wishlist: mockWishlistItems
};

// Complete the circular references
mockCartItems.forEach(cart => {
  cart.customers = mockCustomer;
});

mockOrders.forEach(order => {
  order.customers = mockCustomer;
});

mockWishlistItems.forEach(wishlist => {
  wishlist.customers = mockCustomer;
});

// Update product references
mockProducts.forEach(product => {
  product.cart = mockCartItems.filter(cart => cart.prod_id === product.prod_id);
  product.orders = mockOrders.filter(order => order.prod_id === product.prod_id);
});
