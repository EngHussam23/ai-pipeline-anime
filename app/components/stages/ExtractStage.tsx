/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect } from "react";
import { animate, stagger } from "animejs";
import { durations } from "@/app/styles/animations";
import { usePipeline } from "@/app/context/PipelineContext";

interface ExtractStageProps {
  onComplete?: () => void;
  isActive?: boolean;
}

export const ExtractStage: React.FC<ExtractStageProps> = ({
  onComplete,
  isActive = false,
}) => {
  const { setExtractedData } = usePipeline();

  useEffect(() => {
    if (!isActive) return;

    const runAnimation = async () => {
      // Set extracted data
      setExtractedData({
        title: "Building Permit Application",
        author: "John Smith",
        date: "2025-11-06",
        category: "Construction",
        keywords: ["permit", "building", "residential", "construction"],
        content_preview: "Application for residential building permit...",
      });

      // Animate data extraction
      animate(".extract-box", {
        opacity: [0, 1],
        scale: [0.8, 1],
        translateY: [20, 0],
        duration: durations.normal,
        delay: stagger(150),
        ease: "outElastic(1, 0.6)",
      });

      await new Promise((resolve) => setTimeout(resolve, durations.slow + 500));

      // Data flow animation
      animate(".extract-flow", {
        strokeDashoffset: [1000, 0],
        opacity: [0, 1, 0],
        duration: durations.slow,
        ease: "inOutQuad",
      });

      await new Promise((resolve) => setTimeout(resolve, durations.slow + 500));

      if (onComplete) {
        onComplete();
      }
    };

    runAnimation();
  }, [isActive, onComplete, setExtractedData]);

  const fields = [
    { label: "TITLE", value: "Building Permit", y: 200 },
    { label: "TYPE", value: "Application", y: 240 },
    { label: "DATE", value: "2025-11-06", y: 280 },
    { label: "STATUS", value: "Processing", y: 320 },
  ];

  return (
    <g id="extract-stage">
      {/* Extraction boxes */}
      <g className="extraction-container">
        {fields.map((field, i) => (
          <g key={i} className="extract-box" opacity={0}>
            <rect
              x={250}
              y={field.y}
              width={300}
              height={30}
              rx={6}
              fill="rgba(255, 51, 102, 0.1)"
              stroke="#ff3366"
              strokeWidth={1.5}
            />
            <text
              x={260}
              y={field.y + 20}
              fill="#ff3366"
              fontSize={12}
              fontWeight="500"
            >
              {field.label}:
            </text>
            <text x={350} y={field.y + 20} fill="#e0e7ff" fontSize={12}>
              {field.value}
            </text>
          </g>
        ))}
      </g>

      {/* Data flow lines */}
      {[...Array(4)].map((_, i) => (
        <line
          key={i}
          className="extract-flow"
          x1={400}
          y1={360}
          x2={400}
          y2={420}
          stroke="#ff3366"
          strokeWidth={1}
          strokeDasharray="10,5"
          opacity={0}
        />
      ))}

      {/* Extract label */}
      <text
        x="400"
        y="450"
        textAnchor="middle"
        fill="#ff3366"
        fontSize="11"
        fontWeight="500"
      >
        EXTRACTING DATA
      </text>
    </g>
  );
};

export const runExtractAnimation = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, durations.slow * 2 + 1000);
  });
};
