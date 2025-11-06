"use client";

import React from "react";
import styled from "styled-components";

const ServerContainer = styled.g`
  filter: drop-shadow(0 0 4px rgba(59, 130, 246, 0.3));
`;

interface ServerSVGProps {
  id?: string;
  x?: number;
  y?: number;
  scale?: number;
}

export const ServerSVG: React.FC<ServerSVGProps> = ({
  id = "server",
  x = 400,
  y = 300,
  scale = 1,
}) => {
  return (
    <ServerContainer
      id={id}
      transform={`translate(${x}, ${y}) scale(${scale})`}
    >
      {/* Server body */}
      <rect
        x="-60"
        y="-80"
        width="120"
        height="160"
        rx="6"
        fill="rgba(0, 0, 0, 0.8)"
        stroke="#3b82f6"
        strokeWidth="1"
      />

      {/* Server racks */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect
            x="-50"
            y={-60 + i * 35}
            width="100"
            height="25"
            rx="3"
            fill="rgba(0, 0, 0, 0.9)"
            stroke="rgba(59, 130, 246, 0.3)"
            strokeWidth="1"
          />
          {/* LED indicators */}
          <circle
            cx="-35"
            cy={-47 + i * 35}
            r="2"
            fill="#3b82f6"
            opacity="0.8"
            className="server-led"
          />
          <circle
            cx="-20"
            cy={-47 + i * 35}
            r="2"
            fill="#3b82f6"
            opacity="0.5"
            className="server-led"
          />
          <circle
            cx="-5"
            cy={-47 + i * 35}
            r="2"
            fill="#3b82f6"
            opacity="0.3"
            className="server-led"
          />
        </g>
      ))}

      {/* Gradient definition */}
      <defs>
        <linearGradient id="serverGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(0, 0, 0, 0.9)" />
          <stop offset="100%" stopColor="rgba(0, 0, 0, 1)" />
        </linearGradient>
      </defs>
    </ServerContainer>
  );
};
