/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect } from "react";
import { animate, stagger } from "animejs";
import { durations } from "@/app/styles/animations";

interface StoreStageProps {
  onComplete?: () => void;
}

export const StoreStage: React.FC<StoreStageProps> = ({ onComplete }) => {
  useEffect(() => {
    const runAnimation = async () => {
      // Animate database cylinders appearing
      animate(".db-cylinder", {
        opacity: [0, 1],
        translateY: [30, 0],
        scale: [0.8, 1],
        duration: durations.normal,
        delay: stagger(200),
        ease: "outElastic(1, 0.6)",
      });

      await new Promise((resolve) =>
        setTimeout(resolve, durations.normal + 600)
      );

      // Data flowing into database
      animate(".store-particle", {
        translateY: [-80, 0],
        opacity: [0, 1, 0],
        scale: [0.5, 1, 0.5],
        duration: durations.slow,
        delay: stagger(150),
        ease: "inOutQuad",
      });

      await new Promise((resolve) => setTimeout(resolve, durations.slow + 500));

      // Success pulse
      animate(".db-cylinder", {
        filter: [
          "drop-shadow(0 0 4px rgba(16, 185, 129, 0.4))",
          "drop-shadow(0 0 15px rgba(16, 185, 129, 0.8))",
          "drop-shadow(0 0 4px rgba(16, 185, 129, 0.4))",
        ],
        duration: durations.normal,
        ease: "inOutQuad",
      });

      await new Promise((resolve) =>
        setTimeout(resolve, durations.normal + 500)
      );

      if (onComplete) {
        onComplete();
      }
    };

    runAnimation();
  }, []);

  return (
    <g id="store-stage">
      {/* Database visualization - 3 cylinders */}
      {[0, 1, 2].map((i) => (
        <g key={i} className="db-cylinder" opacity={0}>
          {/* Cylinder top ellipse */}
          <ellipse
            cx={300 + i * 100}
            cy={270}
            rx={35}
            ry={12}
            fill="#3b82f6"
            stroke="#60a5fa"
            strokeWidth={1}
          />
          {/* Cylinder body */}
          <rect
            x={265 + i * 100}
            y={270}
            width={70}
            height={80}
            fill="url(#dbGradient)"
            stroke="#60a5fa"
            strokeWidth={1}
          />
          {/* Cylinder bottom ellipse */}
          <ellipse
            cx={300 + i * 100}
            cy={350}
            rx={35}
            ry={12}
            fill="#0099cc"
            stroke="#60a5fa"
            strokeWidth={1}
          />
          {/* Storage indicator lines */}
          {[0, 1, 2].map((j) => (
            <line
              key={j}
              x1={270 + i * 100}
              y1={290 + j * 20}
              x2={330 + i * 100}
              y2={290 + j * 20}
              stroke="#a855f7"
              strokeWidth={1}
              opacity={0.6}
            />
          ))}
        </g>
      ))}

      {/* Particles being stored */}
      {[...Array(12)].map((_, i) => (
        <circle
          key={i}
          className="store-particle"
          cx={300 + (i % 3) * 100}
          cy={220}
          r={4}
          fill="#3b82f6"
          opacity={0}
        />
      ))}

      {/* Gradient definition */}
      <defs>
        <linearGradient id="dbGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#0099cc" />
        </linearGradient>
      </defs>

      {/* Store label */}
      <text
        x="400"
        y="450"
        textAnchor="middle"
        fill="#3b82f6"
        fontSize="11"
        fontWeight="500"
      >
        STORING IN DATABASE
      </text>
    </g>
  );
};

export const runStoreAnimation = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, durations.normal * 2 + durations.slow + 1600);
  });
};
