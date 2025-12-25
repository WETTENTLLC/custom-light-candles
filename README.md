# Custom Light Candles Website

A professional e-commerce website for Antoine Montgomery's custom candle business, featuring handcrafted candles, aromatherapy products, and a complete admin dashboard for product management.

## 🔐 Admin Access

**Owner Login Credentials:**
- **Username:** `antoine.montgomery`
- **Password:** `CandleMaster2025!`
- **Access URL:** `/login.html`

### Admin Features
- Add/Edit/Delete products
- Upload product images
- Set pricing and inventory
- View sales statistics
- Manage product categories

## 🌟 Features

### Customer Features
- **Responsive Design**: Optimized for all devices
- **Product Gallery**: Dynamic product display
- **Shopping Cart**: Add/remove items, quantity control
- **Custom Orders**: Built-in form for custom candle requests
- **Contact System**: Professional contact form with validation
- **Aromatherapy Guide**: Benefits and process information

### Admin Features
- **Secure Login**: Session-based authentication (24-hour sessions)
- **Product Management**: Full CRUD operations
- **Image Upload**: Drag-and-drop image handling
- **Inventory Tracking**: Stock levels and low-stock alerts
- **Statistics Dashboard**: Product counts and pricing analytics

## 📁 File Structure

```
custom-light-candles/
├── assets/                 # Images and media files
├── index.html             # Homepage
├── gallery.html           # Product gallery and shopping
├── cart.html              # Shopping cart
├── login.html             # Admin login
├── admin.html             # Admin dashboard
├── admin.js               # Admin functionality
├── meet_antoine_montgomery.html
├── process.html           # Candle-making process
├── benefits.html          # Aromatherapy benefits
├── testimonials.html      # Customer reviews
├── contact.html           # Contact form
├── styles.css             # Main stylesheet
├── script.js              # Main JavaScript
└── README.md              # This file
```

## 🚀 Getting Started

1. **Local Setup:**
   ```bash
   # Clone or download the repository
   # Open index.html in a web browser
   ```

2. **Admin Access:**
   - Visit `/login.html`
   - Use credentials above
   - Access admin dashboard

3. **Add Products:**
   - Login as admin
   - Use "Add New Product" form
   - Upload images, set prices, manage inventory

## 🛒 E-commerce Features

### Product Management
- **Categories**: Aromatherapy, Decorative, Seasonal, Custom
- **Inventory**: Real-time stock tracking
- **Pricing**: Flexible pricing with statistics
- **Images**: Upload and preview functionality

### Shopping Experience
- **Dynamic Gallery**: Products loaded from admin dashboard
- **Cart System**: LocalStorage-based cart management
- **Stock Validation**: Prevents overselling
- **Responsive Design**: Mobile-optimized shopping

## 🔧 Technical Details

### Security
- CSRF protection on forms
- Input validation and sanitization
- Session-based admin authentication
- Secure password requirements

### Performance
- Optimized images and assets
- Efficient DOM manipulation
- LocalStorage for data persistence
- Mobile-first responsive design

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📊 Admin Dashboard Stats

- **Total Products**: Real-time count
- **In Stock**: Available inventory
- **Low Stock**: Items needing reorder (≤5 units)
- **Average Price**: Pricing analytics

## 🎨 Design Features

- **Color Scheme**: Gold (#f39c12) and Cyan (#00ffff)
- **Animations**: Smooth hover effects and transitions
- **Typography**: Clean, professional fonts
- **Visual Effects**: Smoke animations, wick lighting effects

## 📱 Mobile Optimization

- Responsive grid layouts
- Touch-friendly navigation
- Optimized forms for mobile input
- Compressed images for faster loading

## 🔄 Data Management

- **Products**: Stored in localStorage
- **Cart**: Session-based shopping cart
- **Admin Session**: 24-hour authentication
- **Form Data**: Client-side validation

## 🚀 GitHub Deployment

### Setup Repository
```bash
# Initialize git repository
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: Custom Light Candles website with admin dashboard"

# Add remote repository
git remote add origin https://github.com/yourusername/custom-light-candles.git

# Push to GitHub
git push -u origin main
```

### GitHub Pages Setup
1. Go to repository Settings
2. Navigate to Pages section
3. Select "Deploy from a branch"
4. Choose "main" branch
5. Site will be available at: `https://yourusername.github.io/custom-light-candles`

## 📞 Support

For technical support or questions about the admin system:
- Check the browser console for error messages
- Ensure localStorage is enabled
- Clear browser cache if experiencing issues

## 🔐 Security Notes

- Change default admin password after first login
- Admin sessions expire after 24 hours
- All form inputs are validated
- CSRF tokens protect against attacks

---

**© 2025 Custom Light Candles. All rights reserved.**

*Built with modern web technologies for optimal performance and user experience.*