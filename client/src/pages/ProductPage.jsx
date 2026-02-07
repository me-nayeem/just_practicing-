import React, { useState } from 'react';
import { Gamepad2, ShoppingCart, Heart, Star, Search, Filter, Package, ShieldAlert, ChevronRight, Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProductsPage() {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCart, setShowCart] = useState(false);

  // Sample Products Data
  const products = [
    {
      id: 1,
      name: 'RTX 4090 Graphics Card',
      category: 'GPU',
      description: 'Ultra-high performance graphics card for gaming and rendering',
      price: 1599.99,
      rating: 4.8,
      reviews: 324,
      image: '🎮',
      stock: 5
    },
    {
      id: 2,
      name: 'Corsair K95 Platinum',
      category: 'Keyboard',
      description: 'Mechanical gaming keyboard with RGB lighting',
      price: 199.99,
      rating: 4.6,
      reviews: 189,
      image: '⌨️',
      stock: 12
    },
    {
      id: 3,
      name: 'SteelSeries Arctis Pro',
      category: 'Headset',
      description: 'Professional gaming headset with surround sound',
      price: 329.99,
      rating: 4.9,
      reviews: 451,
      image: '🎧',
      stock: 8
    },
    {
      id: 4,
      name: 'Logitech G502 Mouse',
      category: 'Mouse',
      description: 'High-precision gaming mouse with customizable weights',
      price: 79.99,
      rating: 4.7,
      reviews: 612,
      image: '🖱️',
      stock: 25
    },
    {
      id: 5,
      name: 'Samsung 4K Monitor 144Hz',
      category: 'Monitor',
      description: '32-inch 4K gaming monitor with 144Hz refresh rate',
      price: 799.99,
      rating: 4.5,
      reviews: 267,
      image: '🖥️',
      stock: 3
    },
    {
      id: 6,
      name: 'Intel Core i9-13900K',
      category: 'CPU',
      description: '13th Gen Intel processor, 24 cores for ultimate performance',
      price: 589.99,
      rating: 4.8,
      reviews: 438,
      image: '💻',
      stock: 7
    },
    {
      id: 7,
      name: 'ASUS ROG Zephyrus G14',
      category: 'Laptop',
      description: '14-inch gaming laptop with RTX 4060, ultra-portable',
      price: 1299.99,
      rating: 4.7,
      reviews: 356,
      image: '💾',
      stock: 4
    },
    {
      id: 8,
      name: 'Sony WH-1000XM5',
      category: 'Headset',
      description: 'Wireless noise-cancelling headphones for gaming and music',
      price: 399.99,
      rating: 4.9,
      reviews: 523,
      image: '🎵',
      stock: 11
    },
    {
      id: 9,
      name: 'HyperX Cloud Stinger 2',
      category: 'Headset',
      description: 'Lightweight gaming headset with 7.1 surround sound',
      price: 89.99,
      rating: 4.4,
      reviews: 734,
      image: '🎙️',
      stock: 18
    },
    {
      id: 10,
      name: 'Razer DeathAdder V3',
      category: 'Mouse',
      description: 'Lightweight ergonomic gaming mouse with Focus Pro 30K sensor',
      price: 69.99,
      rating: 4.6,
      reviews: 891,
      image: '🖐️',
      stock: 22
    },
    {
      id: 11,
      name: 'NVIDIA RTX 4080',
      category: 'GPU',
      description: 'High-end graphics card for extreme gaming performance',
      price: 1199.99,
      rating: 4.7,
      reviews: 298,
      image: '⚡',
      stock: 6
    },
    {
      id: 12,
      name: 'MSI MEG Z790 Motherboard',
      category: 'Motherboard',
      description: 'Premium X870E chipset motherboard with PCIe 5.0',
      price: 599.99,
      rating: 4.8,
      reviews: 145,
      image: '🔌',
      stock: 9
    }
  ];

  const categories = ['all', 'GPU', 'CPU', 'Keyboard', 'Mouse', 'Headset', 'Monitor', 'Laptop', 'Motherboard'];

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Cart functions
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };


  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const toggleFavorite = (productId) => {
    setFavorites(favorites.includes(productId)
      ? favorites.filter(id => id !== productId)
      : [...favorites, productId]
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Vintage Gaming Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      
      {/* Scanline Effect */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #000, #000 1px, transparent 1px, transparent 2px)',
          animation: 'flicker 0.15s infinite'
        }}>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 50px'
        }}>
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="bg-black bg-opacity-40 backdrop-blur-xl border-b border-white border-opacity-10 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <Gamepad2 className="w-8 h-8 text-white" />
                <h1 className="text-3xl font-black text-white tracking-wider"
                  style={{
                    textShadow: '0 0 20px rgba(255,255,255,0.3)',
                  }}>
                  ARCADE STORE
                </h1>
              </div>

              {/* Cart Button */}
              <div className='flex gap-4'>
              <Link  className="relative px-4 py-2 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-lg hover:bg-opacity-20 transition-all duration-300 text-black font-bold flex items-center gap-2 group" to="/dashboard">DashBoard</Link>
              <button
                onClick={() => setShowCart(!showCart)}
                className="relative px-4 py-2 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-lg hover:bg-opacity-20 transition-all duration-300 text-black font-bold flex items-center gap-2 group"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="tracking-widest">CART</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-black">
                    {totalItems}
                  </span>
                )}
              </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Search */}
              <div className="mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-white text-opacity-50" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white bg-opacity-5 border border-white border-opacity-20 rounded-lg pl-10 pr-4 py-3 text-black placeholder-white focus:outline-none focus:border-white focus:border-opacity-40 focus:bg-opacity-10 transition-all duration-300 font-mono text-sm"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white bg-opacity-5 border border-white border-opacity-10 rounded-lg p-6">
                <h3 className="text-black font-black mb-4 tracking-widest flex items-center gap-2">
                  <Filter size={18} />
                  CATEGORIES
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 font-bold tracking-wider text-sm ${
                        selectedCategory === category
                          ? 'bg-black text-white'
                          : 'text-black '
                      }`}
                    >
                      {category.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {/* Products Title */}
              <div className="mb-8">
                <h2 className="text-2xl font-black text-white tracking-wider mb-2">
                  AVAILABLE PRODUCTS
                </h2>
                <p className="text-white text-opacity-60 text-sm">
                  Showing {filteredProducts.length} results
                </p>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="group relative"
                    style={{
                      animation: `slideIn 0.5s ease-out`,
                      animationDelay: `${index * 0.1}s`,
                      animationFillMode: 'both'
                    }}
                  >
                    {/* Glow Border */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-white via-gray-400 to-white opacity-0 group-hover:opacity-20 rounded-lg blur-lg transition duration-500"></div>

                    {/* Product Card */}
                    <div className="relative bg-black bg-opacity-40 backdrop-blur-xl border border-white border-opacity-10 rounded-lg p-6 h-full flex flex-col transition-all duration-300 hover:border-opacity-30">
                      
                      {/* Product Image Area */}
                      <div className="relative mb-4 text-center">
                        <div className="w-20 h-20 mx-auto mb-3 bg-white bg-opacity-10 rounded-lg flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
                          {product.image}
                        </div>

                        {/* Favorite Button */}
                        <button
                          onClick={() => toggleFavorite(product.id)}
                          className="absolute top-0 right-0 p-2 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all duration-300"
                        >
                          <Heart
                            size={18}
                            className={favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-white'}
                          />
                        </button>

                        {/* Stock Indicator */}
                        {product.stock < 10 && (
                          <div className="mt-2 text-xs font-bold text-red-400 tracking-widest">
                            ⚠️ {product.stock} LEFT
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <h3 className="text-white font-black tracking-wider mb-2 line-clamp-2 group-hover:text-gray-300 transition-colors">
                        {product.name}
                      </h3>
                      
                      <p className="text-white text-opacity-60 text-xs mb-4 line-clamp-2 flex-grow">
                        {product.description}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white text-opacity-30'}
                            />
                          ))}
                        </div>
                        <span className="text-white text-opacity-70 text-xs font-bold">
                          {product.rating} <span className="text-opacity-50">({product.reviews})</span>
                        </span>
                      </div>

                      {/* Price and Button */}
                      <div className="flex items-end justify-between gap-3 pt-4 border-t border-white border-opacity-10">
                        <div>
                          <p className="text-white text-opacity-60 text-xs tracking-widest mb-1">PRICE</p>
                          <p className="text-white font-black text-lg">
                            ${product.price.toFixed(2)}
                          </p>
                        </div>
                        
                        <button
                          onClick={() => addToCart(product)}
                          className="px-4 py-2 bg-white text-black font-black rounded-lg hover:bg-gray-200 active:scale-95 transition-all duration-300 text-sm tracking-widest flex items-center gap-2 group"
                        >
                          <ShoppingCart size={16} />
                          ADD
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <Package size={48} className="mx-auto text-white text-opacity-30 mb-4" />
                  <p className="text-white text-opacity-60 text-lg">No products found</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cart Sidebar */}
        {showCart && (
          <div className="fixed right-0 top-0 h-screen w-full md:w-96 bg-black bg-opacity-90 backdrop-blur-xl border-l border-white border-opacity-20 z-50 overflow-y-auto shadow-2xl">
            <div className="p-6">
              {/* Cart Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-white tracking-wider">YOUR CART</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-white hover:text-opacity-60 transition-all"
                >
                  ✕
                </button>
              </div>

              {/* Cart Items */}
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart size={48} className="mx-auto text-white text-opacity-30 mb-4" />
                  <p className="text-white text-opacity-60">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white bg-opacity-5 border border-white border-opacity-10 rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex-1">
                            <h4 className="text-white font-bold text-sm line-clamp-2 mb-1">
                              {item.name}
                            </h4>
                            <p className="text-white text-opacity-60 text-xs">
                              ${item.price.toFixed(2)} each
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 hover:bg-white hover:bg-opacity-10 rounded transition-all"
                          >
                            <Trash2 size={16} className="text-red-400" />
                          </button>
                        </div>

                        {/* Quantity Control */}
                        <div className="flex items-center gap-3 bg-white bg-opacity-5 rounded px-3 py-2 w-fit">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-white hover:text-opacity-60 transition-all"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="text-white font-bold w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-white hover:text-opacity-60 transition-all"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <div className="text-right mt-3 text-white font-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-20 my-6"></div>

                  {/* Cart Summary */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-white text-opacity-70">
                      <span className="text-sm">ITEMS:</span>
                      <span className="font-bold">{totalItems}</span>
                    </div>
                    <div className="flex justify-between text-white text-opacity-70 text-sm">
                      <span>SUBTOTAL:</span>
                      <span className="font-bold">${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white text-opacity-70 text-sm">
                      <span>SHIPPING:</span>
                      <span className="font-bold text-green-400">FREE</span>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-20"></div>
                    <div className="flex justify-between text-white text-lg font-black tracking-wider">
                      <span>TOTAL:</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button className="w-full py-4 bg-white text-black font-black text-lg tracking-wider rounded-lg hover:bg-gray-200 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group">
                    <span>GO TO PAYMENT</span>
                    <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Overlay for cart */}
        {showCart && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setShowCart(false)}
          ></div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
        
        @keyframes flicker {
          0% { opacity: 0.5; }
          50% { opacity: 0.3; }
          100% { opacity: 0.5; }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        * {
          font-family: 'Orbitron', 'Arial Black', sans-serif;
        }

        input::placeholder {
          font-family: 'Courier New', monospace;
        }

        input::-webkit-autofill,
        input::-webkit-autofill:hover,
        input::-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px rgba(255, 255, 255, 0.05) inset !important;
          -webkit-text-fill-color: white !important;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </div>
  );
}