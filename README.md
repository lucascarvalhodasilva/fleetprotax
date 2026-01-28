# Fleet-Steuer 🚗💼

**German Tax Deduction Tracker for Vehicle Couriers**

A comprehensive cross-platform mobile application built with Next.js and Capacitor for tracking tax-deductible expenses, mileage, and equipment depreciation specifically designed for German couriers (Kurier-Fahrer).

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Platform](https://img.shields.io/badge/platform-Web%20%7C%20iOS%20%7C%20Android-green.svg)
![License](https://img.shields.io/badge/license-MIT-orange.svg)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Core Modules](#-core-modules)
- [Documentation](#-documentation)
- [Development](#-development)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## 🎯 Overview

Fleet-Steuer is a specialized tax management application designed for self-employed vehicle couriers in Germany. It helps track and calculate tax-deductible expenses according to German tax law, including:

- **Daily meal allowances** (Verpflegungspauschalen: €14/€28)
- **Mileage tracking** with automatic cost calculation (€0.30/km)
- **Equipment depreciation** (Abschreibung) with GWG threshold (€952)
- **Receipt management** with PDF/image support
- **Real-time tax deduction summaries**

### Why Fleet-Steuer?

- ✅ **German tax law compliant** - Follows current tax regulations
- ✅ **Offline-first** - Works without internet connection
- ✅ **Mobile-optimized** - Touch-friendly swipe gestures
- ✅ **Professional** - Production-ready with A+ module grades
- ✅ **Cross-platform** - Web, iOS, and Android support

---

## ✨ Features

### 📊 Dashboard
- Real-time KPI cards showing tax deduction summaries
- Monthly expense trends with bar chart
- Quick overview of total deductible amount
- Grade: **A (92/100)**

### 🚗 Trips Management
- Mileage tracking with automatic calculations
- Date and distance logging
- Receipt upload support (PDF/images)
- Swipe gestures for quick actions (edit/delete/receipt preview)
- Grade: **A+ (98/100)**

### 💰 Expenses Tracking
- Daily expense logging with meal allowances (€14/€28)
- Receipt management
- Date and category tracking
- Bi-directional swipe actions
- Grade: **A (94/100)**

### 🛠️ Equipment (Arbeitsmittel)
- Depreciation schedule calculation
- GWG (Geringwertige Wirtschaftsgüter) threshold: €952
- Multi-year depreciation tracking (max 3 years)
- Floating schedule card with swipe-to-close
- Receipt management
- Grade: **A+ (96/100)**

### ⚙️ Settings
- Tax year configuration
- Car cost settings (€0.30/km default)
- Meal allowance settings (€14/€28)
- GWG threshold management (€952)
- Grade: **A+ (98/100)**

### 🎨 UX Features
- **Bi-directional swipe gestures** - Left for actions, right for receipts
- **Android back button integration** - Smart navigation hierarchy
- **Floating schedule cards** - Equipment depreciation details
- **PDF/Image receipt preview** - Full-screen viewer with zoom
- **Responsive design** - Works on all screen sizes
- **Dark mode ready** - Material-UI theming

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **Material-UI (MUI) v6** - Component library
- **MUI X Charts** - Data visualization
- **Capacitor 6** - Cross-platform native runtime

### Mobile
- **Capacitor Filesystem** - Local file storage
- **Capacitor App** - Native app features (back button, etc.)
- **iOS & Android** - Native builds

### Storage
- **Local Storage** - Browser storage for web
- **Capacitor Filesystem** - Mobile file system
- **Receipt storage** - Documents directory

### Development
- **ESLint** - Code linting
- **Git** - Version control
- **GitHub** - Repository hosting

---

## 🚀 Getting Started

### Prerequisites

```bash
Node.js >= 18.x
npm >= 9.x
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lucascarvalhodasilva/ye.git
   cd ye
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production

**Web:**
```bash
npm run build
npm run export
```

**iOS:**
```bash
npm run build
npx cap sync ios
npx cap open ios
```

**Android:**
```bash
npm run build
npx cap sync android
npx cap open android
```

---

## 📁 Project Structure

```
fleet-steuer/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── dashboard/            # Dashboard module
│   │   ├── trips/                # Trips tracking
│   │   ├── expenses/             # Expenses tracking
│   │   ├── equipment/            # Equipment management
│   │   ├── settings/             # Settings module
│   │   └── layout.js             # Root layout
│   ├── components/               # Shared components
│   │   ├── shared/               # Common UI components
│   │   ├── Sidebar.js            # Navigation sidebar
│   │   └── ...
│   ├── contexts/                 # React contexts
│   ├── hooks/                    # Custom React hooks
│   └── utils/                    # Utility functions
├── docs/                         # Documentation
│   ├── diagrams/                 # Flow charts & visual guides
│   ├── implementations/          # Feature implementation docs
│   ├── reviews/                  # Module reviews
│   └── summaries/                # Quick references
├── android/                      # Android native project
├── ios/                          # iOS native project
├── public/                       # Static assets
└── capacitor.config.json         # Capacitor configuration
```

---

## 📚 Core Modules

### Module Quality Grades

| Module | Grade | Score | Status |
|--------|-------|-------|--------|
| Settings | A+ | 98/100 | Production-Ready ✅ |
| Trips | A+ | 98/100 | Production-Ready ✅ |
| Equipment | A+ | 96/100 | Production-Ready ✅ |
| Expenses | A | 94/100 | Production-Ready ✅ |
| Dashboard | A | 92/100 | Production-Ready ✅ |
| **Average** | **A+** | **95.2/100** | **Excellent** |

### Module Documentation

Comprehensive reviews available in [`docs/reviews/`](docs/reviews/):
- [Dashboard Review](docs/reviews/dashboard-module-review.md)
- [Trips Review](docs/reviews/trips-module-review.md)
- [Expenses Review](docs/reviews/expenses-module-review.md)
- [Equipment Review](docs/reviews/equipment-module-review.md)
- [Settings Review](docs/reviews/settings-module-review.md)

---

## 📖 Documentation

Comprehensive documentation available in the [`docs/`](docs/) directory:

### Visual Guides
- [Swipe Gestures Guide](docs/diagrams/SWIPE_GESTURES_VISUAL_GUIDE.md)
- [Android Back Button Flow](docs/diagrams/ANDROID_BACK_BUTTON_FLOW_DIAGRAM.md)

### Implementation Details
- [Android Back Button Handler](docs/implementations/IMPLEMENTATION_SUMMARY_BACK_BUTTON.md)
- [Bi-directional Swipe Gestures](docs/implementations/SWIPE_GESTURES_IMPLEMENTATION.md)
- [Monthly Expense Tracking](docs/implementations/SPESEN_IMPLEMENTATION_SUMMARY.md)

### Quick References
- [Equipment Summary](docs/summaries/EQUIPMENT_REVIEW_SUMMARY.md)
- [Expenses Summary](docs/summaries/EXPENSES_REVIEW_SUMMARY.md)
- [File Validation Summary](docs/summaries/FILE_SIZE_VALIDATION_SUMMARY.md)

**Full Documentation Index:** [docs/README.md](docs/README.md)

---

## 💻 Development

### Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run export           # Export static site
npm run lint             # Run ESLint

# Mobile
npx cap sync             # Sync web to native
npx cap open ios         # Open iOS in Xcode
npx cap open android     # Open Android in Android Studio
```

### Coding Standards

- **ESLint** configuration for code quality
- **Component organization** by feature modules
- **German tax law** compliance in calculations
- **Mobile-first** responsive design
- **Accessibility** considerations (ARIA labels, keyboard navigation)

### Key Technologies

- **App Router** - Next.js 14 routing system
- **Server Components** - Optimized rendering
- **Material-UI** - Component theming and customization
- **Capacitor Plugins** - Native device features
- **Local Storage** - Offline-first data persistence

---

## 🚢 Deployment

### Web Deployment

**Vercel (Recommended):**
```bash
npm run build
# Deploy to Vercel
```

**Static Export:**
```bash
npm run export
# Deploy /out directory to any static host
```

### Mobile Deployment

**iOS App Store:**
1. Build in Xcode: `npx cap open ios`
2. Configure signing & capabilities
3. Archive and upload to App Store Connect

**Android Play Store:**
1. Build in Android Studio: `npx cap open android`
2. Generate signed APK/AAB
3. Upload to Google Play Console

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and patterns
- Write meaningful commit messages
- Update documentation for new features
- Test on multiple devices (iOS, Android, Web)
- Ensure German tax law compliance

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Lucas Carvalho da Silva**
- Email: lucas@carvalhodasilva.de
- GitHub: [@lucascarvalhodasilva](https://github.com/lucascarvalhodasilva)

---

## 🙏 Acknowledgments

- German tax regulations (Einkommensteuergesetz)
- Material-UI for excellent component library
- Next.js team for amazing framework
- Capacitor for seamless cross-platform development

---

**Built with ❤️ for German couriers**

*Last Updated: January 28, 2026*
