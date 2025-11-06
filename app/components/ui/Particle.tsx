"use client";

import React from "react";
import styled from "styled-components";

const ParticleCircle = styled.circle`
  filter: drop-shadow(0 0 8px currentColor);
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0%,
    100% {
      opacity: 0.8;
    }
    50% {
      opacity: 1;
    }
  }
`;

interface ParticleProps {
  id?: string;
  cx?: number;
  cy?: number;
  r?: number;
  fill?: string;
  className?: string;
}

export const Particle: React.FC<ParticleProps> = ({
  id,
  cx = 0,
  cy = 0,
  r = 4,
  fill = "#ff3366",
  className = "particle",
}) => {
  return (
    <ParticleCircle
      id={id}
      className={className}
      cx={cx}
      cy={cy}
      r={r}
      fill={fill}
    />
  );
};
