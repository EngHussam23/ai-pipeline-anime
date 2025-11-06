/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import styled from "styled-components";

const JsonContainer = styled.div`
  background: #000000;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 1.5rem;
  font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
  font-size: 0.875rem;
  line-height: 1.6;
  overflow-x: auto;
  color: rgba(255, 255, 255, 0.9);
  transition: border-color 0.2s ease;

  &:hover {
    border-color: rgba(59, 130, 246, 0.3);
  }

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    height: 6px;
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(59, 130, 246, 0.5);
    border-radius: 3px;

    &:hover {
      background: rgba(59, 130, 246, 0.7);
    }
  }
`;

const JsonKey = styled.span`
  color: #3b82f6;
  font-weight: 500;
`;

const JsonValue = styled.span`
  color: #a855f7;
`;

const JsonString = styled.span`
  color: #10b981;
`;

const JsonNumber = styled.span`
  color: #f59e0b;
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
