/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect } from "react";
import { animate, stagger } from "animejs";
import { durations } from "@/app/styles/animations";
import { usePipeline } from "@/app/context/PipelineContext";

interface VectorizeStageProps {
  onComplete?: () => void;
  isActive?: boolean;
}

export const VectorizeStage: React.FC<VectorizeStageProps> = ({
  onComplete,
  isActive = false,
}) => {
  const { setVectorData } = usePipeline();

  useEffect(() => {
    if (!isActive) return;

    const runAnimation = async () => {
      const dimensions = [3, 5, 20, 500];

      for (let i = 0; i < dimensions.length; i++) {
        const dim = dimensions[i];
        setVectorData({ dimensions, currentDim: dim });

        // Animate dimension transformation
        animate(".vector-particle", {
          scale: [1, 1.5, 1],
          rotate: [0, 360],
          opacity: [0.5, 1, 0.5],
          duration: durations.normal,
          delay: stagger(50),
          ease: "inOutQuad",
        });

        await new Promise((resolve) =>
          setTimeout(resolve, durations.normal + 200)
        );
      }

      // Final vector formation
      animate(".vector-line", {
        strokeDashoffset: [1000, 0],
        opacity: [0, 1],
        duration: durations.slow,
        delay: stagger(100),
        ease: "outQuad",
      });

      await new Promise((resolve) => setTimeout(resolve, durations.slow + 500));

      if (onComplete) {
        onComplete();
      }
    };

    runAnimation();
  }, [isActive, onComplete, setVectorData]);

  return (
    <g id="vectorize-stage">
      {/* Central processing point */}
      <circle cx={400} cy={300} r={15} fill="#ff3366" opacity={0.3} />

      {/* Vector particles */}
      {[...Array(16)].map((_, i) => {
        const angle = (i * Math.PI * 2) / 16;
        const radius = 80;
        const x = 400 + Math.cos(angle) * radius;
        const y = 300 + Math.sin(angle) * radius;

        return (
          <circle
            key={i}
            className="vector-particle"
            cx={x}
            cy={y}
            r={4}
            fill="#ff3366"
            opacity={0.5}
          />
        );
      })}

      {/* Connecting lines */}
      {[...Array(8)].map((_, i) => {
        const angle = (i * Math.PI * 2) / 8;
        const radius = 80;
        const x = 400 + Math.cos(angle) * radius;
        const y = 300 + Math.sin(angle) * radius;

        return (
          <line
            key={i}
            className="vector-line"
            x1={400}
            y1={300}
            x2={x}
            y2={y}
            stroke="#ffaa00"
            strokeWidth={1}
            strokeDasharray="5,5"
            opacity={0}
          />
        );
      })}

      {/* Dimension indicator */}
      <text
        x="400"
        y="230"
        textAnchor="middle"
        fill="#ff3366"
        fontSize="24"
        fontWeight="500"
        className="dimension-text"
      >
        500D VECTORS
      </text>

      {/* Vectorize label */}
      <text
        x="400"
        y="450"
        textAnchor="middle"
        fill="#ff3366"
        fontSize="11"
        fontWeight="500"
      >
        VECTORIZING DATA
      </text>
    </g>
  );
};

export const runVectorizeAnimation = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, (durations.normal + 200) * 4 + durations.slow + 500);
  });
};
