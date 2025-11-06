/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import styled from "styled-components";

const JsonContainer = styled.div`
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid rgba(255, 51, 102, 0.3);
  border-radius: 20px;
  padding: 2rem;
  font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
  font-size: 0.95rem;
  line-height: 1.8;
  overflow-x: auto;
  color: rgba(255, 255, 255, 0.95);
  transition: all 0.3s ease;
  backdrop-filter: blur(20px);
  box-shadow: 0 10px 50px rgba(255, 51, 102, 0.2),
    inset 0 0 60px rgba(0, 0, 0, 0.5);

  &:hover {
    border-color: rgba(255, 51, 102, 0.6);
    box-shadow: 0 15px 60px rgba(255, 51, 102, 0.3),
      inset 0 0 60px rgba(0, 0, 0, 0.5);
  }

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    height: 8px;
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #ff3366, #ffaa00);
    border-radius: 4px;

    &:hover {
      background: linear-gradient(135deg, #ff6b9d, #ffc44d);
    }
  }
`;

const JsonKey = styled.span`
  color: #ff3366;
  font-weight: 600;
`;

const JsonValue = styled.span`
  color: #ffaa00;
`;

const JsonString = styled.span`
  color: #00ff99;
`;

const JsonNumber = styled.span`
  color: #ff6b9d;
`;

interface JsonViewProps {
  data: Record<string, any>;
  className?: string;
}

export const JsonView: React.FC<JsonViewProps> = ({ data, className = "" }) => {
  const renderValue = (value: any, indent: number = 0): React.ReactElement => {
    const spacing = "  ".repeat(indent);

    if (value === null) {
      return <JsonValue>null</JsonValue>;
    }

    if (typeof value === "string") {
      return <JsonString>&quot;{value}&quot;</JsonString>;
    }

    if (typeof value === "number") {
      return <JsonNumber>{value}</JsonNumber>;
    }

    if (typeof value === "boolean") {
      return <JsonValue>{value.toString()}</JsonValue>;
    }

    if (Array.isArray(value)) {
      return (
        <>
          {"[\n"}
          {value.map((item, index) => (
            <React.Fragment key={index}>
              {spacing} {renderValue(item, indent + 1)}
              {index < value.length - 1 ? "," : ""}
              {"\n"}
            </React.Fragment>
          ))}
          {spacing}
          {"]"}
        </>
      );
    }

    if (typeof value === "object") {
      const entries = Object.entries(value);
      return (
        <>
          {"{\n"}
          {entries.map(([key, val], index) => (
            <React.Fragment key={key}>
              {spacing} <JsonKey>&quot;{key}&quot;</JsonKey>:{" "}
              {renderValue(val, indent + 1)}
              {index < entries.length - 1 ? "," : ""}
              {"\n"}
            </React.Fragment>
          ))}
          {spacing}
          {"}"}
        </>
      );
    }

    return <JsonValue>{String(value)}</JsonValue>;
  };

  return (
    <JsonContainer className={className}>
      <pre style={{ margin: 0, color: "#e0e7ff", lineHeight: "1.6" }}>
        {renderValue(data)}
      </pre>
    </JsonContainer>
  );
};
