export const electronicsCategories = [
  {
    id: 'mobiles',
    name: 'Mobiles',
    icon: '📱',
    subcategories: [
      'Smartphones',
      'Feature Phones',
      'Mobile Accessories',
      'Cases & Covers',
      'Screen Protectors',
      'Chargers & Cables',
      'Power Banks',
      'Headphones',
      'Earphones'
    ]
  },
  {
    id: 'laptops',
    name: 'Laptops',
    icon: '💻',
    subcategories: [
      'Gaming Laptops',
      'Business Laptops',
      'Student Laptops',
      '2-in-1 Laptops',
      'MacBooks',
      'Laptop Accessories',
      'Bags & Sleeves',
      'Cooling Pads',
      'Docking Stations'
    ]
  },
  {
    id: 'tablets',
    name: 'Tablets',
    icon: '📲',
    subcategories: [
      'Android Tablets',
      'iPads',
      'Windows Tablets',
      'Tablet Accessories',
      'Stylus Pens',
      'Keyboards',
      'Cases & Covers'
    ]
  },
  {
    id: 'cameras',
    name: 'Cameras',
    icon: '📷',
    subcategories: [
      'DSLR Cameras',
      'Mirrorless Cameras',
      'Point & Shoot',
      'Action Cameras',
      'Camera Lenses',
      'Tripods',
      'Camera Bags',
      'Memory Cards'
    ]
  },
  {
    id: 'audio',
    name: 'Audio',
    icon: '🎧',
    subcategories: [
      'Headphones',
      'Earphones',
      'Bluetooth Speakers',
      'Home Theater',
      'Soundbars',
      'Microphones',
      'Audio Interfaces',
      'Amplifiers'
    ]
  },
  {
    id: 'gaming',
    name: 'Gaming',
    icon: '🎮',
    subcategories: [
      'Gaming Consoles',
      'Gaming PCs',
      'Gaming Accessories',
      'Controllers',
      'Gaming Keyboards',
      'Gaming Mice',
      'Gaming Headsets',
      'VR Headsets'
    ]
  },
  {
    id: 'tv',
    name: 'TV & Video',
    icon: '📺',
    subcategories: [
      'Smart TVs',
      '4K TVs',
      'OLED TVs',
      'LED TVs',
      'TV Mounts',
      'Streaming Devices',
      'Projectors',
      'Home Theater Systems'
    ]
  },
  {
    id: 'appliances',
    name: 'Appliances',
    icon: '🔌',
    subcategories: [
      'Refrigerators',
      'Washing Machines',
      'Air Conditioners',
      'Microwaves',
      'Vacuum Cleaners',
      'Water Purifiers',
      'Air Purifiers',
      'Geysers'
    ]
  },
  {
    id: 'computers',
    name: 'Computers',
    icon: '🖥️',
    subcategories: [
      'Desktops',
      'All-in-One PCs',
      'Monitors',
      'Keyboards',
      'Mice',
      'Webcams',
      'Printers',
      'Scanners',
      'Routers'
    ]
  },
  {
    id: 'wearables',
    name: 'Wearables',
    icon: '⌚',
    subcategories: [
      'Smart Watches',
      'Fitness Bands',
      'Smart Glasses',
      'Smart Rings',
      'VR Headsets',
      'Smart Watch Accessories',
      'Chargers',
      'Straps & Bands'
    ]
  }
];

export const cities = [
  { id: 'all', name: 'All Cities' },
  { id: 'jamshedpur', name: 'Jamshedpur' },
  { id: 'ranchi', name: 'Ranchi' },
  { id: 'bokaro', name: 'Bokaro' },
  { id: 'dhanbad', name: 'Dhanbad' },
  { id: 'hazaribagh', name: 'Hazaribagh' },
  { id: 'deoghar', name: 'Deoghar' },
  { id: 'giridih', name: 'Giridih' },
  { id: 'ramgarh', name: 'Ramgarh' }
];

export const demoProducts = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    category: 'mobiles',
    subcategory: 'Smartphones',
    price: 159900,
    originalPrice: 169900,
    discount: 6,
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=400&h=400&fit=crop',
    shopName: 'TechWorld Electronics',
    shopAddress: 'Main Road, Bistupur, Jamshedpur',
    city: 'jamshedpur',
    rating: 4.8,
    reviews: 124,
    inStock: true,
    contact: '+91 98765 43210'
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24 Ultra',
    category: 'mobiles',
    subcategory: 'Smartphones',
    price: 129999,
    originalPrice: 139999,
    discount: 7,
    image: 'https://images.unsplash.com/photo-1610945265078-3858a0828671?w=400&h=400&fit=crop',
    shopName: 'Mobile Planet',
    shopAddress: 'Sakchi Market, Jamshedpur',
    city: 'jamshedpur',
    rating: 4.7,
    reviews: 89,
    inStock: true,
    contact: '+91 98765 43211'
  },
  {
    id: 3,
    name: 'MacBook Pro 16" M3 Max',
    category: 'laptops',
    subcategory: 'MacBooks',
    price: 399900,
    originalPrice: 419900,
    discount: 5,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
    shopName: 'Apple Store Jamshedpur',
    shopAddress: 'NH-33, Near Tata Motors, Jamshedpur',
    city: 'jamshedpur',
    rating: 4.9,
    reviews: 56,
    inStock: true,
    contact: '+91 98765 43212'
  },
  {
    id: 4,
    name: 'Dell XPS 15',
    category: 'laptops',
    subcategory: 'Business Laptops',
    price: 189999,
    originalPrice: 209999,
    discount: 10,
    image: 'https://images.unsplash.com/photo-1593642632823-8f78536788c6?w=400&h=400&fit=crop',
    shopName: 'Computer Plaza',
    shopAddress: 'H.B. Road, Ranchi',
    city: 'ranchi',
    rating: 4.6,
    reviews: 42,
    inStock: true,
    contact: '+91 98765 43213'
  },
  {
    id: 5,
    name: 'Sony WH-1000XM5',
    category: 'audio',
    subcategory: 'Headphones',
    price: 29990,
    originalPrice: 34990,
    discount: 14,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop',
    shopName: 'Sound & Vision',
    shopAddress: 'City Center, Bokaro',
    city: 'bokaro',
    rating: 4.8,
    reviews: 203,
    inStock: true,
    contact: '+91 98765 43214'
  },
  {
    id: 6,
    name: 'iPad Pro 12.9" M2',
    category: 'tablets',
    subcategory: 'iPads',
    price: 112900,
    originalPrice: 119900,
    discount: 6,
    image: 'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=400&h=400&fit=crop',
    shopName: 'TechWorld Electronics',
    shopAddress: 'Main Road, Bistupur, Jamshedpur',
    city: 'jamshedpur',
    rating: 4.7,
    reviews: 78,
    inStock: true,
    contact: '+91 98765 43210'
  },
  {
    id: 7,
    name: 'Canon EOS R6',
    category: 'cameras',
    subcategory: 'Mirrorless Cameras',
    price: 215990,
    originalPrice: 235990,
    discount: 8,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop',
    shopName: 'Camera House',
    shopAddress: 'Lalpur, Ranchi',
    city: 'ranchi',
    rating: 4.9,
    reviews: 34,
    inStock: true,
    contact: '+91 98765 43215'
  },
  {
    id: 8,
    name: 'PlayStation 5',
    category: 'gaming',
    subcategory: 'Gaming Consoles',
    price: 49990,
    originalPrice: 54990,
    discount: 9,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop',
    shopName: 'GameZone',
    shopAddress: 'Sector 4, Bokaro',
    city: 'bokaro',
    rating: 4.8,
    reviews: 156,
    inStock: false,
    contact: '+91 98765 43216'
  },
  {
    id: 9,
    name: 'Samsung 55" Neo QLED 4K',
    category: 'tv',
    subcategory: 'Smart TVs',
    price: 149990,
    originalPrice: 179990,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=400&fit=crop',
    shopName: 'Electronics Mart',
    shopAddress: 'Dhanbad Main Road, Dhanbad',
    city: 'dhanbad',
    rating: 4.6,
    reviews: 67,
    inStock: true,
    contact: '+91 98765 43217'
  },
  {
    id: 10,
    name: 'Apple Watch Ultra 2',
    category: 'wearables',
    subcategory: 'Smart Watches',
    price: 89900,
    originalPrice: 94900,
    discount: 5,
    image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=400&fit=crop',
    shopName: 'Apple Store Jamshedpur',
    shopAddress: 'NH-33, Near Tata Motors, Jamshedpur',
    city: 'jamshedpur',
    rating: 4.8,
    reviews: 45,
    inStock: true,
    contact: '+91 98765 43212'
  },
  {
    id: 11,
    name: 'OnePlus 12',
    category: 'mobiles',
    subcategory: 'Smartphones',
    price: 69999,
    originalPrice: 74999,
    discount: 7,
    image: 'https://images.unsplash.com/photo-1660463974719-732a4c27d5b4?w=400&h=400&fit=crop',
    shopName: 'Mobile Plaza',
    shopAddress: 'Hazaribagh Road, Hazaribagh',
    city: 'hazaribagh',
    rating: 4.5,
    reviews: 92,
    inStock: true,
    contact: '+91 98765 43218'
  },
  {
    id: 12,
    name: 'HP Pavilion Gaming',
    category: 'laptops',
    subcategory: 'Gaming Laptops',
    price: 84999,
    originalPrice: 99999,
    discount: 15,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop',
    shopName: 'PC World',
    shopAddress: 'Giridih Main Market, Giridih',
    city: 'giridih',
    rating: 4.4,
    reviews: 38,
    inStock: true,
    contact: '+91 98765 43219'
  }
];

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};

export default electronicsCategories;
