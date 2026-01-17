# MAVLab Website

Interactive Three.js-based website for the Marine Autonomous Vehicles Laboratory (MAVLab).

## Features

- **Interactive 3D Scene**: Three.js powered homepage with animated water effects and vessel models
- **Scroll-based Navigation**: Vessels change as you scroll through the homepage
- **Multiple Pages**: 
  - Home (with Three.js scene)
  - Research
  - Teams
  - Competition
  - Publications
  - News
  - Awards
  - Team
  - Vision
- **Modern UI**: Built with React, Tailwind CSS, and Framer Motion for smooth animations
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **React 18** - UI framework
- **Three.js** - 3D graphics
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for React Three Fiber
- **React Router** - Navigation
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling
- **Vite** - Build tool

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
mavlabweb/
├── src/
│   ├── components/
│   │   ├── Navigation.jsx      # Main navigation component
│   │   ├── WaterScene.jsx      # Three.js water animation
│   │   └── VesselModel.jsx     # Vessel 3D models
│   ├── pages/
│   │   ├── Home.jsx            # Main page with Three.js scene
│   │   ├── Competition.jsx
│   │   ├── Teams.jsx
│   │   ├── Publications.jsx
│   │   ├── News.jsx
│   │   ├── Awards.jsx
│   │   ├── Research.jsx
│   │   ├── Team.jsx
│   │   └── Vision.jsx
│   ├── App.jsx                 # Main app component with routing
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── package.json
├── vite.config.js
└── README.md
```

## Customization

### Adding Your Own Vessel Models

To add your own CAD models:

1. Convert your CAD files to GLTF/GLB format
2. Place them in the `public/models/` directory
3. Update `VesselModel.jsx` to load your models using `useGLTF` from `@react-three/drei`

Example:
```jsx
import { useGLTF } from '@react-three/drei'

function VesselModel({ vessel }) {
  const { scene } = useGLTF('/models/your-vessel.glb')
  return <primitive object={scene} />
}
```

### Adding Images and Videos

1. Place images in `public/images/`
2. Place videos in `public/videos/`
3. Update the placeholder image/video paths in the components

### Customizing Colors

Edit `tailwind.config.js` to customize the color scheme. The current theme uses ocean-inspired colors.

## Performance Tips

- Optimize 3D models before adding them (reduce polygon count, compress textures)
- Use image optimization for photos and videos
- Consider lazy loading for heavy components
- Use React.memo for expensive components

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

This project is for MAVLab use.

## Contact

For questions or issues, please contact the MAVLab team.

