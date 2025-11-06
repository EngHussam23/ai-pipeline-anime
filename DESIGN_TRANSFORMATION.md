# Design Transformation - Anime.js Inspired Minimal Theme

## Overview

Transformed the AI Pipeline Visualizer from a cyberpunk neon theme to a clean, minimal design inspired by the Anime.js landing page aesthetic.

## Design Philosophy

### Inspired by Anime.js

- **Minimal & Clean**: Black backgrounds, subtle accents
- **Professional Typography**: Reduced font weights, smaller sizes
- **Elegant Spacing**: Generous whitespace, breathing room
- **Subtle Animations**: Smooth transitions without flash
- **High Contrast**: White text on pure black for clarity

## Color Palette

### Primary Colors

```
Background: #000000 (Pure Black)
Text: #FFFFFF (Pure White)
Accent: #3b82f6 (Blue 500)
Accent Hover: #60a5fa (Blue 400)
Secondary: #a855f7 (Purple 500)
```

### Opacity Variations

```
Borders: rgba(255, 255, 255, 0.1)
Background overlays: rgba(0, 0, 0, 0.8-0.9)
Particle glow: rgba(59, 130, 246, 0.3-0.6)
```

## Typography Changes

### Font Stack

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
  "Ubuntu", "Cantarell", sans-serif;
```

### Sizes (Reduced)

- Main Title: 3rem (from 2.5rem)
- Subtitle: 1.125rem
- Button: 1rem (from 1.125rem)
- Stage Labels: 14px (from 20px)
- Details: 11-13px (from 14-18px)

### Weights (Lighter)

- Title: 700 (from 900)
- Button: 500 (from 700)
- Labels: 500 (from bold)

## Component Updates

### Main Container

- Pure black background (#000000)
- Removed gradient overlays
- Removed radial glow effects
- Increased padding (4rem from 2rem)

### SVG Container

- Pure black background
- Thin border: 1px solid rgba(255, 255, 255, 0.1)
- Removed border-radius (sharp corners)
- Removed scan line animation
- Removed box-shadow glows
- Hover: Border changes to blue

### Button

- Clean blue background (#3b82f6)
- Subtle border-radius (6px)
- Simple hover: lighter blue + 1px lift
- No emoji, clean text
- Removed ripple effect
- Removed gradient

### Stage Badges

- Minimal rounded corners (6px)
- Active: Blue fill #3b82f6
- Completed: Blue tint rgba(59, 130, 246, 0.1)
- Inactive: Transparent with subtle border
- No pulse animation
- No glow effects

### JSON Viewer

- Pure black background
- Thin blue border
- Syntax colors:
  - Keys: #3b82f6 (Blue)
  - Strings: #10b981 (Green)
  - Numbers: #f59e0b (Orange)
  - Values: #a855f7 (Purple)
- Clean scrollbar: rgba(59, 130, 246, 0.5)

## Stage Components

### Universal Changes

- Particle size: 3px (from 4px)
- Particle color: #3b82f6 (Blue)
- Particle glow: 3px (from 6px)
- Stroke width: 1px (from 2px)
- Border radius: 4px (from 8px)
- Text opacity: 0.6-1.0 (from 0.8-1.0)
- Remove uppercase text
- Cleaner labels

### UploadStage

- Blue particles
- White text labels
- Minimal server design

### ClassifyStage

- Blue accent colors
- Purple metadata particles
- Clean tag styling

### VectorizeStage

- Blue vectors and particles
- Purple connecting lines
- Subtle dimension markers

### ExtractStage

- Blue extraction boxes
- Clean field borders
- White text with subtle opacity

### StoreStage

- Blue database cylinders
- Purple indicator lines
- Minimal storage visualization

## Animation Refinements

- Maintained smooth Anime.js animations
- Reduced glow effects
- Cleaner particle trails
- Subtle hover states
- No distracting effects

## Performance

- Removed heavy box-shadows
- Removed multiple gradient layers
- Simplified filter effects
- Maintained 60fps animations

## Accessibility

- High contrast text (white on black)
- Clear focus states
- Readable font sizes
- Consistent spacing

## Result

A professional, minimal interface that matches the quality and sophistication of the Anime.js landing page while showcasing the power of the animation library.

---

**Before**: Cyberpunk neon with cyan/purple gradients
**After**: Clean minimal black with blue accents

Visit: http://localhost:3000
