# 📦 Migration Guide: Integrating AI Pipeline Visualizer into Citizen Dashboard

This guide provides step-by-step instructions for integrating the AI Pipeline Visualizer into your existing Citizen Dashboard application.

## Prerequisites

- Existing Next.js or React application
- Node.js 18+ and npm/yarn
- Basic understanding of React Context API

## Installation Steps

### 1. Install Required Dependencies

```bash
npm install animejs styled-components @types/styled-components
npm install --save-dev babel-plugin-styled-components
```

### 2. Configure Next.js (if applicable)

Add styled-components support to `next.config.js`:

```javascript
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
};
```

### 3. Copy Files to Your Project

Copy the following directories to your project:

```
src/
├── components/
│   ├── ai-pipeline/
│   │   ├── Pipeline.tsx
│   │   ├── stages/
│   │   │   ├── UploadStage.tsx
│   │   │   ├── ClassifyStage.tsx
│   │   │   ├── VectorizeStage.tsx
│   │   │   ├── ExtractStage.tsx
│   │   │   ├── StoreStage.tsx
│   │   │   └── index.ts
│   │   └── ui/
│   │       ├── ServerSVG.tsx
│   │       ├── Particle.tsx
│   │       └── JsonView.tsx
├── context/
│   └── PipelineContext.tsx
└── utils/
    └── animations.ts
```

## Integration Methods

### Method 1: As a Standalone Page

#### Create a new route in your dashboard:

```tsx
// pages/documents/process.tsx or app/documents/process/page.tsx
import { PipelineProvider } from "@/context/PipelineContext";
import Pipeline from "@/components/ai-pipeline/Pipeline";

export default function DocumentProcessingPage() {
  return (
    <PipelineProvider>
      <Pipeline />
    </PipelineProvider>
  );
}
```

### Method 2: As a Modal/Dialog Component

```tsx
// components/DocumentProcessingModal.tsx
import { useState } from "react";
import { PipelineProvider } from "@/context/PipelineContext";
import Pipeline from "@/components/ai-pipeline/Pipeline";

export function DocumentProcessingModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose}>Close</button>
        <PipelineProvider>
          <Pipeline />
        </PipelineProvider>
      </div>
    </div>
  );
}
```

### Method 3: Embedded in Dashboard

```tsx
// pages/dashboard.tsx
import { PipelineProvider } from "@/context/PipelineContext";
import Pipeline from "@/components/ai-pipeline/Pipeline";

export default function Dashboard() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <MainContent>
        <h1>Document Processing</h1>
        <PipelineProvider>
          <Pipeline />
        </PipelineProvider>
      </MainContent>
    </div>
  );
}
```

## Customization Guide

### 1. Theming

Update colors to match your brand:

```tsx
// components/ai-pipeline/Pipeline.tsx
const PipelineContainer = styled.div`
  background: linear-gradient(to bottom, #f0fdf4, #d1fae5); // Change these
`;

// Update green colors throughout:
// #10b981 → Your primary color
// #059669 → Your primary-dark color
// #34d399 → Your secondary color
```

### 2. Connect to Real API

Replace mock data with actual API calls:

```tsx
// stages/ClassifyStage.tsx
const runAnimation = async () => {
  // Replace mock data with API call
  const response = await fetch("/api/classify", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();

  setClassification(data);
  // ... rest of animation
};
```

### 3. Custom Animation Timing

Adjust timing in `utils/animations.ts`:

```typescript
export const durations = {
  fast: 300, // Faster animations
  normal: 800,
  slow: 1200,
  verySlow: 1800,
};
```

### 4. Add Authentication

Wrap the component with auth checks:

```tsx
import { useAuth } from "@/hooks/useAuth";

export default function DocumentProcessingPage() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPrompt />;
  }

  return (
    <PipelineProvider>
      <Pipeline />
    </PipelineProvider>
  );
}
```

## State Management Integration

### With Redux

```tsx
// Connect Pipeline to Redux store
import { useDispatch, useSelector } from "react-redux";
import { setPipelineStage, setDocumentData } from "@/store/documentSlice";

// In Pipeline.tsx
const dispatch = useDispatch();
const pipelineState = useSelector((state) => state.document);

// Update Redux instead of local context
const handleStageComplete = (stage) => {
  dispatch(setPipelineStage(stage));
};
```

### With Zustand

```tsx
// store/pipelineStore.ts
import create from "zustand";

export const usePipelineStore = create((set) => ({
  currentStage: "upload",
  setCurrentStage: (stage) => set({ currentStage: stage }),
  // ... other state
}));
```

## API Integration Examples

### Upload Endpoint

```typescript
// api/upload.ts
export async function uploadDocument(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/documents/upload", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}
```

### Classification Endpoint

```typescript
// api/classify.ts
export async function classifyDocument(documentId: string) {
  const response = await fetch(`/api/documents/${documentId}/classify`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}
```

## Error Handling

Add error boundaries and user feedback:

```tsx
// components/PipelineErrorBoundary.tsx
import { Component, ReactNode } from "react";

export class PipelineErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("Pipeline error:", error);
    // Send to error tracking service
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

## Performance Optimization

### 1. Code Splitting

```tsx
import dynamic from "next/dynamic";

const Pipeline = dynamic(() => import("@/components/ai-pipeline/Pipeline"), {
  loading: () => <LoadingSpinner />,
  ssr: false, // Disable SSR for animation-heavy components
});
```

### 2. Lazy Load Stages

```tsx
// stages/index.ts
export const UploadStage = lazy(() => import("./UploadStage"));
export const ClassifyStage = lazy(() => import("./ClassifyStage"));
// ... etc
```

## Testing

### Unit Tests

```typescript
// __tests__/Pipeline.test.tsx
import { render, screen } from "@testing-library/react";
import { PipelineProvider } from "@/context/PipelineContext";
import Pipeline from "@/components/ai-pipeline/Pipeline";

test("renders pipeline component", () => {
  render(
    <PipelineProvider>
      <Pipeline />
    </PipelineProvider>
  );

  expect(screen.getByText(/AI Document Processing/i)).toBeInTheDocument();
});
```

### Integration Tests

```typescript
// __tests__/integration/pipeline-flow.test.tsx
test("completes full pipeline flow", async () => {
  const { getByText, getByRole } = render(<Pipeline />);

  const uploadButton = getByRole("button", { name: /upload/i });
  fireEvent.click(uploadButton);

  await waitFor(() => {
    expect(getByText(/classifying/i)).toBeInTheDocument();
  });

  // ... test remaining stages
});
```

## Accessibility

Add ARIA labels and keyboard navigation:

```tsx
<button
  onClick={startDemo}
  disabled={isAnimating}
  aria-label="Upload and process document"
  aria-busy={isAnimating}
>
  {isAnimating ? "Processing..." : "Upload Document"}
</button>
```

## Environment Variables

```env
# .env.local
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_AI_SERVICE_URL=https://ai.yourdomain.com
AI_API_KEY=your-secret-key
```

## Deployment Checklist

- [ ] Update API endpoints from mock to production
- [ ] Add authentication middleware
- [ ] Configure error tracking (Sentry, etc.)
- [ ] Test all animations on different browsers
- [ ] Optimize bundle size
- [ ] Add analytics tracking
- [ ] Set up monitoring
- [ ] Document for team members
- [ ] Add user documentation/help section

## Troubleshooting

### Common Issues

**Issue**: Animations not playing

- **Solution**: Ensure `"use client"` directive is present in all component files

**Issue**: Styled-components styles not applying

- **Solution**: Verify `next.config.js` has `styledComponents: true`

**Issue**: Context not available

- **Solution**: Ensure component is wrapped with `PipelineProvider`

**Issue**: Performance issues

- **Solution**: Use code splitting and lazy loading for heavy components

## Support

For questions or issues during integration:

- Check the main README.md
- Review component documentation
- Contact the development team

---

**Last Updated**: November 2025
**Version**: 1.0.0
