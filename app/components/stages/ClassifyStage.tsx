/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect } from "react";
import { animate, stagger } from "animejs";
import { ServerSVG } from "../ui/ServerSVG";
import { durations } from "@/app/styles/animations";
import { usePipeline } from "@/app/context/PipelineContext";

interface ClassifyStageProps {
  onComplete?: () => void;
}

export const ClassifyStage: React.FC<ClassifyStageProps> = ({ onComplete }) => {
  const { setClassification } = usePipeline();

  useEffect(() => {
    const runAnimation = async () => {
      // Set classification data
      setClassification({
        fileType: "PDF Document",
        tags: ["Government", "Permit", "Application"],
        summary: "Building permit application with supporting documents",
        confidence: 0.97,
      });

      // Particles break into smaller chunks
      animate(".classify-particle", {
        translateX: stagger([-30, 30]),
        translateY: stagger([-30, 30]),
        scale: [1, 0.6],
        opacity: [0, 1],
        duration: durations.normal,
        delay: stagger(100),
        ease: "outElastic(1, 0.6)",
      });

      await new Promise((resolve) =>
        setTimeout(resolve, durations.normal + 800)
      );

      // Show metadata tags
      animate(".metadata-tag", {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: durations.fast,
        delay: stagger(150),
        ease: "outQuad",
      });

      await new Promise((resolve) => setTimeout(resolve, durations.slow));

      if (onComplete) {
        onComplete();
      }
    };

    runAnimation();
  }, []);

  return (
    <g id="classify-stage">
      {/* Server */}
      <ServerSVG id="server-classify" x={400} y={300} scale={1} />

      {/* Chunked particles */}
      {[...Array(12)].map((_, i) => (
        <circle
          key={i}
          className="classify-particle"
          cx={400}
          cy={300}
          r={3}
          fill="#a855f7"
          opacity={0}
        />
      ))}

      {/* Metadata tags */}
      <g className="metadata-container">
        {["PDF", "Government", "Permit"].map((tag, i) => (
          <g key={tag} className="metadata-tag" opacity={0}>
            <rect
              x={250 + i * 120}
              y={150}
              width={100}
              height={35}
              rx={4}
              fill="rgba(59, 130, 246, 0.1)"
              stroke="#3b82f6"
              strokeWidth={1}
            />
            <text
              x={300 + i * 120}
              y={172}
              textAnchor="middle"
              fill="#3b82f6"
              fontSize={14}
              fontWeight="500"
            >
              {tag}
            </text>
          </g>
        ))}
      </g>

      {/* Classification label */}
      <text
        x="400"
        y="450"
        textAnchor="middle"
        fill="#a855f7"
        fontSize="11"
        fontWeight="500"
      >
        CLASSIFYING DOCUMENT
      </text>
    </g>
  );
};

export const runClassifyAnimation = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, durations.normal + durations.slow + 1300);
  });
};
