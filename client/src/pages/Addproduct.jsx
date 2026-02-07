import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * AddProduct Component
 * Form for admins to add new products with validation
 * 
 * Props:
 * @param {number} adminId - Logged in admin's ID
 * @param {Array} categories - List of product categories from database
 * @param {Function} onSubmit - Function to handle form submission
 */
const AddProduct = ({ adminId, categories = [], onSubmit }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoryId: '',
    regularPrice: '',
    salePrice: '',
    stockQuantity: '',
    lowStockThreshold: '10',
    sku: '',
    image1Type: 'url', // 'url' or 'file'
    image1Url: '',
    image1File: null,
    image2Type: 'url',
    image2Url: '',
    image2File: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.categoryId) newErrors.categoryId = 'Category is required';
    if (!formData.regularPrice) newErrors.regularPrice = 'Regular price is required';
    if (!formData.stockQuantity) newErrors.stockQuantity = 'Stock quantity is required';

    // Price validation
    const regularPrice = parseFloat(formData.regularPrice);
    const salePrice = parseFloat(formData.salePrice);

    if (regularPrice <= 0) newErrors.regularPrice = 'Price must be greater than 0';
    if (formData.salePrice && salePrice >= regularPrice) {
      newErrors.salePrice = 'Sale price must be less than regular price';
    }
    if (formData.salePrice && salePrice <= 0) {
      newErrors.salePrice = 'Sale price must be greater than 0';
    }

    // Stock validation
    const stock = parseInt(formData.stockQuantity);
    if (stock < 0) newErrors.stockQuantity = 'Stock cannot be negative';

    // Image validation - at least one image required
    const hasImage1 = formData.image1Type === 'url' 
      ? formData.image1Url.trim() 
      : formData.image1File;
    
    if (!hasImage1) {
      newErrors.image1 = 'At least one product image is required';
    }

    // URL validation for image URLs
    if (formData.image1Type === 'url' && formData.image1Url) {
      try {
        new URL(formData.image1Url);
      } catch {
        newErrors.image1 = 'Invalid URL format';
      }
    }

    if (formData.image2Type === 'url' && formData.image2Url) {
      try {
        new URL(formData.image2Url);
      } catch {
        newErrors.image2 = 'Invalid URL format';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (imageNumber, file) => {
    const key = `image${imageNumber}File`;
    setFormData(prev => ({ ...prev, [key]: file }));
    if (errors[`image${imageNumber}`]) {
      setErrors(prev => ({ ...prev, [`image${imageNumber}`]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Please fix all errors before submitting');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare product data
      const productData = {
        admin_id: adminId,
        category_id: parseInt(formData.categoryId),
        name: formData.name.trim(),
        description: formData.description.trim(),
        regular_price: parseFloat(formData.regularPrice),
        sale_price: formData.salePrice ? parseFloat(formData.salePrice) : null,
        stock_quantity: parseInt(formData.stockQuantity),
        low_stock_threshold: parseInt(formData.lowStockThreshold),
        sku: formData.sku.trim() || null,
        images: [
          {
            type: formData.image1Type,
            url: formData.image1Type === 'url' ? formData.image1Url : null,
            file: formData.image1Type === 'file' ? formData.image1File : null,
            display_order: 1
          },
          formData.image2Type === 'url' && formData.image2Url
            ? { type: 'url', url: formData.image2Url, display_order: 2 }
            : formData.image2Type === 'file' && formData.image2File
            ? { type: 'file', file: formData.image2File, display_order: 2 }
            : null
        ].filter(Boolean)
      };

      await onSubmit(productData);
      alert('Product added successfully!');
      navigate('/admin/dashboard');
    } catch (error) {
      alert('Error adding product: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-['Exo_2']">
      {/* Google Font Import */}
      <link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@400;600;700;900&display=swap" rel="stylesheet" />

      {/* Header */}
      <header className="border-b border-gray-800 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🎮</span>
            <h1 className="text-3xl font-black tracking-wider">ARCADE STORE</h1>
          </div>
          <button 
            onClick={() => navigate('/admin/dashboard')}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold tracking-wider transition-all"
          >
            ← BACK TO DASHBOARD
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-8">
          <h2 className="text-3xl font-black tracking-wider mb-6 flex items-center gap-3">
            ➕ ADD NEW PRODUCT
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-bold text-gray-400 tracking-wider mb-2">
                PRODUCT NAME *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., RTX 4090 Graphics Card"
                className={`w-full bg-black/50 border ${errors.name ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 transition-all`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-bold text-gray-400 tracking-wider mb-2">
                CATEGORY *
              </label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                className={`w-full bg-black/50 border ${errors.categoryId ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-all`}
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-gray-400 tracking-wider mb-2">
                DESCRIPTION
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                placeholder="Describe your product..."
                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 transition-all"
              />
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-400 tracking-wider mb-2">
                  REGULAR PRICE ($) *
                </label>
                <input
                  type="number"
                  name="regularPrice"
                  value={formData.regularPrice}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  placeholder="1599.99"
                  className={`w-full bg-black/50 border ${errors.regularPrice ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 transition-all`}
                />
                {errors.regularPrice && <p className="text-red-500 text-sm mt-1">{errors.regularPrice}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-400 tracking-wider mb-2">
                  SALE PRICE ($)
                </label>
                <input
                  type="number"
                  name="salePrice"
                  value={formData.salePrice}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  placeholder="1399.99 (optional)"
                  className={`w-full bg-black/50 border ${errors.salePrice ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 transition-all`}
                />
                {errors.salePrice && <p className="text-red-500 text-sm mt-1">{errors.salePrice}</p>}
              </div>
            </div>

            {/* Stock Management */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-400 tracking-wider mb-2">
                  STOCK QUANTITY *
                </label>
                <input
                  type="number"
                  name="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleInputChange}
                  min="0"
                  placeholder="100"
                  className={`w-full bg-black/50 border ${errors.stockQuantity ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 transition-all`}
                />
                {errors.stockQuantity && <p className="text-red-500 text-sm mt-1">{errors.stockQuantity}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-400 tracking-wider mb-2">
                  LOW STOCK ALERT AT
                </label>
                <input
                  type="number"
                  name="lowStockThreshold"
                  value={formData.lowStockThreshold}
                  onChange={handleInputChange}
                  min="0"
                  placeholder="10"
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 transition-all"
                />
              </div>
            </div>

            {/* SKU */}
            <div>
              <label className="block text-sm font-bold text-gray-400 tracking-wider mb-2">
                SKU (Stock Keeping Unit)
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                placeholder="GPU-RTX4090-001"
                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 transition-all"
              />
            </div>

            {/* Product Images */}
            <div className="space-y-4">
              <h3 className="text-xl font-black tracking-wider text-green-400">📸 PRODUCT IMAGES</h3>
              
              {/* Image 1 (Required) */}
              <div className="bg-black/30 border border-gray-700 rounded-lg p-4">
                <label className="block text-sm font-bold text-gray-400 tracking-wider mb-3">
                  PRIMARY IMAGE * (Required)
                </label>
                
                <div className="flex gap-4 mb-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="image1Type"
                      value="url"
                      checked={formData.image1Type === 'url'}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Image URL</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="image1Type"
                      value="file"
                      checked={formData.image1Type === 'file'}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Upload File</span>
                  </label>
                </div>

                {formData.image1Type === 'url' ? (
                  <input
                    type="url"
                    name="image1Url"
                    value={formData.image1Url}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    className={`w-full bg-black/50 border ${errors.image1 ? 'border-red-500' : 'border-gray-600'} rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 transition-all`}
                  />
                ) : (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(1, e.target.files[0])}
                    className="w-full bg-black/50 border border-gray-600 rounded-lg px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-600 file:text-black file:font-bold hover:file:bg-green-500 transition-all"
                  />
                )}
                {errors.image1 && <p className="text-red-500 text-sm mt-1">{errors.image1}</p>}
              </div>

              {/* Image 2 (Optional) */}
              <div className="bg-black/30 border border-gray-700 rounded-lg p-4">
                <label className="block text-sm font-bold text-gray-400 tracking-wider mb-3">
                  SECONDARY IMAGE (Optional)
                </label>
                
                <div className="flex gap-4 mb-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="image2Type"
                      value="url"
                      checked={formData.image2Type === 'url'}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Image URL</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="image2Type"
                      value="file"
                      checked={formData.image2Type === 'file'}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Upload File</span>
                  </label>
                </div>

                {formData.image2Type === 'url' ? (
                  <input
                    type="url"
                    name="image2Url"
                    value={formData.image2Url}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image2.jpg"
                    className={`w-full bg-black/50 border ${errors.image2 ? 'border-red-500' : 'border-gray-600'} rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 transition-all`}
                  />
                ) : (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(2, e.target.files[0])}
                    className="w-full bg-black/50 border border-gray-600 rounded-lg px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-600 file:text-black file:font-bold hover:file:bg-green-500 transition-all"
                  />
                )}
                {errors.image2 && <p className="text-red-500 text-sm mt-1">{errors.image2}</p>}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-black font-black py-4 rounded-lg tracking-wider transition-all text-lg"
              >
                {isSubmitting ? 'ADDING PRODUCT...' : '✓ ADD PRODUCT'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/dashboard')}
                className="px-8 bg-gray-700 hover:bg-gray-600 text-white font-black py-4 rounded-lg tracking-wider transition-all"
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;