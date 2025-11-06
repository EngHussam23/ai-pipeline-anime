"use client";

import React from "react";
import styled from "styled-components";

const ServerContainer = styled.g`
  filter: drop-shadow(0 0 15px rgba(255, 51, 102, 0.6));
  transition: all 0.3s ease;

  &:hover {
    filter: drop-shadow(0 0 25px rgba(255, 51, 102, 0.9));
  }
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
        rx="8"
        fill="rgba(0, 0, 0, 0.9)"
        stroke="url(#serverStroke)"
        strokeWidth="2"
      />

      {/* Server racks */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect
            x="-50"
            y={-60 + i * 35}
            width="100"
            height="25"
            rx="4"
            fill="rgba(0, 0, 0, 0.95)"
            stroke="rgba(255, 51, 102, 0.4)"
            strokeWidth="1"
          />
          {/* LED indicators */}
          <circle
            cx="-35"
            cy={-47 + i * 35}
            r="3"
            fill="#ff3366"
            opacity="0.9"
            className="server-led"
          >
            <animate
              attributeName="opacity"
              values="0.5;1;0.5"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx="-20"
            cy={-47 + i * 35}
            r="3"
            fill="#ffaa00"
            opacity="0.8"
            className="server-led"
          >
            <animate
              attributeName="opacity"
              values="0.4;0.9;0.4"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx="-5"
            cy={-47 + i * 35}
            r="3"
            fill="#00ff99"
            opacity="0.7"
            className="server-led"
          >
            <animate
              attributeName="opacity"
              values="0.3;0.8;0.3"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      ))}

      {/* Gradient definitions */}
      <defs>
        <linearGradient id="serverGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(0, 0, 0, 0.95)" />
          <stop offset="100%" stopColor="rgba(0, 0, 0, 1)" />
        </linearGradient>
        <linearGradient id="serverStroke" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff3366" />
          <stop offset="50%" stopColor="#ffaa00" />
          <stop offset="100%" stopColor="#00ff99" />
        </linearGradient>
      </defs>
    </ServerContainer>
  );
};
