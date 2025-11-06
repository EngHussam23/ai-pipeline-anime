# 🤖 AI Document Processing Pipeline Visualizer

A Next.js application that visualizes the AI-powered document processing pipeline with beautiful Anime.js animations.

## 🎯 Project Overview

This application demonstrates how a government platform processes citizen-submitted documents through various AI stages. Each stage has its own independent animation showing the transformation and analysis of the document.

## 🚀 Features

### Pipeline Stages

1. **Upload Stage** - Particles flow into a server representing data upload
2. **Classify Stage** - Document is chunked and analyzed, displaying metadata (file type, tags, summary)
3. **Vectorize Stage** - Data transforms into multi-dimensional vectors (3D → 5D → 20D → 500D)
4. **Extract Stage** - Information is extracted into structured fields
5. **Store Stage** - Vectors and data are stored in a database visualization

### Technical Features

- ✨ Smooth Anime.js animations for each stage
- 🎨 Futuristic light theme with green/lime gradients
- 📊 Real-time stage progress indicators
- 📝 JSON output viewer for extracted data
- 🔄 Sequential animation flow
- 📱 Responsive design with Tailwind CSS
- 🎭 SVG-based visualizations

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Styled Components
- **Animation**: Anime.js v4
- **UI Components**: Custom SVG React components

## 📦 Installation & Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🏗️ Project Structure

```
app/
├── page.tsx                    # Main entry point
├── layout.tsx                  # Root layout
├── components/
│   ├── Pipeline.tsx           # Main orchestrator component
│   ├── stages/
│   │   ├── UploadStage.tsx    # Upload animation
│   │   ├── ClassifyStage.tsx  # Classification animation
│   │   ├── VectorizeStage.tsx # Vectorization animation
│   │   ├── ExtractStage.tsx   # Data extraction animation
│   │   ├── StoreStage.tsx     # Storage animation
│   │   └── index.ts           # Stage exports
│   └── ui/
│       ├── ServerSVG.tsx      # Server visualization
│       ├── Particle.tsx       # Animated particles
│       └── JsonView.tsx       # JSON result viewer
├── context/
│   └── PipelineContext.tsx    # Global state management
└── styles/
    └── animations.ts          # Reusable animation utilities
```

## 🎨 Design Philosophy

### Visual Theme

- **Colors**: Green (#10b981) and lime gradients on light backgrounds
- **Style**: Futuristic, clean, professional
- **Animation**: Smooth, informative, not overwhelming

### Animation Principles

- Each stage is modular and independent
- Animations use Anime.js timelines for precise control
- Easing functions create natural motion
- Visual feedback for every step of the process

## 🔧 Customization

### Modifying Stage Animations

Each stage component can be customized by editing the animation parameters:

```typescript
// Example: Adjust timing in UploadStage.tsx
animate(".upload-particle", {
  translateX: [0, 200],
  translateY: [0, -50],
  duration: durations.slow, // Change this
  delay: stagger(200), // Or this
  ease: "inOutQuad", // Or this
});
```

### Changing Mock Data

Edit the data in each stage component to customize the displayed information.

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm run build
vercel deploy
```

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 🔄 Integration with Citizen Dashboard

This project is designed to be easily integrated into a larger government platform:

1. **Modular Components**: All stage components are self-contained
2. **Context API**: Easy to lift state to parent applications
3. **Styled Components**: Theme can be adjusted via props
4. **TypeScript**: Type-safe interfaces for all data structures

## 📝 Future Enhancements

- [ ] Connect to real AI backend APIs
- [ ] Add error handling and retry logic
- [ ] Implement file upload progress tracking
- [ ] Add animation speed controls
- [ ] Support for multiple file types with different flows
- [ ] Accessibility improvements (ARIA labels, keyboard navigation)
- [ ] Dark mode support

## 📄 License

This project is licensed under the MIT License.

---

**Note**: This is a demonstration project. For production use, connect to actual AI services and implement proper error handling, authentication, and data validation.
