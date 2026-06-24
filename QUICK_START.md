# 🚀 Repairs CMS - Quick Start & Testing Guide

## ✅ What's New

### Website (`ui/website/`)
✨ **Modern Landing Page** with:
- Eye-catching hero section with animated icons
- Service categories grid (Mobile, Laptop, Tablet, Appliances)
- Why Choose Us section with key benefits
- Customer testimonials carousel
- Interactive FAQ accordion
- Final CTA section

🎯 **Multi-Step Booking Form** (5 steps):
1. Select device type
2. Choose issue and priority
3. Pick date & time
4. Enter customer details
5. Review and confirm

📊 **User Dashboard Component**:
- Track active and completed bookings
- View repair progress with progress bars
- See technician assignments
- Rate completed repairs

### Admin Panel (`ui/admin/`)
🎛️ **Professional Admin Dashboard** with:
- Dark-themed sidebar navigation
- Analytics cards (bookings, completed, revenue, etc.)
- Bookings table with status filtering
- Technician performance cards
- Recent activity feed

📋 **Sidebar Navigation**:
- Dashboard
- Bookings Management
- Customers
- Services
- Technicians
- Website Pages
- Settings

## 🏃 Getting Started

### 1. Install Dependencies

```bash
# Website
cd ui/website
npm install

# Admin
cd ../admin
npm install

# Server (if not done)
cd ../../server
npm install
```

### 2. Start the Development Servers

```bash
# Terminal 1 - Website (runs on port 5173)
cd ui/website
npm run dev

# Terminal 2 - Admin (runs on port 5174)
cd ui/admin
npm run dev

# Terminal 3 - Server (runs on port 5000)
cd server
npm run dev
```

### 3. Seed the Database (First Time)

```bash
cd server
npm run seed
```

This populates the database with:
- 6 professional technicians
- 4 service pages with details
- About Us section with mission/vision
- 8 comprehensive FAQs

## 🌐 Access the Applications

- **Website**: http://localhost:5173
- **Admin Panel**: http://localhost:5174
- **Server API**: http://localhost:5000

## 🧪 Testing Features

### Website Testing

**1. Hero Section**
- ✓ Click "Book Now" to open booking modal
- ✓ Click "View Services" to scroll to services section
- ✓ Verify animations on icons

**2. Services Section**
- ✓ View all 4 device categories
- ✓ Click "Book Service" on any card
- ✓ Verify responsive layout on mobile

**3. Multi-Step Booking Form**
- ✓ Select device type (step 1)
- ✓ Choose issue and priority (step 2)
- ✓ Pick date and time (step 3)
- ✓ Enter contact details (step 4)
- ✓ Review booking summary (step 5)
- ✓ Submit booking

**4. Testimonials**
- ✓ View customer reviews with star ratings
- ✓ Check responsive carousel behavior

**5. FAQ Section**
- ✓ Click to expand/collapse questions
- ✓ Verify all 6 FAQs display properly

### Admin Panel Testing

**1. Dashboard**
- ✓ View analytics cards with stats
- ✓ Check bookings table with sample data
- ✓ Click filter buttons to filter by status
- ✓ View technician performance cards
- ✓ Check recent activity feed

**2. Sidebar Navigation**
- ✓ Click each menu item
- ✓ Verify active state highlighting
- ✓ Check responsive behavior on mobile

**3. Bookings Table**
- ✓ Filter by "All", "Pending", "Confirmed", "In Progress", "Completed"
- ✓ View booking details
- ✓ Check status badges with correct colors

**4. Technicians Section**
- ✓ View top technicians with performance
- ✓ See star ratings and job counts

## 🎨 Design System Features

### Color Usage
- **Blue (#0ea5e9)**: Primary CTAs, active states
- **Green (#10b981)**: Completed status, success states
- **Yellow (#f59e0b)**: In Progress status, warnings
- **Gray (#9ca3af)**: Pending status, neutral

### Responsive Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

All components are fully responsive!

## 📱 Mobile Testing

Test on mobile devices or use browser DevTools:
1. Open Chrome DevTools (F12)
2. Click device toolbar icon (top-left of DevTools)
3. Select "iPhone 12" or other device
4. Test all pages and interactions

## 🔗 API Integration Points

The frontend connects to the backend at:
- `http://localhost:5000/api/...`

Main endpoints used:
- `GET /api/website/about` - About Us data
- `GET /api/website/contact` - Contact info
- `GET /api/website/webpages` - Dynamic pages
- `POST /api/booking` - Create booking (when integrated)

## ⚡ Performance Tips

- Images load from Unsplash CDN (fast)
- Smooth animations use CSS transitions
- Responsive design optimized for all devices
- Modal-based booking prevents page navigation

## 🐛 Troubleshooting

**Issue**: "Port already in use"
```bash
# Kill process using port
# On Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

**Issue**: Styles not loading
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Issue**: Components not showing
```bash
# Check browser console (F12) for errors
# Verify all imports are correct
# Check that design system file exists
```

## 📚 File Structure

**Website:**
```
ui/website/src/
├── components/
│   ├── HeroSection.jsx
│   ├── ServiceCard.jsx
│   ├── BookingForm.jsx
│   ├── UserDashboard.jsx
│   └── ...
├── pages/
│   ├── Home.jsx (UPDATED)
│   ├── About.jsx
│   └── Contact.jsx
└── resources/
    └── designSystem.js
```

**Admin:**
```
ui/admin/src/
├── components/
│   ├── Sidebar.jsx
│   ├── StatsCard.jsx
│   └── BookingsTable.jsx
├── pages/
│   └── Dashboard.jsx (UPDATED)
└── resources/
    └── designSystem.js
```

## 🎯 Next Steps

1. **Run the apps** - Follow "Getting Started" section
2. **Test all features** - Use testing checklist above
3. **Customize colors** - Edit `designSystem.js` if needed
4. **Add backend integration** - Connect booking form to API
5. **Deploy** - Push to production when ready

## 📞 Support

For issues or questions:
1. Check DESIGN_GUIDE.md for comprehensive documentation
2. Review component comments in code
3. Check browser console for errors (F12)
4. Verify database is seeded with sample data

---

**Happy testing! 🚀**
