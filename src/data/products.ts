import { Product } from '../types/Product';

export const products: Product[] = [
  // Electronics
  {
    id: 'e1',
    name: 'Smart LED TV 43"',
    category: 'electronics',
    price: 32999,
    image: 'https://images.pexels.com/photos/5721868/pexels-photo-5721868.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Ultra HD Smart LED TV with built-in voice assistant and streaming apps.',
  },
  {
    id: 'e2',
    name: 'Wireless Bluetooth Earbuds',
    category: 'electronics',
    price: 2999,
    image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'True wireless earbuds with active noise cancellation and long battery life.',
  },
  {
    id: 'e3',
    name: 'Professional DSLR Camera',
    category: 'electronics',
    price: 58990,
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'High-resolution DSLR camera with multiple lenses and professional features.',
  },
  
  // Clothes
  {
    id: 'c1',
    name: 'Men\'s Formal Shirt',
    category: 'clothes',
    price: 1499,
    image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Premium cotton formal shirt for men in various colors and sizes.',
  },
  {
    id: 'c2',
    name: 'Women\'s Summer Dress',
    category: 'clothes',
    price: 1999,
    image: 'https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Lightweight and comfortable summer dress for women in floral print.',
  },
  {
    id: 'c3',
    name: 'Kids Winter Jacket',
    category: 'clothes',
    price: 2499,
    image: 'https://images.pexels.com/photos/6311641/pexels-photo-6311641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Warm and comfortable winter jacket for kids with water-resistant material.',
  },
  
  // Homeware
  {
    id: 'h1',
    name: 'Decorative Wall Clock',
    category: 'homeware',
    price: 1299,
    image: 'https://images.pexels.com/photos/1095601/pexels-photo-1095601.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Modern design wall clock for home decor with silent movement.',
  },
  {
    id: 'h2',
    name: 'Luxury Bedsheet Set',
    category: 'homeware',
    price: 2999,
    image: 'https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Premium cotton bedsheet set with pillow covers in various designs.',
  },
  {
    id: 'h3',
    name: 'Indoor Plants Set',
    category: 'homeware',
    price: 1499,
    image: 'https://images.pexels.com/photos/1358900/pexels-photo-1358900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Set of 3 indoor plants with decorative pots for home decoration.',
  },
  
  // Kitchenware
  {
    id: 'k1',
    name: 'Stainless Steel Cookware Set',
    category: 'kitchenware',
    price: 4999,
    image: 'https://images.pexels.com/photos/4871119/pexels-photo-4871119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'High-quality stainless steel cookware set with non-stick coating.',
  },
  {
    id: 'k2',
    name: 'Electric Hand Mixer',
    category: 'kitchenware',
    price: 1899,
    image: 'https://images.pexels.com/photos/3808865/pexels-photo-3808865.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Powerful electric hand mixer for baking and cooking with multiple speed settings.',
  },
  {
    id: 'k3',
    name: 'Wooden Cutting Board',
    category: 'kitchenware',
    price: 899,
    image: 'https://images.pexels.com/photos/5765/wood-kitchen-cutting-tool.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Premium wooden cutting board for kitchen use, easy to clean and maintain.',
  },
  
  // Mobile Phones
  {
    id: 'm1',
    name: 'Flagship Smartphone',
    category: 'mobilePhones',
    price: 89999,
    image: 'https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Latest flagship smartphone with high-performance processor and advanced camera system.',
  },
  {
    id: 'm2',
    name: 'Budget Smartphone',
    category: 'mobilePhones',
    price: 15999,
    image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Affordable smartphone with great features and long battery life.',
  },
  {
    id: 'm3',
    name: 'Tablet Pro',
    category: 'mobilePhones',
    price: 45999,
    image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Professional tablet with large display and powerful performance for work and entertainment.',
  },
  
  // Supplements
  {
    id: 's1',
    name: 'Whey Protein Powder',
    category: 'supplements',
    price: 2499,
    image: 'https://images.pexels.com/photos/1815389/pexels-photo-1815389.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'High-quality whey protein powder for muscle growth and recovery.',
  },
  {
    id: 's2',
    name: 'Multivitamin Tablets',
    category: 'supplements',
    price: 899,
    image: 'https://images.pexels.com/photos/139398/vitamins-tablets-pharmacy-medicine-139398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Daily multivitamin tablets for overall health and immunity.',
  },
  {
    id: 's3',
    name: 'Omega-3 Fish Oil Capsules',
    category: 'supplements',
    price: 1199,
    image: 'https://images.pexels.com/photos/3683073/pexels-photo-3683073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Omega-3 fish oil capsules for heart health and brain function.',
  },
];

export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category.toLowerCase() === category.toLowerCase());
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};