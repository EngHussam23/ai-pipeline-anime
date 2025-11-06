/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { Particle } from "../ui/Particle";
import { ServerSVG } from "../ui/ServerSVG";
import { durations } from "@/app/styles/animations";

interface UploadStageProps {
  onComplete?: () => void;
  isActive?: boolean;
}

export const UploadStage: React.FC<UploadStageProps> = ({
  onComplete,
  isActive = false,
}) => {
  const animationRef = useRef<any>(null);
  const hasRunRef = useRef(false);

  useEffect(() => {
    // Only run when stage becomes active and hasn't run yet
    if (!isActive || hasRunRef.current) return;

    const runAnimation = async () => {
      hasRunRef.current = true;

      // Wait a bit before starting
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Animate particles flowing toward the server
      animationRef.current = animate(".upload-particle", {
        translateX: [0, 200],
        translateY: [0, -50],
        opacity: [0, 1, 0],
        scale: [0.5, 1, 0.5],
        duration: durations.slow,
        delay: stagger(200),
        ease: "inOutQuad",
      });

      await animationRef.current.finished;

      // Server glow effect
      animate(".server-upload", {
        filter: [
          "drop-shadow(0 0 4px rgba(255, 51, 102, 0.4))",
          "drop-shadow(0 0 20px rgba(255, 51, 102, 0.8))",
          "drop-shadow(0 0 4px rgba(255, 51, 102, 0.4))",
        ],
        duration: durations.normal,
        ease: "inOutQuad",
      });

      await new Promise((resolve) => setTimeout(resolve, durations.normal));

      if (onComplete) {
        onComplete();
      }
    };

    runAnimation();
  }, [isActive, onComplete]);

  return (
    <g id="upload-stage">
      {/* Starting position particles */}
      {[...Array(8)].map((_, i) => (
        <Particle
          key={i}
          className="upload-particle"
          cx={100}
          cy={300 + i * 15}
          r={5}
          fill="#ff3366"
        />
      ))}

      {/* Server */}
      <ServerSVG id="server-upload" x={400} y={300} scale={1} />

      {/* Upload label */}
      <text
        x="400"
        y="450"
        textAnchor="middle"
        fill="#ff3366"
        fontSize="11"
        fontWeight="500"
        className="stage-label"
      >
        UPLOADING DOCUMENT
      </text>
    </g>
  );
};

export const runUploadAnimation = (): Promise<void> => {
  return new Promise((resolve) => {
    // This function will be called by the Pipeline component
    setTimeout(resolve, durations.slow + durations.normal + 500);
  });
};
