
export interface Customer {
  cust_id: number;
  username: string;
  email: string;
  pass: string;
  phone?: string;
  cart: Cart[];
  orders: Order[];
  wishlist: Wishlist[];
}

export interface Cart {
  cart_id: number;
  cust_id: number;
  prod_id: number;
  created?: Date;
  customers: Customer;
  product: Product;
}

export interface Order {
  order_id: number;
  cust_id: number;
  prod_id: number;
  created?: Date;
  customers: Customer;
  product: Product;
}

export interface Wishlist {
  wishlist_id: number;
  cust_id: number;
  prod_id: number;
  created?: Date;
  customers: Customer;
  product: Product;
}

export interface Product {
  prod_id: number;
  prod_name: string;
  prod_description: string;
  prod_img: string;
  cat_id?: number;
  cost: number;
  created?: Date;
  cart: Cart[];
  orders: Order[];
  product_cat?: ProductCategory;
  product_img: ProductImage[];
}

export interface ProductCategory {
  cat_id: number;
  cat_name: string;
}

export interface ProductImage {
  img_id: number;
  prod_id: number;
  img_url: string;
}
