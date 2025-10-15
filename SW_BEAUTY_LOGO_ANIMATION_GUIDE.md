# SW Beauty Logo Animation Guide with GSAP DrawSVGPlugin

This comprehensive guide demonstrates how to animate the SW Beauty logo using GSAP's DrawSVGPlugin. The logo consists of 7 path elements that form the text "SW Beauty".

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [SVG Preparation](#svg-preparation)
3. [HTML Setup](#html-setup)
4. [Basic Animation Examples](#basic-animation-examples)
5. [Advanced Animation Techniques](#advanced-animation-techniques)
6. [Animation Variations](#animation-variations)
7. [Performance Considerations](#performance-considerations)
8. [Browser Compatibility](#browser-compatibility)
9. [Troubleshooting](#troubleshooting)

## Prerequisites

### GSAP Installation

GSAP is already installed in your project (`gsap: ^3.13.0`). However, you'll need the **DrawSVGPlugin** for path drawing animations.

### Installing DrawSVGPlugin

The DrawSVGPlugin is a premium GSAP plugin. You have two options:

**Option 1: GSAP Membership (Recommended)**
```bash
# If you have a GSAP membership, install the premium plugins
npm install gsap
```

**Option 2: CDN (For development/testing)**
```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/DrawSVGPlugin.min.js"></script>
```

**Note:** For production use, you should use a proper GSAP license.

## SVG Preparation

The current logo SVG has filled paths. For DrawSVGPlugin to work, we need to convert fills to strokes.

### Current SVG Structure

The logo contains 7 path elements:
- Path 1: "S" (first letter)
- Path 2: "W" 
- Path 3: "B" (first part)
- Path 4: "e" (first part)
- Path 5: "a" 
- Path 6: "u" (first part)
- Path 7: "t" (first part)
- Path 8: "y" (last letter)

### Converting Fills to Strokes

Here's the prepared SVG with stroke-based paths:

```svg
<svg version="1.1" id="sw-beauty-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
  <!-- S Path -->
  <path id="logo-s" fill="none" stroke="#000000" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"
    d="M232.148224,517.340393 C238.825394,497.232758 245.415176,477.515259 251.829498,457.740845 ..."/>

  <!-- W Path -->
  <path id="logo-w" fill="none" stroke="#000000" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"
    d="M368.216309,549.828491 C366.869781,553.643127 363.927643,552.322388 361.715820,552.320007 ..."/>

  <!-- B Path -->
  <path id="logo-b" fill="none" stroke="#000000" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"
    d="M579.392212,461.371826 C594.411377,447.715363 622.532104,446.408356 637.544067,458.322296 ..."/>

  <!-- e Path -->
  <path id="logo-e" fill="none" stroke="#000000" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"
    d="M475.821045,543.208374 C462.329681,530.047546 459.098114,513.811096 460.347748,496.238251 ..."/>

  <!-- a Path -->
  <path id="logo-a" fill="none" stroke="#000000" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"
    d="M845.672729,473.214325 C842.998230,466.407257 840.437134,459.968384 837.551514,452.713593 ..."/>

  <!-- u Path -->
  <path id="logo-u" fill="none" stroke="#000000" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"
    d="M134.382477,507.882812 C129.120163,506.630646 124.338974,505.209137 119.746582,503.228058 ..."/>

  <!-- t Path -->
  <path id="logo-t" fill="none" stroke="#000000" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"
    d="M688.327759,479.000061 C688.333618,491.333344 688.327820,503.166595 688.347656,514.999817 ..."/>

  <!-- y Path -->
  <path id="logo-y" fill="none" stroke="#000000" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"
    d="M769.950012,454.235626 C773.971802,451.534210 778.203125,452.844696 782.252747,452.749176 ..."/>
</svg>
```

**Key Changes:**
- Changed `fill="#000000"` to `fill="none"`
- Added `stroke="#000000"` and `stroke-width="8"`
- Added `stroke-linecap="round"` and `stroke-linejoin="round"` for smooth corners

## HTML Setup

### Basic HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SW Beauty Logo Animation</title>
    <!-- GSAP CDN -->
    <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/DrawSVGPlugin.min.js"></script>
</head>
<body>
    <div class="logo-container">
        <svg id="sw-beauty-logo" viewBox="0 0 1024 1024" width="300" height="300">
            <!-- Include the prepared SVG paths here -->
        </svg>
    </div>

    <script>
        // Animation code will go here
    </script>
</body>
</html>
```

### React/Next.js Component Setup

Since your project uses Next.js, here's how to set it up as a React component:

```tsx
// components/AnimatedLogo.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

// Register the plugin
gsap.registerPlugin(DrawSVGPlugin);

interface AnimatedLogoProps {
  className?: string;
  animationType?: 'sequential' | 'staggered' | 'center-out' | 'edges-in';
  duration?: number;
  delay?: number;
}

export default function AnimatedLogo({
  className = "",
  animationType = 'sequential',
  duration = 2,
  delay = 0
}: AnimatedLogoProps) {
  const logoRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!logoRef.current) return;

    const paths = logoRef.current.querySelectorAll('path');
    
    // Set initial state
    gsap.set(paths, { drawSVG: "0%" });

    // Animation logic based on type
    switch (animationType) {
      case 'sequential':
        animateSequential(paths, duration, delay);
        break;
      case 'staggered':
        animateStaggered(paths, duration, delay);
        break;
      case 'center-out':
        animateCenterOut(paths, duration, delay);
        break;
      case 'edges-in':
        animateEdgesIn(paths, duration, delay);
        break;
    }
  }, [animationType, duration, delay]);

  return (
    <svg
      ref={logoRef}
      id="sw-beauty-logo"
      viewBox="0 0 1024 1024"
      className={className}
      width="300"
      height="300"
    >
      {/* Include your prepared SVG paths here */}
    </svg>
  );
}
```

## Basic Animation Examples

### 1. Sequential Path Drawing

Animate each letter one after another:

```javascript
function animateSequential(paths, duration, delay) {
  const tl = gsap.timeline({ delay });
  
  paths.forEach((path, index) => {
    tl.to(path, {
      duration: duration / paths.length,
      drawSVG: "100%",
      ease: "power2.inOut"
    }, index * (duration / paths.length) * 0.2);
  });
  
  return tl;
}
```

### 2. Staggered Animation

Animate all paths with a stagger effect:

```javascript
function animateStaggered(paths, duration, delay) {
  return gsap.timeline({ delay })
    .to(paths, {
      duration: duration,
      drawSVG: "100%",
      ease: "power2.inOut",
      stagger: {
        amount: duration * 0.8,
        from: "start"
      }
    });
}
```

### 3. Center-Out Animation

Start from the center letters and animate outward:

```javascript
function animateCenterOut(paths, duration, delay) {
  // Assuming paths are ordered: S, W, B, e, a, u, t, y
  const centerIndex = Math.floor(paths.length / 2);
  
  return gsap.timeline({ delay })
    .to(paths[centerIndex], {
      duration: duration * 0.3,
      drawSVG: "100%",
      ease: "power2.inOut"
    })
    .to([paths[centerIndex - 1], paths[centerIndex + 1]], {
      duration: duration * 0.3,
      drawSVG: "100%",
      ease: "power2.inOut"
    }, "-=0.2")
    .to([paths[centerIndex - 2], paths[centerIndex + 2]], {
      duration: duration * 0.3,
      drawSVG: "100%",
      ease: "power2.inOut"
    }, "-=0.2")
    .to(paths[0], {
      duration: duration * 0.3,
      drawSVG: "100%",
      ease: "power2.inOut"
    })
    .to(paths[paths.length - 1], {
      duration: duration * 0.3,
      drawSVG: "100%",
      ease: "power2.inOut"
    }, "-=" + (duration * 0.3));
}
```

### 4. Edges-In Animation

Start from the edges and animate toward the center:

```javascript
function animateEdgesIn(paths, duration, delay) {
  return gsap.timeline({ delay })
    .to([paths[0], paths[paths.length - 1]], {
      duration: duration * 0.3,
      drawSVG: "100%",
      ease: "power2.inOut"
    })
    .to([paths[1], paths[paths.length - 2]], {
      duration: duration * 0.3,
      drawSVG: "100%",
      ease: "power2.inOut"
    }, "-=0.2")
    .to([paths[2], paths[paths.length - 3]], {
      duration: duration * 0.3,
      drawSVG: "100%",
      ease: "power2.inOut"
    }, "-=0.2")
    .to(paths[Math.floor(paths.length / 2)], {
      duration: duration * 0.3,
      drawSVG: "100%",
      ease: "power2.inOut"
    }, "-=0.2");
}
```

## Advanced Animation Techniques

### 1. Morphing Animation

Create a morphing effect by animating stroke properties:

```javascript
function animateMorphing(paths, duration, delay) {
  return gsap.timeline({ delay })
    .to(paths, {
      duration: duration,
      drawSVG: "100%",
      ease: "power2.inOut",
      stagger: 0.1
    })
    .to(paths, {
      duration: duration * 0.5,
      strokeWidth: 12,
      ease: "power2.inOut",
      yoyo: true,
      repeat: 1,
      stagger: 0.05
    }, "-=" + (duration * 0.5));
}
```

### 2. Color Transition Animation

Animate from one color to another:

```javascript
function animateColorTransition(paths, duration, delay) {
  return gsap.timeline({ delay })
    .to(paths, {
      duration: duration,
      drawSVG: "100%",
      ease: "power2.inOut",
      stagger: 0.1
    })
    .to(paths, {
      duration: duration * 0.5,
      stroke: "#8B5CF6", // Purple
      ease: "power2.inOut",
      stagger: 0.05
    }, "-=" + (duration * 0.3))
    .to(paths, {
      duration: duration * 0.5,
      stroke: "#EC4899", // Pink
      ease: "power2.inOut",
      stagger: 0.05
    }, "-=" + (duration * 0.3));
}
```

### 3. Bounce Effect Animation

Add a bounce effect after drawing:

```javascript
function animateWithBounce(paths, duration, delay) {
  return gsap.timeline({ delay })
    .to(paths, {
      duration: duration,
      drawSVG: "100%",
      ease: "power2.inOut",
      stagger: 0.1
    })
    .to(paths, {
      duration: 0.3,
      scale: 1.1,
      ease: "back.out(1.7)",
      yoyo: true,
      repeat: 1,
      stagger: 0.05
    }, "-=0.2");
}
```

### 4. Wave Animation

Create a wave-like drawing effect:

```javascript
function animateWave(paths, duration, delay) {
  return gsap.timeline({ delay })
    .to(paths, {
      duration: duration,
      drawSVG: "100%",
      ease: "power2.inOut",
      stagger: {
        amount: duration * 0.8,
        from: "center",
        ease: "power2.inOut"
      }
    });
}
```

## Animation Variations

### 1. Fast Reveal (Quick Animation)

```javascript
// Usage in component
<AnimatedLogo animationType="staggered" duration={0.8} delay={0.5} />
```

### 2. Slow and Elegant (Slow Animation)

```javascript
// Usage in component
<AnimatedLogo animationType="sequential" duration={3} delay={1} />
```

### 3. Dramatic Entrance (With Scale)

```javascript
function animateDramatic(paths, duration, delay) {
  return gsap.timeline({ delay })
    .set(paths, { scale: 0 })
    .to(paths, {
      duration: duration,
      drawSVG: "100%",
      scale: 1,
      ease: "back.out(1.7)",
      stagger: 0.1
    });
}
```

### 4. Pulsing Logo (Continuous Animation)

```javascript
function animatePulsing(paths, duration, delay) {
  return gsap.timeline({ delay, repeat: -1, yoyo: true })
    .to(paths, {
      duration: duration,
      drawSVG: "100%",
      ease: "power2.inOut",
      stagger: 0.1
    })
    .to(paths, {
      duration: duration * 0.5,
      strokeWidth: 10,
      ease: "power2.inOut",
      stagger: 0.05
    }, "-=" + (duration * 0.5));
}
```

## Performance Considerations

### 1. SVG Optimization

- **Simplify paths**: Use fewer points in your SVG paths
- **Remove unnecessary attributes**: Clean up unused SVG attributes
- **Use appropriate stroke-width**: Balance visual quality with performance

### 2. Animation Optimization

```javascript
// Use GSAP's context for proper cleanup
useEffect(() => {
  const ctx = gsap.context(() => {
    // Your animation code here
  });

  return () => ctx.revert(); // Cleanup on unmount
}, []);
```

### 3. Hardware Acceleration

```javascript
// Enable hardware acceleration
gsap.set(paths, {
  transformOrigin: "center center",
  willChange: "transform"
});
```

### 4. Reduce Repaints

```javascript
// Use transform-based properties instead of layout properties
gsap.to(paths, {
  scale: 1.1, // Better than width/height changes
  rotation: 5, // Better than left/top changes
  // Avoid: opacity, backgroundColor, etc. during heavy animations
});
```

## Browser Compatibility

### Supported Browsers

- **Chrome**: 60+
- **Firefox**: 55+
- **Safari**: 12+
- **Edge**: 79+

### Fallbacks

```javascript
// Check for DrawSVGPlugin support
if (typeof DrawSVGPlugin !== 'undefined') {
  // Use DrawSVG animations
} else {
  // Fallback to simple fade-in
  gsap.from(paths, {
    duration: 1,
    opacity: 0,
    stagger: 0.1
  });
}
```

### Mobile Considerations

```javascript
// Reduce animation complexity on mobile
const isMobile = window.innerWidth < 768;

gsap.to(paths, {
  duration: isMobile ? duration * 0.7 : duration,
  drawSVG: "100%",
  ease: isMobile ? "power1.inOut" : "power2.inOut", // Simpler easing on mobile
  stagger: isMobile ? 0.05 : 0.1
});
```

## Troubleshooting

### Common Issues

1. **Plugin not loaded**
   ```javascript
   // Make sure to register the plugin
   gsap.registerPlugin(DrawSVGPlugin);
   ```

2. **Paths not animating**
   ```javascript
   // Ensure paths have stroke properties
   gsap.set(paths, {
     fill: "none",
     stroke: "#000000",
     strokeWidth: 8
   });
   ```

3. **Performance issues**
   ```javascript
   // Use appropriate easing functions
   ease: "power2.inOut" // Instead of complex custom eases
   ```

4. **Memory leaks**
   ```javascript
   // Always use GSAP context for cleanup
   const ctx = gsap.context(() => {
     // Animation code
   });
   return () => ctx.revert();
   ```

### Debug Helpers

```javascript
// Debug path lengths
paths.forEach((path, index) => {
  console.log(`Path ${index} length:`, path.getTotalLength());
});

// Debug animation progress
tl.eventCallback("onUpdate", () => {
  console.log("Animation progress:", tl.progress());
});
```

## Complete Example Component

Here's a complete, production-ready component:

```tsx
// components/AnimatedLogo.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

gsap.registerPlugin(DrawSVGPlugin);

interface AnimatedLogoProps {
  className?: string;
  animationType?: 'sequential' | 'staggered' | 'center-out' | 'edges-in' | 'morphing';
  duration?: number;
  delay?: number;
  color?: string;
  strokeWidth?: number;
  onComplete?: () => void;
}

export default function AnimatedLogo({
  className = "",
  animationType = 'staggered',
  duration = 2,
  delay = 0,
  color = "#000000",
  strokeWidth = 8,
  onComplete
}: AnimatedLogoProps) {
  const logoRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!logoRef.current) return;

    const ctx = gsap.context(() => {
      const paths = logoRef.current?.querySelectorAll('path');
      if (!paths) return;

      // Set initial state
      gsap.set(paths, {
        drawSVG: "0%",
        stroke: color,
        strokeWidth: strokeWidth,
        fill: "none"
      });

      let animation;

      switch (animationType) {
        case 'sequential':
          animation = animateSequential(paths, duration, delay);
          break;
        case 'staggered':
          animation = animateStaggered(paths, duration, delay);
          break;
        case 'center-out':
          animation = animateCenterOut(paths, duration, delay);
          break;
        case 'edges-in':
          animation = animateEdgesIn(paths, duration, delay);
          break;
        case 'morphing':
          animation = animateMorphing(paths, duration, delay);
          break;
      }

      if (animation && onComplete) {
        animation.eventCallback("onComplete", onComplete);
      }
    });

    return () => ctx.revert();
  }, [animationType, duration, delay, color, strokeWidth, onComplete]);

  return (
    <svg
      ref={logoRef}
      id="sw-beauty-logo"
      viewBox="0 0 1024 1024"
      className={className}
      width="300"
      height="300"
    >
      {/* Include your prepared SVG paths here */}
      <path id="logo-s" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
        d="M232.148224,517.340393 C238.825394,497.232758 245.415176,477.515259 251.829498,457.740845 ..."/>
      {/* Include other paths similarly */}
    </svg>
  );
}

// Animation functions (include all the functions from above)
```

## Usage Examples

```tsx
// Basic usage
<AnimatedLogo />

// Staggered animation with custom duration
<AnimatedLogo animationType="staggered" duration={1.5} />

// Morphing animation with purple color
<AnimatedLogo animationType="morphing" color="#8B5CF6" />

// Center-out animation with callback
<AnimatedLogo 
  animationType="center-out" 
  onComplete={() => console.log('Animation complete!')} 
/>
```

This guide provides everything you need to create stunning logo animations for SW Beauty using GSAP's DrawSVGPlugin. The examples range from simple sequential animations to complex morphing effects, all optimized for performance and cross-browser compatibility.