export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  image: string;
  description: string;
  sellerId?: string;
  sellerShopName?: string;
  quantity?: number;
}

export type Category = 
  | 'electronics' 
  | 'clothes' 
  | 'homeware' 
  | 'kitchenware' 
  | 'mobilePhones' 
  | 'supplements';

export interface Order {
  id: string;
  customer: {
    fullName: string;
    address: string;
    city: string;
    pincode: string;
    mobileNumber: string;
  };
  items: Product[];
  total: number;
  paymentMethod: 'cod';
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
}