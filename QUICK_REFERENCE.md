# ⚡ Quick Reference Guide

## Essential Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Clear cache
rm -rf .next
```

## Project URLs

- **Local Development**: http://localhost:3000
- **GitHub Repository**: [Add your repo URL]
- **Documentation**: See README.md

## Key Files

### Entry Points

- `app/page.tsx` - Main application page
- `app/components/Pipeline.tsx` - Core component

### Configuration

- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration

### Core Components

```
app/components/
├── Pipeline.tsx              # Main orchestrator
├── stages/
│   ├── UploadStage.tsx      # Stage 1
│   ├── ClassifyStage.tsx    # Stage 2
│   ├── VectorizeStage.tsx   # Stage 3
│   ├── ExtractStage.tsx     # Stage 4
│   └── StoreStage.tsx       # Stage 5
└── ui/
    ├── ServerSVG.tsx        # Server visual
    ├── Particle.tsx         # Particle element
    └── JsonView.tsx         # Results viewer
```

## Animation Parameters

### Durations

```typescript
fast: 500ms
normal: 1000ms
slow: 1500ms
verySlow: 2000ms
```

### Easing Functions

```typescript
"linear";
"inOutQuad"; // Smooth
"outElastic"; // Bouncy
"outBounce"; // Bounce
```

### Common Animation Pattern

```typescript
animate(targets, {
  translateX: [from, to],
  translateY: [from, to],
  opacity: [from, to],
  scale: [from, to],
  duration: 1000,
  delay: stagger(200),
  ease: "inOutQuad",
});
```

## Color Palette

```css
/* Primary Colors */
--green-500: #10b981      /* Main green */
--green-600: #059669      /* Dark green */
--green-400: #34d399      /* Light green */

/* Backgrounds */
--green-50: #f0fdf4       /* Very light */
--green-100: #d1fae5      /* Light */

/* Neutral */
--slate-800: #1e293b      /* Dark gray */
--slate-700: #334155      /* Medium gray */
```

## Component Props

### Stage Components

```typescript
interface StageProps {
  onComplete?: () => void;
}
```

### Pipeline Context

```typescript
interface PipelineContextType {
  currentStage: PipelineStage;
  setCurrentStage: (stage: PipelineStage) => void;
  fileName: string;
  classification: ClassificationData | null;
  vectorData: VectorData | null;
  extractedData: ExtractedData | null;
  isAnimating: boolean;
  error: string | null;
}
```

## SVG Coordinates

- **Canvas**: 800x500px
- **Center**: (400, 300)
- **Stage Label**: y=450
- **Top Area**: y=150-230
- **Bottom Area**: y=350-420

## Stage Flow

```
Upload → Classify → Vectorize → Extract → Store → Complete
```

## Timing Reference

```
Upload:     2.5s
Classify:   3.8s
Vectorize:  6.3s
Extract:    4.0s
Store:      4.1s
─────────────────
Total:     ~21s
```

## Common Tasks

### Add New Stage

1. Create `NewStage.tsx` in `stages/`
2. Export from `stages/index.ts`
3. Add to `Pipeline.tsx` render
4. Update `stageOrder` mapping
5. Update `stages` array

### Modify Animation

1. Find stage component
2. Locate `animate()` call
3. Adjust parameters
4. Test in browser

### Change Colors

1. Update in `Pipeline.tsx` styled components
2. Search and replace hex colors
3. Update Tailwind classes

### Connect to API

1. Replace mock data in stage components
2. Add `fetch()` calls
3. Handle loading states
4. Add error handling

## Troubleshooting

### Animations not playing

```typescript
// Check:
1. "use client" directive present
2. No console errors
3. Elements have correct class names
4. Anime.js imported correctly
```

### Styles not applying

```bash
# Solution:
rm -rf .next
npm run dev
```

### Type errors

```bash
# Solution:
npm run type-check
# Fix reported issues
```

### Context undefined

```typescript
// Ensure component wrapped with:
<PipelineProvider>
  <YourComponent />
</PipelineProvider>
```

## Keyboard Shortcuts (VS Code)

- `Ctrl+P` - Quick file open
- `Ctrl+Shift+F` - Search in files
- `Ctrl+B` - Toggle sidebar
- `F12` - Go to definition
- `Shift+F12` - Find references

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/name

# Commit changes
git add .
git commit -m "feat: description"

# Push to remote
git push origin feature/name
```

## Environment Setup

### Required

- Node.js 18+
- npm or yarn
- Git

### Optional

- VS Code with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript

## Performance Tips

1. **Lazy load stages** for faster initial load
2. **Use code splitting** for large components
3. **Optimize SVG** for smaller file sizes
4. **Disable SSR** for animation components
5. **Use production build** for testing

## Documentation Links

- [Next.js Docs](https://nextjs.org/docs)
- [Anime.js Docs](https://animejs.com/documentation/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Styled Components](https://styled-components.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)

## File Templates

### New Stage Component

```typescript
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect } from "react";
import { animate } from "animejs";
import { durations } from "@/app/styles/animations";

interface MyStageProps {
  onComplete?: () => void;
}

export const MyStage: React.FC<MyStageProps> = ({ onComplete }) => {
  useEffect(() => {
    const runAnimation = async () => {
      // Animation code here

      if (onComplete) {
        onComplete();
      }
    };
    runAnimation();
  }, []);

  return <g id="my-stage">{/* SVG elements */}</g>;
};
```

## Contact & Support

- **Documentation**: See README.md
- **Issues**: Check DEVELOPMENT_NOTES.md
- **Integration**: See MIGRATION_GUIDE.md
- **Architecture**: See ARCHITECTURE.md

## Quick Stats

- **Total Components**: 15+
- **Lines of Code**: ~2,000+
- **Animation Stages**: 5
- **Documentation Files**: 6
- **Dependencies**: 10+
- **Development Time**: 1 day

## Project Structure (Quick View)

```
📁 ai-pipeline-anime/
├── 📁 app/
│   ├── 📁 components/
│   │   ├── Pipeline.tsx         ⭐
│   │   ├── 📁 stages/          ⭐
│   │   └── 📁 ui/              ⭐
│   ├── 📁 context/
│   │   └── PipelineContext.tsx  ⭐
│   ├── 📁 styles/
│   │   └── animations.ts        ⭐
│   ├── page.tsx                 ⭐
│   └── layout.tsx
├── 📄 README.md                 📚
├── 📄 MIGRATION_GUIDE.md        📚
├── 📄 DEVELOPMENT_NOTES.md      📚
├── 📄 PROJECT_SUMMARY.md        📚
├── 📄 ARCHITECTURE.md           📚
├── 📄 CHECKLIST.md              📚
└── 📄 QUICK_REFERENCE.md        📚 (You are here)
```

---

**🎯 Everything you need at a glance!**

Keep this guide handy for quick lookups during development.
