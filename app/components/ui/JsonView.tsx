/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import styled from "styled-components";

const JsonContainer = styled.div`
  background: #ffffff;
  border: 2px solid #e2e8f0;
  border-radius: 20px;
  padding: 2rem;
  font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
  font-size: 0.95rem;
  line-height: 1.8;
  overflow-x: auto;
  color: #1e293b;
  transition: all 0.3s ease;
  backdrop-filter: blur(20px);
  box-shadow: 0 10px 40px rgba(99, 102, 241, 0.08),
    0 4px 12px rgba(0, 0, 0, 0.04);

  &:hover {
    border-color: #6366f1;
    box-shadow: 0 15px 50px rgba(99, 102, 241, 0.12),
      0 8px 16px rgba(0, 0, 0, 0.08);
  }

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    height: 8px;
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    border-radius: 4px;

    &:hover {
      background: linear-gradient(135deg, #818cf8, #a78bfa);
    }
  }
`;

const JsonKey = styled.span`
  color: #6366f1;
  font-weight: 600;
`;

const JsonValue = styled.span`
  color: #8b5cf6;
`;

const JsonString = styled.span`
  color: #14b8a6;
`;

const JsonNumber = styled.span`
  color: #ec4899;
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
      <pre style={{ margin: 0, color: "#475569", lineHeight: "1.6" }}>
        {renderValue(data)}
      </pre>
    </JsonContainer>
  );
};
