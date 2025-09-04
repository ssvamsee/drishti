# Student ERP - Modern Education Management System

A comprehensive, multi-tenant Student ERP system built with modern React, featuring role-based access control, responsive design, and beautiful dark/light theme support.

## ✨ Features

### 🔐 **Multi-Role Authentication & Authorization**
- **10 User Roles**: Superadmin, Organization Head, Dean, Branch Principal, Computer Operator, Teacher, Finance Admin, Student, Parent
- **Role-Based Access Control (RBAC)**: Dynamic navigation and feature access based on user permissions
- **Multi-Tenant Support**: Organization and branch-level data isolation
- **Secure Authentication**: JWT-based auth with refresh tokens

### 🎨 **Modern UI/UX Design**
- **Light/Dark Theme**: Automatic system detection with manual toggle
- **Fully Responsive**: Mobile-first design that works on all devices
- **Smooth Animations**: Framer Motion powered interactions
- **shadcn/ui Components**: Beautiful, accessible UI components
- **Tailwind CSS**: Modern utility-first styling

### 📊 **Comprehensive Dashboard**
- **Role-Specific Dashboards**: Tailored content based on user role
- **Real-time Statistics**: Student counts, attendance rates, revenue tracking
- **Activity Feed**: Recent activities and notifications
- **Quick Actions**: Fast access to common tasks

### 👥 **Student Management**
- Student registration and profile management
- Bulk import from Excel/CSV files
- Document upload and management
- Parent contact information
- Academic progress tracking

### ✅ **Attendance System**
- Daily attendance marking
- Bulk attendance upload
- Multiple status options (Present, Absent, Late, Excused)
- Attendance analytics and reports
- Automated notifications

### 📝 **Examination & Marks**
- Exam creation and scheduling
- Bulk marks import with validation
- Grade calculation and GPA tracking
- Report card generation
- Performance analytics

### 💰 **Financial Management**
- Fee structure configuration
- Payment processing
- Receipt generation
- Financial reports
- Payment gateway integration ready

### 📈 **Reports & Analytics**
- Student performance reports
- Attendance analytics
- Financial reports
- Export to PDF/Excel
- Custom report builder

## 🛠 Technology Stack

### Frontend
- **React 18.2.0** - Modern React with hooks
- **React Router v6** - Client-side routing
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **shadcn/ui** - Beautiful UI components
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **React Hook Form** - Form management
- **Yup** - Schema validation

### State Management
- **Zustand** - Lightweight state management
- **React Query** - Server state management
- **Persistent Storage** - Local storage integration

### Development Tools
- **Create React App** - Build tooling
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone and Setup**
   ```bash
   git clone <repository-url>
   cd student-erp
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Open Application**
   Visit `http://localhost:3000`

### Demo Login Credentials
```
Email: principal@school.edu
Password: password123
Role: Branch Principal
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                     # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   └── Input.jsx
│   ├── LoadingSpinner.jsx      # Loading components
│   ├── ProtectedRoute.jsx      # Route protection
│   ├── Sidebar.jsx             # Navigation sidebar
│   └── ThemeToggle.jsx         # Theme switcher
├── layouts/
│   ├── AuthLayout.jsx          # Authentication layout
│   └── DashboardLayout.jsx     # Main app layout
├── pages/
│   ├── auth/
│   │   └── LoginPage.jsx       # Login page
│   ├── Dashboard.jsx           # Main dashboard
│   ├── Students.jsx            # Student management
│   ├── Attendance.jsx          # Attendance tracking
│   ├── Marks.jsx               # Marks management
│   ├── MarksImport.jsx         # Bulk marks import
│   ├── Fees.jsx                # Financial management
│   ├── Reports.jsx             # Reports & analytics
│   └── Settings.jsx            # System settings
├── services/
│   └── api.js                  # API service layer
├── store/
│   ├── authStore.js            # Authentication state
│   └── themeStore.js           # Theme management
├── utils/
│   ├── cn.js                   # Class name utilities
│   ├── constants.js            # App constants
│   └── validation.js           # Form validation schemas
├── App.js                      # Main app component
└── index.js                    # App entry point
```

## 🎭 Role-Based Features

### **Superadmin**
- Manage multiple organizations
- System-wide configuration
- License management
- Global analytics

### **Organization Head**
- Manage organization settings
- Create and manage branches
- User provisioning
- Organization-level reports

### **Branch Principal**
- Full branch administration
- Student and staff management
- Academic oversight
- Branch-level reports

### **Teacher**
- Class management
- Attendance marking
- Marks entry
- Student communication

### **Student/Parent**
- View academic progress
- Attendance tracking
- Fee status
- Report downloads

## 🎨 Design System

### **Color Palette**
- **Primary**: Blue (#3B82F6)
- **Secondary**: Gray (#6B7280)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)

### **Typography**
- **Font Family**: Inter (system fonts fallback)
- **Font Sizes**: Responsive scale using Tailwind
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### **Spacing & Layout**
- **Grid System**: CSS Grid and Flexbox
- **Spacing Scale**: Tailwind's spacing scale (0.25rem increments)
- **Border Radius**: 0.75rem (rounded-xl) for cards and components
- **Shadows**: Subtle shadows for depth and hierarchy

## 🔧 Configuration

### **Environment Variables**
```bash
REACT_APP_API_URL=http://localhost:5000/api/v1
REACT_APP_UPLOAD_URL=http://localhost:5000/uploads
```

### **Theme Configuration**
The app supports automatic theme detection and manual switching:
- **Light Mode**: Default theme with light colors
- **Dark Mode**: Dark theme with appropriate contrast
- **System**: Automatically follows system preference

## 📱 Responsive Design

### **Breakpoints**
- **Mobile**: < 768px (sm)
- **Tablet**: 768px - 1024px (md)
- **Desktop**: 1024px+ (lg)
- **Large Desktop**: 1280px+ (xl)

### **Mobile Features**
- Collapsible sidebar navigation
- Touch-friendly interactive elements
- Optimized form layouts
- Swipe gestures support

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Granular permissions system
- **Route Protection**: Protected routes based on user roles
- **Input Validation**: Client-side and server-side validation
- **XSS Protection**: Sanitized inputs and outputs

## 🚀 Performance Optimizations

- **Code Splitting**: Lazy loading of route components
- **Image Optimization**: Optimized image loading
- **Caching**: React Query caching for API responses
- **Bundle Optimization**: Tree shaking and minification
- **Lighthouse Score**: 90+ performance score

## 🧪 Testing Strategy

### **Unit Testing**
```bash
npm test
```

### **E2E Testing**
```bash
npm run test:e2e
```

### **Lighthouse Testing**
```bash
npm run test:lighthouse
```

## 🔮 Roadmap

### **Phase 1** (Current)
- ✅ Authentication & Authorization
- ✅ Role-based dashboards
- ✅ Student management
- ✅ Basic attendance tracking

### **Phase 2** (Next)
- 📊 Advanced analytics
- 📱 Mobile app
- 🔗 API integrations
- 📧 Email notifications

### **Phase 3** (Future)
- 🤖 AI-powered insights
- 📅 Calendar integration
- 💬 Real-time messaging
- 🏆 Gamification

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### **Development Guidelines**
- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for beautiful UI components
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **Lucide React** for beautiful icons
- **React Hook Form** for form management

## 📞 Support

- **Documentation**: [View Docs](docs/)
- **Issues**: [Report Issues](issues/)
- **Email**: support@studenterp.com

---

**Built with ❤️ by the Student ERP Team**

*Empowering educational institutions with modern technology* 