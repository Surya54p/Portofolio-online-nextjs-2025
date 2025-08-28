"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ReactElement } from "react";

type SvgName = "hero" | "wave" | "logo" | "waveCostume";

interface AnimatedSvgProps {
  name: SvgName;
  className?: string;
}

const SVG_MAP: Record<SvgName, ReactElement> = {
  hero: (
    <svg viewBox="0 0 300 120" fill="none" stroke="currentColor" strokeWidth={3}>
      <path d="M20 100 C 60 20, 240 20, 280 100" />
      <path d="M40 105 H260" />
    </svg>
  ),
  wave: (
    <svg viewBox="0 0 500 120" fill="none" stroke="currentColor" strokeWidth={3}>
      <path d="M0 60 Q 125 0, 250 60 T 500 60" />
    </svg>
  ),
  logo: (
    <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth={3}>
      <circle cx="60" cy="60" r="50" />
      <path d="M20 60 H100" />
    </svg>
  ),

  waveCostume: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 180" width="100%" height="180" preserveAspectRatio="none">
      <defs>
        <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#ffe27a" />
          <stop offset="60%" stop-color="#ffd26a" />
          <stop offset="100%" stop-color="#ff4b3e" />
        </linearGradient>
        <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feBlend in="SourceGraphic" in2="b" />
        </filter>
      </defs>

      <path
        d="M0 100 C 150 40, 350 160, 550 100 S 950 40, 1400 100 V180 H0 Z"
        fill="#00000022"
        transform="translate(0,6) scale(1,1)"
      />

      <path
        id="wave-main"
        d="M0 100 C 150 40, 350 160, 550 100 S 950 40, 1400 100 V180 H0 Z"
        fill="url(#g1)"
        filter="url(#soft)"
      />

      <path
        id="wave-top"
        d="M0 98 C 150 38, 350 158, 550 98 S 950 38, 1400 98"
        stroke="rgba(255,255,255,0.9)"
        stroke-width="6"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        opacity="0.95"
      />
    </svg>
  ),
};
function hasGetTotalLength(el: Element): el is SVGGeometryElement & { getTotalLength(): number } {
  return "getTotalLength" in el && typeof (el as any).getTotalLength === "function";
}

export default function AnimatedSvg({ name, className }: AnimatedSvgProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!wrapperRef.current) return;
      const paths = wrapperRef.current.querySelectorAll("path, circle");

      paths.forEach((p, i) => {
        const el = p as SVGGeometryElement;
        const len = hasGetTotalLength(el) ? el.getTotalLength() : 300;

        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(el, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.out",
          delay: i * 0.2,
        });
      });
    },
    { scope: wrapperRef }
  );

  return (
    <div ref={wrapperRef} className={className}>
      {SVG_MAP[name]}
    </div>
  );
}
