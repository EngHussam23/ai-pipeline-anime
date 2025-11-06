# 🔧 Development Notes

## Technical Implementation Details

### Animation Architecture

#### Anime.js v4 Integration

The project uses Anime.js v4, which has a different API compared to v3:

```typescript
// v4 API
import { animate, Timeline, stagger } from "animejs";

// Creating animations
animate(targets, {
  translateX: [0, 100],
  duration: 1000,
  ease: "inOutQuad",
});

// Creating timelines
const tl = new Timeline({
  ease: "inOutQuad",
});
```

### Stage Component Pattern

Each stage component follows this pattern:

```typescript
interface StageProps {
  onComplete?: () => void;
}

export const StageComponent: React.FC<StageProps> = ({ onComplete }) => {
  useEffect(() => {
    const runAnimation = async () => {
      // 1. Set context data
      // 2. Run animations sequentially
      // 3. Call onComplete when done
    };
    runAnimation();
  }, []);

  return <g id="stage-id">{/* SVG elements */}</g>;
};
```

### State Management Flow

```
User Action (Upload)
    ↓
PipelineContext.setCurrentStage('upload')
    ↓
UploadStage renders & animates
    ↓
onComplete() callback
    ↓
setCurrentStage('classify')
    ↓
ClassifyStage renders & animates
    ↓
... continues through all stages
    ↓
setCurrentStage('complete')
    ↓
Show results (JsonView)
```

### SVG Coordinate System

The animation canvas uses an 800x500 viewBox:

- Center point: (400, 300)
- Server position: (400, 300)
- Stage labels: y=450
- Upper elements: y=150-230
- Lower elements: y=350-420

### Animation Timing

```typescript
// Default durations
fast: 500ms
normal: 1000ms
slow: 1500ms
verySlow: 2000ms

// Total pipeline duration: ~15-20 seconds
Upload:    2.5s
Classify:  3.8s
Vectorize: 6.3s
Extract:   4s
Store:     4.1s
```

### Performance Considerations

1. **Client-Side Only**: All animations use `"use client"` directive
2. **No SSR**: Animations disabled during server-side rendering
3. **Staggered Animations**: Uses `stagger()` to spread particle animations
4. **Promise-based**: Each stage returns a Promise for sequential flow

### Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support (v14+)
- Mobile Safari: ⚠️ Reduced performance on older devices

### File Size Optimization

```bash
# Current bundle sizes (production build)
Total JavaScript: ~450KB
  - Next.js runtime: ~200KB
  - Anime.js: ~35KB
  - Styled-components: ~45KB
  - Application code: ~170KB
```

### Known Limitations

1. **Animation Reset**: Page must be refreshed to restart full pipeline
2. **Single File**: Only processes one file at a time
3. **Mock Data**: All processing results are hardcoded
4. **No Persistence**: State resets on page reload

### Future Technical Improvements

#### Backend Integration

```typescript
// Planned API structure
POST / api / documents / upload;
POST / api / documents / { id } / classify;
POST / api / documents / { id } / vectorize;
POST / api / documents / { id } / extract;
POST / api / documents / { id } / store;
GET / api / documents / { id } / status;
```

#### WebSocket Support

For real-time progress updates:

```typescript
const ws = new WebSocket("ws://api.example.com/pipeline");
ws.onmessage = (event) => {
  const { stage, progress, data } = JSON.parse(event.data);
  updatePipelineState(stage, progress, data);
};
```

#### Caching Strategy

```typescript
// Cache classification results
const cacheKey = `classify-${fileHash}`;
const cached = await cache.get(cacheKey);
if (cached) return cached;
```

## Development Workflow

### Adding a New Stage

1. Create component in `app/components/stages/NewStage.tsx`
2. Follow the stage component pattern
3. Export from `app/components/stages/index.ts`
4. Add to Pipeline.tsx render logic
5. Update `stages` array
6. Update `stageOrder` mapping

### Modifying Animations

```typescript
// Find the animation in the stage component
animate(".my-element", {
  translateX: [start, end],
  duration: time,
  delay: stagger(offset),
  ease: "easingFunction",
});

// Available easing functions (Anime.js v4)
-"linear" - "inQuad",
  "outQuad",
  "inOutQuad" - "inCubic",
  "outCubic",
  "inOutCubic" - "inElastic",
  "outElastic",
  "inOutElastic" - "inBounce",
  "outBounce",
  "inOutBounce";
```

### Testing Locally

```bash
# Development mode with hot reload
npm run dev

# Production build test
npm run build
npm start

# Check bundle size
npm run build -- --profile

# Type checking
npm run type-check

# Linting
npm run lint
```

### Debugging Tips

1. **Animation Not Playing**: Check browser console for errors
2. **Styles Not Applying**: Clear Next.js cache: `rm -rf .next`
3. **Context Issues**: Verify PipelineProvider wraps component
4. **Timing Issues**: Add console.logs in stage completion callbacks

### Git Workflow

```bash
# Feature branch
git checkout -b feature/new-stage

# Commit with conventional commits
git commit -m "feat(stages): add validation stage"
git commit -m "fix(animation): correct timing in vectorize stage"
git commit -m "docs(readme): update installation steps"

# Types: feat, fix, docs, style, refactor, test, chore
```

## Code Style

### TypeScript Conventions

```typescript
// Use explicit types for props
interface ComponentProps {
  onComplete?: () => void;
  className?: string;
}

// Use Record for dictionaries
const stageMap: Record<string, number> = {
  upload: 0,
  classify: 1,
};

// Avoid 'any' where possible (use eslint-disable sparingly)
```

### React Conventions

```typescript
// Use function components with hooks
export const Component: React.FC<Props> = ({ prop }) => {
  // Hooks first
  const [state, setState] = useState();
  useEffect(() => {}, []);

  // Functions
  const handleAction = () => {};

  // Return
  return <div />;
};
```

### CSS/Styled-Components

```typescript
// Use semantic naming
const Container = styled.div``;
const Title = styled.h1``;
const ActionButton = styled.button``;

// Group related styles
const Button = styled.button`
  /* Layout */
  display: flex;
  padding: 1rem;

  /* Visual */
  background: gradient;
  border: none;

  /* Typography */
  font-size: 1rem;
  font-weight: bold;

  /* Animation */
  transition: all 0.3s;
`;
```

## Monitoring & Analytics

### Potential Metrics to Track

```typescript
// User engagement
- Animation start rate
- Completion rate per stage
- Average time to complete pipeline
- Drop-off points

// Performance
- Animation FPS
- Component render time
- API response times
- Bundle load time

// Errors
- Failed uploads
- Animation errors
- API failures
- Browser compatibility issues
```

### Implementation Example

```typescript
// analytics/events.ts
export const trackPipelineEvent = (event: string, data: any) => {
  if (typeof window !== "undefined" && window.analytics) {
    window.analytics.track(event, {
      timestamp: new Date().toISOString(),
      ...data,
    });
  }
};

// Usage in components
trackPipelineEvent("stage_completed", {
  stage: "classify",
  duration: 3800,
});
```

## Security Considerations

### File Upload Security

```typescript
// Validate file types
const ALLOWED_TYPES = ["application/pdf", "application/msword"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const validateFile = (file: File) => {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Invalid file type");
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File too large");
  }
};
```

### API Security

```typescript
// Always validate on backend
// Add rate limiting
// Use CORS properly
// Sanitize all inputs
// Log all operations
```

---

**Maintained by**: Development Team  
**Last Updated**: November 2025  
**Version**: 1.0.0
