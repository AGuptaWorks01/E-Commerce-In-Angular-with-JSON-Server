export interface SignUp {
  name: string;
  email: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface Product {
  name: string;
  price: number;
  category: string;
  color: string;
  image: string;
  description: string;
  id: number;
  quantity: undefined | number;
  productId: undefined | number;
}

export interface cart {
  name: string;
  price: number;
  category: string;
  color: string;
  image: string;
  description: string;
  id: number | undefined;
  quantity: undefined | number;
  productId: number;
  userId: number;
}

export interface priceSummary {
  price: number;
  discount: number;
  tax: number;
  delivery: number;
  total: number;
}

export interface order {
  email: string;
  address: string;
  contact: string;
  totalPrice: number;
  userId: number;
  id: number | undefined;
}
