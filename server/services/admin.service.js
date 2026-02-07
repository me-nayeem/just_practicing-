// services/admin.service.js
export const getAdminAnalytics = async (adminId) => {
  // Get total products
  const productsResult = await pool.query(
    'SELECT COUNT(*) as count FROM products WHERE admin_id = $1 AND is_active = true',
    [adminId]
  );

  // Get total orders for admin's products
  const ordersResult = await pool.query(`
    SELECT COUNT(DISTINCT o.id) as count
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    JOIN products p ON oi.product_id = p.id
    WHERE p.admin_id = $1
  `, [adminId]);

  // Get total revenue
  const revenueResult = await pool.query(`
    SELECT SUM(oi.subtotal) as revenue
    FROM order_items oi
    JOIN products p ON oi.product_id = p.id
    WHERE p.admin_id = $1
  `, [adminId]);

  // Get pending orders count
  const pendingResult = await pool.query(`
    SELECT COUNT(DISTINCT o.id) as count
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    JOIN products p ON oi.product_id = p.id
    WHERE p.admin_id = $1 AND o.status = 'pending'
  `, [adminId]);

  // Check if any products have low stock
  const lowStockResult = await pool.query(`
    SELECT EXISTS(
      SELECT 1 FROM products 
      WHERE admin_id = $1 
      AND stock_quantity <= low_stock_threshold
    ) as has_low_stock
  `, [adminId]);

  return {
    totalProducts: parseInt(productsResult.rows[0].count),
    totalOrders: parseInt(ordersResult.rows[0].count),
    revenue: parseFloat(revenueResult.rows[0].revenue || 0),
    pendingOrders: parseInt(pendingResult.rows[0].count),
    hasLowStock: lowStockResult.rows[0].has_low_stock
  };
};