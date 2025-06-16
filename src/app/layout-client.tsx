"use client";

import React from "react";
import { Suspense, lazy } from "react";
import { Column, Flex } from "@/once-ui/components";
import { Footer, Header, RouteGuard } from "@/components";
import { effects } from "@/app/resources";

// Lazy load the Background component to improve initial load time
const Background = lazy(() => import('@/once-ui/components').then(module => ({ 
  default: module.Background 
})));

// Simple loading component for suspense fallback
export const SimpleLoadingIndicator = () => (
  <div style={{ 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    width: '100%', 
    height: '3px', 
    background: 'linear-gradient(to right, transparent, var(--color-brand-background-strong), transparent)',
    backgroundSize: '200% 100%',
    animation: 'loading 1.5s infinite',
    zIndex: 1000
  }}>
    <style jsx>{`
      @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `}</style>
  </div>
);

// Optimized background props to reduce complexity
const getOptimizedBackgroundProps = () => ({
  mask: {
    cursor: effects.mask.cursor,
    x: effects.mask.x,
    y: effects.mask.y,
    radius: effects.mask.radius,
  },
  gradient: {
    display: effects.gradient.display,
    x: effects.gradient.x,
    y: effects.gradient.y,
    width: effects.gradient.width,
    height: effects.gradient.height,
    tilt: effects.gradient.tilt,
    colorStart: effects.gradient.colorStart,
    colorEnd: effects.gradient.colorEnd,
    opacity: effects.gradient.opacity as
      | 0
      | 10
      | 20
      | 30
      | 40
      | 50
      | 60
      | 70
      | 80
      | 90
      | 100,
  },
  dots: {
    display: effects.dots.display,
    color: effects.dots.color,
    size: effects.dots.size as any,
    opacity: effects.dots.opacity as any,
  },
  grid: {
    display: effects.grid.display,
    color: effects.grid.color,
    width: (effects.grid as any).width,
    height: (effects.grid as any).height,
    opacity: (effects.grid as any).opacity,
  },
  lines: {
    display: effects.lines.display,
    opacity: effects.lines.opacity as any,
  }
});

// Client component for the layout content
export const LayoutContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <Column style={{ minHeight: "100vh" }} as="body" fillWidth margin="0" padding="0">
      <Suspense fallback={<SimpleLoadingIndicator />}>
        <Background {...getOptimizedBackgroundProps()} />
      </Suspense>
      <Flex fillWidth minHeight="16"></Flex>
      <Header />
      <Flex
        position="relative"
        zIndex={0}
        fillWidth
        paddingY="l"
        paddingX="l"
        horizontal="center"
        flex={1}
      >
        <Flex horizontal="center" fillWidth minHeight="0">
          <RouteGuard>{children}</RouteGuard>
        </Flex>
      </Flex>
      <Footer />
    </Column>
  );
};