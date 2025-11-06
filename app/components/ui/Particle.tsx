"use client";

import React from "react";
import styled from "styled-components";

const ParticleCircle = styled.circle`
  filter: drop-shadow(0 0 3px rgba(59, 130, 246, 0.6));
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
  r = 3,
  fill = "#3b82f6",
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
