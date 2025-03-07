const bcrypt = require('bcryptjs');
const { User, Product, Order, OrderItem, Wishlist, Contact } = require('../models');

const seedDatabase = async () => {
  try {
    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@coolshades.com',
      password: adminPassword,
      role: 'admin'
    });

    // Create sample customer user
    const customerPassword = await bcrypt.hash('customer123', 10);
    const customer = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: customerPassword,
      role: 'customer'
    });

    // Create sample products
    const products = await Product.bulkCreate([
      {
        name: 'Classic Aviator',
        description: 'Timeless aviator sunglasses with gold frame and green lenses',
        price: 199.99,
        category: 'Aviator',
        imageUrl: '/uploads/aviator.jpg',
        stock: 50,
        rating: 4.8,
        specifications: {
          frame: 'Gold',
          lens: 'Green',
          material: 'Metal',
          protection: 'UV400'
        }
      },
      {
        name: 'Modern Wayfarer',
        description: 'Contemporary wayfarer style with black frame and polarized lenses',
        price: 149.99,
        category: 'Wayfarer',
        imageUrl: '/uploads/wayfarer.jpg',
        stock: 75,
        rating: 4.6,
        specifications: {
          frame: 'Black',
          lens: 'Polarized',
          material: 'Acetate',
          protection: 'UV400'
        }
      },
      {
        name: 'Sport Wrap',
        description: 'Sporty wrap-around sunglasses with blue mirror lenses',
        price: 129.99,
        category: 'Sport',
        imageUrl: '/uploads/sport.jpg',
        stock: 100,
        rating: 4.7,
        specifications: {
          frame: 'Black',
          lens: 'Blue Mirror',
          material: 'TR90',
          protection: 'UV400'
        }
      }
    ]);

    // Create sample order
    const order = await Order.create({
      userId: customer.id,
      status: 'pending',
      totalAmount: 479.97,
      shippingAddress: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      }
    });

    // Create order items
    await OrderItem.bulkCreate([
      {
        orderId: order.id,
        productId: products[0].id,
        quantity: 1,
        price: products[0].price
      },
      {
        orderId: order.id,
        productId: products[1].id,
        quantity: 2,
        price: products[1].price
      }
    ]);

    // Create wishlist item
    await Wishlist.create({
      userId: customer.id,
      productId: products[2].id
    });

    // Create contact message
    await Contact.create({
      name: 'Jane Smith',
      email: 'jane@example.com',
      subject: 'Product Inquiry',
      message: 'I would like to know more about the Classic Aviator sunglasses.',
      status: 'pending'
    });

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};

module.exports = { seedDatabase }; 