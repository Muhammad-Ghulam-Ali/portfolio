# 🌌 Muhammad Ghulam Ali - 3D Cosmic Portfolio

A stunning 3D portfolio website featuring Three.js particle systems, smooth scroll animations, and a dark cosmic theme.

## ✨ Features

- **3D Particle System** - Interactive cosmic background with 2000+ particles
- **Smooth Scroll Animations** - Camera movements respond to scroll position
- **Glassmorphism UI** - Modern transparent cards with backdrop blur
- **Responsive Design** - Works perfectly on all devices
- **Dark Cosmic Theme** - Professional gradient color scheme
- **Performance Optimized** - 60fps animations with efficient rendering

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone or create your project:**
```bash
npx create-react-app portfolio-3d
cd portfolio-3d
```

2. **Install dependencies:**
```bash
npm install three@0.128.0 lucide-react@0.263.1
```

3. **Replace files:**
- Copy `App.jsx` to `src/App.jsx`
- Copy `Portfolio3D.jsx` to `src/Portfolio3D.jsx`
- Copy `index.css` to `src/index.css`
- Update `public/index.html` with the provided version

4. **Start the development server:**
```bash
npm start
```

5. **Open your browser:**
Navigate to `http://localhost:3000`

## 📁 Project Structure

```
portfolio-3d/
├── public/
│   └── index.html          # HTML with Tailwind CDN
├── src/
│   ├── App.jsx             # Main app component
│   ├── Portfolio3D.jsx     # 3D portfolio component
│   ├── index.css           # Global styles
│   └── index.js            # Entry point
└── package.json            # Dependencies
```

## 🎨 Customization

### Colors
The color scheme uses cyan, purple, and blue gradients. To change:
- Update gradient classes: `from-cyan-400 to-purple-500`
- Modify Three.js particle colors in the HSL values

### Projects
Edit the `mlProjects` and `webProjects` arrays in `Portfolio3D.jsx` to add/remove projects.

### Sections
Modify sections in the `sections` array and add corresponding JSX in the component.

## 🛠️ Technologies Used

- **React 18** - UI framework
- **Three.js** - 3D graphics and particles
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **CSS3 Animations** - Smooth transitions

## 📦 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## 🌐 Deployment

### Netlify
1. Push code to GitHub
2. Connect repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `build`

### Vercel
```bash
npm install -g vercel
vercel
```

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## ⚡ Performance Tips

- The particle system is optimized for 60fps
- Three.js uses WebGL for hardware acceleration
- Animations use `requestAnimationFrame`
- Images and assets should be optimized

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contact

Muhammad Ghulam Ali
- Email: mghulamali888@gmail.com
- GitHub: [Muhammad-Ghulam-Ali](https://github.com/Muhammad-Ghulam-Ali)
- LinkedIn: [Muhammad Ghulam Ali](https://www.linkedin.com/in/muhammad-ghulam-ali-b25330216)

---

**Made with ❤️ and Three.js**